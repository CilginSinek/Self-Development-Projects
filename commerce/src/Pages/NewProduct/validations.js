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
    image: isImage().required("Resim girmeniz zorunlu."),
    description: yup.string().min(10, "Düzgün bir açıklama girin").max(64,"Çok fazla karakterli açıklama yazmayınız.").required("Zorunlu alan."),
    price: yup.number("Sayı girin.").min(1, "Düzgün bir ücret koyun.").max(1000000000, "Yüz milyonun TL'nin üzerinde sayış yapamazsınız").required("Zorunlu alan")
})

export default validations