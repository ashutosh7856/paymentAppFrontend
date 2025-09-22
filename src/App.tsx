import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Send from "./pages/Send";
import Layout from "./components/Layout";
import User from "./pages/User";
import ProtectedRoute from "./components/ProtectedRoute";

function App (){
  return <div>
  <BrowserRouter>
  <Routes>
    <Route element={<Layout/>}>
        <Route index element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/send" element={
          <ProtectedRoute>
            <Send/>
          </ProtectedRoute>
        }/>
        <Route path="/user" element={
          <ProtectedRoute>
            <User/>
          </ProtectedRoute>
        }/>
    </Route>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/signup" element={<SignUp/>}/>
  </Routes>
  </BrowserRouter>

  </div>
}

export default App;