/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Box ,Tabs, TabList, TabPanels, Tab, TabPanel, Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center, Progress, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import styles from "../styles/Positions.module.css";

import { useState } from "react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import { Eth, Matic } from "@chakra-icons/cryptocurrency-icons";
import { FaArrowRight } from "react-icons/fa";
import { DurationModal } from "../components/DurationModal";




export default function SignExample() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <>
         <div className={styles.container}>
            <div className={styles.main}>
                
            <Text mt={3} fontSize={"3xl"}>
              <b>
                    <a href="#">Your positions</a>
                  </b>
            </Text>
            <Text mt={1}>
              Here you will see the details of your open positions and be able to see further details about them. You will only be able to interact with them if you are on the correct network.
            </Text>
            <div style={ { display: "flex" , padding: "15px" } } >
              <Box mr={20}  className={styles.topbox} borderRadius='lg' >
                <Text m='12px' size='sm'>
                  On going Positions
                </Text>  

                <div  style={{display:"flex", flexDirection:"row", alignItems:"center", margin:"10px"}} >
                  <CircularProgress size={"150px"} thickness={"8px"} value={100} color='red.400'>
                    <CircularProgressLabel mt={-3}>
                      1
                      
                    </CircularProgressLabel>
                    <CircularProgressLabel mt={5} fontSize={"15px"}>
                      Positions
                      
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text ml={5} color={"red.500"}  size='lg'>
                      ●
                  </Text> 
                  <Text ml={5} size='sm'>
                    Matic
                  </Text> 
                  <Box ml={5} w={"100%"}>
                    <Progress borderRadius={50}  colorScheme='red' size='sm' value={100} />
                  </Box>
                  <Text ml={5} mr={2} size='sm'>
                    1
                  </Text> 
                </div>
                
              </Box>
              <Box mr={20}  className={styles.topbox} borderRadius='lg' >
                <Text m='12px' size='sm'>
                  Total Value
                </Text>  

                <div  style={{display:"flex", flexDirection:"row", alignItems:"center", margin:"10px"}} >
                  <CircularProgress size={"150px"} thickness={"8px"} value={100} color='blue.400'>
                    <CircularProgressLabel fontSize={"26px"} mt={-3}>
                      $256.8
                    </CircularProgressLabel>
                    <CircularProgressLabel mt={5} fontSize={"15px"}>
                      USD
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text ml={5} color={"blue.500"}  size='lg'>
                      ●
                  </Text> 
                  <Text ml={5} size='sm'>
                    Eth
                  </Text> 
                  <Box ml={5} w={"100%"}>
                    <Progress borderRadius={50}  colorScheme='blue' size='sm' value={100} />
                  </Box>
                  <Text ml={5} mr={2} size='sm'>
                    0.0011
                  </Text> 
                </div>
                
              </Box>
             
            </div>
           <br />
           <br />
           <br />
            
            
                <Tabs mt={5}  variant='enclosed'>
                      <TabList>
                        <Tab _selected={{ color: 'white', bg: '#D53F8C' }}>Open Positions</Tab>
                        <Tab _selected={{ color: 'white', bg: '#D53F8C' }}>Closed Positions</Tab>
                      </TabList>
                  <TabPanels>
                        <TabPanel>
                        <Box flexDirection={"column"} className={styles.innerboxactive} borderRadius='lg' >
                            
                    <Heading m='12px' size='sm'>Active</Heading>

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
                                                  <Matic h={ 7 } w={ 7 }>
                                                  </Matic>
                                                  <Heading size='sm'>Matic</Heading>
                                                </Stack>
                                      
                                      <Heading   pr={ 1 } size='sm'>2 Days Left</Heading>
                                    </Stack>
                                  
                                  </CardBody> 
                                </Card>

                                {/*Eth to matic card */}
                                  <Card variant = "outline" mt={2}>
                                    <CardBody borderRadius='lg'>
                                      <Stack mt={2} direction='row' alignItems={"center"}>
                                        <Text  fontSize='sm'>
                                          Remaining :
                                        </Text>
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                    &lt; 0.0011 
                                                </Button>
                                      </Stack>
                                      <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            Rate :
                                          </Text>
                                                  
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                    &lt; 0.001 
                                                </Button>

                                                <Text  fontSize='sm'>
                                            daily
                                          </Text>
                                            
                                      </Stack>
                                      <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            To withdrow :
                                          </Text>
                                                  
                                                <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Matic h={ 4 } w={ 4 }> </Matic>} variant='outline'>
                                                    0 
                                                </Button>


                                            
                                      </Stack>
                                      <Stack mt={2} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            Next swap : in 10 Hours
                                          </Text> 
                                      </Stack>   

                                      <Stack mt={5} direction='row' alignItems={"center"}>
                                          <Text  fontSize='sm'>
                                            Position not generating yields
                                          </Text> 
                                      </Stack>        
                                      
                                                  <Progress borderRadius={50} mt={3} colorScheme='pink' size='sm' value={100} />

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
                        <Box className={styles.innerbox} borderRadius='lg' >
                              <Heading mb='8px' size='xl'>
                                No open positions yet.
                              </Heading>  
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
