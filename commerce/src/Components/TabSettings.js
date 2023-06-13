import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import EditUser from '../Pages/EditUser/EditUser'

function TabSettings() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Open Profile Settings</Button>
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
              {/* edit user componentini modelin icine koyuyorum */}
              <EditUser onClose={onClose}/>
            </ModalBody>
            <ModalFooter paddingBottom={"5px"} paddingRight={"5px"} >
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}


export default TabSettings