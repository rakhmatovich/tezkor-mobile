import { useFetchList } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { CategoryType } from "@category/types.ts"
import { CATEGORY_LIST } from "@category/urls.ts"
import { ProductType } from "@core/types.ts"
import { PRODUCT_LIST } from "@home/urls.ts"

export function useCategoryList() {
    return useFetchList<CategoryType>(["categories"], () => request({ url: CATEGORY_LIST }))
}

export function useCategoryDetail(categoryId: number | undefined) {
    return useFetchList<ProductType>(
        ["categories", categoryId],
        () => request({ url: PRODUCT_LIST, params: { category: categoryId } }),
        { enabled: Boolean(categoryId) }
    )
}
