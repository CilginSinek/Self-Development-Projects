export const decode = (token) =>{
    if(token === null) return null;
    return JSON.parse(atob(token))
}

export const encode = (MyUserData) => {
    return btoa(JSON.stringify(MyUserData))
}