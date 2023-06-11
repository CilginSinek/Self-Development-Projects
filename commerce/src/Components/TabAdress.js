import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CargoLocForm from './CargoLocationForm/CargoLocForm'
import { DeleteIcon } from '@chakra-ui/icons';
import { useUserData } from '../context/MyUserData';
import HandleCargo from '../funcs/HandleCargo';


function TabAdress() {
    const { userObj, setUserObj } = useUserData()
    const [isCreate, setIscreate] = useState(false);
    const [locations, setLocations] = useState(userObj.cargoLocations)
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(()=>{
        setLocations(userObj.cargoLocations)
    },[userObj])
    return (
        <>
            <Button onClick={onOpen}>Open Address settings</Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editing Your Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {locations.length === 0 ?
                            <>
                                <CargoLocForm cargoLocations={locations} />
                            </>

                            :
                            <>
                                {isCreate ?
                                    <>
                                        <Button onClick={() => setIscreate(false)}>Back to list</Button>
                                        <CargoLocForm cargoLocations={locations}/>
                                    </>
                                    :
                                    <>
                                        <>
                                            <Button onClick={() => setIscreate(true)}>Create new one</Button>
                                            <Box>
                                                {
                                                    locations.map((item, key) =>
                                                        <Flex alignItems="center" justifyContent="space-around" key={key}><Text>{item[0]}/{item[1]}/{item[2]}</Text> <Button onClick={() => HandleCargo(item, userObj, setUserObj)} ><DeleteIcon /></Button></Flex>
                                                    )
                                                }
                                            </Box>
                                        </>
                                    </>
                                }
                            </>
                        }
                    </ModalBody>
                    <ModalFooter >
                        <Button colorScheme='blue' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TabAdress