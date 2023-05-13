import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center, Box } from '@chakra-ui/react'
import { FaEthereum, FaQuestionCircle, FaArrowDown, FaArrowsAltH } from 'react-icons/fa';
import { MdSwapHorizontalCircle } from 'react-icons/md';
import { Eth } from "@chakra-icons/cryptocurrency-icons";
import { SearchModal } from "../components/SearchModal";
import { Header } from '../components/layout/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';
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
  return (

    <>
        <div className={styles.container}>
        <main className={styles.main}>
          {/* <h1 className={styles.title}>
            Welcome to <b>
              <a href="#">Dapp Templete</a>
              </b>
          </h1>
          <p className={styles.description}>
            Connect your wallet and start playing around
          </p> */}
          <Card maxW='md'>
            
            <CardBody>

              {/* Select Network Card */}
              <Card variant = "outline">
                <CardBody borderRadius='lg'>
                  {/* <Text mb='8px'>Choose Network:</Text> */}
                  <Heading  mb='8px' size='sm'>Choose Network:</Heading>
                  <Select     focusBorderColor='pink.400'
 placeholder='Select option'>
                    <option value='option1'><Eth></Eth>  Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
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
                                     

                   <SearchModal></SearchModal>

                
                      <Icon as={MdSwapHorizontalCircle} w={10} h={10} color='black' />


                    <Button  leftIcon={<FaQuestionCircle />} rightIcon={<FaArrowDown />} colorScheme='pink' variant='solid'>
                      Select
                    </Button>
                    
                  </Stack>
                </CardBody> 
              </Card>

               {/* How much ETH do you want to invest? Card */}
                <Card variant = "outline" mt={5}>
                  <CardBody borderRadius='lg'>
                    <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                      <Heading  mb='8px' size='sm'>How much ETH do you want to invest?</Heading>  
                    </Stack>
                    <Stack direction='row' justifyContent={ "space-between" } spacing={ 4 }>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          children={ <FaEthereum color='#D53F8C' h={ 10 } w={ 10} />}
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
                   
                    <Button width={'100%'} colorScheme='pink' variant='solid'>
                      Continue
                    </Button>  
                  </Stack>
                 
                </CardBody> 
              </Card>




            
            </CardBody>
            
            
          </Card>

        
          {/* Line chart code starts from Here */ }
          
          <Card minWidth={700} height="720px" ml={3} >
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
