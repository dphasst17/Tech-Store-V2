import { useFetchData } from "../hooks/useFetchData";
import { createContext, useContext, useEffect } from "react";
import { StateContext } from "./stateContext";
import { productGetByType } from "../api/product";

export const ApiContext = createContext({});
export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const { setProduct, setType } = useContext(StateContext)
    const { data: dataType } = useFetchData('product', 'productGetAllType')
    useEffect(() => {
        if (dataType) {
            setType(dataType.data);
            const tempProduct: any[] = [];
            Promise.all(dataType.data.map((e: any) => productGetByType(e.nameType)
            .then(res => tempProduct.push({ type: e.nameType, data: res.data }))))
            .then(() => {
                setProduct((prevProduct: any) => (prevProduct !== null ? [...prevProduct, ...tempProduct] : [...tempProduct]));
            });
        }
    }, [dataType])
    return (
        <ApiContext.Provider value={{}}>
            {children}
        </ApiContext.Provider>
    )
}