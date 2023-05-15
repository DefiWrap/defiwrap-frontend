import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center, Box, useDisclosure, Textarea, Flex } from '@chakra-ui/react'
import { FaEthereum, FaQuestionCircle, FaArrowDown, FaArrowsAltH } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropDownCircle, MdArrowDropUp, MdSwapHorizontalCircle } from 'react-icons/md';
import { Eth } from "@chakra-icons/cryptocurrency-icons";
import { SearchTokenModal } from "../components/SearchTokenModal";
import { Header } from '../components/layout/Header';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Chart from "../components/Chart";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";


import chainlist from "../../data/chains.json"
import protocols from "../../data/protocols.json"

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Fade, ScaleFade, Slide, SlideFade, Collapse ,FormErrorMessage,
  FormLabel,
  FormControl, } from '@chakra-ui/react'

import { useForm } from "react-hook-form";

const steps = [{ label: "Step 1" }, { label: "Step 2" }];


const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];



  

// const [chartData, setChartData] = useState([]);
// const endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30';


// const fetchData = async () =>
// {

//   const response = await axios.get(endpoint);
//   const prices = response.data.market_data.sparkline_7d.price;
//   const data = Array.from({ length: prices.length }, (_, i) => ({
//     name: '',
//     price: prices[i],
//   }));
//   setChartData(data);
// };
  


