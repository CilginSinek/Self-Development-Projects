import React from 'react'
import { Button, useToast } from '@chakra-ui/react'
import HandleBasketFav from '../../funcs/HandleBasketFav'
import { useUserData } from '../../context/MyUserData'

const FavButton = ({ id }) => {
    const toast = useToast();
    const { userObj, setUserObj } = useUserData();
    const handleClick = () => {
        const process = userObj.fav.includes(id) ? "delete" : "add";
        HandleBasketFav(id, process, "fav", userObj, setUserObj);
    };

    const buttonText = userObj.fav.includes(id) ? "Favorilerden kaldır" : "Favorilere ekle";
    return (
        <>
            <Button variant='ghost' colorScheme='blue' onClick={() => {
                handleClick(); toast({
                    title: 'Success',
                    description: "The product add favrites.",
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
export default React.memo(FavButton)