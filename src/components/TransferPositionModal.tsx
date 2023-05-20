import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, Container, Heading, Input, InputGroup, InputLeftElement, InputRightElement, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Switch, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React, { useEffect,useState } from "react";
import { FaEthereum, FaQuestionCircle, FaArrowDown, FaArrowsAltH } from 'react-icons/fa';
import { MdCheckCircle, MdSettings } from "react-icons/md";
import {
  defineStyle,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/styled-system'
import { listAnatomy as parts } from '@chakra-ui/anatomy'
import data from './data.json';
import Information from './data.json';










const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers( parts.keys )
  
const sizes = {
  xl: definePartsStyle({
    container: defineStyle({
      fontSize: 'xl',
      p: 6,
    }),
    icon: defineStyle({
      boxSize: 6,
      mr: 2,
    }),
  }),
}

export function TransferPositionModal ()
{
  const { isOpen, onOpen, onClose } = useDisclosure()


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  


  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      
       
      
    <Button variant={"solid"} colorScheme="pink" onClick={onOpen}>Transfer</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={ onClose }
          size={"xl"}    
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={3}>Transfer ETH/OP position</ModalHeader>
          <ModalCloseButton />
                  <ModalBody  pb={ 6 }>
  
            
           
                    
                      <Text fontSize={"sm"}>Set to whome you want to transfer your position to</Text>
                      <Text fontSize={"sm"} mt={2}>This will transfer your position, your NFT and all the liquidity stored in the position to the new address</Text>
                      {/* <Input variant={ "outline" } placeholder='Set the address to transfer'> </Input> */ }
                      <Input
                                  focusBorderColor="pink.200"
                                  errorBorderColor="red.300"
                                  colorScheme="pink"
                                  
                          placeholder='Set the address to transfer'
                          mt={2}
                                />
                      <Text fontSize={"sm"} mt={2}>This can not be undone</Text>
          </ModalBody>
                
           
                      

           

                      


          <ModalFooter>
                        <Button width={"100%"} margin={"10px"} variant={"outline"} colorScheme="pink" onClick={onClose}>Cancel</Button>

                       <Button width={"100%"} margin={"10px"} colorScheme="pink" onClick={onClose}>Transfer</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}



      

