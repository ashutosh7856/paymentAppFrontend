import Header from "./layout/Header";
import { Outlet } from "react-router-dom";

export default function Layout(){
    const lastName = sessionStorage.getItem('lastName');
    
    return <div>
        <Header lastName={lastName ? lastName : 'User'}/>
        <Outlet/>
    </div>
}