import { useEffect, useState } from 'react'

function Result({ newBMI }) {
  const [thisBMI, setThisBMI] = useState({});
  //bir onceki degiskeni almak icin degisken olusturuyorum

  useEffect(() => {
    setThisBMI(newBMI);
  }, [newBMI])
  //onceki degisken degisince bu degisken de degisiyor

  //degiskenin ici bos mu dolu mu sorgusu
  if (!(Object.keys(thisBMI).length === 0)) {
    //beden tipine gore sonuc veriyor
    
    switch (thisBMI.bmi) {
      case "Zayıf":
        return (
          <div className='result-info'>
            <h3>Zayıfsınız</h3>
            <p>
              Vücut kitle indeksiniz 18’in altında çıktıysa zayıf kategorisine giriyorsunuz demektir. Bu durum yağ oranınızın, kas kütlenizin azlığı ve çokluğu ile pek alakalı değil. Boyunuza göre kilonuz fazla düşük demektir.
            </p>
            <p>
              Anoreksiya vücut kitle indeksi düşük olan bireyler için bir tehlike olabilir, yeme alışkanlığınızı kontrol etmelisiniz.
            </p>
          </div>
        )
      case "Normal Kilo":
        return (
          <div className='result-info'>
            <h3> İdeal Kilodasınız </h3>
            <p>
              BMI boyunuza göre kilonuzun gayet iyi durumda olduğunu söylüyor. Harika!
            </p>
            <p>
              Buradan sonrası sizin isteğinize kalmış, bulunduğunuz kiloyu koruyarak sağlıklı bir hayat sürdürmeye devam edebilirsiniz. Ya da daha fazlasını isteyebilirsiniz. Daha iyi bir sporcu, daha düşük bir yağ oranı ya da daha fazla kas kütlesi isteyebilirsiniz.
            </p>
          </div>
        )
      case "Fazla Kilolu":
        return (
          <div className='result-info'>
            <h3> Fazla Kilolusunuz </h3>
            <p>
              Vücut kitle indeksiniz 25’in üstünde çıktıysa bu hesaplamaya göre kilolusunuz demektir. Fakat bu noktada yağ oranınızı hesaplamanızı öneriyoruz.
            </p>
            <p>
              Özellikle sporcuysanız kas kütleniz fazla ve yağ kütleniz az olacağından kilolu çıkma ihtimaliniz yüksek. Fakat kilonuz kas kütlenizden dolayı fazla ise, <strong>sağlıksız olduğunuz anlamına gelmez</strong>.
            </p>
            <p>
              Bunun yanında genel olarak sağlıklı erkeklerde yağ oranı %15-20 arasında olacaktır. Kadınların gebelik ihtimalinden dolayı yağ oranları genelde erkeklerden daha fazla olur. Dolayısıyla sağlıklı bir kadının yağ oranı da %20-25 arasında olacaktır.
            </p>
          </div>
        )
      case "1. Derece Obez":
        return (
          <div className='result-info'>
            <h3> 1. Derece Obezsiniz </h3>
            <p>
              Vücut kitle indeksiniz 30’un üstünde çıktıysa obez kategorisindesiniz demektir. Bu noktada profesyonel vücut geliştirme, güreş gibi bir spor yapmıyorsanız sağlığınız neredeyse kesin olarak tehdit altında demektir.
            </p>
          </div>
        )
      case "2. Derece Obez":
        return (
          <div className='result-info'>
            <h3> 2. Derece Obezsiniz </h3>
            <p>
              Vücut kitle indeksiniz 30’un üstünde çıktıysa obez kategorisindesiniz demektir. Bu noktada profesyonel vücut geliştirme, güreş gibi bir spor yapmıyorsanız sağlığınız neredeyse kesin olarak tehdit altında demektir.
            </p>
          </div>
        )
      case "Morbid Obez":
        return (
          <div className='result-info'>
            <h3> Morbid Obezsiniz </h3>
            <p>
              Morbid obezite tedavisi uzun zaman alan bir tedavi yöntemi olup, kişiye belirgin kilo kaybı sağlamaktadır. Bu nedenle, tedavi için öne çıkan tek yöntem cerrahi operasyondur. Bazı cerrahi operasyonların fazlalık yağların alınmasından bağımsız olarak, iştahın azalmasına ve yavaşça kilo kaybına sebep olduğu vurgulanmaktadır. Fakat 1991’den bu yana uluslararası sağlık alanında morbid obezitenin ameliyat için bir gösterge olduğu konusunda mutabakata varılmıştır. 
            </p>
          </div>
        )
      default:
        return null
    };
  }else{
    return null
  };
}

export default Result