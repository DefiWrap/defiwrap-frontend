import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, Container, Heading, Input, InputGroup, InputLeftElement, InputRightElement, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Switch, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import { FaEthereum, FaQuestionCircle, FaArrowDown, FaArrowsAltH } from 'react-icons/fa';
import { MdCheckCircle, MdSettings } from "react-icons/md";
import {
  defineStyle,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/styled-system'
import { listAnatomy as parts } from '@chakra-ui/anatomy'
import { duration, executesTimeArray, txt } from "../utils/constant";
import { useAccount } from "wagmi";
import context from "../context/context";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)


export function DurationModal(props) {
  // currentSellAmount * (investValue || 1)
  const appContext = useContext(context);
  const positionDetials = props.positionDetials
  const { isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [investValue, setInvestValue] = useState(positionDetials?.investValue);
  const [investValueError, setInvestValueError] = useState();

  const [executesDuration, setexecutesDuration] = useState(positionDetials?.executesDuration);
  const [executesDurationError, setexecutesDurationError] = useState();
  const [executesDay, setExecutesDay] = useState({});
  useEffect(() => {
    if (positionDetials) {
      var item = executesTimeArray.filter((item: any) => item.value == positionDetials?.executesDay)
      setExecutesDay(item[0])
    }
  }, [])

  const editPosition = () => {
    if (positionDetials) {
    let upd_obj  = appContext?.activePositionList.map(item =>{
        if(item.cardId == positionDetials.cardId){
          item.investValue = investValue,
          item.currentSellAmount = positionDetials.currentSellAmount,
          item.invest = positionDetials.currentSellAmount * (investValue || 1),
          item.executesDay = executesDay.value,
          item.executesDuration = executesDuration
      }return item;
      
    })
    appContext.setactivePositionList(upd_obj)
  console.log(upd_obj);
}
onClose()

  }
  return (
    <>
      <Button onClick={onOpen} width={'100%'} colorScheme='pink' variant='solid'>
        {txt.add_funds}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={3}>{txt.change_duration_and_date}{positionDetials?.cardId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize={"xl"}>{txt.how_much} Eth {txt.do_you_want_to_invest}</Text>
            <Text fontSize={"xl"}>Use WETH <Switch colorScheme="pink"></Switch> </Text>
            {/* How much ETH do you want to invest? Card */}
            <Card variant="outline" >
              <CardBody borderRadius='lg'>
                <Stack direction='row' justifyContent={"space-between"} spacing={4}>
                  <Heading mb='8px' size='sm'>{txt.how_much} ETH {txt.do_you_want_to_invest}</Heading>
                </Stack>
                <Stack direction='row' justifyContent={"space-between"} spacing={4}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={[<img color='#D53F8C' height={15} width={15} src={positionDetials?.sellDetail?.logoURI} />]}
                    />
                    <Input focusBorderColor='pink.400'
                      errorBorderColor='red.300'
                      type='number' placeholder='0'
                      onBlur={() => {
                        setInvestValueError(
                          !investValue ? false : true
                        );
                      }}
                      value={investValue}
                      onChange={(event: any) => {
                        setInvestValue(event.target.value);
                        setInvestValueError(
                          !event.target.value ? false : true
                        );
                      }} />
                  </InputGroup>

                  <Button isDisabled={isConnected ? false : true} colorScheme='pink' variant='outline'>
                    {txt.max}
                  </Button>
                  <Button isDisabled={isConnected ? false : true} colorScheme='pink' variant='outline'>
                    {txt.half}
                  </Button>
                </Stack>
                <Text
                  fontSize="sm"
                  color="black"
                  textAlign="left"
                >
                  {"$00"}
                  {positionDetials?.currentSellAmount * (investValue || 1)}
                </Text>
                <Stack spacing={4}>
                  <Text fontSize='sm'>
                    {txt.in_wallet} 0 ETH
                  </Text>
                </Stack>
                {investValueError == false && (
                  <Text fontSize="xs" color="red">
                    {txt.required_error}
                  </Text>
                )}
              </CardBody>
            </Card>

            {/* How many days Card */}
            <Card variant="outline" >
             
              <CardBody borderRadius='lg'>
                <Stack spacing={4}>
                </Stack>
                
                <Stack direction='row' justifyContent={"space-between"} spacing={4}>
                  <Heading size='sm' py={2}>{txt.how_many}{' '}{executesDay.value} {'?'}</Heading>
                  <Stack direction="row">
                    {executesTimeArray.map((item) => {
                      return (
                        <Button
                          onClick={() => setExecutesDay(item)}
                          colorScheme={
                            executesDay.value == item.value
                              ? "pink"
                              : "gray"
                          }
                          style={{
                            borderWidth:1,
                            paddingLeft: 7,
                            paddingRight: 7,
                            marginBottom:10,
                            borderRadius: 3,
                          }}
                        >
                          {item.name}
                        </Button>
                      );
                    })}
                  </Stack>
                </Stack>
                <Stack direction='row' justifyContent={"space-between"} spacing={4}>
                  <InputGroup>
                    <Input
                      onBlur={() => {
                        setexecutesDurationError(
                          executesDuration ? true : false
                        );
                      }}
                      focusBorderColor='pink.400'
                      errorBorderColor='red.300' colorScheme='pink' type='number' placeholder='Custome'
                      value={executesDuration}
                      onChange={(e: any) => {
                        setexecutesDuration(e.target.value);
                        setexecutesDurationError(
                          e.target.value ? true : false
                        );
                      }} />
                  </InputGroup>
                  {duration.map((item) => {
                    return (
                      <Button
                        key={item.value}
                        onClick={() => {
                          setexecutesDuration(item?.value);
                          setexecutesDurationError(
                            item?.value ? true : false
                          );
                        }}
                        colorScheme={
                          executesDuration == item.value
                            ? "pink"
                            : "gray"
                        }
                        variant="outline"
                      >
                        {item.value}
                      </Button>
                    );
                  })}
                </Stack>
                {executesDurationError == false && (
                  <Text fontSize="xs" color="red">
                    {txt.required_error}
                  </Text>
                )}
              </CardBody>
            </Card>

            <Card variant="outline" >
              <CardBody borderRadius='lg'>
                <Stack direction='row' justifyContent={"flex-start"} alignItems={"center"}>
                  <Heading size='sm'>{txt.we_will_swap}</Heading>
                  <Stack direction='column'>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={[<img color='#D53F8C' height={15} width={15} src={positionDetials?.sellDetail?.logoURI} />]}
                      />
                      <Input w={"120px"} focusBorderColor='pink.400'
                        errorBorderColor='red.300'
                        type='number' placeholder='0'
                        value={(positionDetials?.currentSellAmount * (investValue || 1)) /
                          (positionDetials?.executesDuration || 1)} />
                    </InputGroup>
                    <Text fontSize='sm'>
                      {txt.in_wallet} 0 ETH
                    </Text>
                  </Stack>
                  <Heading size='sm'>{txt.everyday_for_you_for}</Heading>
                  <Stack direction='column'>
                    <Input width={"60px"} focusBorderColor='pink.400'
                      errorBorderColor='red.300'
                      type='number' placeholder='0'
                      value={(positionDetials?.executesDuration || 1)} />
                    <Text fontSize='sm'>
                    </Text>
                  </Stack>
                  <Heading size='sm'>{executesDay.value}</Heading>
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button width={"100%"} margin={"10px"} variant={"outline"} colorScheme="pink" onClick={onClose}>{txt.cancel}</Button>
            <Button width={"100%"} margin={"10px"} colorScheme="pink" onClick={() => editPosition()}>{txt.modify_position}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}