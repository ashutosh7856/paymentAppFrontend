import {create} from 'zustand'


interface storeType{
    login: (payload: signup) => Promise<void>,
    signup:(payload: signup) => Promise<void>,
    isAuthenticated:boolean,
    token:string | null,
    setLoggedIn: (token:string) => void,
}

interface  signup{
    userName:string,
    firstName?:string,
    lastName?:string,
    password:string
}

const dbUrl = import.meta.env.VITE_API_URL

export const AuthStore = create<storeType>((set)=>({
    isAuthenticated:false,
    token:null,
    signup: async (payload:signup) => {
        const response = await fetch(`${dbUrl}/api/v1/signup`, {
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        })

        if(!response.ok){
            console.log('Failed to created user api call failed.' )
        }

        const result = await response.json()
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('firstName', result.firstName)
        sessionStorage.setItem('lastName', result.lastName)
        set({isAuthenticated:true, token:result.token})

        return result
    },

    login: async (payload:signup) =>{
        const response = await fetch(`${dbUrl}/api/v1/signin`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        })

        if(!response.ok){
            console.error('failed to login due to request failed.')
        }

        const result = await response.json()
        set({isAuthenticated:true, token:result.token})
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('firstName', result.firstName)
        sessionStorage.setItem('lastName', result.lastName)

        return result
    },

    setLoggedIn: (token:string) => {
        set({isAuthenticated:true, token:token})
        sessionStorage.setItem('token', token)
    }

}))