import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Input, InputGroup, InputLeftElement, InputRightElement, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
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
      mr: 5,
    }),
  }),
}

export function SearchModal ()
{
  const { isOpen, onOpen, onClose } = useDisclosure()


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)



  // Define a function to render the search result on the page
const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(event : any) {
    const newQuery = event.target.value;
    setQuery(newQuery);
    const newResults = data.filter(item =>
      item.name.toLowerCase().includes(newQuery.toLowerCase())
    );
    setResults(newResults);
  }
  


  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      
        <Button onClick={onOpen} leftIcon={<FaEthereum />} rightIcon={<FaArrowDown />} colorScheme='pink' variant='solid'>
                            Eth
        </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={ onClose }
              
      >
        <ModalOverlay />
        <ModalContent w={600} >
          <ModalHeader>You Sell</ModalHeader>
          <ModalCloseButton />
                  <ModalBody  pb={ 6 }>
                    
                        <InputGroup>  
                            <Input
                                focusBorderColor='pink.400'
                                errorBorderColor='red.300'
                                value={query}
                                onChange={handleChange}
                                type='text' placeholder='Search your token by Symbol, Name or Address' />
              {/* onChange={(event) =>handleSearch(event)} */ }
              
                                <InputRightElement children={<SearchIcon color='pink.500' />} />

            </InputGroup>
            
                      
                      <Text mt={ 5 } mb={ 5 } fontSize={ "xl" }>Token List</Text>
                      
                
            
                      
    
            
            <List size={ "xl" } spacing={ 3 }>

                        
              { results.map( item => (
  
                <ListItem>
                  <div style={{display:"flex"}}  >
                    <img style={ { marginRight: "7px" } } height={ 25 } width={ 25 } src={ item.logoURI }
                    ></img>
                    <b>{ item.name }</b> 
                   </div>
                </ListItem>

              ))}
    
            </List>
                      
          </ModalBody>

          <ModalFooter>
           
            <Button colorScheme="pink" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}