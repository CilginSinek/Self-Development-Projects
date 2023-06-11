import * as yup from "yup"
const isImage = (url) => {
    return yup.string().test('is-image', 'Geçerli bir resim URL giriniz', (value) => {
      if (!value) return true; // İlgili alan boşsa geçerli kabul ediyoruz
      const imgExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const extension = value.substring(value.lastIndexOf('.')).toLowerCase();
      return imgExtensions.includes(extension);
    }).nullable();
};

const validations = yup.object().shape({
    name: yup.string().min(3, "Çok küçük bir ismin var.").max(30, "Çok büyük bir isim var.").required("Zorunlu alan."),
    avatar: isImage().required("Resim girmeniz zorunlu."),
    mail: yup.string().email("Geçerli bir E-mail girin.").required("Zorunlu alan."),
    password: yup.string().min(5, "Parolanız en az 5 karakterli olmalıdır.").required("Zorunlu Alan."),
    passwordConfirm: yup.string().oneOf([yup.ref("Password")], "Parolanız uyuşmuyor.").required("Zorunlu alan."),
    addressCountry: yup.string().min(5,"Geçerli bir ülke girin.").max(30,"Geçerli bir ülke girin"),
    addressCity: yup.string().min(5,"Geçerli bir ülke girin.").max(30,"Geçerli bir ülke girin"),
    addressZipcode: yup.string().required('Zipcode is required').matches(/^\d{5}(-\d{4})?$/, 'Invalid zipcode'),
})

export default validations