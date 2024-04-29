import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { CartItemType, ProductType } from "@core/types.ts"
import { storage } from "@core/utils/storage.ts"

export type ContextType = {
    likedProducts: ProductType[]
    setLikedProducts: Dispatch<SetStateAction<ProductType[]>>
    cartProducts: CartItemType[]
    setCartProducts: Dispatch<SetStateAction<CartItemType[]>>
}

export const Context = createContext<ContextType>({} as ContextType)

export type Props = {
    children?: ReactNode
}

const BaseContext = ({ children }: Props) => {
    const [likedProducts, setLikedProducts] = useState<ProductType[]>(JSON.parse(storage.getString("like") || "[]"))
    const [cartProducts, setCartProducts] = useState<CartItemType[]>(JSON.parse(storage.getString("cart") || "[]"))

    return (
        <Context.Provider value={{ likedProducts, cartProducts, setLikedProducts, setCartProducts }}>
            {children}
        </Context.Provider>
    )
}

export default BaseContext
