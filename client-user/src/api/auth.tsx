export const authLogin = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/login`)
    .then(res => res.json())
}
export const authRegister = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/register`)
    .then(res => res.json())
}
export const authForgot = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/forgot`)
    .then(res => res.json())
}
export const authToken = async() => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/token`)
    .then(res => res.json())
}