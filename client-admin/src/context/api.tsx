import { createContext, useContext, useEffect } from "react";
import { statisticalProduct, statisticalRevenue, statisticalUser } from "../api/statistical";
import { StateContext } from "./state";
import { useFetchData } from "../hooks/useFetchData";
import { productStore } from "../store/product";
import { GetToken } from "../utils/token";
import { getAddress, getInfo, getStaff, getUser } from "../api/user";
import { userStore } from "../store/user";

export const ApiContext = createContext<any>({});
export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const {setStatistical} = useContext(StateContext)
    const {setCategory,setProduct} = productStore()
    const {setUser,setStaff,setCurrentUser,setAddress} = userStore()
   useEffect(() => {
    const fetchStatistical = async() => {
        const [productData,userData,revenueData] = await Promise.all([
            statisticalProduct(),
            statisticalUser(),
            statisticalRevenue()
        ])
        if (productData.status === 200 && userData.status === 200 && revenueData.status === 200) {
            setStatistical({
                product: productData.data,
                user: userData.data,
                revenue: revenueData.data
            });
        }
    }
    fetchStatistical()
   },[])
   const {data:dataProduct} = useFetchData('product','productGetAll')
   const {data:categoryData} = useFetchData('product','getAllCategoryProduct')
   useEffect(() => {
    dataProduct && setProduct(dataProduct.data)
    categoryData && setCategory(categoryData.data)
   },[dataProduct,categoryData])
   
   useEffect(() => {
    const fetchData = async() => {
        const token = await GetToken()
        token && (
            getInfo(token).then(res => {
                if(res.status === 200){
                    setCurrentUser(res.data)
                }
            }),
            getStaff(token).then(res => {
                if(res.status === 200){
                    setStaff(res.data)
                }
            }),
            getUser().then(res => {
                if(res.status === 200){
                    setUser(res.data)
                }
            }),
            getAddress()
            .then(res => {
                if(res.status === 200){
                    setAddress(res.data)
                }
            })
        )
        
    }
    fetchData()
   },[setCurrentUser,setStaff,setUser,setAddress])
    return (
        <ApiContext.Provider value={{
        }}>
            {children}
        </ApiContext.Provider>
    )
}