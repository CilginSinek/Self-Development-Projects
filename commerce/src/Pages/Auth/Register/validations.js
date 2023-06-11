import * as yup from "yup"

const validations = yup.object().shape({
    name: yup.string().min(3, "Çok küçük bir ismin var").max(30, "Çok büyük bir isim var").required("Zorunlu alan"),
    Email: yup.string().email("Geçerli bir E-mail girin").required("Zorunlu alan"),
    Password: yup.string().min(5, "Parolanız en az 5 karakterli olmalıdır").required("Zorunlu Alan"),
    PasswordConfirm: yup.string().oneOf([yup.ref("Password")], "Parolanız uyuşmuyor").required("Zorunlu alan")
})

export default validations