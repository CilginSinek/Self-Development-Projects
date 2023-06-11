import { createContext, useContext, useEffect, useState } from "react"
import { encode, decode } from "../funcs/base64";
import { editUser } from "../Api";


const UserDataContext = createContext();


export const UserDataProvider = ({ children }) => {
    const [userObj, setUserObj] = useState(decode(sessionStorage.getItem("userHash")) || null);
    const [isLogin, setIsLogin] = useState(false)

    useEffect(()=>{
        if (userObj === null) return;
        sessionStorage.removeItem("userHash")
        const newUserObjHash = encode(userObj);
        sessionStorage.setItem("userHash", newUserObjHash)
        editUser(userObj.id, userObj)
        setIsLogin(true)
    }, [userObj])
    const doLogin =(data)=>{
        setIsLogin(true);
        setUserObj(data[0]);
    }
    const doLogout = ()=>{
        setIsLogin(false);
        setUserObj(null)
        sessionStorage.removeItem("userHash");
    }

    const values = {
        userObj,
        setUserObj,
        isLogin,
        doLogin,
        doLogout
    };
    return <UserDataContext.Provider value={values}>{children}</UserDataContext.Provider>
}
export const useUserData = () => useContext(UserDataContext);