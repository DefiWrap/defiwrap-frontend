/* eslint-disable react-hooks/rules-of-hooks */
// @ts-ignore
import React, { useContext, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Text,
  Image,
  Stack,
  Heading,
  SelectField,
  Select,
  Center,
  Progress,
  CircularProgress,
  Wrap, WrapItem,
  CircularProgressLabel,
} from "@chakra-ui/react";
import styles from "../styles/Positions.module.css";

import { useState } from "react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import { Bnb, Eth } from "@chakra-icons/cryptocurrency-icons";
import { FaArrowRight } from "react-icons/fa";
import { DurationModal } from "../components/DurationModal";
import { txt } from "../utils/constant";
import context from "../context/context";

export default function SignExample() {
  const { isConnected } = useAccount();
  const [positionDetials, setPositionDetials] = useState()

  const appContext = useContext(context);

  useEffect(() => {
    console.log(appContext.activePositionList)
    setPositionDetials(appContext.activePositionList)
  }, [appContext.activePositionList])


  if (!isConnected) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.main}>
            <Text mt={3} fontSize={"3xl"}>
              <b>
                <a href="#">{txt.your_positions}</a>
              </b>
            </Text>
            <Text mt={1}>{txt.hear_you_will_see_the_details}</Text>
            <div style={{ display: "flex", padding: "15px" }}>
              <Box mr={20} className={styles.topbox} borderRadius="lg">
                <Text m="12px" size="sm">
                  {txt.on_going_positions}
                </Text>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <CircularProgress
                    size={"150px"}
                    thickness={"8px"}
                    value={100}
                    color="red.400"
                  >
                    <CircularProgressLabel mt={-3}>1</CircularProgressLabel>
                    <CircularProgressLabel mt={5} fontSize={"15px"}>
                      {txt.positions}
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text ml={5} color={"red.500"} size="lg">
                    ●
                  </Text>
                  <Text ml={5} size="sm">
                    BNB
                  </Text>
                  <Box ml={5} w={"100%"}>
                    <Progress
                      borderRadius={50}
                      colorScheme="red"
                      size="sm"
                      value={100}
                    />
                  </Box>
                  <Text ml={5} mr={2} size="sm">
                    1
                  </Text>
                </div>
              </Box>
              <Box mr={20} className={styles.topbox} borderRadius="lg">
                <Text m="12px" size="sm">
                  {txt.total_value}
                </Text>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <CircularProgress
                    size={"150px"}
                    thickness={"8px"}
                    value={100}
                    color="blue.400"
                  >
                    <CircularProgressLabel fontSize={"26px"} mt={-3}>
                      $256.8
                    </CircularProgressLabel>
                    <CircularProgressLabel mt={5} fontSize={"15px"}>
                      USD
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text ml={5} color={"blue.500"} size="lg">
                    ●
                  </Text>
                  <Text ml={5} size="sm">
                    Eth
                  </Text>
                  <Box ml={5} w={"100%"}>
                    <Progress
                      borderRadius={50}
                      colorScheme="blue"
                      size="sm"
                      value={100}
                    />
                  </Box>
                  <Text ml={5} mr={2} size="sm">
                    0.0011
                  </Text>
                </div>
              </Box>
            </div>
            <br />
            <br />
            <br />

            <Tabs mt={5} variant="enclosed">
              <TabList>
                <Tab _selected={{ color: "white", bg: "#D53F8C" }}>
                  {txt.open_positions}
                </Tab>
                <Tab _selected={{ color: "white", bg: "#D53F8C" }}>
                  {txt.closed_positions}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box
                    flexDirection={"column"}
                    className={styles.innerboxactive}
                    borderRadius="lg"
                  >
                    <Heading m="12px" size="sm">
                      {txt.active}
                    </Heading>

                    {/* main card   */}
                    <Wrap >
                    {positionDetials && positionDetials.map(itemData => { 
                    return   <WrapItem  w="md"><Card variant="outline" m="12px" >
                         <CardBody style={{borderWidth:10}}>
                          {/* Sell recive Card */}
                          <Card variant="outline" >
                          <CardBody borderRadius="lg">
                            <Stack
                              direction="row"
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              spacing={4}
                            >
                              <Stack direction="row" alignItems={"center"}>
                                     <img src={itemData.sellDetail.logoURI} h={7} w={7}></img>
                                  <Heading size="sm">{itemData.sellDetail.symbol}</Heading>
                                <FaArrowRight></FaArrowRight>
                                     <img src={itemData.receiveDetail.logoURI} h={7} w={7}></img>

                                     <Heading size="sm">{itemData.receiveDetail.symbol}</Heading>
                              </Stack>

                              <Heading pr={1} size="sm">
                                2 Days Left
                              </Heading>
                            </Stack>
                          </CardBody>
                        </Card>

                        {/*Eth to BNB card */}
                        <Card variant="outline" mt={2}>
                          <CardBody borderRadius="lg">
                            <Stack mt={2} direction="row" alignItems={"center"}>
                              <Text fontSize="sm">{txt.remaining}</Text>
                              <Button
                                borderRadius={50}
                                size={"xs"}
                                colorScheme="pink"
                                leftIcon={
                                  <Eth h={4} w={4}>
                                    {" "}
                                  </Eth>
                                }
                                variant="outline"
                              >
                                &lt; 0.0011
                              </Button>
                            </Stack>
                            <Stack mt={2} direction="row" alignItems={"center"}>
                              <Text fontSize="sm">{txt.rate}</Text>

                              <Button
                                borderRadius={50}
                                size={"xs"}
                                colorScheme="pink"
                                leftIcon={
                                  <Eth h={4} w={4}>
                                    {" "}
                                  </Eth>
                                }
                                variant="outline"
                              >
                                &lt; 0.001
                              </Button>

                                   <Text fontSize="sm">{itemData.executesDay}</Text>
                            </Stack>
                            <Stack mt={2} direction="row" alignItems={"center"}>
                              <Text fontSize="sm">{txt.to_withdrow}</Text>

                              <Button
                                borderRadius={50}
                                size={"xs"}
                                colorScheme="pink"
                                leftIcon={
                                  <Bnb h={4} w={4}>
                                    {" "}
                                  </Bnb>
                                }
                                variant="outline"
                              >
                                0
                              </Button>
                            </Stack>
                            <Stack mt={2} direction="row" alignItems={"center"}>
                              <Text fontSize="sm">
                                {txt.next_swap_in} 10 Hours
                              </Text>
                            </Stack>

                            <Stack mt={5} direction="row" alignItems={"center"}>
                              <Text fontSize="sm">
                                {txt.position_not_generating_yields}
                              </Text>
                            </Stack>

                            <Progress
                              borderRadius={50}
                              mt={3}
                              colorScheme="pink"
                              size="sm"
                              value={100}
                            />
                          </CardBody>
                        </Card>

                        {/* Executes Card */}
                        <Card variant="outline" mt={3}>
                          <CardBody borderRadius="lg">
                            <Stack
                              direction="row"
                              justifyContent={"space-between"}
                              spacing={4}
                            >
                                   <DurationModal positionDetials={itemData} ></DurationModal>
                            </Stack>
                          </CardBody>
                        </Card>
                        </CardBody>
                    </Card></WrapItem>
                        })}</Wrap>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box className={styles.innerbox} borderRadius="lg">
                    <Heading mb="8px" size="xl">
                      {txt.no_closed_positions_yet}
                    </Heading>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <b>
              <a href="#">{txt.connect_your_wallet}</a>
            </b>
          </h1>
        </main>
      </div>
    );
  }
}
