import { createContext, useContext, useEffect, useState } from "react";
import { StateContext } from "./stateContext";
import { CartType } from "../types/type";

export const CartContext = createContext<any>({});
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const {user} = useContext(StateContext)
    const [cart,setCart] = useState<CartType[]|null>(null)
    useEffect(() => {
        user && setCart(user[0].cart)
    },[user])
    const addItemCart = () => {}
    const updateCount = () => {}
    const removeItemCart = () => {

    }
    return (
        <CartContext.Provider value={{
            cart,addItemCart,updateCount,removeItemCart
        }}>
            {children}
        </CartContext.Provider>
    )
}