import { useContext } from "react"
import { Context } from "@core/components/BaseContext.tsx"
import { storage } from "@core/utils/storage.ts"
import { ProductOption, ProductType } from "@core/types.ts"

const useCart = () => {
    const { cartProducts, setCartProducts } = useContext(Context)

    const changeItemCount = (product: ProductType, count = 1) => {
        setCartProducts((prev) => {
            const newData = prev.map((item) => {
                if (item.product.id === product.id) item.count += count
                return item
            })
            storage.set("cart", JSON.stringify(newData))
            return newData
        })
    }

    const addToCart = (product: ProductType, option: ProductOption | null = null) => {
        const inCart = cartProducts.find((item) => item.product.id === product.id)

        if (!inCart) {
            setCartProducts((prev) => {
                const newData = [...(prev ?? []), { product, count: 1, option }]
                storage.set("cart", JSON.stringify(newData))
                return newData
            })
            return
        }

        changeItemCount(product)
    }

    const removeCartItem = (productId: number) => {
        setCartProducts((prev) => {
            const newData = prev?.filter((item) => item.product.id !== productId)
            storage.set("cart", JSON.stringify(newData))
            return newData
        })
    }

    const decreaseCartItemCount = (product: ProductType) => {
        const count = cartProducts.find((item) => item.product.id === product.id)?.count
        if (count === 1) return removeCartItem(product.id)
        changeItemCount(product, -1)
    }

    const clearCart = () => {
        setCartProducts([])
        storage.set("cart", "[]")
    }

    return { cartProducts, addToCart, removeCartItem, decreaseCartItemCount, clearCart }
}

export default useCart