const Home: NextPage = () =>
{

  // validations
   const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  function onSubmit(values : any) {
    return new Promise((resolve) => {
      
        alert(values);
      
    });
  }

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;


const chart = (interval: string | number) => (
    <ResponsiveContainer height={500} width={800}>
      <LineChart data={data} margin={{ right: 15, top: 10 }}>
        <CartesianGrid stroke="#" />
        <XAxis dataKey="name" interval={interval} />
        <YAxis interval={interval} />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#3182CE"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );



  const [chains, setChains] = useState(chainlist)

  const dataFetch = async () => {
  try {
    const response = await fetch(chainlist);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setChains(data);
  } catch (error) {
    console.error('There was a problem fetching data:', error);
  }
  };
  
  const [protocol, setProtocol] = useState(protocols)
    const protocolsFetch = async () => {
  try {
    const response = await fetch(protocols);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setProtocol(data);
  } catch (error) {
    console.error('There was a problem fetching data:', error);
  }
};

  useEffect(() => {
    
protocolsFetch()
    dataFetch();
    console.log("chain list data ========>>>>>>",chains)

  }, [ chains, protocols ] );

  const [ sellTokenAddress, setSellTokenAddress ] = useState( "" )
  const [ buyTokenAddress, setBuyTokenAddress ] = useState( "" )
  const [ buyToken, setBuyToken ] = useState( "" )
  const [ buyTokenImg, setbuyTokenImg ] = useState( "" )
  const [ sellAmount, setSellamount ] = useState( 0 )
  const [ sellToken, setSellToken ] = useState( "" )
  const [ sellTokenImg, setSellTokenImg ] = useState( "" )

 const handleSellInvest = ( sellTokenData: any ) =>
  {
   // console.log("buyTokenData",JSON.parse(sellTokenData).symbol)
    setSellTokenAddress( JSON.parse( sellTokenData ).address );
    setSellToken( JSON.parse( sellTokenData ).symbol )
    setSellTokenImg(JSON.parse( sellTokenData ).logoURI)
          
          console.log("Buy token ======>>>>>>>>",sellTokenAddress)

  };

    const handleBuyInvest = ( buyTokenData: any ) =>
  {
  
    //console.log("buyTokenData",JSON.parse(buyTokenData).symbol)
    setBuyTokenAddress( JSON.parse( buyTokenData ).address );
    setBuyToken( JSON.parse( buyTokenData ).symbol )
    setbuyTokenImg(JSON.parse( buyTokenData ).logoURI)
    
          console.log("Buy token ======>>>>>>>>",buyTokenAddress)

  };
  
  return (

    <>
        <div className={styles.container}>
        <main className={styles.main}>
         
          
          <Card  height="810px" minWidth="450px" maxW='md'>
            
            <CardBody>

              <Flex>
    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            {/* <FormControl isInvalid={errors.name}> */}
              {/* <FormLabel htmlFor="name">First name</FormLabel>
              <Input
                id="name"
                placeholder="name"
                {...register("name", {
                  required: "This is required",
                  minLength: { value: 4, message: "Minimum length should be 4" }
                })}
              /> */}
        <Steps visibility={"hidden"} ml="-10px" colorScheme="pink" activeStep={activeStep}>

          <Step key="Step 1">
              <Box sx={{  rounded: "md" }}>
              <div>
                      {/* Select Network Card */}
                      <Card variant = "outline">
                      <CardBody borderRadius='lg'>
                          {/* <Text mb='8px'>Choose Network:</Text> */}
                          <Heading  mb='8px' size='sm'>Choose Network:</Heading>
                                      <Select id="network"
                                        icon={ <img src="https://ecoswap.exchange/tokens/0x38/BNB-0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE.svg" ></img> }
                                        focusBorderColor='pink.400'
                                        placeholder='Select option'
                                        {...register("name", {
                                          required: "Please select the network",
                                          
                                        })}
                                      >
                                      
                        
                            { chains.map( item => (
                                
                              
                              <option  value={ item.name }> <img style = {{width:"50px", height:"50px", borderRadius:"50%"}} src={item.logoURI} ></img>{ item.name }</option>
                              

                              ))}
                          </Select>
                              <FormErrorMessage>
                                        <Text> {errors.name}</Text>
                              </FormErrorMessage>
                          <Heading mt={5}  mb='8px' size='sm'>Choose Protocol:</Heading>

                          <Select id="protocol" {...register("protocol", {
                                          required: "Please select the protocol",
                                          
                          } ) }
                          icon={ <img src="https://icon-library.com/images/swap-icon-png/swap-icon-png-16.jpg" ></img> } focusBorderColor='pink.400' placeholder='Select option'>
                            
                        
                            { protocol.map( item => (
                                
                              
                              <option  value={ item.name }> <img style = {{width:"50px", height:"50px", borderRadius:"50%"}} src={item.logoURI} ></img>{ item.name }</option>
                              

                              ))}
                                      </Select>
                                      <FormErrorMessage>
                                        <Text> {errors.protocol}</Text>
                              </FormErrorMessage>
                        </CardBody> 
                      </Card>
                      
                      {/* Sell recive Card */}
                      <Card variant = "outline" mt={5}>
                        <CardBody borderRadius='lg'>
                          <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                            <Heading  mb='5px' size='sm'>Sell</Heading>
                            <Heading  mb='5px' pr={ 1 } size='sm'>Receive</Heading>
                          </Stack>
                          <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                                            

                          <SearchTokenModal getTokenAddressData={handleSellInvest}></SearchTokenModal>

                        
                              <Icon as={MdSwapHorizontalCircle} w={10} h={10} color='black' />


                            {/* <Button  leftIcon={<FaQuestionCircle />} rightIcon={<FaArrowDown />} colorScheme='pink' variant='solid'>
                              Select
                            </Button> */}
                            <SearchTokenModal getTokenAddressData={handleBuyInvest}></SearchTokenModal>
                            
                          </Stack>
                        </CardBody> 
                      </Card>

                      {/* How much ETH do you want to invest? Card */}
                        <Card variant = "outline" mt={5}>
                          <CardBody borderRadius='lg'>
                            <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                              <Heading  mb='8px' size='sm'>How much {sellToken} do you want to invest?</Heading>  
                            </Stack>
                            <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents='none'
                                children={
                                  
                                  // <FaEthereum color='#D53F8C' h={ 10 } w={ 10 } />
                                  <img src={sellTokenImg} height={20} width={20} ></img>
                                
                                }
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


                      {/* Executes Card */}
                      <Card variant = "outline" mt={5}>
                        <CardBody borderRadius='lg'>
                          <Stack spacing={ 4 }>
                        <Heading  fontSize='lg' mb={7}>
                        Executes
                        </Heading>
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


                      
                      {/* Executes Card */}
                <Card variant = "outline" mt={5}>
                  <CardBody borderRadius='lg'>
                        
                    <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                          
                                    {/* <Button width={'100%'} colorScheme='pink' variant='solid'>
                                      Continue
                                    </Button>   */}
                                {hasCompletedAllSteps && (
                                  <Box sx={{  my: 8, p: 8, rounded: "md" }}>
                                    <Heading fontSize="xl" textAlign={"center"} >
                                      Woohoo! All steps completed! 🎉
                                    </Heading>
                                  </Box>
                                )}
                          <Flex width="100%" justify="flex-end" gap={4}>
                              {hasCompletedAllSteps ? (
                                <Button width={'100%'} colorScheme='pink' variant={"solid"} onClick={reset}>
                                  Start Over
                                </Button>
                              ) : (
                                <>
                                  <Button type="submit" width={'100%'} colorScheme='pink' variant={"solid"} onClick={nextStep}>
                                    {isLastStep ? "Finish" : "Continue"}
                                  </Button>
                                </>
                              )}
                          </Flex>
                      </Stack>
                  </CardBody> 
                </Card>
              </div>
            </Box>
          </Step>
  
        
          <Step key="Step 2">
      
    <Card width={ "100%" }>
      <CardBody borderRadius='lg'>
                  {/* You'll Invest Card */ }
                  
                    <Card variant="outline" mt={ 5 } >
                          <CardBody borderRadius='lg'>
                      <Button
                        leftIcon={<ArrowBackIcon></ArrowBackIcon>}
                                isDisabled={activeStep === 0}
                                onClick={prevStep}
                        width={ '100%' } colorScheme='pink' variant={ "outline" }
                        
                              >
                                Go Back
                                      </Button>
                            </CardBody>
                  </Card>

                  <Card variant = "outline" mt={5}>
                  <CardBody borderRadius='lg'>
                    <Stack direction='row' justifyContent={ "flex-start" } alignItems={"flex-end"} spacing={ 4 }>
                              <Heading mb='8px' size='sm'>You'll Invest</Heading>  
                              <Button leftIcon={<Eth></Eth>} colorScheme='pink' variant='outline'>
                        0.0014
                      </Button>
                    </Stack>
                    <Stack mt={5} direction='row' justifyContent={ "flex-start" } alignItems={"flex-end"} spacing={ 4 }>
                              <Heading mb='8px' size='sm'>We'll Swap</Heading>  
                              <Button leftIcon={<Eth></Eth>} colorScheme='pink' variant='outline'>
                                0.004
                              </Button>
                              <Heading mb='8px' size='sm'>Everyday for</Heading> 
                            

                    </Stack>
                    <Stack mt={5} direction='row' justifyContent={ "flex-start" } alignItems={"flex-end"} spacing={ 4 }>
                            <Button colorScheme='pink' variant='outline'>
                                1
                              </Button>
                              <Heading mb='8px' size='sm'>days</Heading> 
                    </Stack>
                      
                  
                  
                  </CardBody> 
                  </Card>
                  
                  <Card variant="outline" mt={ 5 } >
                          <CardBody borderRadius='lg'>
                                        <Button
                                isDisabled={activeStep === 0}
                                // onClick={prevStep}
                                width={'100%'} colorScheme='pink' variant={"solid"}
                              >
                                Create Position
                                      </Button>
                            </CardBody>
                  </Card>
          
      </CardBody>
    </Card>
      
           </Step>

      </Steps>
                               
            {/* </FormControl> */}
                              {/* <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                                Submit
                              </Button> */}
    {/* </form> */}
      
     
                

              </Flex>
    
            </CardBody>
            
            
          </Card>

        
          {/* Line chart code starts from Here */ }
          
          <Card minWidth={700} height="810px" ml={3} >
            <CardBody>
              <Heading size={ "lg" }>$1906.36 USD</Heading>
         
              <Stack style={{display:"flex",flexDirection:"row", alignItems:"flex-end"}} >
                <Heading color={"blue.500"}  pr={1} size='md'> ● </Heading> <Text>DefiWrap</Text>   <Heading color={"green.500"} pl={5} size='md' pr={1}> ● </Heading> <Text>DefiLlama</Text> 
              </Stack>
            


            
      {chart("preserveStart")}
            </CardBody>
          </Card>
      
          
        </main>
        </div>
    </>
  );
};

export default Home;
