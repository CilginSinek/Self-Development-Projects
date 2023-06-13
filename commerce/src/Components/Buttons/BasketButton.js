import React from 'react'
import { Button, useToast } from '@chakra-ui/react'
import HandleBasketFav from '../../funcs/HandleBasketFav'
import { useUserData } from '../../context/MyUserData'

const BasketButton = ({ id }) => {
    const toast = useToast();
    const { userObj, setUserObj } = useUserData()
    const handleClick = () => {
        const process = userObj.basket.includes(id) ? "delete" : "add";
        //user datada secilen product varsa sil yoksa ekle diyor processe
        HandleBasketFav(id, process, "basket", userObj, setUserObj);
        //userObj duzenliyor.
    };

    const buttonText = userObj.basket.includes(id) ? "Sepetten kaldır" : "Sepete ekle";
    //user datada secilen product varsa kaldir yoksa ekle diyor processe
    return (
        <>
            <Button variant='solid' colorScheme='blue' onClick={() => {
                handleClick(); toast({
                    title: 'Success',
                    description: "The product add basket",
                    position: "top-right",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }}>
                {buttonText}
            </Button>
        </>
    )

};
export default React.memo(BasketButton)