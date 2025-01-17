import { createContext, useContext, useReducer } from "react";
import {cartReducer} from "../reducers/cartReducer";

const initialState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(initialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        const updatedCartList = state.cartList.concat(product);
        updateTotal(updatedCartList);
        dispatch({ type: "ADD_TO_CART", payload: {
            products: updatedCartList,
        } });
    };

    const removeFromCart = (product) => {
        const updatedCartList = state.cartList.filter((p) => p.id !== product.id);
        updateTotal(updatedCartList);
        dispatch(
            { type: "REMOVE_FROM_CART", payload: {
                products: updatedCartList,
            }}
        )
    }

    const updateTotal = (products) => {
        let total = 0;
        products.forEach((product) => {
            total += product.price;
        });
        dispatch({ type: "UPDATE_TOTAL", payload: {
            total
        } });
    }

    const value = {
        total: state.total,
        cartList: state.cartList,
        addToCart,
        removeFromCart,
        updateTotal

    };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}

