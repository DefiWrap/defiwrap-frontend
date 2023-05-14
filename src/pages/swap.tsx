/* eslint-disable react-hooks/rules-of-hooks */
// @ts-ignore
import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Box ,Tabs, TabList, TabPanels, Tab, TabPanel, Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center, Progress, CircularProgress, CircularProgressLabel, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Checkbox } from '@chakra-ui/react'
import styles from "../styles/PositionsDetail.module.css";

import { useState,useEffect } from "react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import { Bnb, Eth, I1inch, Matic } from "@chakra-icons/cryptocurrency-icons";
import { FaArrowDown, FaArrowRight, FaChartLine, FaDeploydog, FaDrawPolygon, FaEthereum, FaGasPump, FaQuestionCircle, FaRecycle, FaRegCircle } from "react-icons/fa";
import { DurationModal } from "../components/DurationModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { MdArrowDropDown, MdRefresh, MdSwapHorizontalCircle } from "react-icons/md";
import { SearchModal } from "../components/SearchModal";
import { ethers } from "ethers";
import Web3 from "web3";
const qs = require( 'qs' );
const BigNumber = require('bignumber.js');
const web3 = require('web3');






export default function SignExample() {
  const { isConnected } = useAccount();

  
  const [ sellTokenAddress, setSellTokenAddress ] = useState( "" )
  const [ buyTokenAddress, setBuyTokenAddress ] = useState( "" )
  const [ buyToken, setBuyToken ] = useState( "" )
  const [ buyTokenImg, setbuyTokenImg ] = useState( "" )
  const [ sellAmount, setSellamount ] = useState( 0 )
  const [ sellToken, setSellToken ] = useState( "" )
  const [ sellTokenImg, setSellTokenImg ] = useState( "" )
  const [ toAmount, setToAmount ] = useState( 0 )
  const [ estimatedGas, setEstimatedGas ] = useState(0)
  const [ price,setPrice ]= useState(0)
  let swapQuoteJSON = ""
  let swapPriceJSON = ""
 
 
  


  const handleBuyFromSearchModel = ( buyTokenData: any ) =>
  {
  
    //console.log("buyTokenData",JSON.parse(buyTokenData).symbol)
    setBuyTokenAddress( JSON.parse( buyTokenData ).address );
    setBuyToken( JSON.parse( buyTokenData ).symbol )
    setbuyTokenImg(JSON.parse( buyTokenData ).logoURI)
    
          console.log("Buy token ======>>>>>>>>",buyTokenAddress)

  };


  const handleSellFromSearchModel = ( sellTokenData: any ) =>
  {
   // console.log("buyTokenData",JSON.parse(sellTokenData).symbol)
    setSellTokenAddress( JSON.parse( sellTokenData ).address );
    setSellToken( JSON.parse( sellTokenData ).symbol )
    setSellTokenImg(JSON.parse( sellTokenData ).logoURI)
          console.log("Sell token ======>>>>>>>>",sellTokenAddress)

  };

  const [ tokens, setTokens ] = useState( [] )
  
  async function getPrice(){
    console.log("Getting Price");
  
    // if (!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value) return;
    let amount = Number((sellAmount) * 10 ** 18);
  
    const params = {
        sellToken: sellTokenAddress,
        buyToken: buyTokenAddress,
        sellAmount: amount,
    }
  
    const headers =
    
    {
        '0x-api-key' :  ' e6ab47d1-f31a-4dcd-8eea-abe2ef56d74e'
    } 

    // Fetch the swap price.
    const response = await fetch( `https://api.0x.org/swap/v1/price?${ qs.stringify( params ) }`, { headers } );
            
    swapPriceJSON = await response.json();
    console.log("PriceJSON: ===========>>>>>>>>", swapPriceJSON);
    
    setToAmount( swapPriceJSON.buyAmount / (10 ** 18))
    setEstimatedGas( swapPriceJSON.estimatedGas )
    // setPrice( swapPriceJSON.price )
      //  console.log( "from get pprice price=============>>>>>>>>>>>>>", price );

}
 async  function getQuote (account)
  {
    

   console.log("getquote for account =====>>>>>>>",account)

const params = {
    // Not all token symbols are supported. The address of the token can be used instead.
    sellToken: sellTokenAddress,
    buyToken: buyTokenAddress,
    // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
    sellAmount: ( sellAmount * 10 ** 18 ),
    takerAddress: account,
   };
   

    const headers =
    
    {
        '0x-api-key' :  ' e6ab47d1-f31a-4dcd-8eea-abe2ef56d74e'
    } 

    // Fetch the swap price.
    const response = await fetch( `https://api.0x.org/swap/v1/price?${ qs.stringify( params ) }`, { headers } );
       

// console.log("Response =============>>>>>>>>>>>>>",await response.json());

   swapQuoteJSON = await response.json();
   console.log("swapquotejson with probleme 1 =========>>>>>>>>>>>>>>>>>>",swapQuoteJSON)
   setToAmount ( (swapQuoteJSON.buyAmount / (10 ** 18)))
   setEstimatedGas( swapQuoteJSON.estimatedGas )
  //  setPrice(swapQuoteJSON.price)
   
   
   console.log( "To Amount get quote=============>>>>>>>>>>>>>", toAmount );
  //  console.log( "price get quote=============>>>>>>>>>>>>>", price );
      console.log("swapQuoteJSON get quote with probleme =============>>>>>>>>>>>>>",swapQuoteJSON);


   return swapQuoteJSON
   

  }

async function trySwap(){
    const erc20abi= [{ "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }]
    console.log("trying swap");
  try   
  {
    // Only work if MetaMask is connect
    // Connecting to Ethereum: Metamask
    const web3 = new Web3( Web3.givenProvider );
  
    // The address, if any, of the most recently used account that the caller is permitted to access
    let accounts = await ethereum.request( { method: "eth_accounts" } );
    let takerAddress = accounts[ 0 ];
    console.log( "takerAddress: ", takerAddress );
  
    const swapQuoteJSON = await getQuote( takerAddress );
  
    // Set Token Allowance
    // Set up approval amount
    const fromTokenAddress = sellTokenAddress;
    const maxApproval = new BigNumber( 2 ).pow( 256 ).minus( 1 );
    console.log( "approval amount: ", maxApproval );
    const ERC20TokenContract = new web3.eth.Contract( erc20abi, fromTokenAddress );
    console.log( "setup ERC20TokenContract: ", ERC20TokenContract );
    console.log( "swapQuoteJSON ===============>>>>>>>>>> ", swapQuoteJSON );
    console.log( "swapQuoteJSON  allowanceTarget: ===============>>>>>>>>>> ", swapQuoteJSON.allowanceTarget );

    // Grant the allowance target an allowance to spend our tokens.
    //web3.eth.defaultAccount = fromTokenAddress

    const tx = await ERC20TokenContract.methods.approve(
      swapQuoteJSON.allowanceTarget,
      maxApproval,
    )
      
      .send({ from: takerAddress })

      .then( tx =>
      {
        console.log( "tx:=======>>>>>>>>> ", tx )
      } );
      // Perform the swap
    console.log( "from address: 0.782 ETH ========>>>>>>>> ", { from: takerAddress } );
    

    const receipt = await web3.eth.sendTransaction(swapQuoteJSON);
    console.log("receipt: ========>>>>>>>> ", receipt);
  }
  catch ( Error )   
    {  
      alert(Error.message);  
    }

  
}

   useEffect(() => {
     // getQuote()
     getPrice()
     
   }, [toAmount,estimatedGas] )
  
  
  if ( isConnected )
  {
    
    
    return (
      <>
         <div  className={styles.container}>
            <div className={styles.main}>
                

                  <Box display={"flex"} flexDirection={"row"} >
                        <Box minWidth={"410px"} flexDirection={"column"}  borderRadius='lg' >
                            
                  
                                    {/* main card   */}
                            <Card  m='12px' maxW='sm'>
                              <CardBody> 
                                
                                {/* Sell recive Card */}
                                <Card variant = "outline">
                      <CardBody borderRadius='lg'>
        
                                          <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                                           
                                              <Select iconColor="pink.500" icon={ <Bnb /> } placeholder='Select Network' >
                                                <option value='option1'>BNB Chain</option>
                                              
                                              </Select>
                                          </Stack>
                                  </CardBody> 
                                </Card>


                    {/* Sell recive Card */ }
                    <Card variant = "outline" mt={5} >
                <CardBody borderRadius='lg'>
                     <Stack  direction='row' justifyContent={ "space-between" } >
                    <Heading  mb='5px' size='sm'>You Pay</Heading>
                    <Text  mb='5px' pr={ 1 } size='xs'>Balance 0 </Text>
                  </Stack>
              <Card variant = "outline" >
                <CardBody borderRadius='lg'>
                 
                  <Stack direction='column'  >
                                     
                              {/* <p>Data from child component: {buyTokenAddress}</p> */}
                              

                   <SearchModal getTokenAddressData={handleSellFromSearchModel}  status={"You Sell"}></SearchModal>

                
                     <Input onChange={getPrice} onBlur={e=> setSellamount(Number(e.target.value))} style={{  textAlign:"center"}} placeholder="0"></Input>
                    
                    </Stack>                                                                                                                                                                                                                        
                        <Stack direction='row' justifyContent={ "center" }  spacing={ 4 }>
                                     

                
                              <Text  fontSize='sm'>
                              Amount :{toAmount}
                              </Text>
                    
                        </Stack>
                         <Stack direction='row' justifyContent={ "center" }  spacing={ 4 }>
                                     

                
                              <Text  fontSize='sm'>
                             Estimated Gas: {estimatedGas}
                              </Text>
                    
                        </Stack>
                </CardBody> 
                        </Card>
                        
                      </ CardBody>
                    </Card>

                    <Stack direction='row' justifyContent={ "center" } mt='-3' mb='-9'  position="relative" >
                                            <Icon as={MdSwapHorizontalCircle} zIndex={1} w={10} h={10} />

                    </Stack>

                    <Card variant = "outline" mt={5} >
                <CardBody borderRadius='lg'>
                     <Stack  direction='row' justifyContent={ "space-between" } >
                    <Heading  mb='5px' size='sm'>You Receive</Heading>
                   
                  </Stack>
              <Card variant = "outline" >
                <CardBody borderRadius='lg'>
                 
                  <Stack direction='column'  >
                                     
                                                  {/* <p>Data from child component: { sellTokenAddress }</p> */}
                                                                             
                   <SearchModal getTokenAddressData={handleBuyFromSearchModel} status={"You Receive"} ></SearchModal>

                
                              <Input value={toAmount} onChange={getPrice}>
                              </Input>
                    
                  </Stack>
                    <Stack direction='row' justifyContent={ "center" }  spacing={ 4 }>
                                     

 

                
                     <Text  fontSize='sm'>
                  $0.00
                  </Text>
                    
                        </Stack>
                        
                </CardBody> 
                        </Card>
                        
                      </ CardBody>
                    </Card>

                
                       {/* bottom Card */}
                                <Card variant = "outline" mt={3}>
                                  <CardBody borderRadius='lg'>
                                    <Stack direction='row' justifyContent={ "space-between" } alignItems={"center"} spacing={ 4 }>
                                                  <Heading size='sm'>Selected route:</Heading>
                                                  <Heading size='sm'>-</Heading>
                                    </Stack>
                                        <Stack direction='row' justifyContent={ "space-between" } alignItems={"center"} spacing={ 4 }>
                                                  <Heading size='sm'>Transaction cost:</Heading>
                                                  <Heading size='sm'>-</Heading>
                                    </Stack>
                                    <Stack direction='row' justifyContent={ "space-between" } alignItems={"center"} spacing={ 4 }>
                                                  <Heading size='sm'>Minimum received:</Heading>
                                                  <Heading size='sm'>-</Heading>
                                    </Stack>
                                  </CardBody> 
                                </Card>


  
                                {/* button Card */}
                                <Card variant = "outline" mt={3}>
                                  <CardBody borderRadius='lg'>
                                  
                                    <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                                    
                                    
                                     <Button onClick={trySwap}  width={'100%'} colorScheme='pink' variant='solid'>
                                            Swap
                                        </Button> 
                                    </Stack>
                                  
                                  </CardBody> 
                                </Card>
                              
                              </CardBody>
                              
                              
                            </Card>      
                    </Box>
                    

                    <Box display={"flex"} flexDirection={"column"}>

                                  <Box minW={800} borderRadius='lg' >
                                    

                                          {/* Sell recive Card */}
                                          <Card  m={"12px"} minW={"lg"} minH={"xs"} width={"100%"} >
                                            <CardBody   borderRadius='lg'>
                                                        
                                    <Button colorScheme="pink" borderRadius={"100%"} h={50} w={50} onClick={getPrice} > <MdRefresh size={"30px"} ></MdRefresh></Button>
  
                      
                                                          
                                                          <Stack direction='column' minH={"200px"} justifyContent={"center"} alignItems={"center"}>

                                                          
                                                          
                                                            <FaChartLine color="pink.500" size={"70px"}></FaChartLine>
                                                                <Heading size='lg'>Introducing Defiwraps Meta Aggregator</Heading>
                        

                                                          <Stack direction='row' justifyContent={"center"} alignItems={"center"}> 

                                                              <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                                                                      <b>&lt; 0.001</b>  (1.03USD)
                                                            </Button>
                                                              <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                                                                      <b>&lt; 0.001</b>  (1.03USD)
                                                            </Button>
                                                              <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                                                                      <b>&lt; 0.001</b>  (1.03USD)
                                                            </Button>
                                                            </Stack>
                                                          </Stack>
                                                        
                                                      <Stack direction='column' minH={"200px"} justifyContent={"center"} alignItems={"center"}>

                                                          
                        <Text>We find the best prices across all of DeFi so you do not have to.
                          <br></br> You can now make sure you are getting the best deal possible

Supporting:</Text>
                                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                                  <b>&lt; 0.001</b>  (1.03USD)
                                                                </Button>
                      </Stack>
                      

                       <Card variant = "outline"  mt={3}>
                                  <CardBody borderRadius='lg'>
                                    <Stack mb={3} direction='row' justifyContent={ "space-between" } alignItems={"center"} >
                            {/* <Heading size='sm'></Heading> */}
                            <Checkbox size='md' colorScheme='pink' defaultChecked>
    Selected
  </Checkbox>
                                                  <Stack direction='row' justifyContent={ "space-between" } alignItems={"center"}>
                                                    <Button borderRadius={50} size={"xs"} colorScheme="green" >
                                                        <b>Best</b>
                                                    </Button>
                                                    <Button borderRadius={50} size={"xs"} colorScheme="gray" leftIcon={<FaGasPump h={ 4 } w={ 4 }> </FaGasPump>} >
                                                          1.03 $
                                                    </Button>
                                                  </Stack>
                                    </Stack>
                          
                                <hr></hr>                          
            <Stack mt={6} direction='row' justifyContent={ "space-between" } alignItems={"center"} >
                           
                            <Stack direction='row' justifyContent={ "space-between" } alignItems={ "center" }>
                                              <img style={ { marginRight: "7px" } } height={ 40 } width={ 40 } src={sellTokenImg}
                              ></img>
                                  <Stack direction='column'>
                                <Heading size='md'>{ sellToken } { sellAmount }</Heading>
                                         
                                        <Text pt={-5} size='xs'>$0.98</Text>
                              </Stack>     
                              <Text color={"pink.500"}  size='xl'>
                                 ●
                            </Text> 
                            </Stack>
                                                            <hr style={ { borderStyle: "dotted", borderTopWidth: "5px", width: "15%" } } ></hr>

                              <Stack direction='row' >
                      
                              <Stack direction='row' width={ "100%" } alignItems={ "center" }>
                             
                                         <Button borderRadius={50} size={"sm"} colorScheme="pink" leftIcon={<I1inch h={ 4 } w={ 4 }> </I1inch>} >
                                                                  <b>1 Inch</b>
                                  </Button>
                            
                              
                                 
                                  
                          </Stack>          
                            </Stack>

                          <hr style={ { borderStyle: "dotted", borderTopWidth: "5px", width: "15%" } } ></hr>
<Heading color={"pink.500"}  size='md'>
                                &rarr;
                            </Heading> 
                            <Stack direction='row' justifyContent={ "space-between" } alignItems={ "center" }>
                                              <img style={ { marginRight: "7px" } } height={ 40 } width={ 40 } src={buyTokenImg}
                              ></img>
                                  <Stack direction='column'>
                                <Heading size='md'>{ toAmount } { buyToken}</Heading>
                                         
                                        <Text pt={-5} size='xs'>$0.98 (-0.40% )</Text>
                                 </Stack>          
                            </Stack>
                                    </Stack>
                                    
                          



                                  </CardBody> 
                                </Card>
                                              

                                            </CardBody> 
                                          </Card>

                                  
                                  </Box>
                              
               
                                
                      
                    </Box>
                    
                  </Box>
                  
               <Box maxW={ 1100} m={ 8 }>
                  <Heading mb={5} >FAQs</Heading>
                  <Accordion allowMultiple allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
                            What is Defiwrap Agrigator?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      You haveprobably heard many DEXes or aggregators claim that they offer the best prices. Well, now you can be sure. We will query all of them at the same time so you do not have to, and you will be able to choose the one that best fits your needs
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Do you stake any fees?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
   No
    </AccordionPanel>
  </AccordionItem>
</Accordion>
                </Box>
     
           
          </div>
         </div>
    </>
    );
  }
  else
  {
    return(
  
    <div className={styles.container}>
      <main className={ styles.main }>
            <h1 className={styles.title}>
            <b>
              <a href="#">Connect your wallet</a>
            </b>
          </h1>

      </main>
    </div>
  )
  }

  
}
