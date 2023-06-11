import { Box, Button,Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react";
import { useUserData } from "../context/MyUserData";
import { useState } from "react";
import CargoLocForm from "./CargoLocationForm/CargoLocForm";

function TabPage({ cargoLocations, basket }) {
    const [locationInt, setLocationInt] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setUserObj } = useUserData();
    const toast = useToast()
    return (
        <>
            <Button colorScheme="orange" onClick={onOpen}>Buy Now</Button>

            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {cargoLocations.length !== 0 &&
                            <>
                                <Select placeholder='Select option' value={locationInt} onChange={(e) => setLocationInt(e.target.value)}>
                                    {cargoLocations.map((item, key) =>
                                        <option value={key} key={key}>
                                            {item[0]}/{item[1]}/{item[2]}
                                        </option>)
                                    }
                                </Select>
                            </>
                        }
                        <Box my={5} textAlign="left">
                            <CargoLocForm cargoLocations={cargoLocations}/>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        {cargoLocations.length === 0 || locationInt === "" || locationInt === undefined ?
                            <Button mr={3} isDisabled >
                                Get now
                            </Button>
                            :
                            <Button colorScheme="green" mr={3} onClick={() => {
                                const cargoObj = { cargos: basket, location: cargoLocations[locationInt] };
                                setUserObj((prevUserObj) => {
                                    return { ...prevUserObj, basket: [] };
                                });
                                console.log(cargoObj);
                                toast({
                                    title: 'Success',
                                    description: "Your order has been received!",
                                    position: "top-right",
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                })
                            }} >
                                Get now
                            </Button>
                        }

                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default TabPage