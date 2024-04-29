import { Fragment } from "react"
import { FlatList } from "react-native"
import styled from "@emotion/native"
import { Container } from "@core/components/styles"
import CartHeader from "@cart/components/CartHeader.tsx"
import ConfirmOrder from "@cart/components/ConfirmOrder.tsx"
import CartItem from "@cart/components/CartItem.tsx"
import { NavigationType } from "@core/types.ts"
import useCart from "@core/hooks/cart.ts"
import CartEmpty from "@cart/components/CartEmpty.tsx"

type CartProps = NavigationType

const Cart = ({ navigation }: CartProps) => {
    const { cartProducts } = useCart()
    const isEmpty = cartProducts.length === 0

    return (
        <Fragment>
            <CartHeader />

            <Container>
                {isEmpty ? (
                    <CartEmpty navigation={navigation} />
                ) : (
                    <Fragment>
                        <CartContainer>
                            <ItemsWrapper>
                                <FlatList
                                    data={cartProducts}
                                    keyExtractor={(item) => item.product.id.toString()}
                                    renderItem={({ item }) => <CartItem cartItem={item} navigation={navigation} />}
                                    contentContainerStyle={{ flexGrow: 1, gap: 10, paddingVertical: 10 }}
                                    initialNumToRender={6}
                                />
                            </ItemsWrapper>
                        </CartContainer>

                        <ConfirmOrder cartItems={cartProducts} navigation={navigation} />
                    </Fragment>
                )}
            </Container>
        </Fragment>
    )
}

const CartContainer = styled.View`
    flex: 1;
    padding: 10px 10px 0;
`

const ItemsWrapper = styled.View`
    flex: 1;
    width: 100%;
    padding-top: 3px;
    gap: 10px;
`

export default Cart
