/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import {
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
  Card,
  CardBody,
  Button,
  Text,
  Stack,
  Heading,
  Select,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { SearchTokenModal } from "../components/SearchTokenModal";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import chainlist from "../../data/chains.json";
import protocols from "../../data/protocols.json";

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import { ApiService } from "../apiService/api";
import { duration, executesTimeArray, timeArray, txt } from "../utils/constant";

const steps = [{ label: "Step 1" }, { label: "Step 2" }];

const Home: NextPage = () => {
  const [sellTokenAddress, setSellTokenAddress] = useState("");
  const [buyTokenAddress, setBuyTokenAddress] = useState("");
  const [buyToken, setBuyToken] = useState("");
  const [buyTokenImg, setbuyTokenImg] = useState("");
  const [sellAmount, setSellamount] = useState(0);
  const [sellToken, setSellToken] = useState("");
  const [sellTokenImg, setSellTokenImg] = useState("");
  const [activeChartTime, setActiveChartTime] = useState(timeArray[0].id);
  const [chartData, setChartData] = useState([]);
  const [protocol, setProtocol] = useState(protocols);
  const [chains, setChains] = useState(chainlist);
  const [chainTokenList, setChainTokenList] = useState([]);
  const [onSelectNetwork, setOnSelectNetwork] = useState(chainlist[0]);
  const [onChangeProtocol, setOnChangeProtocol] = useState();
  const [investValue, setInvestValue] = useState();
  const [executesDay, setExecutesDay] = useState(executesTimeArray[0]);
  const [executesDuration, setexecutesDuration] = useState();
  // validations
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(values: any) {
    console.log("values :>> ", values);
    return new Promise((resolve) => {
      if (values && buyToken) nextStep(1);
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
    // dataFetch();
  }, [chains, protocol]);

  const handleSellInvest = (sellTokenData: any) => {
    console.log("sellTokenData :>> ", sellTokenData);
    setSellTokenAddress(JSON.parse(sellTokenData).address);
    setSellToken(JSON.parse(sellTokenData).symbol);
    setSellTokenImg(JSON.parse(sellTokenData).logoURI);
  };

  const handleBuyInvest = (buyTokenData: any) => {
    setBuyTokenAddress(JSON.parse(buyTokenData).address);
    setBuyToken(JSON.parse(buyTokenData).symbol);
    setbuyTokenImg(JSON.parse(buyTokenData).logoURI);
  };

  useEffect(() => {
    let value =
      activeChartTime == 1
        ? "period=1h&span=24"
        : activeChartTime == 2
        ? "period=4h&span=42"
        : "period=1d&span=30";
    setSellTokenAddress(
      sellTokenAddress ? sellTokenAddress : chainTokenList[0]?.address
    );
    setSellToken(sellToken ? sellToken : chainTokenList[0]?.symbol);
    setSellTokenImg(sellTokenImg ? sellTokenImg : chainTokenList[0]?.logoURI);
    if (sellTokenAddress && buyTokenAddress) {
      tokenListFetch(value);
    }
    // get current token price
    getCurrentTokenPrice(sellTokenAddress);
  }, [chains, protocol, sellTokenAddress, buyTokenAddress, activeChartTime]);

  useEffect(() => {
    setChainTokenList(onSelectNetwork?.tokenList);
    setSellTokenAddress(onSelectNetwork?.address);
    setSellToken(onSelectNetwork?.symbol);
    setSellTokenImg(onSelectNetwork?.logoURI);
  }, [onSelectNetwork]);

  const getCurrentTokenPrice = async (sellValue: any) => {
    ApiService.getTokenCurrentPrice(sellValue).then(async (response: any) => {
      setSellamount(response.coins[`bsc:${sellValue}`]?.price);
    });
  };
  const tokenListFetch = async (value: String) => {
    try {
      console.log(
        "sellTokenAddress :>> ",
        sellTokenAddress,
        buyTokenAddress,
        value
      );
      await ApiService.getChartDetails(
        sellTokenAddress,
        buyTokenAddress,
        value
      ).then(async (response: any) => {
        let mainData: any = [];
        if (response) {
          console.log("response  :>> ", response);
          await response.coins[`bsc:${sellTokenAddress}`]?.prices.map(
            (item: any, index: any) => {
              const date = DateTime.fromSeconds(
                parseInt(item.timestamp, 10)
              ).toFormat(value == "period=1h&span=24" ? "t" : "MMM d ");
              let itemdata = {
                price:
                  item.price /
                  response.coins[`bsc:${buyTokenAddress}`]?.prices[index]
                    ?.price,
                timestamp: date,
              };
              mainData.push(itemdata);
            }
          );
          setChartData(mainData);
        }
      });
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
  };
  const OnChangesellToReceive = () => {
    setSellTokenAddress(buyTokenAddress);
    setSellToken(buyToken);
    setSellTokenImg(buyTokenImg);

    setBuyTokenAddress(sellTokenAddress);
    setBuyToken(sellToken);
    setbuyTokenImg(sellTokenImg);
  };

  const investCalculation = (value: String) => {
    var amount = 0;

    amount = sellAmount * (investValue || 1);
  };

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <Card minWidth="450px" maxW="md">
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
                                  onChange={(event: any) => {
                                    setOnSelectNetwork(
                                      JSON.parse(event.target.value)
                                    );
                                    console.log(
                                      "Network value :>> ",
                                      JSON.parse(event.target.value)
                                    );
                                  }}
                                >
                                  {chains.map((item, index) => (
                                    <option
                                      key={item.chainId}
                                      value={JSON.stringify(item)}
                                    >
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
                                  onChange={(event: any) => {
                                    setOnChangeProtocol(event.target.value);
                                    console.log(
                                      "Protocol value :>> ",
                                      event.target.value
                                    );
                                  }}
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
                                {errors.protocol && (
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
                                    tokenlist={chainTokenList}
                                    isSell={true}
                                    getTokenAddressData={handleSellInvest}
                                  ></SearchTokenModal>
                                  <Icon
                                    onClick={() =>
                                      buyToken
                                        ? OnChangesellToReceive()
                                        : console.log("token not selected")
                                    }
                                    style={{
                                      cursor: buyToken
                                        ? "pointer"
                                        : "not-allowed",
                                    }}
                                    as={MdSwapHorizontalCircle}
                                    w={10}
                                    h={10}
                                    color="black"
                                  />
                                  <Stack>
                                    <SearchTokenModal
                                      tokenlist={chainTokenList}
                                      isSell={false}
                                      getTokenAddressData={handleBuyInvest}
                                    ></SearchTokenModal>
                                    {!buyTokenAddress && (
                                      <Text
                                        fontSize="xs"
                                        color="red"
                                        textAlign="right"
                                      >
                                        {txt.required_error}
                                      </Text>
                                    )}
                                  </Stack>
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
                                  <InputGroup
                                    style={{ flexDirection: "column" }}
                                  >
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
                                      {...register("invest", {
                                        required:
                                          "Please select the invest value",
                                      })}
                                      placeholder="0"
                                      onChange={(event: any) => {
                                        setInvestValue(event.target.value);
                                        console.log(
                                          "InvestValue value :>> ",
                                          event.target.value
                                        );
                                      }}
                                    />
                                    <Text
                                      fontSize="sm"
                                      color="black"
                                      textAlign="left"
                                    >
                                      {"$"}
                                      {sellAmount * (investValue || 1)}
                                    </Text>
                                    <InputLeftElement
                                      pointerEvents="none"
                                      children={
                                        <img
                                          src={sellTokenImg}
                                          height={20}
                                          width={20}
                                        ></img>
                                      }
                                    />
                                  </InputGroup>
                                  <Button
                                    isDisabled
                                    colorScheme="pink"
                                    variant="outline"
                                  >
                                    {txt.max}
                                  </Button>
                                  <Button
                                    isDisabled
                                    colorScheme="pink"
                                    variant="outline"
                                  >
                                    {txt.half}
                                  </Button>
                                </Stack>
                                {errors.invest && (
                                  <Text fontSize="xs" color="red">
                                    {txt.required_error}
                                  </Text>
                                )}
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
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                >
                                  <Stack spacing={4}>
                                    <Heading fontSize="lg" mb={7}>
                                      {txt.executes}
                                    </Heading>
                                  </Stack>
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
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  <Heading mb="8px" size="sm">
                                    {txt.how_many_day}
                                    {executesDay.value}
                                    {"?"}
                                  </Heading>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent={"space-between"}
                                  spacing={4}
                                >
                                  <Input
                                    focusBorderColor="pink.400"
                                    errorBorderColor="red.300"
                                    colorScheme="pink"
                                    placeholder="Custome"
                                    type="number"
                                    value={executesDuration}
                                    onChange={(e: any) => {
                                      console.log("value", e.target.value);
                                      setexecutesDuration(e.target.value);
                                    }}
                                  />
                                  {duration.map((item) => {
                                    return (
                                      <Button
                                        key={item.value}
                                        onClick={() =>
                                          setexecutesDuration(item?.value)
                                        }
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
                                    leftIcon={
                                      <img
                                        src={sellTokenImg}
                                        height={20}
                                        width={20}
                                      ></img>
                                    }
                                    colorScheme="pink"
                                    variant="outline"
                                  >
                                    {sellAmount * (investValue || 1)}
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
                                    leftIcon={
                                      <img
                                        src={sellTokenImg}
                                        height={20}
                                        width={20}
                                      ></img>
                                    }
                                    colorScheme="pink"
                                    variant="outline"
                                  >
                                    {(sellAmount * (investValue || 1)) /
                                      (executesDuration || 1)}
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
                                    {txt.everyday_for}
                                  </Heading>
                                  <Button colorScheme="pink" variant="outline">
                                    {executesDuration}
                                  </Button>
                                  <Heading pb="8px" size="sm">
                                    {executesDay.value}
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
          {buyTokenAddress === "" ? (
            <Card
              minWidth={700}
              height="880px"
              ml={3}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text color="grey" as="b" fontSize="2xl">
                Select a pair to view its price history
              </Text>
            </Card>
          ) : (
            <Card minWidth={700} height="880px" ml={3}>
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
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
