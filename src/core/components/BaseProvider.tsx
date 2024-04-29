import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { SafeAreaProvider } from "react-native-safe-area-context"
import BaseContext from "@core/components/BaseContext.tsx"
import ToastProvider from "@core/components/ToastProvider.tsx"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 30000,
        },
    },
})

type BaseProvider = {
    children: ReactNode
}

const BaseProvider = ({ children }: BaseProvider) => {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <BaseContext>
                    <QueryClientProvider client={queryClient}>
                        {children}
                        <ToastProvider />
                    </QueryClientProvider>
                </BaseContext>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}

export default BaseProvider
