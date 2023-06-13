import { Card, CardBody, Stack, Text, Heading, Divider, CardFooter, ButtonGroup, Image, Button, useToast, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useUserData } from "../context/MyUserData";
import FavButton from "./Buttons/FavButton";
import BasketButton from "./Buttons/BasketButton";
import regexDate from "../funcs/regexDate"
import BanButton from "./Buttons/BanButton";
import { deleteClothes } from "../Api";

function MyCard({ item, setData }) {
    const { userObj } = useUserData()
    const toast = useToast()
    const { isLogin } = useUserData()
    //Banli kullanici itemi gosterilmiyor
    if (item.isBan) {
        return null
    }
    return (
        <>
            <Card maxW='400px' minW="300px">
                <CardBody>
                    {/* Card img */}
                    <Link to={`/urun/${item.id}`}>
                        <Image
                            src={item.img}
                            alt={item.name}
                            borderRadius='lg'
                        />
                    </Link>
                    {/* Card information */}
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{item.name}</Heading>
                        <Text>{regexDate(item.createdAt)}</Text>
                        <Text maxW="270px" >{item.dec}</Text>
                        <Text color='blue.600' fontSize='2xl'>{item.price} TL</Text>
                    </Stack>
                    <Box>
                        {/* Kullanici giris yapmis ve admin olmus olmasi gereken buttonlar */}
                        {userObj !== null && userObj.isAdmin &&
                            <ButtonGroup spacing='2'>
                                {/* Ban ve delete product buttons */}
                                <BanButton id={item.userId} isBan={item.isBan}>Ban</BanButton>
                                <Button onClick={() => {deleteClothes(item.userId, item.id).then((response) => toast({
                                    title: 'Success',
                                    description: "Product has been deleted",
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
                                }))
                                setData((prevClothesArray) => {
                                    return prevClothesArray.filter((allitem)=> allitem.id !== item.id);
                                })
                            }}>Delete Product</Button>
                            </ButtonGroup>
                        }
                    </Box>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        {/* giris yapmissa ve yapmamissa button ozellikleri degisiyor. */}
                        {isLogin &&
                            <>
                                <BasketButton id={item.id} />
                                <FavButton id={item.id} />
                            </>
                        }
                        {!isLogin &&
                            <>
                                <Link to="/Login">
                                    <Button variant='solid' colorScheme='blue'>
                                        Sepete ekle
                                    </Button>
                                </Link>
                                <Link to="/Login">
                                    <Button variant='ghost' colorScheme='blue'>
                                        Favorilere ekle
                                    </Button>
                                </Link>
                            </>
                        }
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>

    )
}

export default MyCard