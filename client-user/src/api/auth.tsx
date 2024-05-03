export const authLogin = async(data:{username?:string,password?:string,email?:string}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/login`,{
        method:"",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const authRegister = async(data:{username?:string,password?:string,email?:string}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/register`,{
        method:"",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const authForgot = async(data:{username?:string,email?:string}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/forgot`,{
        method:"",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const authToken = async(token:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/token`,{
        method:"",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
    })
    .then(res => res.json())
}
export const authUpdatePassword = async(current:string,password:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/token`,{
        method:"",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({current:current,password:password})
    })
    .then(res => res.json())
}
