import { useToast } from "@chakra-ui/react"
import { banUser, unBanUser } from "../Api"

const HandleBan = async (id, isBan, setArr) => {
    const toast = useToast()
    //banliysa banini ac degilse banla ve toast goster
    if (isBan) {
        unBanUser(id).then((response) => toast({
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
    } else {
        banUser(id).then((response) => toast({
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
    }
    //fron-end icin elimdeki arrayi da duzenleyip veriyorum.
    setArr((prevArr) => {
        const updatedArr = prevArr.map((item) => {
            if (item.id === id) {
                return { ...item, isBan: !isBan };
            }
            return item;
        });
        return updatedArr;
    });

}
export default HandleBan