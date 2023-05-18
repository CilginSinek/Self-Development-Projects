import React from 'react'
import { useBMIS } from "../context/BMIS"

function Results() {
  const { BMISArray, setBMIS } = useBMIS();
  //eski verileri ve onu duzenleyecek fonksiyonu aliyorum

  //sil butonuna basildiginda yapilacaklar
  const DeleteElement = (e) => {
    const index = e.target.id
    //element idsine ulasilacak
    const newArray = [...BMISArray];
    //duzenlemek icin ayni elemntleri yeni arraya aliyorum
    newArray.splice(index, 1);
    // secilen elementi arraydan kesiyorum
    setBMIS(newArray);
    //arrayi guncelliyorum
  }

  return (
    <>
      <h4>Eski Hesaplamalarınız</h4>
      <table className='old-results-row'>
        <tr>
          <th>Adınız</th>
          <th>VKI</th>
          <th>Kilo Tipiniz</th>
          <th>Ağırlığınız(Kg)</th>
          <th>Uzunluğunuz(cm)</th>
          <th>Sil</th>
        </tr>
        {
          BMISArray.map((item, index) => {
            return (
              <tr className='results-row' key={index} id={index}>
                <td>
                  {item.name ? item.name : "isimsiz"}
                </td>
                <td>
                  {item.result}
                </td>
                <td>
                  {item.bmi}
                </td>
                <td>
                  {item.weight}
                </td>
                <td>
                  {item.height}
                </td>
                <button className='sil' onClick={(e) => DeleteElement(e)} id={index}>X</button>
              </tr>
            )
          })
        }
      </table>
      


    </>
  )
}

export default Results