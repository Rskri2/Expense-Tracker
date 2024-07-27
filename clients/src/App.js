import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import UserPage from "./components/userPage/UserPage";
import Register from './components/Register/Register';
import Login  from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
 function App() {
return (
 <BrowserRouter>
   <Routes>
      <Route exact path='/'element={<HomePage/>}></Route>
      <Route exact path='/login'element={<Login/>}></Route>
      <Route exact path='/register'element={<Register/>}></Route>
      <Route exact path='/my-account'element={<ProtectedRoute><UserPage/></ProtectedRoute>}></Route> 
      <Route path='*'  element={<HomePage/>}></Route>
   </Routes>
</BrowserRouter>
 );
 }


 export default App;
