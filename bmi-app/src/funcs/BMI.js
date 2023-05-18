export function calculusBMI(weight, height, name){
    const result = (weight/(height*height))*10000
    //bmi islemini yapiyor

    //eger isim varsa ismiyle kaydediyor yoksa isimsiz kaydediyor
    if(name.length){
        if(18.5>result){
            return {bmi:"Zayıf", result:result.toFixed(2), weight:weight, height:height, name:name}
        } else if(24.9>result){
            return {bmi:"Normal Kilo", result:result.toFixed(2), weight:weight, height:height, name:name}
        } else if(29.9>result){
            return {bmi:"Fazla Kilolu", result:result.toFixed(2), weight:weight, height:height, name:name}
        } else if (34.9>result){
            return {bmi:"1. Derece Obez", result:result.toFixed(2), weight:weight, height:height, name:name}
        } else if (39.9>result){
            return {bmi:"2. Derece Obez", result:result.toFixed(2), weight:weight, height:height, name:name}
        }   else return {bmi:"Morbid Obez", result:result.toFixed(2), weight:weight, height:height, name:name}        
    } else{
        if(18.5>result){
            return {bmi:"Zayıf", result:result.toFixed(2), weight:weight, height:height}
        } else if(24.9>result){
            return {bmi:"Normal Kilo", result:result.toFixed(2), weight:weight, height:height}
        } else if(29.9>result){
            return {bmi:"Fazla Kilolu", result:result.toFixed(2), weight:weight, height:height}
        } else if (34.9>result){
            return {bmi:"1. Derece Obez", result:result.toFixed(2), weight:weight, height:height}
        } else if (39.9>result){
            return {bmi:"2. Derece Obez", result:result.toFixed(2), weight:weight, height:height}
        }   else return {bmi:"Morbid Obez", result:result.toFixed(2), weight:weight, height:height}            
    }

}