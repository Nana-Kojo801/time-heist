import * as React from 'react'
import { useStore } from '@tanstack/react-form'

import { useFieldContext, useFormContext } from '../hooks/form-context'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea'
import * as ShadcnSelect from '@/components/ui/select'
import { Slider as ShadcnSlider } from '@/components/ui/slider'
import { Switch as ShadcnSwitch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface SubscribeButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const SubscribeButton = React.forwardRef<HTMLButtonElement, SubscribeButtonProps>(
  ({ className, children, ...props }, ref) => {
    const form = useFormContext()
    return (
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button 
            ref={ref}
            className={cn(className)} 
            type="submit" 
            disabled={isSubmitting}
            {...props}
          >
            {children}
          </Button>
        )}
      </form.Subscribe>
    )
  }
)

interface ErrorMessagesProps {
  errors: Array<string | { message: string }>
  className?: string
}

function ErrorMessages({ errors, className }: ErrorMessagesProps) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === 'string' ? error : error.message}
          className={cn("text-red-500 mt-1 text-sm", className)}
        >
          {typeof error === 'string' ? error : error.message}
        </div>
      ))}
    </>
  )
}

interface TextFieldProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'onChange' | 'value'> {
  label: string
  labelClassName?: string
  containerClassName?: string
  errorClassName?: string
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ 
    label, 
    placeholder, 
    type = 'text', 
    className, 
    labelClassName,
    containerClassName,
    errorClassName,
    id = label,
    ...props 
  }, ref) => {
    const field = useFieldContext<string>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
      <div className={cn(containerClassName)}>
        <Label
          htmlFor={id}
          className={cn("text-base font-medium text-foreground/80", labelClassName)}
        >
          {label}
        </Label>
        <Input
          ref={ref}
          id={id}
          type={type}
          value={field.state.value}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn("h-12 text-base bg-black/10 border-0 rounded-lg pl-4 focus-visible:ring-1 focus-visible:ring-primary", className)}
          {...props}
        />
        {field.state.meta.isTouched && <ErrorMessages className={errorClassName} errors={errors} />}
      </div>
    )
  }
)

interface TextAreaProps extends Omit<React.ComponentPropsWithoutRef<typeof ShadcnTextarea>, 'onChange' | 'value'> {
  label: string
  labelClassName?: string
  containerClassName?: string
  errorClassName?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    label, 
    rows = 3, 
    className, 
    labelClassName,
    containerClassName,
    errorClassName,
    id = label,
    ...props 
  }, ref) => {
    const field = useFieldContext<string>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
      <div className={cn(containerClassName)}>
        <Label 
          htmlFor={id} 
          className={cn("mb-2 text-xl font-bold", labelClassName)}
        >
          {label}
        </Label>
        <ShadcnTextarea
          ref={ref}
          id={id}
          value={field.state.value}
          onBlur={field.handleBlur}
          rows={rows}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn(className)}
          {...props}
        />
        {field.state.meta.isTouched && <ErrorMessages className={errorClassName} errors={errors} />}
      </div>
    )
  }
)

interface SelectProps extends Omit<React.ComponentPropsWithoutRef<typeof ShadcnSelect.Select>, 'value' | 'onValueChange'> {
  label: string
  values: Array<{ label: string; value: string }>
  placeholder?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
  containerClassName?: string
  errorClassName?: string
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ 
    label, 
    values, 
    placeholder, 
    className,
    triggerClassName,
    contentClassName,
    containerClassName,
    errorClassName,
    ...props 
  }, ref) => {
    const field = useFieldContext<string>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
      <div ref={ref} className={cn(containerClassName)}>
        <ShadcnSelect.Select
          name={field.name}
          value={field.state.value}
          onValueChange={(value) => field.handleChange(value)}
          {...props}
        >
          <ShadcnSelect.SelectTrigger className={cn("w-full", triggerClassName)}>
            <ShadcnSelect.SelectValue placeholder={placeholder} />
          </ShadcnSelect.SelectTrigger>
          <ShadcnSelect.SelectContent className={cn(contentClassName)}>
            <ShadcnSelect.SelectGroup>
              <ShadcnSelect.SelectLabel>{label}</ShadcnSelect.SelectLabel>
              {values.map((value) => (
                <ShadcnSelect.SelectItem key={value.value} value={value.value}>
                  {value.label}
                </ShadcnSelect.SelectItem>
              ))}
            </ShadcnSelect.SelectGroup>
          </ShadcnSelect.SelectContent>
        </ShadcnSelect.Select>
        {field.state.meta.isTouched && <ErrorMessages className={errorClassName} errors={errors} />}
      </div>
    )
  }
)

interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof ShadcnSlider>, 'value' | 'onValueChange'> {
  label: string
  labelClassName?: string
  containerClassName?: string
  errorClassName?: string
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    label, 
    className, 
    labelClassName,
    containerClassName,
    errorClassName,
    id = label,
    ...props 
  }, ref) => {
    const field = useFieldContext<number>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
      <div className={cn(containerClassName)}>
        <Label 
          htmlFor={id} 
          className={cn("mb-2 text-xl font-bold", labelClassName)}
        >
          {label}
        </Label>
        <ShadcnSlider
          ref={ref}
          id={id}
          onBlur={field.handleBlur}
          value={[field.state.value]}
          onValueChange={(value) => field.handleChange(value[0])}
          className={cn(className)}
          {...props}
        />
        {field.state.meta.isTouched && <ErrorMessages className={errorClassName} errors={errors} />}
      </div>
    )
  }
)

interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof ShadcnSwitch>, 'checked' | 'onCheckedChange'> {
  label: string
  labelClassName?: string
  switchClassName?: string
  errorClassName?: string
  containerClassName?: string
  wrapperClassName?: string
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ 
    label, 
    className, 
    labelClassName, 
    switchClassName,
    errorClassName,
    containerClassName,
    wrapperClassName,
    id = label,
    ...props 
  }, ref) => {
    const field = useFieldContext<boolean>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return (
      <div className={cn(containerClassName)}>
        <div className={cn("flex items-center gap-2", wrapperClassName)}>
          <ShadcnSwitch
            ref={ref}
            id={id}
            onBlur={field.handleBlur}
            checked={field.state.value}
            onCheckedChange={(checked) => field.handleChange(checked)}
            className={cn(switchClassName)}
            {...props}
          />
          <Label htmlFor={id} className={cn(labelClassName)}>{label}</Label>
        </div>
        {field.state.meta.isTouched && <ErrorMessages className={errorClassName} errors={errors} />}
      </div>
    )
  }
)
