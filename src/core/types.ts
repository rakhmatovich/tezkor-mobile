import { StackNavigationProp } from "@react-navigation/stack"
import { CategoryType } from "@category/types.ts"
import { Theme } from "@emotion/react"
import { LocationType } from "@user/types.ts"

export type RootTabParamListType = {
    Home: undefined
    Categories: undefined
    Cart: undefined
    Menu: undefined
}

export type RootStackParamListType = {
    TabNavigation: undefined
    ProductDetail: { productId: number }
    Search: undefined
    Favorites: undefined
    SignIn: undefined
    ConfirmCode: { phone: string; message: string }
    Profile: undefined
    Settings: undefined
    UserLocation: { location: LocationType } | undefined
    CategoryDetail: { category: CategoryType }
} & RootTabParamListType

export type StackNavigationType = StackNavigationProp<RootStackParamListType>

export type NavigationType = {
    navigation: StackNavigationType
}

export type StylesPropsType = {
    theme: Theme
}

export type Pagination<T> = {
    count: number
    results: T[]
}

export type ModelType = {
    id: number
}

export type ProductImage = ModelType & {
    image: string
}

export type ProductOption = ModelType & {
    title: string
}

export type ProductReview = ModelType & {
    title: string
}

export type ProductDetailType = ModelType & {
    name: string
    oldPrice: number | null
    price: number
    thumbnail: string
    description: string
    unit: string
    categoryId: number
    images: ProductImage[]
    reviews: ProductReview[]
    options: ProductOption[]
}

export type ProductType = Pick<ProductDetailType, "id" | "name" | "oldPrice" | "price" | "thumbnail"> & {
    hasOption: boolean
}

export type CartItemType = {
    product: ProductType
    count: number
}
