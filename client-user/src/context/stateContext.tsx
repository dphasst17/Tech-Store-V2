import { createContext, useState } from "react";

export const StateContext = createContext<any>({});
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [product,setProduct] = useState<any[] | null>(null)
    const [type,setType] = useState<any[] | null>(null)
    const [newProduct,setNewProduct] = useState<any[] | null>(null)
    const [post,setPost] = useState<any[] | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    return (
        <StateContext.Provider value={{
            product,setProduct,
            type,setType,
            newProduct,setNewProduct,
            post,setPost,
            isLoading,setIsLoading
        }}>
            {children}
        </StateContext.Provider>
    )
}