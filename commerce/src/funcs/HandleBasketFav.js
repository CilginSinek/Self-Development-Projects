
const HandleBasketFav = (id, process, type, userObj, setUserObj) => {
    let newObj = {...userObj}

    if(process === "add"){
        newObj[type] = [...newObj[type], id];
    }else{
        newObj[type] = newObj[type].filter((item)=> item !== id);
    };
    setUserObj(newObj);
};

export default HandleBasketFav