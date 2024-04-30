import { createContext, useState } from "react";

export const StateContext = createContext<any>({});
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [product,setProduct] = useState<any[] | null>(null)
    const [type,setType] = useState<any[] | null>(null)
    return (
        <StateContext.Provider value={{
            product,setProduct,
            type,setType
        }}>
            {children}
        </StateContext.Provider>
    )
}