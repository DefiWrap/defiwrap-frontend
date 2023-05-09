/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Box ,Tabs, TabList, TabPanels, Tab, TabPanel, Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center, Progress, CircularProgress, CircularProgressLabel, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Checkbox } from '@chakra-ui/react'
import styles from "../styles/PositionsDetail.module.css";

import { useState,useEffect } from "react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import { Eth, Matic } from "@chakra-icons/cryptocurrency-icons";
import { FaArrowDown, FaArrowRight, FaChartLine, FaDeploydog, FaDrawPolygon, FaEthereum, FaGasPump, FaQuestionCircle } from "react-icons/fa";
import { DurationModal } from "../components/DurationModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { MdArrowDropDown, MdSwapHorizontalCircle } from "react-icons/md";
import { SearchModal } from "../components/SearchModal";
import { ethers } from "ethers";





export default function SignExample() {
  const { isConnected } = useAccount();

  
  const [ sellTokenAddress, setSellTokenAddress ] = useState( "" )
  const [ buyTokenAddress, setBuyTokenAddress ] = useState( "" )
  const [ sellAmount, setSellamount ] = useState( 0 )
  const [ sellToken, setSellToken ] = useState( "" )
  const [ buyToken, setbuyToken ] = useState( "" )
 
  


  const handleBuyFromSearchModel = ( buyTokenData: any ) =>
  {
  
    //console.log("buyTokenData",JSON.parse(buyTokenData).symbol)
    setBuyTokenAddress( JSON.parse( buyTokenData ).address );
          console.log("Buy token ======>>>>>>>>",buyTokenAddress)

  };


  const handleSellFromSearchModel = ( sellTokenData: any ) =>
  {
   // console.log("buyTokenData",JSON.parse(sellTokenData).symbol)
    setSellTokenAddress( JSON.parse( sellTokenData ).address );
          console.log("Sell token ======>>>>>>>>",sellTokenAddress)

  };

const [tokens, setTokens] = useState([])
 async  function getQuote ()
  {
    
 const provider = new ethers.providers.Web3Provider(window.ethereum);

  const accounts = await provider.listAccounts();
   console.log( accounts[ 0 ] );
   
const qs = require('qs');

const params = {
    // Not all token symbols are supported. The address of the token can be used instead.
    sellToken: sellTokenAddress,
    buyToken: buyTokenAddress,
    // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
  sellAmount: ( sellAmount * 10 ** 18 ),
   // takerAddress:accounts[0],
};

 const headers : string = '0x-api-key: e6ab47d1-f31a-4dcd-8eea-abe2ef56d74e'; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)
// --header '0x-api-key: e6ab47d1-f31a-4dcd-8eea-abe2ef56d74e
   const url = `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
const response = await fetch(
    url//, { headers : String }
); // Using the global fetch() method. Learn more https://developer.mozilla.org/en-US/docs/Web/API/fetch
console.log("ResponseURL =============>>>>>>>>>>>>>",url);

console.log("Response =============>>>>>>>>>>>>>",await response.json());
  }

   useEffect(() => {
      getQuote()
     
   }, [] )
  
  
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
                        <Button onClick={getQuote}>GO</Button>
                                          <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                                           
                                              <Select iconColor="pink.500" icon={ <FaDrawPolygon /> } placeholder='Polygon' >
                                                <option value='option1'>Option 1</option>
                                                <option value='option2'>Option 2</option>
                                                <option value='option3'>Option 3</option>
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
                                     
                              <p>Data from child component: {buyTokenAddress}</p>
                              

                   <SearchModal getTokenAddressData={handleBuyFromSearchModel}  status={"You Sell"}></SearchModal>

                
                     <Input onBlur={e=> setSellamount(Number(e.target.value))} style={{  textAlign:"center"}} placeholder="0"></Input>
                    
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
                                     
                                                  <p>Data from child component: { sellTokenAddress }</p>
                                                                             
                   <SearchModal getTokenAddressData={handleSellFromSearchModel} status={"You Receive"} ></SearchModal>

                
                              <Input>
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
                                    
                                    
                                     <DurationModal></DurationModal>
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
                                              <img style={ { marginRight: "7px" } } height={ 40 } width={ 40 } src="https://cdn.furucombo.app/assets/img/token/1INCH.svg"
                              ></img>
                                  <Stack direction='column'>
                                        <Heading size='md'>1 Matic</Heading>
                                         
                                        <Text pt={-5} size='xs'>$0.98</Text>
                              </Stack>     
                              <Text color={"pink.500"}  size='xl'>
                                 ●
                            </Text> 
                            </Stack>
                                                            <hr style={ { borderStyle: "dotted", borderTopWidth: "5px", width: "15%" } } ></hr>

                              <Stack direction='row' >
                      
                              <Stack direction='row' width={ "100%" } alignItems={ "center" }>
                             
                                         <Button borderRadius={50} size={"sm"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} >
                                                                  <b>KyberSwap</b>
                                  </Button>
                            
                              
                                 
                                  
                          </Stack>          
                            </Stack>

                          <hr style={ { borderStyle: "dotted", borderTopWidth: "5px", width: "15%" } } ></hr>
<Heading color={"pink.500"}  size='md'>
                                &rarr;
                            </Heading> 
                            <Stack direction='row' justifyContent={ "space-between" } alignItems={ "center" }>
                                              <img style={ { marginRight: "7px" } } height={ 40 } width={ 40 } src="https://cdn.furucombo.app/assets/img/token/1INCH.svg"
                              ></img>
                                  <Stack direction='column'>
                                        <Heading size='md'>14.1 TUT</Heading>
                                         
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
