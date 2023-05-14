/* eslint-disable react-hooks/rules-of-hooks */
// @ts-ignore
import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Box ,Tabs, TabList, TabPanels, Tab, TabPanel, Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center, Progress, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import styles from "../styles/PositionsDetail.module.css";

import { useState } from "react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import { Eth, Bnb } from "@chakra-icons/cryptocurrency-icons";
import { FaArrowRight, FaChartLine } from "react-icons/fa";
import { DurationModal } from "../components/DurationModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { MdArrowDropDown } from "react-icons/md";




export default function SignExample() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <>
         <div className={styles.container}>
            <div className={styles.main}>
                
            <Text mt={3} fontSize={"3xl"}>
              <b>
                    <a href="#"> <ArrowBackIcon></ArrowBackIcon> Back to positions</a>
                  </b>
            </Text>
            
            
            
            
            <Tabs mt={5}  variant='enclosed'>
                      <TabList>
                        <Tab _selected={{ color: 'white', bg: '#D53F8C' }}>View Summary</Tab>
                        <Tab _selected={{ color: 'white', bg: '#D53F8C' }}>View Permissions</Tab>
                      </TabList>
                  <TabPanels>
                <TabPanel>
                  



                  <Box display={"flex"} flexDirection={"row"} >
                        <Box minWidth={"410px"} flexDirection={"column"}  borderRadius='lg' >
                            
                  
                                    {/* main card   */}
                            <Card variant = "outline" m='12px' maxW='sm'>
                              <CardBody>

                            
                                
                                {/* Sell recive Card */}
                                <Card variant = "outline">
                                  <CardBody borderRadius='lg'>
                                              <Stack direction='row' justifyContent={ "space-between" } alignItems={"center"} spacing={ 4 }>
                                                
                                                <Stack direction='row' alignItems={"center"}>

                                                  <Eth h={ 7 } w={ 7 }>
                                                  </Eth>
                                                  <Heading size='sm'>Eth</Heading>
                                                  <FaArrowRight></FaArrowRight>
                                                  <Bnb h={ 7 } w={ 7 }>
                                                  </Bnb>
                                                  <Heading size='sm'>BNB</Heading>
                                                </Stack>
                                      
                                    </Stack>
                                                                                    <Progress borderRadius={50} mt={3} colorScheme='pink' size='sm' value={100} />

                                  </CardBody> 
                                </Card>

                                {/*Eth to bnb card */}
                                  <Card variant = "outline">
                                    <CardBody borderRadius='lg'>
                                      <Stack direction='row' alignItems={"center"}>
                                        <Text  fontSize='sm'>
                                          Time left : <b>2 Days left</b> (2 swaps)
                                        </Text>
                                      </Stack>
                                      <Stack mt={2} direction='row' alignItems={"center"}>
                                        <Text  fontSize='sm'>
                                          Executed : (0 swaps)
                                        </Text>
                            </Stack>
                            <Stack mt={2} direction='row' alignItems={"center"}>
                                        <Text  fontSize='sm'>
                                          Next swap : <b>in 10 hours</b>
                                        </Text>
                            </Stack>
                            <Stack mt={2} direction='row' alignItems={"center"}>
                                        <Text  fontSize='sm'>
                                          Average buy price : No swaps yet
                                        </Text>
                                      </Stack>
                            
                                      <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            Swaped :
                                          </Text>
                                                  
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Bnb h={ 4 } w={ 4 }> </Bnb>} variant='outline'>
                                                     0 
                                                </Button>
                                            
                                      </Stack>
                                      <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            To withdrow :
                                          </Text>
                                                  
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Bnb h={ 4 } w={ 4 }> </Bnb>} variant='outline'>
                                                    0 
                                                </Button>


                                            
                            </Stack>
                            
                                  <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            Rate :
                                          </Text>
                                                  
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                   <b>&lt; 0.001</b>  (1.03USD)
                                                </Button>


                                            <Text  fontSize='sm'>
                                            every day
                                          </Text>
                                  </Stack>
                            
                                  <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            Remaining :
                                          </Text>
                                                  
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Bnb h={ 4 } w={ 4 }> </Bnb>} variant='outline'>
                                                     <b>0.001</b>  (1.03USD)
                                                </Button>


                                            
                                      </Stack>
                                     <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            To withdrow :
                                          </Text>
                                                  
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Bnb h={ 4 } w={ 4 }> </Bnb>} variant='outline'>
                                                     0
                                                </Button>


                                            
                                      </Stack>      
                                      

                                    </CardBody> 
                                  </Card>


                                


                                
                                {/* Executes Card */}
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
                                          <Card variant = "outline" m={"12px"} minW={"lg"} minH={"xs"} width={"100%"} >
                                            <CardBody   borderRadius='lg'>
                                                        <Stack direction='row' justifyContent={ "space-between" } alignItems={"center"} spacing={ 4 }>
                                                          
                                                          <Stack direction='row' alignItems={"center"}>

                                                          
                                                            <Heading color={"pink.500"} size='xs'> ● Market Price</Heading>
                                                            
                                                            <Heading size='xs'> ● Average Buy Price</Heading>
                                                          </Stack>
                                                          <Select size={"xs"} w={300} icon={<MdArrowDropDown />} placeholder='Average Buy Price' />
                                                          </Stack>
                                    
                                                  
                                                          
                                                          <Stack direction='column' minH={"200px"} justifyContent={"center"} alignItems={"center"}>

                                                          
                                                          
                                                            <FaChartLine color="pink.500" size={"70px"}></FaChartLine>
                                                            <Heading size='lg'>There is no data available </Heading>
                                                          </Stack>
                                                        


                                            </CardBody> 
                                          </Card>

                                  
                                  </Box>
                              


                                  <Box minW={800} borderRadius='lg' >
                                        

                                              {/* Sell recive Card */}
                                              <Card variant = "outline" m={"12px"} minW={"lg"} minH={"150px"} width={"100%"} >
                                                <CardBody   borderRadius='lg'>
                                                            <Stack direction='row' justifyContent={ "space-between" } alignItems={"center"} spacing={ 4 }>
                                                              
                                                              <Stack direction='row' alignItems={"center"}>

                                                              
                                                                <Heading color={"pink.500"} size='xs'> Timeline</Heading>
                                                                
                                                               
                                                              </Stack>

            <Tabs mt={5}  variant='enclosed'>
                      <TabList>
                                  <Tab _selected={{ color: 'white', bg: '#D53F8C' }}><Heading size='xs'> All</Heading></Tab>
                                  <Tab _selected={ { color: 'white', bg: '#D53F8C' } }>Swap</Tab>
                                  <Tab _selected={ { color: 'white', bg: '#D53F8C' } }>Modifications</Tab>
                                  <Tab _selected={{ color: 'white', bg: '#D53F8C' }}>Withdrows</Tab>
                      </TabList>
                  <TabPanels>
                  <TabPanel>
                  
                  
                </TabPanel>
                <TabPanel>
                     
                  </TabPanel>
                </TabPanels>
            </Tabs>


                                                              </Stack>
                                        
                                                      
                                                              
                             <Stack direction='column' minH={"200px"} justifyContent={"left"} alignItems={"left"}>

                                                              
                                                              
                                        <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            <b>Position Created</b>
                                          </Text>
                                       </Stack>
                                       <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            Rate :
                                          </Text>
                                                  
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                   <b>&lt; 0.001</b>  (1.03USD)
                                                </Button>

                                         <Text  fontSize='sm'>
                                            every day
                                          </Text>
                                        </Stack>
                                <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            Set to run for : <b>2 Days</b>
                                          </Text>
                                       </Stack>
                            </Stack>
                                                            


                                                </CardBody> 
                                              </Card>

                                      
                                  </Box>
                      
                    </Box>
                    
                  </Box>
                  
              </TabPanel>
                <TabPanel>
                      <Box className={styles.innerbox} borderRadius='lg' >
                              <Heading mb='8px' size='xl'>
                                No closed positions yet.
                              </Heading>  
                        </Box>
                  </TabPanel>
                </TabPanels>
            </Tabs>
           
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
