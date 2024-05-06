import { useFetchData } from "../hooks/useFetchData";
import { createContext, useContext, useEffect } from "react";
import { StateContext } from "./stateContext";
import { productGetByType } from "../api/product";
import { GetToken } from "../utils/token";
import { getUser } from "../api/user";

export const ApiContext = createContext({});
export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const { setIsLoading,setUser,isLogin,setPost,setNewProduct,setProduct, setType } = useContext(StateContext)
    const { data: dataType } = useFetchData('product', 'productGetAllType')
    const { data:newProduct } = useFetchData('product','productGetNew')
    const { data:postAll } = useFetchData('posts','postGetAll')
    useEffect(() => {
        if (dataType) {
            setType(dataType.data);
            const tempProduct: any[] = [];
            Promise.all(dataType.data.map((e: any) => productGetByType(e.nameType)
            .then(res => tempProduct.push({idType:e.idType,type: e.nameType, data: res.data }))))
            .then(() => {
                setProduct((prevProduct: any) => (prevProduct !== null ? [...prevProduct, ...tempProduct] : [...tempProduct]));
            });
        }
    }, [dataType])
    useEffect(() => {
        newProduct && setNewProduct(newProduct.data)
        postAll && setPost(postAll.data)
    },[newProduct,postAll])
    useEffect(() => {
        const fetchUser = async() => {
            const token = await GetToken()
            setIsLoading(true)
            token && getUser(token)
            .then(res => {
                setIsLoading(false)
                res.status === 200 && setUser(res.data)
            })
        }
        if(isLogin){
            fetchUser()
        }
    },[isLogin])
    return (
        <ApiContext.Provider value={{}}>
            {children}
        </ApiContext.Provider>
    )
}