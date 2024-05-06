export const authLogin = async(data:{username?:string,password?:string,email?:string}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/login`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const authRegister = async(data:{username:string,password:string,email:string}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/register`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const authForgot = async(data:{username:string,email:string}) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/forgot`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
}
export const authToken = async(token:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/token`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
    })
}
export const authUpdatePassword = async(current:string,password:string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/token`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({current:current,password:password})
    })
    .then(res => res.json())
}
