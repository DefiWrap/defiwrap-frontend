/* eslint-disable react-hooks/rules-of-hooks */
// @ts-ignore
import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Flex,Box ,Tabs, TabList, TabPanels, Tab, TabPanel, Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center, Progress, CircularProgress, CircularProgressLabel, SimpleGrid } from '@chakra-ui/react'
import styles from "../styles/Launch.module.css";
import { FaAccessibleIcon, FaDochub, FaGasPump, FaMoneyCheck, FaOutdent, FaRocket, FaVideo } from "react-icons/fa";




export default function Landing() {

    return (
      <>
        <div className={styles.container}>
            <div className={ styles.main }>
                    <Card
                        style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center",}}
                        h="70%" w="100%" backgroundImage={ "./bg.jpg" } backgroundSize={ "contain" } backgroundBlendMode={ "darken" } variant="outline" borderRadius={ "3xl" }> 
                        <Flex style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"120px",margin:"1.5rem"}} >
                            <Heading textAlign={"center"} color={"pink.500"} >Better Investment Metrics</Heading>
                             <Heading textAlign={"center"} size={"xl"}> Streamline Your Investments with a Diverse DEX Portfolio</Heading>
                             <Heading textAlign={"center"} mt={4} size={"md"}> Simplify Your Investment Strategy with Decentralized Dollar-Cost Averaging </Heading>
                        </Flex>
                        <Flex style={ { display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "20px",margin:"1rem" } } >
                            <Button mr={10} variant={ "solid" } colorScheme="pink" leftIcon={ <FaRocket></FaRocket> }>Launch Now</Button>
                            <Button  variant={"outline"} colorScheme="pink" leftIcon={<FaVideo></FaVideo>}>Watch Video</Button>
                            
                        </Flex>
                        <Flex style={{display:"flex",flexDirection:"row", justifyContent:"center", animation:"ease-in"}} >
                            <img  style={ { marginTop:"50px", borderStyle:"solid", borderRadius:"1rem",borderWidth:"5px", borderColor:"#EA4C89"} } width={ "80%" } src='./swap_new_final.png'></img>
                        </Flex>
                </Card>
                <Box className={styles.topmobilemargin}  mb={"70px"} w="100%" borderRadius={ "3xl" }> 
                        <Flex style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"100px"}} >
                            <Heading  color={"pink.500"}>Hight Impact Results</Heading>
                             <Heading textAlign={"center"} mt={3} size={"xl"}>Strategies Focused on Your Performance</Heading>
                             <Heading textAlign={"center"} mt={4} size={"md"}>We help our clients achieve tangible, high-impact results.</Heading>
                        </Flex>
                        <SimpleGrid display={"flex"} flexDirection={"row"} justifyContent={"center"} flexWrap={"wrap"} spacing={4} mt={"30px"} >
                            <Card borderRadius={"xl"} >
                                <CardBody style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}} >
                                   <Heading color="pink.500" size='xl'><FaMoneyCheck></FaMoneyCheck></Heading>
                                    <Heading mt={5} size='md'>No Extra Fees</Heading>
                                    <Text textAlign={"center"} mt={2}>View a summary of all your customers over the last month.</Text>
                                </CardBody>
                            </Card>
                            <Card borderRadius={"xl"} >
                                <CardBody style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}} >
                                   <Heading color="pink.500" size='xl'><FaOutdent></FaOutdent></Heading>
                                    <Heading mt={5} size='md'>Withdrow Anytime</Heading>
                                    <Text textAlign={"center"} mt={2}>View a summary of all your customers over the last month.</Text>
                                </CardBody>
                            </Card>
                            <Card borderRadius={"xl"} >
                                <CardBody style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}} >
                                   <Heading color="pink.500" size='xl'><FaGasPump></FaGasPump></Heading>
                                    <Heading mt={5} size='md'>Lowest Gas Fees</Heading>
                                    <Text textAlign={"center"} mt={2}>View a summary of all your customers over the last month.</Text>
                                </CardBody>
                            </Card>
                            {/* <Card borderRadius={"xl"} >
                                <CardBody style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}} >
                                   <Heading color="pink.500" size='xl'><FaDochub></FaDochub></Heading>
                                    <Heading mt={5} size='md'>No KYC Required</Heading>
                                    <Text textAlign={"center"} mt={2}>View a summary of all your customers over the last month.</Text>
                                </CardBody>
                            </Card> */}
                            
                            
                        </SimpleGrid>
                </Box>    
            </div>
        </div>
    </>
  
    )

  
}
