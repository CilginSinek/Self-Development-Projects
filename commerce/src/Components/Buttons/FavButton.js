import React from 'react'
import { Button, useToast } from '@chakra-ui/react'
import HandleBasketFav from '../../funcs/HandleBasketFav'
import { useUserData } from '../../context/MyUserData'

const FavButton = ({ id }) => {
    const toast = useToast();
    const { userObj, setUserObj } = useUserData();
    const handleClick = () => {
        const process = userObj.fav.includes(id) ? "delete" : "add";
        //user datada secilen product varsa sil yoksa ekle diyor processe
        HandleBasketFav(id, process, "fav", userObj, setUserObj);
        //userObj duzenliyor
    };

    const buttonText = userObj.fav.includes(id) ? "Favorilerden kaldır" : "Favorilere ekle";
    //varsa kaldir yoksa ekle yazisi
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