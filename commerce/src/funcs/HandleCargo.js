const HandleCargo =(arr,obj, setObj)=>{
    let newObj = obj;
    let newArr =obj.cargoLocations;
    const changeArr =newArr.filter((item)=> item !== arr);
    newObj.cargoLocations = changeArr;
    setObj(newObj);
    //yeni obj acip objenin cargolocationunu duzenleyip setUserObj ile yeniliyorum
}
export default HandleCargo