import * as yup from "yup"

const validations = yup.object().shape({
    email: yup.string().email("Geçerli bir E-mail girin").required("Zorunlu alan"),
    password: yup.string().min(5, "Parolanız en az 5 karakterli olmalıdır").required("Zorunlu Alan"),
})

export default validations