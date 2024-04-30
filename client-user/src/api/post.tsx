export const postGetAll = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/post`)
    .then(res => res.json())
}
export const postGetDetail = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/post`)
    .then(res => res.json())
}
export const postGetCategory = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/post`)
    .then(res => res.json())
}