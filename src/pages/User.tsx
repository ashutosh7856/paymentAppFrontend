import {UserCircle2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function User() {

    const [SearchParams] = useSearchParams()
    const  userId = SearchParams.get('id')
    const name = SearchParams.get('name')
    const navigate = useNavigate()
    const {state} = useLocation()
    const userName = state?.email || userId

  return (
    <div className="w-full bg-gray-50 mt-16 py-8 h-screen">
      <div className="w-full max-w-2xl mx-auto ">
        <div className="flex flex-col items-center gap-6">
          <div>
            <UserCircle2 className="w-28 h-28 text-slate-200" />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{userName}</p>
          </div>

          <div className="flex w-full max-w-md gap-4">
            <button
            onClick={()=>navigate('/send?to='+name+"&id="+userId)}
             className="flex-1 rounded-lg bg-primary py-3 px-6 text-base font-bold text-white shadow-sm transition-transform hover:scale-105">
              Send Money
            </button>
            <button className="flex-1 rounded-lg bg-gray-200 dark:bg-primary/20 py-3 px-6 text-base font-bold text-gray-800 dark:text-white shadow-sm transition-transform hover:scale-105">
              Chat
            </button>
          </div>
        </div>
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              About
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              This is generic about section I will add the edit option soon 
              until then enjoy your chats and other things.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
