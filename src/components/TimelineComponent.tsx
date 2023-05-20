import { Eth } from '@chakra-icons/cryptocurrency-icons';
import {  ExternalLinkIcon, LinkIcon } from '@chakra-ui/icons';
import {
  VStack,
  Heading,
  Box,
  Link,
  Container,
  BoxProps,
  Circle,
  Flex,
  useColorModeValue,
  Button,
  Stack,
  Tabs,
  TabList,
  Tab
} from '@chakra-ui/react';
import { BsLink } from 'react-icons/bs';
import { FaExchangeAlt, FaExclamation, FaLink, FaTools } from 'react-icons/fa';
// Here we have used react-icons package for the icons
import { FiPackage, FiHome, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

const TimelineComponent = () => {
  const linkColor = 'pink.400';
  const linkHoverColor = 'pink.600';

  return (
    <Container maxW="7xl" p={{ base: 2, sm: 10 }}>
          <VStack textAlign="start" align="start" mb={ 5 } >
           
            <Box zIndex={5}>
            
                  <Box style={ { display: "flex", flexDirection: "row" , justifyContent:"space-between" , width:"650px"} }>
                    <Heading colorScheme='pink' fontSize="2xl" fontWeight="400" my={5}>
                        Timeline
                    </Heading>
                    <Tabs   variant='enclosed'>
                                      <TabList>
                                                    <Tab _selected={{ color: 'white', bg: '#D53F8C' }}><Heading size='xs'> All</Heading></Tab>
                                                    <Tab _selected={ { color: 'white', bg: '#D53F8C' } }>Swap</Tab>
                                                    <Tab _selected={ { color: 'white', bg: '#D53F8C' } }>Modifications</Tab>
                                                    <Tab _selected={{ color: 'white', bg: '#D53F8C' }}>Withdrows</Tab>
                                       </TabList>
                    </Tabs>
                    
            </Box>
          <Box>
            <MilestoneItem icon={ FaExchangeAlt }>
                          <Stack minWidth={"590px"} style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end"}} mt={"-13px"} >
                            <Heading fontSize="lg" fontWeight="400" >
                                    Swap Executed
                            </Heading>
                            <Heading fontSize='sm' fontWeight="300">
                                  1 month ago {' '} 
                                   <Link
                                        href="#"
                                        color={linkColor}
                                        _hover={{ color: linkHoverColor }}
                                      isExternal
                                      fontSize={"19 px"}
                                    >
                                       <ExternalLinkIcon ></ExternalLinkIcon >
                                    </Link>
                            </Heading>
                          </Stack>  
                        
                             <Heading fontSize='sm' fontWeight={300}> Swapped : {' '} 
                        <Button borderRadius={ 50 } size={ "xs" } colorScheme="pink" leftIcon={ <Eth h={ 4 } w={ 4 }> </Eth> } variant='outline'>
                        <b>&lt; 0.001</b>  (1.03USD)
                            </Button>
                            {' '} for {' '}
                        <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                    <b>&lt; 0.001</b>  (1.03USD)
                </Button>
                 </Heading>
            </MilestoneItem>
            <MilestoneItem icon={ FaExchangeAlt }>
                          <Stack minWidth={"590px"} style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end"}} mt={"-13px"} >
                            <Heading fontSize="lg" fontWeight="400" >
                                    Swap Executed
                            </Heading>
                            <Heading fontSize='sm' fontWeight="300">
                                  1 month ago {' '} 
                                   <Link
                                        href="#"
                                        color={linkColor}
                                        _hover={{ color: linkHoverColor }}
                                      isExternal
                                      fontSize={"19 px"}
                                    >
                                       <ExternalLinkIcon ></ExternalLinkIcon >
                                    </Link>
                            </Heading>
                          </Stack>  
                        
                           <Heading fontSize='sm'  fontWeight={300}> Swapped : {' '} 
                        <Button borderRadius={ 50 } size={ "xs" } colorScheme="pink" leftIcon={ <Eth h={ 4 } w={ 4 }> </Eth> } variant='outline'>
                        <b>&lt; 0.001</b>  (1.03USD)
                            </Button>
                            {' '} for {' '}
                        <Button borderRadius={50} size={"xs"} colorScheme="pink" leftIcon={<Eth h={ 4 } w={ 4 }> </Eth>} variant='outline'>
                                                    <b>&lt; 0.001</b>  (1.03USD)
                </Button>
                </Heading>
            </MilestoneItem>
           <MilestoneItem icon={ FaExclamation }>
                          <Stack minWidth={"590px"} style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end"}} mt={"-13px"} >
                            <Heading fontSize="lg" fontWeight="400" >
                                    Position Created
                            </Heading>
                            <Heading fontSize='sm' fontWeight="300">
                                  1 month ago {' '} 
                                   <Link
                                        href="#"
                                        color={linkColor}
                                        _hover={{ color: linkHoverColor }}
                                      isExternal
                                      fontSize={"19 px"}
                                    >
                                       <ExternalLinkIcon ></ExternalLinkIcon >
                                    </Link>
                            </Heading>
                          </Stack>  
                        
                             <Heading fontSize='sm'  fontWeight={300}>Rate : {' '} 
                        <Button borderRadius={ 50 } size={ "xs" } colorScheme="pink" leftIcon={ <Eth h={ 4 } w={ 4 }> </Eth> } variant='outline'>
                        <b>&lt; 0.001</b>  (1.03USD)
            </Button>
             
                          <br />
            Set to run for 2 days
            </Heading>
            </MilestoneItem>
          </Box>
              </Box>
            
      </VStack>
    </Container>
  );
};

interface MilestoneItemProps extends BoxProps {
  icon?: any;
  boxProps?: BoxProps;
  skipTrail?: boolean;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  icon = FiCheckCircle,
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  const color = useColorModeValue('gray.700', 'gray.500');
  return (
    <Flex minH={20} {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={12}
          bg={useColorModeValue('gray.600', 'gray.500')}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box as={icon} size="1.25rem" color={color} pos="absolute" left="0.875rem" top="0.875rem" />
        {!skipTrail && <Box w="1px" flex={1} bg={color} my={1} />}
      </Flex>
      <Box pt={{ base: 1, sm: 3 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};

export default TimelineComponent;