import React from 'react'
import { Button, useToast } from '@chakra-ui/react'
import HandleBasketFav from '../../funcs/HandleBasketFav'
import { useUserData } from '../../context/MyUserData'

const BasketButton = ({ id }) => {
    const toast = useToast();
    const { userObj, setUserObj } = useUserData()
    const handleClick = () => {
        const process = userObj.basket.includes(id) ? "delete" : "add";
        HandleBasketFav(id, process, "basket", userObj, setUserObj);
    };

    const buttonText = userObj.basket.includes(id) ? "Sepetten kaldır" : "Sepete ekle";
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