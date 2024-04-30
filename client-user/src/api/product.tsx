export const productGetAllType = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product/types`)
    .then(res => res.json()) 
}
export const productGetAll = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product`)
    .then(res => res.json())
}
export const productGetByType = async(type:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product/type/${type}`)
    .then(res => res.json())
}
export const productGetDetail = async(type:string,idProduct:number) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product/detail/${type}/${idProduct}`)
    .then(res => res.json())
}
export const productGetNew = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product`)
    .then(res => res.json())
}
export const productGetByKey = async(key:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product/search/${key}`)
    .then(res => res.json())
}
export const getSaleDetail = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/api/product`)
    .then(res => res.json())
}