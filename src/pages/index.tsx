import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Input ,InputLeftElement, InputGroup, Icon, Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Text, Image, Stack, Heading, SelectField, Select, Center } from '@chakra-ui/react'
import { FaEthereum, FaQuestionCircle, FaArrowDown, FaArrowsAltH } from 'react-icons/fa';
import { MdSwapHorizontalCircle } from 'react-icons/md';
import { Eth } from "@chakra-icons/cryptocurrency-icons";
import { SearchModal } from "../components/SearchModal";





const Home: NextPage = () => {
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
        <Card variant = "outline" maxW='md'>
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
        </main>
        </div>
    </>
  );
};

export default Home;
