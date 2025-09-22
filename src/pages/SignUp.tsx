import SignUpCard from "@/components/cards/SignUpCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already logged in, redirect to dashboard
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <SignUpCard/>
    </div>
}