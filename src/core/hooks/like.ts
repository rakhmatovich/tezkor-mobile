import { useContext } from "react"
import { Context } from "@core/components/BaseContext.tsx"
import { storage } from "@core/utils/storage.ts"
import { ProductType } from "@core/types.ts"

const useLike = () => {
    const { likedProducts, setLikedProducts } = useContext(Context)
    const likeProduct = (product: ProductType) => {
        setLikedProducts((prev) => {
            const newData = [...(prev ?? []), product]
            storage.set("like", JSON.stringify(newData))
            return newData
        })
    }

    const disLikeProduct = (productId: number) => {
        setLikedProducts((prev) => {
            const newData = prev?.filter((item) => item.id !== productId)
            storage.set("like", JSON.stringify(newData))
            return newData
        })
    }

    const handleLike = (product: ProductType) => {
        const isLiked = likedProducts.find((item) => item.id === product.id)
        if (!isLiked) {
            likeProduct(product)
            return
        }
        disLikeProduct(product.id)
    }

    const clearLikes = () => {
        setLikedProducts([])
        storage.set("like", "[]")
    }

    return { likedProducts, handleLike, clearLikes }
}

export default useLike
