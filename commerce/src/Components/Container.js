import React from 'react'
import Catolog from "../Pages/Catolog";
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from '../Pages/Auth/Register/Register';
import Login from '../Pages/Auth/Login/Login';
import Basket from '../Pages/Basket';
import Profile from '../Pages/Profile';
import ProductDetils from "../Pages/ProductDetails"
import noPage from '../Pages/noPage';
import EditUser from '../Pages/EditUser/EditUser';
import Users from '../Pages/Users';
import User from '../Pages/User';

function Container() {

    return (
        <>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path='/' exect Component={Catolog} />
                        <Route path='/Register' Component={Register} />
                        <Route path='/Login' Component={Login} />
                        <Route path="/Basket" Component={Basket}/>
                        <Route path="/profile" Component={Profile} />
                        <Route path='/profile/edit' Component={EditUser} />
                        <Route path='/urun/:urun_id' Component={ProductDetils} />
                        <Route path='/users' Component={Users} />
                        <Route path='/users/:user_id' Component={User} />
                        <Route path='*' Component={noPage} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default Container