import { Button, useToast } from '@chakra-ui/react';
import React from 'react'
import { setMod } from '../../Api';

function ModButton({ isMod, id, setArr }) {
    const toast = useToast()
    if (isMod) {
        return <Button onClick={() => {
            setMod(id, isMod).then((response) => toast({
                title: 'Success',
                description: "User has taked Administer",
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
                        return { ...item, isAdmin: !isMod };
                    }
                    return item;
                });
                return updatedArr;
            });
        }} colorScheme='orange' color={"white"}>Unadmin</Button>
    } else {
        return <Button onClick={() => {
            setMod(id, isMod).then((response) => toast({
                title: 'Success',
                description: "User has gived Administer",
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
                        return { ...item, isAdmin: !isMod };
                    }
                    return item;
                });
                return updatedArr;
            });
        }} colorScheme='messenger' color={"white"}>Be Admin</Button>
    }

}

export default ModButton