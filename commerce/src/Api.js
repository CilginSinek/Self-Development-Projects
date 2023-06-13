import axios from "axios"

//butun kullanicileri getir
export const getUsers = async () => {
    const response = await axios.get('https://6467941260c8cb9a2c978e3b.mockapi.io/users')
    return response
};

//secilen kullaniciyi getir
export const getSelectedUser = async (id) => {
    const allusers = await getUsers();
    const usersArray = allusers.data;
    const thisUser = usersArray.filter((user) => user.id === id);
    return thisUser
};

// giris yapan kullaniciyi getir
export const getUser = async (email, password) => {
    const allUsers = await getUsers();
    const mailExist = allUsers.data.filter((user) => user.mail === email)
    const userData = allUsers.data.filter((user) => user.mail === email && user.password === password)
    if (!userData.length) {
        if (!mailExist.length) {
            return { status: "error", obj: userData, message: "This email is not used" }
        } else {
            return { status: "error", obj: userData, message: "Your password is wrong" }
        }
    }
    else {
        return { status: "success", obj: userData, message: "Login has been success" }
    }
};

//kayit olan kullaniciyi postla
export const pushUser = async (email, password, name) => {

    const allUsers = await getUsers();
    const thisEmail = allUsers.data.filter((user) => user.mail === email)
    if (!thisEmail.length) {
        await axios.post("https://6467941260c8cb9a2c978e3b.mockapi.io/users", {
            mail: email,
            password: password,
            avatar: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
            name: name,
            userDec: "",
            addressCountry: "",
            addressCity: "",
            addressZipcode: ""
        })
        return { status: "succsess", message: "register is success" }
    } else {
        return { status: "error", message: "this Email already taken" }
    }

};

//kayitli kullaniciyi guncelle
export const editUser = async (id, obj) => {
    await axios.put(`https://6467941260c8cb9a2c978e3b.mockapi.io/users/${id}`, obj)
};

//butun kiyafetleri getir
export const getAllClothes = async () => {
    try {
        const response = await axios.get('https://6467941260c8cb9a2c978e3b.mockapi.io/users');
        const data = response.data;

        const allClothes = data.reduce((acc, user) => {
            const clothes = user.clothes || [];
            return [...acc, ...clothes];
        }, []);

        return allClothes;
    } catch (error) {
        console.log('Hata:', error);
        throw error;
    }
};

//yeni kiyafet postla
export const pushClothes = async (userId, img, name, dec, price) => {
    const allclothes = await getAllClothes()
    const obj = {name:name, img:img, dec:dec, price:price}
    const isExist = allclothes.filter((item) => item.name === name)
    if (!isExist.length) {
        await axios.post(`https://6467941260c8cb9a2c978e3b.mockapi.io/users/${userId}/clothes`, obj)
        return { status: "success", obj: obj, message: "Your product add list" }
    } else {
        return { status: "error", obj: obj, message: "Your product already exist" }
    }
};

//secilen kiyafeti getir
export const getClothes = async (urun_id) => {
    const getAllProduct = await getAllClothes();
    const getAllUsers = await getUsers();
    const allUsers = getAllUsers.data;
    const selectedClothes = getAllProduct.filter((item) => item.id === urun_id);
    const clothesAuther = allUsers.filter((item) => item.id === selectedClothes[0].userId);
    return { ...selectedClothes[0], autherName: clothesAuther[0].name }
};

//secilen kiyafeti sil
export const deleteClothes = async (userId, id) => {
    await axios.delete(`https://6467941260c8cb9a2c978e3b.mockapi.io/users/${userId}/clothes/${id}`)
};

//secilen kisinin ban degerini degistir
export const setBanUser = async (userId, isBan) => {
    const allusers = await getUsers()
    const alluserData = allusers.data;
    let selectedUser = alluserData[userId - 1];

    selectedUser.isBan = !isBan;
    selectedUser.clothes = selectedUser.clothes.map(item => ({ ...item, isBan: isBan }));
    await editUser(userId, selectedUser);
};

//secilen kisinin adminligini degistir
export const setMod = async (userId, isMod) => {
    const allusers = await getUsers();
    const alluserData = allusers.data;
    let selectedUser = alluserData[userId - 1];

    selectedUser.isAdmin = !isMod;
    await editUser(userId, selectedUser);

};