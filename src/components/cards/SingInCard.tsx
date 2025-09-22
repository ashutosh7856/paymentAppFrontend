import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthStore } from "@/store/AuthStore"

export function SignInCard() {

    const [formData, setFormData] = useState({
        userName:'',
        password:''
    })

    const navigate = useNavigate()

    const {setLoggedIn} = AuthStore()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormData(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    const dbUrl = import.meta.env.VITE_API_URL

    if(!dbUrl){
        console.log('cant find url ', dbUrl)
    }

    const handleSubmit = async () =>{
        const response = await fetch(`${dbUrl}/api/v1/user/signin`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })

        if(!response.ok){
            console.log('Failed to log you in', response.status)
        }
        const result = await response.json()
        console.log(result)
        
        // Store user data in sessionStorage
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('firstName', result.firstName || result.user?.firstName || '')
        sessionStorage.setItem('lastName', result.lastName || result.user?.lastName || '')
        
        setLoggedIn(result.token)

        navigate('/')
    }


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
         <Link to={'/signup'}><Button variant="link">Sign Up</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="userName"
                value={formData.userName}
                placeholder="m@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required onChange={handleChange} value={formData.password} name="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
