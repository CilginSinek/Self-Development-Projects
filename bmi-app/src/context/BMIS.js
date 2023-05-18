import { createContext, useContext, useEffect, useState } from "react"

const BMIContext = createContext();

export const BMISProvider = ({ children })=>{
    const [BMISArray, setBMIS] = useState(JSON.parse(localStorage.getItem("BMIS")) || []);
    //eski veri var mi kontrol yoksa yeni array olustur
    
    useEffect(()=>{
        localStorage.setItem("BMIS",JSON.stringify(BMISArray));
        console.log(BMISArray)
    }, [BMISArray]);
    //eski veri guncellendiginde localstorage e kaydet

    const values = {
        BMISArray,
        setBMIS
    };
    return <BMIContext.Provider value={values}>{children}</BMIContext.Provider>
    // secilen verileri providerin icine ekle
}
export const useBMIS = () => useContext(BMIContext);
//otomatik usecontext