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
      mr: 5,
    }),
  }),
}

export function DurationModal ()
{
  const { isOpen, onOpen, onClose } = useDisclosure()


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)



  // Define a function to render the search result on the page
// const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   function handleChange(event : any) {
//     const newQuery = event.target.value;
//     setQuery(newQuery);
//     const newResults = data.filter(item =>
//       item.name.toLowerCase().includes(newQuery.toLowerCase())
//     );
//     setResults(newResults);
//   }
  


  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      
       
      
          <Button onClick={onOpen}  width={'100%'} colorScheme='pink' variant='solid'>
                                            Add Funds
          </Button> 
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={ onClose }
          size={"xl"}    
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={3}>Change duration and date</ModalHeader>
          <ModalCloseButton />
                  <ModalBody  pb={ 6 }>
  
            
                      
            <Text   fontSize={ "xl" }>How much Eth do you want to invest ?</Text>
            <Text  fontSize={ "xl" }>Use WETH <Switch colorScheme="pink"></Switch> </Text> 
                      
                
            
               {/* How much ETH do you want to invest? Card */}
                <Card variant = "outline" >
                  <CardBody borderRadius='lg'>
                    <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                      <Heading  mb='8px' size='sm'>How much ETH do you want to invest?</Heading>  
                    </Stack>
                    <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          children={[<FaEthereum color='#D53F8C' height={ 10 } width={ 10} />]}
                        />
                      <Input       focusBorderColor='pink.400'
                            errorBorderColor='red.300'
                          type='number' placeholder='0' />
                      </InputGroup>
                      <Button colorScheme='pink' variant='outline'>
                        Max
                      </Button>
                      <Button colorScheme='pink' variant='outline'>
                        Half
                      </Button>  
                    </Stack>
                    <Stack spacing={ 4 }>
                  <Text  fontSize='sm'>
                  In wallet: 0 ETH
                  </Text>
                    </Stack>
                  </CardBody> 
                </Card>
                      
    {/* How many days Card */}
              <Card variant = "outline" >
                <CardBody borderRadius='lg'>
                   <Stack spacing={ 4 }>
                  </Stack>
                  <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                    <Heading  mb='8px' size='sm'>How many days?</Heading>  
                  </Stack>
                  <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                     <InputGroup>
                      <Input     focusBorderColor='pink.400'
                      errorBorderColor='red.300' colorScheme='pink' type='number' placeholder='Custome' />
                    </InputGroup>
                    <Button colorScheme='pink' variant='outline'>
                      7
                    </Button>
                    <Button colorScheme='pink' variant='outline'>
                      15
                    </Button>  
                    <Button colorScheme='pink' variant='outline'>
                      30
                    </Button>  
                  </Stack>
                 
                </CardBody> 
              </Card>
           
             <Card variant = "outline" >
                  <CardBody borderRadius='lg'>
                <Stack direction='row' justifyContent={ "flex-start" } alignItems={"center"}>
                  <Heading size='sm'>We'll swap</Heading> 
                  <Stack direction='column'>
                      <InputGroup>
                          <InputLeftElement
                            pointerEvents='none'
                            children={ [<FaEthereum color='#D53F8C' height={ 10 } width={ 10} />]}
                      />
                      
                          <Input w={"120px"}  focusBorderColor='pink.400'
                                errorBorderColor='red.300'
                          type='number' placeholder='0' />
                    
                    </InputGroup>
                      <Text  fontSize='sm'>
                      In wallet: 0 ETH
                      </Text>
                  </Stack>
                    <Heading size='sm'>everyday for you for</Heading>  
                  <Stack direction='column'>
                      
                          <Input width={"60px"}  focusBorderColor='pink.400'
                                errorBorderColor='red.300'
                          type='number' placeholder='0' />
                    
                      <Text  fontSize='sm'>
                      </Text>
                  </Stack>
                                      <Heading size='sm'>days</Heading>  

                    </Stack>
                   
                  </CardBody> 
                </Card>
                      
          </ModalBody>

          <ModalFooter>
                        <Button width={"100%"} margin={"10px"} variant={"outline"} colorScheme="pink" onClick={onClose}>Cancel</Button>

                       <Button width={"100%"} margin={"10px"} colorScheme="pink" onClick={onClose}>Modify Position</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}