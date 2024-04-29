import { ModelType } from "@core/types.ts"

export type CategoryType = ModelType & {
    name: string
    description: string
    icon: string
}
