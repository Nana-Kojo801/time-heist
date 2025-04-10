import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import type { DataModel } from '@convex/_generated/dataModel'
import { useConvex, useMutation } from 'convex/react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import type { z } from 'zod'
import type { authSchema } from './auth-form'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

export type User = DataModel['users']['document']

const SESSION_KEY = 'time-heist-session'

export interface IAuthContext {
  loading: boolean
  authenticated: boolean
  user: User | null
  signup: (values: z.infer<typeof authSchema>) => Promise<boolean>
  login: (values: z.infer<typeof authSchema>) => Promise<boolean>
  updateProfile: ({
    username,
    password,
    avatar,
  }: {
    username: string
    password: string
    avatar: File | null
  }) => Promise<void>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const convex = useConvex()
  const generateUploadUrl = useMutation(api.users.generateUploadUrl)

  const signup = async (values: z.infer<typeof authSchema>) => {
    try {
      const existingUser = await convex.query(api.users.getByUsername, {
        username: values.username,
      })
      if (existingUser) {
        toast.error('Username already in use')
        return true
      } else {
        const user = await convex.mutation(api.users.insert, values)
        localStorage.setItem(SESSION_KEY, user._id)
        setUser(user)
        setAuthenticated(true)
        return false
      }
    } catch {
      toast.error('Error signing up', { duration: 1000 })
      return true
    }
  }

  const login = async (values: z.infer<typeof authSchema>) => {
    try {
      const user = await convex.query(api.users.getByUsername, {
        username: values.username,
      })
      if (!user) {
        toast.error('User does not exist', { duration: 1000 })
        return true
      } else {
        if (user.password !== values.password) {
          toast.error('Invalid user info')
          return true
        } else {
          localStorage.setItem(SESSION_KEY, user._id)
          setUser(user)
          setAuthenticated(true)
          return false
        }
      }
    } catch {
      toast.error('Error occured signing up')
      return false
    }
  }

  const updateProfile = async ({
    username,
    password,
    avatar,
  }: {
    username: string
    password: string
    avatar: File | null
  }) => {
    try {
      if(username !== user!.username) {
        const existingUser = await convex.query(api.users.getByUsername, { username })
        if(existingUser) throw Error("Username already exists")
      }
      let newAvatar = user!.avatar
      if (avatar) {
        const postUrl = await generateUploadUrl()
        const result = await fetch(postUrl, {
          method: 'POST',
          headers: {
            'Content-type': avatar!.type,
          },
          body: avatar,
        }).then((res) => res.json())
        newAvatar = (await convex.query(api.users.getUrl, {
          storageId: result.storageId,
        }))!
      }
      setUser(Object.assign(user!, { username, password, avatar: newAvatar }))
      await convex.mutation(api.users.updateProfile, {
        username,
        password,
        avatar: newAvatar,
        userId: user!._id,
      })
      toast.success('Successfully updated profile', { duration: 1500 })
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const userId = localStorage.getItem(SESSION_KEY)
        if (!userId) {
          setLoading(false)
          return
        }
        const authenticatedUser = await convex.query(api.users.get, {
          id: userId as User['_id'],
        })
        setUser(authenticatedUser)
        setAuthenticated(true)
        setLoading(false)
      } catch {
        setLoading(false)
        setAuthenticated(false)
      }
    }
    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{ loading, authenticated, user, signup, login, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context)
    throw Error('Auth context must be used within the auth provider')

  return context
}

export const useAuthUser = () => {
  const { user: authUser } = useAuth()
  const { data: user } = useQuery({
    ...convexQuery(api.users.get, { id: authUser!._id }),
    initialData: authUser!
  })
  return user
}
