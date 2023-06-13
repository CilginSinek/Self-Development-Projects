import { createContext, useContext, useEffect, useState } from "react";
import { encode, decode } from "../funcs/base64";
import { editUser } from "../Api";


const UserDataContext = createContext();


export const UserDataProvider = ({ children }) => {
    //userObj elementi ile user data tutuyorum ve bunu base64 olarak sessinstoragede tutuyorum.
    const [userObj, setUserObj] = useState(decode(sessionStorage.getItem("userHash")) || null);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        // userObj degistiginde eger yoksa bir sey yapma varsa userhash sil ve yenisini yukle
        if (userObj === null) return;
        sessionStorage.removeItem("userHash")
        const newUserObjHash = encode(userObj);
        sessionStorage.setItem("userHash", newUserObjHash);
        editUser(userObj.id, userObj);
        setIsLogin(true);
    }, [userObj])
    const doLogin =(data)=>{
        //login olundugunda logini true yap ve userobj getir
        setIsLogin(true);
        setUserObj(data[0]);
    };
    const doLogout = ()=>{
        //logout yapildiginde login false yap ve userobj temizle ve userhash temizle.
        setIsLogin(false);
        setUserObj(null);
        sessionStorage.removeItem("userHash");
    };

    //verileri listele
    const values = {
        userObj,
        setUserObj,
        isLogin,
        doLogin,
        doLogout
    };
    //verileri gonder
    return <UserDataContext.Provider value={values}>{children}</UserDataContext.Provider>
}
export const useUserData = () => useContext(UserDataContext);