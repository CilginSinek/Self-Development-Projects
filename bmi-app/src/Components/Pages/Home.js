import React, { useState } from 'react'
import Bmiform from '../Bmiform'
import Result from './Result'
import Results from "../Results"
import { useBMIS } from '../../context/BMIS';

function Home() {
  const [newBMI,setNewBMI]=useState({});
  // Yeni verileri tutan degisken
  const {BMISArray} = useBMIS();
  //eski verileri degisken

  return (
    <>
      <h1><strong>Vücut Kitle Endeksi Hesaplama (BMI)</strong></h1>
      {/* hazirlanan form */}
      <Bmiform setNewBMI={setNewBMI} newBMI={newBMI} />

      <div className='Results-all'>
        <Result newBMI={newBMI}/>
        {/* eski veri var mi yok mu sorgusu */}
        {BMISArray.length > 0 && 
        <div className='old-results'>
          <Results/>
        </div>
        }
      </div>

    </>
  )
}

export default Home