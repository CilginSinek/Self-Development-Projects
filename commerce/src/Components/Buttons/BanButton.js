import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { setBanUser } from '../../Api'

function BanButton({ isBan, id, setArr }) {
    const toast = useToast()
    if (isBan) {
        return <Button onClick={() => {
            setBanUser(id, isBan).then((response) => toast({
                title: 'Success',
                description: "User has been unbanned",
                position: "top-right",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })).catch((err) => toast({
                title: 'Error',
                description: err,
                position: "top-right",
                status: 'error',
                duration: 3000,
                isClosable: true,
            }));
            setArr((prevArr) => {
                const updatedArr = prevArr.map((item) => {
                    if (item.id === id) {
                        return { ...item, isBan: !isBan };
                    }
                    return item;
                });
                return updatedArr;
            });
        }} colorScheme='white' color={"red"}>Unban</Button>
    } else {
        return <Button onClick={() => {
            setBanUser(id, isBan).then((response) => toast({
                title: 'Success',
                description: "User has been banned",
                position: "top-right",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })).catch((err) => toast({
                title: 'Error',
                description: err,
                position: "top-right",
                status: 'error',
                duration: 3000,
                isClosable: true,
            }));
            setArr((prevArr) => {
                const updatedArr = prevArr.map((item) => {
                    if (item.id === id) {
                        return { ...item, isBan: !isBan };
                    }
                    return item;
                });
                return updatedArr;
            });
        }} colorScheme='red' color={"white"}>Ban</Button>
    }

}
export default BanButton