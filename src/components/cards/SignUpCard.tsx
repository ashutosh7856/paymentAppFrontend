import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Heading from "../Heading"
import { Label } from '../ui/label'
import SubHeading from "../SubHeading"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthStore } from '@/store/AuthStore'




export default function SignUpCard(){
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        userName:'',
        password:'',
    })

    const {setLoggedIn} = AuthStore()
    const navigate = useNavigate()
    // const [show, setShow] = useState(false)

    // const showPassword = () =>{
    //     setShow(!show)
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const dbUrl = import.meta.env.VITE_API_URL

    if(!dbUrl){
        console.log('env not set or found')
    }

    const hadnleSubmit = async () =>{

        const response = await fetch(`${dbUrl}/api/v1/user/signup`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            console.log(response.status, "Failed to create User");
        }

        const result = await response.json()
        console.log(result.message)
        
        // Store user data in sessionStorage
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('firstName', result.firstName || formData.firstName)
        sessionStorage.setItem('lastName', result.lastName || formData.lastName)
        
        setLoggedIn(result.token)
        navigate('/')
    }


    return <Card className='w-full max-w-sm'>
        <CardHeader>
            <Heading label='Sign Up'/>
            
            <CardDescription>
            <SubHeading label='Create new account to start making payments'/>
            </CardDescription>

            <CardAction>
            <Link to={'/signin'}><Button variant="link">Sign In</Button></Link>
            </CardAction>
        </CardHeader>

        <CardContent>
            <form onSubmit={hadnleSubmit}>
            <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Ashutosh"
                required
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            </div>

            <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                    <Label htmlFor='lastname'>Last Name</Label>
                    <Input
                    id='lastName'
                    type='text'
                    name="lastName"
                    placeholder='Kumar'
                    value={formData.lastName}
                    onChange={handleChange}
                    />

                </div>
            </div>

            <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                    <Label htmlFor='userName'>UserName</Label>
                    <Input
                    id='userName'
                    type='email'
                    placeholder='your@email.com'
                    name='userName'
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    />
                </div>
            </div>

            <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                    id='password'
                    type='password'
                    value={formData.password}
                    placeholder='qweewr34@#@'
                    onChange={handleChange}
                    name='password'
                    required
                    />
                </div>
            </div>
            </form>
        </CardContent>

        <CardFooter>
            <Button variant={"default"} type='submit' className='w-full' onClick={hadnleSubmit}>
                Sign Up
            </Button>
        </CardFooter>

    </Card>
}