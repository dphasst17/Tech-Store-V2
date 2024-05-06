import { createContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";
import { UserType } from "../types/type";

export const StateContext = createContext<any>({});
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [user,setUser] = useState<UserType | null>(null)
    const [isLogin,setIsLogin] = useState<boolean>(getLocalStorage('isLogs',false))
    const [product,setProduct] = useState<any[] | null>(null)
    const [type,setType] = useState<any[] | null>(null)
    const [newProduct,setNewProduct] = useState<any[] | null>(null)
    const [post,setPost] = useState<any[] | null>(null)
    const [listCheckOut,setListCheckOut] = useState<number[] | []>([])
    const [isLoading,setIsLoading] = useState<boolean>(false)
    return (
        <StateContext.Provider value={{
            user,setUser,
            product,setProduct,
            type,setType,
            newProduct,setNewProduct,
            post,setPost,
            isLoading,setIsLoading,
            isLogin,setIsLogin,
            listCheckOut,setListCheckOut
        }}>
            {children}
        </StateContext.Provider>
    )
}