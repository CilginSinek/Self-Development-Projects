const HandleBasketFav = (id, process, type, userObj, setUserObj) => {
    let newObj = {...userObj}
    //objeyi degistirmek icin elime aliyorum (obje usestate ile olustugundan degistirmesi zor)

    if(process === "add"){
        //eger islem eklemek ise isin tipine gore veri ekliyor(type ya basket olacak ya da fav)
        newObj[type] = [...newObj[type], id];
    }else{
        //burda da veri siliyor
        newObj[type] = newObj[type].filter((item)=> item !== id);
    };
    //objeyi guncellestiriyor
    setUserObj(newObj);
    //component olmadigindan usecontext kullanilmaz.
};

export default HandleBasketFav