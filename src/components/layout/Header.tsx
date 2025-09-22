import {User} from 'lucide-react'
export default function Header({lastName}:{lastName:string}){
    
    return <header className="fixed top-0 inset-0 z-50 w-full bg-white h-16 flex justify-center items-center">
        <div className="w-full max-w-7xl flex items-center justify-between p-3">
            <a href='/'><h1 className='text-2xl font-bold text-gray-900'>Payments</h1></a>

            <div className='flex gap-2'>
                <p>Hello, {lastName}</p>
                <User className='w-5 h-5'/>
            </div>

        </div>
    </header>
}