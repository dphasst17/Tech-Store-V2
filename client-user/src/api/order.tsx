export const orderInsert = async(token:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/order`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
}
export const getOrderByUser = async(token:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/order/user`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    .then(res => res.json())
}