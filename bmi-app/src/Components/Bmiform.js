import { useState } from 'react'
import { calculusBMI } from '../funcs/BMI'
import { useBMIS } from '../context/BMIS';


function Bmiform({ setNewBMI, newBMI }) {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [name, setName] = useState("");
    //formumdaki degiskenleri aliyorum
    const { setBMIS } = useBMIS()
    //eski verileri duzenleme fonksiyonunu cagiriyorum

    //submit edildiginde yapilacaklari yaziyorum
    const handleSubmit = (e) => {
        e.preventDefault()
        const calculatedBMI = calculusBMI(weight, height, name);
        //aldigim inputlari objeye ceviriyorum
        setNewBMI(calculatedBMI)
        //objeyi yeni veriye esitliyorum
        setBMIS((prev) => [...prev, calculatedBMI]);
        //objeyi eski verilere ekliyorum

        setHeight("");
        setWeight("");
        setName("");
        //formu bosaltiyorum
    }
    return (
        <div className='Formdiv'>
            <form className='FlexForm' onSubmit={(e) => handleSubmit(e)}>
                <label>
                    İsminiz(isteğe bağlı):
                    <input maxLength="64" name='name' value={name} onChange={(e)=> setName(e.target.value)}/>
                </label>
                <label>
                    Uzunluk(cm):
                    <input max="300" min="0" className='numaric' type="number" name='height' value={height} onChange={(e) => setHeight(e.target.value)} required />
                </label>
                <label>
                    Kilo(kg):
                    <input max="600" min="0" className='numaric' type="number" name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </label>
                <input className='FormSubmit' type='submit' value="Vücut tipinizi Bulun" />
            </form>
        </div>
    )
}

export default Bmiform