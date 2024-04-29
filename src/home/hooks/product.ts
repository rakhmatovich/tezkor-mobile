import { useFetchList, useFetchOne } from "@core/hooks/request.ts"
import { PRODUCT_DETAIL, PRODUCT_LIST } from "@home/urls.ts"
import { request } from "@core/utils/baseAxios.ts"
import { ProductDetailType, ProductType } from "@core/types.ts"

export function useProductList() {
    return useFetchList<ProductType>(["products"], () => request({ url: PRODUCT_LIST }))
}

export function useProductDetail(productId: number) {
    const url = PRODUCT_DETAIL.replace("{id}", productId.toString())
    return useFetchOne<ProductDetailType>(["product", productId], () => request({ url }))
}

export function useProductSearchList(search: string) {
    return useFetchList<ProductType>(["products", search], () => request({ url: PRODUCT_LIST, params: { search } }))
}
