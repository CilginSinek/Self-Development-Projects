import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserData } from '../context/MyUserData'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Text } from '@chakra-ui/react'
import EditDec from '../Components/EditDec'
import FavScroll from '../Components/FavScroll'
import regexDate from '../funcs/regexDate'
import { LockIcon, TriangleDownIcon, UnlockIcon } from '@chakra-ui/icons'
import TabSettings from '../Components/TabSettings'
import TabAdress from '../Components/TabAdress'
import SliderScroll from '../Components/SliderScroll'

function Profile() {
    const { userObj, isLogin, setUserObj } = useUserData()

    if (!isLogin) {
        return <Navigate to="/Login" />
    }

    return (
        <>
            <Box>
                <Box>
                    {userObj.avatar.length ? <Avatar size="2xl" name={userObj.name} src={userObj.avatar} /> : <Avatar size="2xl" name={userObj.name} src='https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg' />
                    }
                </Box>
                <Box>
                    <Text>
                        {userObj.name}
                    </Text>
                    {userObj.addressCity && userObj.addressCountry &&
                        <Text>
                            <TriangleDownIcon /> {userObj.addressCity}/{userObj.addressCountry}
                        </Text>
                    }
                    <Text>
                        Join in {regexDate(userObj.createdAt)}
                    </Text>
                    {userObj.isBan &&
                        <Text color="red.300">Your banned from commerce</Text>
                    }
                    <EditDec userDec={userObj.userDec} setUserObj={setUserObj} />
                    {userObj.isPriv ? <Button onClick={() => setUserObj((prevState) => { return { ...prevState, isPriv: false } })}><LockIcon /></Button> : <Button onClick={() => setUserObj((prevState) => { return { ...prevState, isPriv: true } })}><UnlockIcon /></Button>}
                </Box>
                <Box>
                    {!userObj.isBan &&
                        <TabSettings />
                    }
                    <TabAdress />
                </Box>
                <Box>
                    <FavScroll fav={userObj.fav} />
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        Sattığın eşyalar
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel paddingBottom={"230px"}>
                                <SliderScroll clothes={userObj.clothes} />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Box>
        </>
    )
}

export default Profile