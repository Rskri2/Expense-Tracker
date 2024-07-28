import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import UserPage from "./components/userPage/UserPage";
import Register from './components/Register/Register';
import Login  from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
 function App() {
   const isLoggedIn = window.localStorage.getItem('authenticated');
return (
 <BrowserRouter>
   <Routes>
      <Route  path='/'element={<HomePage/>}></Route>
      {
         !isLoggedIn && (
            <>
            <Route  path='/login'element={<Login/>}></Route>
            <Route  path='/register'element={<Register/>}></Route>
            </>

         )
      }
      <Route element={<ProtectedRoute/>}>
      <Route  path='/my-account'element={<UserPage/>}></Route> 
      </Route>
      <Route path='*'  element={<HomePage/>}></Route>
   </Routes>
</BrowserRouter>
 );
 }


 export default App;
