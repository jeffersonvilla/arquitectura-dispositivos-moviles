export const addToCartMutation = `
    mutation AddToCart($productId: ID!, $quantity: Int!) {
        addToCart(productId: $productId, quantity: $quantity) {
            product{
                _id,
                name
                },
            quantity
        }
    }
    `;

export const getCartQuery = `
    query GetCart {
        cart {
            items {
            product {
                _id,
                name,
                price
            }
            quantity
            },
            totalPrice,
            totalQuantity
        }
    }
    `;

export const updateCartMutation = `
    mutation UpdateCart($productId: ID!, $quantity: Int!) {
        updateCartItemQuantity(productId: $productId, quantity: $quantity) {
            product{_id, name},
            quantity
        }
    }
    `;

export const deleteFromCartMutation = `
    mutation DeleteCartItem($productId: ID!) {
        removeFromCart(productId: $productId) {
            product{
                _id,
                name
            },
            quantity
        }
    }
    `;

export const clearCartMutation = `
    mutation ClearCart {
    clearCart{
        totalQuantity
        }
    }
    `;  
