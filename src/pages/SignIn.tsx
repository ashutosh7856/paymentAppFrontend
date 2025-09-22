import { SignInCard } from "@/components/cards/SingInCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn(){
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already logged in, redirect to dashboard
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <SignInCard/>
    </div>
}