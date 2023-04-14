/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Box ,Tabs, TabList, TabPanels, Tab, TabPanel, Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center, Progress, CircularProgress, CircularProgressLabel, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import styles from "../styles/PositionsDetail.module.css";

import { useState } from "react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import { Eth, Matic } from "@chakra-icons/cryptocurrency-icons";
import { FaArrowDown, FaArrowRight, FaChartLine, FaEthereum, FaQuestionCircle } from "react-icons/fa";
import { DurationModal } from "../components/DurationModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { MdArrowDropDown, MdSwapHorizontalCircle } from "react-icons/md";
import { SearchModal } from "../components/SearchModal";





export default function SignExample() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <>
         <div className={styles.container}>
            <div className={styles.main}>
                

                  <Box display={"flex"} flexDirection={"row"} >
                        <Box minWidth={"410px"} flexDirection={"column"}  borderRadius='lg' >
                            
                  
                                    {/* main card   */}
                            <Card m='12px' maxW='sm'>
                              <CardBody> 
                                
                                {/* Sell recive Card */}
                                <Card>
                                  <CardBody borderRadius='lg'>
                                          <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                                            
                                              <Select iconColor="pink.500" icon={ <FaEthereum /> } placeholder='Ethereum' >
                                                <option value='option1'>Option 1</option>
                                                <option value='option2'>Option 2</option>
                                                <option value='option3'>Option 3</option>
                                              </Select>
                                          </Stack>
                                  </CardBody> 
                                </Card>


                                 {/* Sell recive Card */}
              <Card mt={5}>
                <CardBody borderRadius='lg'>
                  <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                    <Heading  mb='5px' size='sm'>Sell</Heading>
                    <Heading  mb='5px' pr={ 1 } size='sm'>Receive</Heading>
                  </Stack>
                  <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                                     

                   <SearchModal></SearchModal>

                
                      <Icon as={MdSwapHorizontalCircle} w={10} h={10} color='black' />


                    <Button  leftIcon={<FaQuestionCircle />} rightIcon={<FaArrowDown />} colorScheme='pink' variant='solid'>
                      Select
                    </Button>
                    
                  </Stack>
                </CardBody> 
              </Card>
                                


                              

                       {/* bottom Card */}
                                <Card mt={3}>
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
                                                  <Heading size='sm'>Minimum received:
</Heading>
                                                  <Heading size='sm'>-</Heading>
                                    </Stack>
                                  
                                  </CardBody> 
                                </Card>


  
                                {/* button Card */}
                                <Card mt={3}>
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
                                          <Card m={"12px"} minW={"lg"} minH={"xs"} width={"100%"} >
                                            <CardBody   borderRadius='lg'>
                                                        
                                    
                                                  
                                                          
                                                          <Stack direction='column' minH={"200px"} justifyContent={"center"} alignItems={"center"}>

                                                          
                                                          
                                                            <FaChartLine color="pink.500" size={"70px"}></FaChartLine>
                                                                <Heading size='lg'>Introducing Mean Defiwrap's Meta Aggregator</Heading>
                        

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

                                                          
                        <Text>We find the best prices across all of DeFi so you don't have to.
                          <br></br> You can now make sure you are getting the best deal possible

Supporting:</Text>
                                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                                  <b>&lt; 0.001</b>  (1.03USD)
                                                                </Button>
                                                          </Stack>
                                              

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
      You've probably heard many DEXes or aggregators claim that they offer the best prices. Well, now you can be sure. We will query all of them at the same time so you don't have to, and you will be able to choose the one that best fits your needs
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
