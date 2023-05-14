import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Input, InputGroup, InputLeftElement, InputRightElement, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React, { useEffect,useState } from "react";
import { FaEthereum, FaQuestionCircle, FaArrowDown, FaArrowsAltH, FaCopy } from 'react-icons/fa';
import { MdCheckCircle, MdSettings } from "react-icons/md";
import {
  defineStyle,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/styled-system'
import { listAnatomy as parts } from '@chakra-ui/anatomy'
import { error } from "console";
//  import data from './data.json';
import tokenlist from "../../data/tokens/0x38.json"



      
// console.log("data is ==========>>>>>>",data)


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


export function SearchTokenModal ({ status , getTokenAddressData  })
{
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


 
  const [tokens, setTokens] = useState([])

  

  useEffect(() => {
    const dataFetch = async () => {
  try {
    const response = await fetch(tokenlist);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setTokens(data);
  } catch (error) {
    console.error('There was a problem fetching data:', error);
  }
};

    dataFetch();
           // console.log("data ========>>>>>>",tokens)

  }, [tokens]);

  
 
  // Define a function to render the search result on the page
  const [query, setQuery] = useState('');
  const [ results, setResults ] = useState(tokenlist);

  const [tokenQry, setTokenQry]=useState('')
  const [ToToken, setToToken] = useState([{
    "name": "Binance Coin",
    "symbol": "BNB",
    "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "logoURI": "https://ecoswap.exchange/tokens/0x38/BNB-0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE.svg",
    "decimals": 18
}]);
    
  // setToToken( tokens )

  function handleChange ( event: any )
      {
        console.log("token list ========>>>>>>",tokenlist)
        
        const newQuery = event.target.value;
        setQuery(newQuery);
        const newResults = tokenlist.filter(item =>
          item.name.toLowerCase().includes( newQuery.toLowerCase() )
          //  &&
          //  item.chainId== 1
        );
        setResults( newResults );
        
  }
  function listViewClick ( e: any )
  {

    try
    {
      const tokenAddress = e.target.id;
      setTokenQry( tokenAddress );
      const tokenDetails = tokenlist.filter( item =>
        item.address.toLowerCase().includes( tokenAddress.toLowerCase() )
      );
      setToToken( tokenDetails );
      console.log( "new result ==================>>>>>>>>>>>>>>", tokenDetails )
      getTokenAddressData( JSON.stringify( tokenDetails[ 0 ] ) );
          
      onClose()
    }
    catch (error){
      console.warn("The error is========>>>>>>>>",error)
    }

  }
  
  


  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      
      {/* <Button  onClick={onOpen} leftIcon={<FaEthereum />} rightIcon={<FaArrowDown />} colorScheme='pink'  variant='solid'></Button> */}
     
      { ToToken.map( item => (
  
              
          <div  style={{display:"flex", flexDirection :"column", textAlign:"center"}} >
            <Button onClick={ onOpen } leftIcon={ <img style={{borderRadius:"50%"}} height={ 25 } width={ 25 } src={ item.logoURI }
          ></img> } colorScheme="pink" variant='solid'>
            { item.symbol ? <b onClick={ listViewClick} style={ { cursor: "pointer" } } id={ item.address } >{ item.symbol }</b>
              :
              
              
               <b onClick={ onOpen } style={ { cursor: "pointer" } } id={ item.address } >Select</b>  }
           
          </Button>
          
                  <Text  fontSize='sm'>
                    {item.name}
                  </Text>
            
            </div>
        

      ) ) }

      
      
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={ onClose }


      
      >
        <ModalOverlay />
        <ModalContent  w={600} >
          <ModalHeader>{ status }</ModalHeader>
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
                      
                
            
                      
    
            
            <List style={{height:"300px",  overflowX:"hidden"}} size={ "xl" } spacing={ 3 }>

                        
              { results.map( item => (
  
                <ListItem  >
                  <div onClick={listViewClick} style={{display:"flex"}} >
                    <img style={ { marginRight: "7px" } } height={ 25 } width={ 25 } src={ item.logoURI }
                    ></img>
                    <b style={{cursor:"pointer"}}  id={item.address} >{ item.name }</b> 
                    &nbsp;
                    <FaCopy color="pink.500" style={{cursor:"pointer"}} onClick={() => {navigator.clipboard.writeText(item.address)}}></FaCopy>
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