import { UserUpdateType } from "types/type"

export const getUser = async (token: string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}

/* Update user info | user address | cart update doesn't mean cart insert or cart remove */
export const updateUser = async (token: string, data: UserUpdateType) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/user`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const cartInsert = async (token: string, idProduct: number, countProduct: number, detail?: string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/cart`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            cart: [
                {
                    idProduct: idProduct,
                    countProduct: countProduct,
                    detail: detail ? detail : ""
                }
            ]
        })
    })
        .then(res => res.json())
}
export const cartRemove = async (listId:number[] | string[]) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/cart`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            listId:listId
        })
    })
    .then(res => res.json())

}
