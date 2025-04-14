import { query } from "./_generated/server";

export const getServerTime = query({
    handler: async () => {
        return Date.now()
    }
})