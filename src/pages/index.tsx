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

import React, { useState, useEffect, useContext ,useId  } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
  Legend,
  Area,
  ComposedChart,
} from "recharts";

import chainlist from "../../data/chains.json";
import protocols from "../../data/protocols.json";

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { useForm } from "react-hook-form";
import { DateTime } from "luxon";
import { ApiService } from "../apiService/api";
import { duration, executesTimeArray, timeArray, txt } from "../utils/constant";
import { useAccount } from "wagmi";
import context from "../context/context";
import { useRouter } from "next/router";


const steps = [{ label: "Step 1" }, { label: "Step 2" }];

const Home: NextPage = () => {
  const router = useRouter();
  const cardId = useId()
  const { isConnected } = useAccount();
  const appContext = useContext(context);
  const [sellTokenAddress, setSellTokenAddress] = useState("");
  const [buyTokenAddress, setBuyTokenAddress] = useState("");
  const [buyToken, setBuyToken] = useState("");
  const [buyTokenImg, setbuyTokenImg] = useState("");
  const [currentSellAmount, setCurrentSellamount] = useState(0);
  const [sellToken, setSellToken] = useState("");
  const [sellTokenImg, setSellTokenImg] = useState("");
  const [activeChartTime, setActiveChartTime] = useState(timeArray[0].id);
  const [chartData, setChartData] = useState([]);
  const [protocol, setProtocol] = useState(protocols);
  const [chains, setChains] = useState(chainlist);
  const [chainTokenList, setChainTokenList] = useState([]);
  const [onSelectNetwork, setOnSelectNetwork] = useState(chainlist[0]);
  const [onSelectNetworkError, setOnSelectNetworkError] = useState(false);
  const [onChangeProtocol, setOnChangeProtocol] = useState();
  const [onChangeProtocolError, setOnChangeProtocolError] = useState(false);
  const [investValue, setInvestValue] = useState();
  const [investValueError, setInvestValueError] = useState();
  const [executesDay, setExecutesDay] = useState(executesTimeArray[0]);
  const [executesDuration, setexecutesDuration] = useState();
  const [executesDurationError, setexecutesDurationError] = useState();
  const [isContinue, setIsContinue] = useState(false);
  const [selectedSellDetail, setSelectedSellDetail] = useState({});
  const [selectedReceiveDetail, setSelectedReceiveDetail] = useState({});
  const [onHoverTokenDetail, setOnHoverTokenDetail] = useState([]);
  const [selectedReceiveDetailError, setSelectedReceiveDetailError] =
    useState();

  // validations
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(values: any) {
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
      <ComposedChart data={chartData} margin={{ right: 15, top: 10 }} style={{ overflow: "visible" }}
        onMouseMove={({ activePayload }) => {
          activePayload && setOnHoverTokenDetail(activePayload)
        }
        }
      >
        <Tooltip cursor={{ fill: "#f00" }} />
        <Legend />
        <Area
          legendType="none"
          name="price"
          type="monotone"
          connectNulls
          dataKey="price"
          fill="#d53f8c36"
          strokeWidth="2px"
          dot
          activeDot
          stroke="#3182CE"
        />
        <YAxis
          strokeWidth="0px"
          domain={["auto", "auto"]}
          axisLine={false}
          tickLine={false}
          hide
        />
        <XAxis dataKey="timestamp" interval={interval} />
      </ComposedChart>
    </ResponsiveContainer>
  );

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

  }, [chains, protocol]);


  useEffect(() => {
    setSellTokenAddress(selectedSellDetail?.address);
    setSellToken(selectedSellDetail?.symbol);
    setSellTokenImg(selectedSellDetail?.logoURI);
  }, [selectedSellDetail]);
  useEffect(() => {
    setBuyTokenAddress(selectedReceiveDetail?.address);
    setBuyToken(selectedReceiveDetail?.symbol);
    setbuyTokenImg(selectedReceiveDetail?.logoURI);
  }, [selectedReceiveDetail]);

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
    setSelectedSellDetail(onSelectNetwork?.tokenList[0]);
    setSellTokenAddress(onSelectNetwork?.address);
    setSellToken(onSelectNetwork?.symbol);
    setSellTokenImg(onSelectNetwork?.logoURI);
  }, [onSelectNetwork]);

  const getCurrentTokenPrice = async (sellValue: any) => {
    ApiService.getTokenCurrentPrice(sellValue).then(async (response: any) => {
      setCurrentSellamount(response.coins[`bsc:${sellValue}`]?.price);
    });
  };
  const tokenListFetch = async (value: String) => {
    try {
      await ApiService.getChartDetails(
        sellTokenAddress,
        buyTokenAddress,
        value
      ).then(async (response: any) => {
        let mainData: any = [];
        if (response) {
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
    const sell = selectedSellDetail;
    const receive = selectedReceiveDetail;

    setSellTokenAddress(buyTokenAddress);
    setSellToken(buyToken);
    setSellTokenImg(buyTokenImg);

    setBuyTokenAddress(sellTokenAddress);
    setBuyToken(sellToken);
    setbuyTokenImg(sellTokenImg);

    setSelectedReceiveDetail(sell);
    setSelectedSellDetail(receive);
  };
  const createPosition = () => {
  
    const value: any = {
      cardId: cardId,
      sellDetail: selectedSellDetail,
      receiveDetail: selectedReceiveDetail,
      investValue: investValue,
      currentSellAmount: currentSellAmount,
      executesDay: executesDay.value,
      executesDuration: executesDuration
    }
    
    let item =[...appContext?.activePositionList,value]
    appContext.setactivePositionList(item)
      router.push('./positions')
   
  }
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main} style={{ alignItems: "flex-start" }}>
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
                                  onBlur={() => {
                                    setOnSelectNetworkError(
                                      !onSelectNetwork ? true : false
                                    );
                                  }}
                                  onChange={(event: any) => {
                                    event?.target?.value &&
                                      setOnSelectNetwork(
                                        JSON.parse(event?.target?.value)
                                      );
                                    setOnSelectNetworkError(
                                      !event?.target?.value ? true : false
                                    );
                                  }}
                                >
                                  {chains.map((item, index) => (
                                    <option
                                      selected={index == 0 && true}
                                      key={item.chainId}
                                      value={JSON.stringify(item)}
                                    >
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
                                {onSelectNetworkError && (
                                  <Text fontSize="xs" color="red">
                                    {txt.required_error}
                                  </Text>
                                )}
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
                                  onBlur={() => {
                                    setOnChangeProtocolError(
                                      !onChangeProtocol ? true : false
                                    );
                                  }}
                                  onChange={(event: any) => {
                                    setOnChangeProtocol(event.target.value);
                                    setOnChangeProtocolError(
                                      !event?.target?.value ? true : false
                                    );
                                  }}
                                >
                                  {protocol.map((item, index) => (
                                    <option
                                      value={item.name}
                                      selected={index == 0 && true}
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
                                {onChangeProtocolError && (
                                  <Text fontSize="xs" color="red">
                                    {txt.required_error}
                                  </Text>
                                )}
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
                                    setSelectedSellDetail={
                                      setSelectedSellDetail
                                    }
                                    selectedSellDetail={selectedSellDetail}
                                    setSelectedReceiveDetail={
                                      setSelectedReceiveDetail
                                    }
                                    selectedReceiveDetail={
                                      selectedReceiveDetail
                                    }
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
                                      setSelectedSellDetail={
                                        setSelectedSellDetail
                                      }
                                      selectedSellDetail={selectedSellDetail}
                                      setSelectedReceiveDetail={
                                        setSelectedReceiveDetail
                                      }
                                      selectedReceiveDetail={
                                        selectedReceiveDetail
                                      }
                                      setIsClose={(value: any) => {
                                        if (value) {
                                          setSelectedReceiveDetailError(
                                            !selectedReceiveDetail.address
                                              ? false
                                              : true
                                          );
                                        } else {
                                          setSelectedReceiveDetailError(true);
                                        }
                                      }}
                                    ></SearchTokenModal>
                                    {!buyTokenAddress &&
                                      selectedReceiveDetailError == false && (
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
                                      onBlur={() => {
                                        setInvestValueError(
                                          !investValue ? false : true
                                        );
                                      }}
                                      focusBorderColor="pink.400"
                                      errorBorderColor="red.300"
                                      type="number"
                                      placeholder="0"
                                      value={investValue}
                                      onChange={(event: any) => {
                                        setInvestValue(event.target.value);
                                        setInvestValueError(
                                          !event.target.value ? false : true
                                        );
                                      }}
                                    />
                                    <Text
                                      fontSize="sm"
                                      color="black"
                                      textAlign="left"
                                    >
                                      {"$"}
                                      {currentSellAmount * (investValue || 1)}
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
                                    isDisabled={isConnected ? false : true}
                                    colorScheme="pink"
                                    variant="outline"
                                  >
                                    {txt.max}
                                  </Button>
                                  <Button
                                    isDisabled={isConnected ? false : true}
                                    colorScheme="pink"
                                    variant="outline"
                                  >
                                    {txt.half}
                                  </Button>
                                </Stack>
                                {investValueError == false && (
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
                                    {txt.how_many}
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
                                    onBlur={() => {
                                      setexecutesDurationError(
                                        executesDuration ? true : false
                                      );
                                    }}
                                    focusBorderColor="pink.400"
                                    errorBorderColor="red.300"
                                    colorScheme="pink"
                                    placeholder="Custome"
                                    type="number"
                                    value={executesDuration}
                                    onChange={(e: any) => {
                                      setexecutesDuration(e.target.value);
                                      setexecutesDurationError(
                                        e.target.value ? true : false
                                      );
                                    }}
                                  />
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
                                          colorScheme={
                                            !executesDurationError ||
                                              !investValueError ||
                                              !selectedReceiveDetailError
                                              ? "gray"
                                              : "pink"
                                          }
                                          variant={"solid"}
                                          onClick={() =>
                                            !isLastStep && setIsContinue(true)
                                          }
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
                                    {currentSellAmount * (investValue || 1)}
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
                                    {(currentSellAmount * (investValue || 1)) /
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
                                  onClick={() => createPosition()}
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
                {txt.select_a_pair_to_view_its_price_history}
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
                  <Heading size={"lg"}>{'$'}{onHoverTokenDetail[0] ? onHoverTokenDetail[0]?.payload?.price : '00.00'}</Heading>
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
                  <Text>{txt.defiLlama}</Text>{" "}
                  {/* <Heading color={"green.500"} pl={5} size="md" pr={1}>
                    {" "}
                    ●{" "}
                  </Heading>{" "}
                  <Text>{txt.defiWrap}</Text> */}
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
