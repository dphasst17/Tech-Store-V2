export const getAll = async () => {
    return await fetch(`${import.meta.env.VITE_REACT_APP_URL}/posts`)
    .then(res => res.json())
}
export const getCategory = async () => {
    return await fetch(`${import.meta.env.VITE_REACT_APP_URL}/posts/category`)
    .then(res => res.json())
}
export const postInsert = async (token:string,data:FormData) => {
    return await fetch(`${import.meta.env.VITE_REACT_APP_URL}/posts`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
}