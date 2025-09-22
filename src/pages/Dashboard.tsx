import Hero from "@/components/layout/Hero";
import Users from "@/components/layout/Users";
import { useEffect, useState } from "react";


interface userType{
    firstName:string,
    lastName:string,
    userName:string,
    _id:string

}


export default function Dashboard(){

    const [users, setUsers] = useState<userType[]>([])
    const [search, setSearch] = useState<string>("");
    const token = sessionStorage.getItem('token')


    const dbUrl = import.meta.env.VITE_API_URL

    useEffect(()=>{
        async function fetchUsers(){
            const response = await fetch(`${dbUrl}/api/v1/user/bulk`, {
                headers: token ? { authorization: `Bearer ${token}`} : {}
                })
            if(!response.ok){
                console.log(response.status)
            }

            const result = await response.json()
            console.log(result)
            setUsers(result.user)
        }
        fetchUsers()
    }, [dbUrl, token])


    const filtredUsers = users.filter(u => u.firstName.toLowerCase().includes(search) || u.lastName.toLowerCase().includes(search))


    return <div className="flex justify-center h-screen bg-gray-100 gap-6">
        <div className="w-full max-w-7xl">
            <Hero setSearch={setSearch} search={search} />
            <Users users={filtredUsers}/>
        </div>

    </div>
}