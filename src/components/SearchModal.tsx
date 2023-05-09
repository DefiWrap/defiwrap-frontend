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
//  import data from './data.json';


      
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


let currentTrade = {};
let currentSelectSide;

// async function getPrice(){
//     console.log("Getting Price");
  
//     // if (!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value) return;
//     let amount = Number(0.005 * 10 ** 0.004);
  
//     const params = {
//         sellToken: currentTrade.from.address,
//         buyToken: currentTrade.to.address,
//         sellAmount: amount,
//     }

//     const headers = 'e6ab47d1-f31a-4dcd-8eea-abe2ef56d74e'; // 1de2d124-1e69-41a7-9c1e-7ce3f16c25bf This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)
  
//     // Fetch the swap price.
//     const response = await fetch(`https://api.0x.org/swap/v1/price?${qs.stringify(params)}`, { headers });
    
//     swapPriceJSON = await response.json();
//     console.log("Price: ", swapPriceJSON);
    
//     document.getElementById("to_amount").value = swapPriceJSON.buyAmount / (10 ** currentTrade.to.decimals);
//     document.getElementById("gas_estimate").innerHTML = swapPriceJSON.estimatedGas;
// }

export function SearchModal ({ status , getTokenAddressData  })
{
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


 
  

  // const fetchData = async () => {
  //   fetch("https://tokens.coingecko.com/uniswap/all.json")
  //     .then(response => {
  //       return  response.json()
  //     })
  //     .then(data => {
  //       setTokens( data )
       
        
  //     })
  // }

  //  useEffect(() => {
  //    fetchData()
  //           console.log("data ========>>>>>>",tokens)

     
  //  }, [] )
    const [tokens, setTokens] = useState([])

  

  useEffect(() => {
    const dataFetch = async () => {
  try {
    const response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
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
  const [ results, setResults ] = useState(tokens);

  const [tokenQry, setTokenQry]=useState('')
  const [ToToken, setToToken] = useState([{"chainId":1,"address":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","name":"WETH","symbol":"WETH","decimals":18,"logoURI":"https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295"}]);
    
  // setToToken( tokens )

  function handleChange ( event: any )
      {
        
        
        const newQuery = event.target.value;
        setQuery(newQuery);
        const newResults = tokens.tokens.filter(item =>
          item.name.toLowerCase().includes( newQuery.toLowerCase() )
          //  &&
          //  item.chainId== 1
        );
        setResults( newResults );
        
  }
  function listViewClick ( e: any )
  {
    const tokenAddress = e.target.id ;
              setTokenQry(tokenAddress);
              const tokenDetails = tokens.tokens.filter(item =>
                item.address.toLowerCase().includes(tokenAddress.toLowerCase())
              );
             setToToken(tokenDetails);
            console.log("new result ==================>>>>>>>>>>>>>>", tokenDetails)
        getTokenAddressData(JSON.stringify(tokenDetails[0]));
          
           onClose()

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