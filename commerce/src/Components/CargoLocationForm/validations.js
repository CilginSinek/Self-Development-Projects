import * as yup from "yup"

const validations = yup.object().shape({
    country: yup.string().min(5, "Geçerli bir ülke girin.").max(30, "Geçerli bir ülke girin"),
    city: yup.string().min(5, "Geçerli bir ülke girin.").max(30, "Geçerli bir ülke girin"),
    zipcode: yup.number().positive("Posta kodları pozitif olur.").integer().max(40000, "Çok büyük bir posta kodu girdiniz."),
})

export default validations

