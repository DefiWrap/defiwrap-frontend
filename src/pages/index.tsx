import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
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
  Box,
  useDisclosure,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import {
  FaEthereum,
  FaQuestionCircle,
  FaArrowDown,
  FaArrowsAltH,
} from "react-icons/fa";
import {
  MdArrowDropDown,
  MdArrowDropDownCircle,
  MdArrowDropUp,
  MdSwapHorizontalCircle,
} from "react-icons/md";
import { Eth } from "@chakra-icons/cryptocurrency-icons";
import { SearchTokenModal } from "../components/SearchTokenModal";
import { Header } from "../components/layout/Header";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

import chainlist from "../../data/chains.json";
import protocols from "../../data/protocols.json";

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
  FormErrorMessage,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import { ApiService } from "../apiService/api";
import { timeArray, txt } from "../utils/constant";

const steps = [{ label: "Step 1" }, { label: "Step 2" }];

const Home: NextPage = () => {
  // validations
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(values: any) {
    console.log("values :>> ", values);
    return new Promise((resolve) => {
      alert(values);
    });
  }

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;

  const chart = (interval: any) => (
    <ResponsiveContainer height={500} width={800}>
      <LineChart data={chartData} margin={{ right: 15, top: 10 }}>
        <CartesianGrid stroke="#" />
        {/* <Legend /> */}
        <Tooltip cursor={{ fill: "#f00" }} />
        <XAxis dataKey="timestamp" interval={interval} />
        {/* <YAxis interval={interval} /> */}
        <Line
          type="monotone"
          dataKey="price"
          stroke="#3182CE"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="price" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );

  const [chains, setChains] = useState(chainlist);

  const dataFetch = async () => {
    try {
      const response = await fetch(chainlist);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setChains(data);
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
  };

  const [protocol, setProtocol] = useState(protocols);
  const protocolsFetch = async () => {
    try {
      const response = await fetch(protocols);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProtocol(data);
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
  };

  useEffect(() => {
    protocolsFetch();
    dataFetch();
    console.log("chain list data ========>>>>>>", chains);
  }, [chains, protocols]);

  const [sellTokenAddress, setSellTokenAddress] = useState("");
  const [buyTokenAddress, setBuyTokenAddress] = useState("");
  const [buyToken, setBuyToken] = useState("");
  const [buyTokenImg, setbuyTokenImg] = useState("");
  const [sellAmount, setSellamount] = useState(0);
  const [sellToken, setSellToken] = useState("");
  const [sellTokenImg, setSellTokenImg] = useState("");

  const handleSellInvest = (sellTokenData: any) => {
    // console.log("buyTokenData",JSON.parse(sellTokenData).symbol)
    setSellTokenAddress(JSON.parse(sellTokenData).address);
    setSellToken(JSON.parse(sellTokenData).symbol);
    setSellTokenImg(JSON.parse(sellTokenData).logoURI);
  };

  const handleBuyInvest = (buyTokenData: any) => {
    setBuyTokenAddress(JSON.parse(buyTokenData).address);
    setBuyToken(JSON.parse(buyTokenData).symbol);
    setbuyTokenImg(JSON.parse(buyTokenData).logoURI);
  };
  const [activeChartTime, setActiveChartTime] = useState(timeArray[0].id);

  useEffect(() => {
    let value =
      activeChartTime == 1
        ? "period=1h&span=24"
        : activeChartTime == 2
        ? "period=4h&span=42"
        : "period=1d&span=30";
    console.log("activeChartTime :>> ", activeChartTime);

    tokenListFetch(value);
  }, [sellTokenAddress, buyTokenAddress, activeChartTime]);

  const [chartData, setChartData] = useState([]);

  const tokenListFetch = async (value: String) => {
    try {
      ApiService.getChartDetails(sellTokenAddress, buyTokenAddress, value).then(
        async (response: any) => {
          if (response) {
            let mainData: any = [];
            await response.coins[`bsc:${sellTokenAddress}`]?.prices.map(
              (item: any, index: any) => {
                const date = DateTime.fromSeconds(
                  parseInt(item.timestamp, 10)
                ).toFormat(value == "period=1h&span=24" ? "t" : "MMM d ");
                let itemdata = {
                  price:
                    item.price /
                    response.coins[`bsc:${buyTokenAddress}`]?.prices[index]
                      .price,
                  timestamp: date,
                };
                mainData.push(itemdata);
              }
            );
            setChartData(mainData);
          }
        }
      );
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <Card height="810px" minWidth="450px" maxW="md">
            <CardBody>
              <Flex>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <FormControl isInvalid={errors.name}> */}
                  <div>
                    <Steps
                      visibility={"hidden"}
                      ml="-10px"
                      colorScheme="pink"
                      activeStep={activeStep}
                    >
                      <Step key="Step 1">
                        <Box sx={{ rounded: "md" }}>
                          <div>
                            {/* Select Network Card */}
                            <Card variant="outline">
                              <CardBody borderRadius="lg">
                                {/* <Text mb='8px'>Choose Network:</Text> */}
                                <Heading mb="8px" size="sm">
                                  {txt.choose_network}
                                </Heading>
                                <Select
                                  id="network"
                                  icon={
                                    <img src="https://ecoswap.exchange/tokens/0x38/BNB-0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE.svg"></img>
                                  }
                                  focusBorderColor="pink.400"
                                  placeholder={txt.select_option}
                                  {...register("name", {
                                    required: "Please select the network",
                                  })}
                                >
                                  {chains.map((item) => (
                                    <option value={item.name}>
                                      {" "}
                                      <img
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          borderRadius: "50%",
                                        }}
                                        src={item.logoURI}
                                      ></img>
                                      {item.name}
                                    </option>
                                  ))}
                                </Select>
                                {errors.name && (
                                  <Text fontSize="xs" color="red">
                                    {txt.required_error}
                                  </Text>
                                )}
                                {/* <FormErrorMessage>
                                  <Text> {errors.name}</Text>
                                </FormErrorMessage> */}
                                <Heading mt={5} mb="8px" size="sm">
                                  {txt.choose_protocol}
                                </Heading>

                                <Select
                                  id="protocol"
                                  icon={
                                    <img src="https://icon-library.com/images/swap-icon-png/swap-icon-png-16.jpg"></img>
                                  }
                                  focusBorderColor="pink.400"
                                  placeholder={txt.select_option}
                                  {...register("protocol", {
                                    required: "Please select the protocol",
                                  })}
                                >
                                  {protocol.map((item) => (
                                    <option value={item.name}>
                                      {" "}
                                      <img
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          borderRadius: "50%",
                                        }}
                                        src={item.logoURI}
                                      ></img>
                                      {item.name}
                                    </option>
                                  ))}
                                </Select>
                                {errors.name && (
                                  <Text fontSize="xs" color="red">
                                    {txt.required_error}
                                  </Text>
                                )}
                                {/* <FormErrorMessage>
                                  <Text> {errors.protocol}</Text>
                                </FormErrorMessage> */}
                              </CardBody>
                            </Card>

                            {/* Sell recive Card */}
                            <Card variant="outline" mt={5}>
                              <CardBody borderRadius="lg">
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  <Heading mb="5px" size="sm">
                                    {txt.sell}
                                  </Heading>
                                  <Heading mb="5px" pr={1} size="sm">
                                    {txt.receive}
                                  </Heading>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  <SearchTokenModal
                                    getTokenAddressData={handleSellInvest}
                                  ></SearchTokenModal>

                                  <Icon
                                    as={MdSwapHorizontalCircle}
                                    w={10}
                                    h={10}
                                    color="black"
                                  />

                                  {/* <Button  leftIcon={<FaQuestionCircle />} rightIcon={<FaArrowDown />} colorScheme='pink' variant='solid'>
                              Select
                            </Button> */}
                                  <SearchTokenModal
                                    getTokenAddressData={handleBuyInvest}
                                  ></SearchTokenModal>
                                </Stack>
                              </CardBody>
                            </Card>

                            {/* How much ETH do you want to invest? Card */}
                            <Card variant="outline" mt={5}>
                              <CardBody borderRadius="lg">
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  <Heading mb="8px" size="sm">
                                    {txt.how_much} {sellToken}{" "}
                                    {txt.do_you_want_to_invest}
                                  </Heading>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  <InputGroup>
                                    <InputLeftElement
                                      pointerEvents="none"
                                      children={
                                        // <FaEthereum color='#D53F8C' h={ 10 } w={ 10 } />
                                        <img
                                          src={sellTokenImg}
                                          height={20}
                                          width={20}
                                        ></img>
                                      }
                                    />
                                    <Input
                                      focusBorderColor="pink.400"
                                      errorBorderColor="red.300"
                                      type="number"
                                      placeholder="0"
                                    />
                                  </InputGroup>
                                  <Button colorScheme="pink" variant="outline">
                                    {txt.max}
                                  </Button>
                                  <Button colorScheme="pink" variant="outline">
                                    {txt.half}
                                  </Button>
                                </Stack>
                                <Stack spacing={4}>
                                  <Text fontSize="sm">
                                    {txt.in_wallet} 0 ETH
                                  </Text>
                                </Stack>
                              </CardBody>
                            </Card>

                            {/* Executes Card */}
                            <Card variant="outline" mt={5}>
                              <CardBody borderRadius="lg">
                                <Stack spacing={4}>
                                  <Heading fontSize="lg" mb={7}>
                                    {txt.executes}
                                  </Heading>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  <Heading mb="8px" size="sm">
                                    {txt.how_many_day}
                                  </Heading>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  <InputGroup>
                                    <Input
                                      focusBorderColor="pink.400"
                                      errorBorderColor="red.300"
                                      colorScheme="pink"
                                      type="number"
                                      placeholder="Custome"
                                    />
                                  </InputGroup>
                                  <Button colorScheme="pink" variant="outline">
                                    7
                                  </Button>
                                  <Button colorScheme="pink" variant="outline">
                                    15
                                  </Button>
                                  <Button colorScheme="pink" variant="outline">
                                    30
                                  </Button>
                                </Stack>
                              </CardBody>
                            </Card>

                            {/* Executes Card */}
                            <Card variant="outline" mt={5}>
                              <CardBody borderRadius="lg">
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  {/* <Button width={'100%'} colorScheme='pink' variant='solid'>
                                      Continue
                                    </Button>   */}
                                  {hasCompletedAllSteps && (
                                    <Box sx={{ my: 8, p: 8, rounded: "md" }}>
                                      <Heading
                                        fontSize="xl"
                                        textAlign={"center"}
                                      >
                                        {txt.woohoo}
                                      </Heading>
                                    </Box>
                                  )}
                                  <Flex width="100%" justify="flex-end" gap={4}>
                                    {hasCompletedAllSteps ? (
                                      <Button
                                        width={"100%"}
                                        colorScheme="pink"
                                        variant={"solid"}
                                        onClick={reset}
                                      >
                                        {txt.start_over}
                                      </Button>
                                    ) : (
                                      <>
                                        <Button
                                          type="submit"
                                          width={"100%"}
                                          colorScheme="pink"
                                          variant={"solid"}
                                          // onClick={nextStep}
                                        >
                                          {isLastStep
                                            ? txt.finish
                                            : txt.continue}
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
                        <Card width={"100%"}>
                          <CardBody borderRadius="lg">
                            {/* You'll Invest Card */}

                            <Card variant="outline" mt={5}>
                              <CardBody borderRadius="lg">
                                <Button
                                  leftIcon={<ArrowBackIcon></ArrowBackIcon>}
                                  isDisabled={activeStep === 0}
                                  onClick={prevStep}
                                  width={"100%"}
                                  colorScheme="pink"
                                  variant={"outline"}
                                >
                                  {txt.go_back}
                                </Button>
                              </CardBody>
                            </Card>

                            <Card variant="outline" mt={5}>
                              <CardBody borderRadius="lg">
                                <Stack
                                  direction="row"
                                  justifyContent={"flex-start"}
                                  alignItems={"flex-end"}
                                  spacing={4}
                                >
                                  <Heading mb="8px" size="sm">
                                    {txt.you_will_invest}
                                  </Heading>
                                  <Button
                                    leftIcon={<Eth></Eth>}
                                    colorScheme="pink"
                                    variant="outline"
                                  >
                                    0.0014
                                  </Button>
                                </Stack>
                                <Stack
                                  mt={5}
                                  direction="row"
                                  justifyContent={"flex-start"}
                                  alignItems={"flex-end"}
                                  spacing={4}
                                >
                                  <Heading mb="8px" size="sm">
                                    {txt.we_will_swap}
                                  </Heading>
                                  <Button
                                    leftIcon={<Eth></Eth>}
                                    colorScheme="pink"
                                    variant="outline"
                                  >
                                    0.004
                                  </Button>
                                  <Heading mb="8px" size="sm">
                                    {txt.everyday_for}
                                  </Heading>
                                </Stack>
                                <Stack
                                  mt={5}
                                  direction="row"
                                  justifyContent={"flex-start"}
                                  alignItems={"flex-end"}
                                  spacing={4}
                                >
                                  <Button colorScheme="pink" variant="outline">
                                    1
                                  </Button>
                                  <Heading mb="8px" size="sm">
                                    {txt.days}
                                  </Heading>
                                </Stack>
                              </CardBody>
                            </Card>

                            <Card variant="outline" mt={5}>
                              <CardBody borderRadius="lg">
                                <Button
                                  isDisabled={activeStep === 0}
                                  // onClick={prevStep}
                                  width={"100%"}
                                  colorScheme="pink"
                                  variant={"solid"}
                                >
                                  {txt.create_position}
                                </Button>
                              </CardBody>
                            </Card>
                          </CardBody>
                        </Card>
                      </Step>
                    </Steps>
                  </div>
                  {/* </FormControl> */}
                  {/* <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button> */}
                </form>
              </Flex>
            </CardBody>
          </Card>

          {/* Line chart code starts from Here */}

          <Card minWidth={700} height="810px" ml={3}>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <Heading size={"lg"}>$1906.36 USD</Heading>
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    borderWidth: 1,
                    padding: 3,
                    borderRadius: 20,
                  }}
                >
                  {timeArray.map((item) => {
                    return (
                      <Button
                        onClick={() => setActiveChartTime(item.id)}
                        colorScheme={
                          activeChartTime == item.id ? "pink" : "gray"
                        }
                        style={{
                          paddingLeft: 7,
                          paddingRight: 7,
                          margin: 2,
                          borderRadius: 3,
                        }}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
                </Stack>
              </div>

              <Stack
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <Heading color={"blue.500"} pr={1} size="md">
                  {" "}
                  ●{" "}
                </Heading>{" "}
                <Text>{txt.defiWrap}</Text>{" "}
                <Heading color={"green.500"} pl={5} size="md" pr={1}>
                  {" "}
                  ●{" "}
                </Heading>{" "}
                <Text>{txt.defiLlama}</Text>
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
