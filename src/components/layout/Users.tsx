import { User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Users({users}:any){

    const navigate = useNavigate()

    return (
        <div className=" w-full max-w-2xl mx-auto mt-8">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Humans</h3>
            <div className="space-y-2">
                {users.slice(0, 5).map((u:any) => (
                    <div
                        onClick={() => navigate("/user?id=" + u._id + "&name=" + u.firstName + u.lastName, {state:{email:u.userName}})}
                        key={u._id}
                        className="flex items-center gap-4 p-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                        <User2 className="rounded-full h-10 w-10"/>
                        <div className="flex-1">
                            <p className="font-medium text-slate-800 dark:text-slate-100">{u.firstName + u.lastName}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{u.userName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}