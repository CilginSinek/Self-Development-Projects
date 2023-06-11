import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Text, Textarea, useToast } from '@chakra-ui/react';
import { useState } from 'react'

function EditDec({ userDec, setUserObj }) {
    const toast = useToast()
    const [isEdit, setIsEdit] = useState(false);
    const [dec, setDec] = useState(userDec)
    const handleDecChange = (event) => {
        setDec(event.target.value);
    };
    if (isEdit) {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                setUserObj((prevUserObj) => {
                    return { ...prevUserObj, userDec: dec };
                });
                setIsEdit(false);
                toast({
                    title: 'Success',
                    description: "Dectrabtion saved",
                    position: "top-right",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }}>
                <Textarea placeholder='Açıklamanız' maxLength="64" value={dec} onChange={handleDecChange} />
                <Button type='submit'><CheckIcon/></Button>
                
            </form>
        )
    } else {
        return(
            <>
                <Text>
                    {dec} <EditIcon onClick={()=>setIsEdit(true)}/>
                </Text>
            </>
        )
    }
}

export default EditDec