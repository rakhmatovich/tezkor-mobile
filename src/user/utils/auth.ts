import { storage } from "@core/utils/storage.ts"

export function auth() {
    const token = storage.getString("token")
    return {
        headers: {
            Authorization: `Token ${token}`,
        },
    }
}

export function checkAuth() {
    return Boolean(storage.getString("token") && storage.getString("phone"))
}

export function signOut() {
    storage.set("token", "")
    storage.set("cart", "")
    storage.set("like", "")
}
