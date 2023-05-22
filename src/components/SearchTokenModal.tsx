import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FaEthereum,
  FaQuestionCircle,
  FaArrowDown,
  FaArrowsAltH,
  FaCopy,
} from "react-icons/fa";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import {
  defineStyle,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/styled-system";
import { listAnatomy as parts } from "@chakra-ui/anatomy";
import { error } from "console";
//  import data from './data.json';
import { txt } from "../utils/constant";

import { ChevronDownIcon, QuestionIcon, SearchIcon } from "@chakra-ui/icons";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const sizes = {
  xl: definePartsStyle({
    container: defineStyle({
      fontSize: "xl",
      p: 6,
    }),
    icon: defineStyle({
      boxSize: 6,
      mr: 5,
    }),
  }),
};

export function SearchTokenModal({ tokenlist, getTokenAddressData, isSell }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [tokens, setTokens] = useState();
  const [ToToken, setToToken] = useState();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(tokenlist);
  const [tokenQry, setTokenQry] = useState("");

  useEffect(() => {
    console.log("tokenlist :>> ", tokenlist);
    setResults(tokenlist);
    isSell ? setToToken(tokenlist[0]) : "";
  }, [tokenlist]);
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(tokenlist);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTokens(data);
      } catch (error) {
        console.error("There was a problem fetching data:", error);
      }
    };
    dataFetch();
  }, [tokens]);

  // Define a function to render the search result on the page
  function handleChange(event: any) {
    const newQuery = event.target.value;
    setQuery(newQuery);
    const newResults = tokenlist.filter((item: any) =>
      item.name.toLowerCase().includes(newQuery.toLowerCase())
    );
    setResults(newResults);
  }
  function listViewClick(e: any) {
    try {
      const tokenAddress = e.target.id;
      setTokenQry(tokenAddress);
      const tokenDetails = tokenlist.filter((item: any) =>
        item.address.toLowerCase().includes(tokenAddress.toLowerCase())
      );
      setToToken(tokenDetails[0]);
      getTokenAddressData(JSON.stringify(tokenDetails[0]));
      onClose();
    } catch (error) {
      console.warn("The error is========>>>>>>>>", error);
    }
  }
  useEffect(() => {
    console.log("ToToken :>> ", ToToken);
  }, [ToToken]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Button
          onClick={onOpen}
          leftIcon={
            !ToToken?.logoURI ? (
              <QuestionIcon w={5} h={5} mr={2} />
            ) : (
              <img
                style={{ borderRadius: "50%" }}
                height={25}
                width={25}
                src={ToToken?.logoURI}
              ></img>
            )
          }
          colorScheme="pink"
          variant="solid"
        >
          {ToToken?.symbol ? (
            <b
              onClick={listViewClick}
              style={{ cursor: "pointer" }}
              id={ToToken?.address}
            >
              {ToToken?.symbol}
            </b>
          ) : (
            <b
              onClick={onOpen}
              style={{ cursor: "pointer" }}
              id={ToToken?.address}
            >
              {txt.select}
            </b>
          )}
        </Button>
        <Text fontSize="sm">{ToToken?.name}</Text>
      </div>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w={600}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <InputGroup>
              <Input
                focusBorderColor="pink.400"
                errorBorderColor="red.300"
                value={query}
                onChange={handleChange}
                type="text"
                placeholder="Search your token by Symbol, Name or Address"
              />
              {/* onChange={(event) =>handleSearch(event)} */}

              <InputRightElement children={<SearchIcon color="pink.500" />} />
            </InputGroup>

            <Text mt={5} mb={5} fontSize={"xl"}>
              Token List
            </Text>

            <List
              style={{ height: "300px", overflowX: "hidden" }}
              size={"xl"}
              spacing={3}
            >
              {results.map((item) => (
                <ListItem>
                  <div style={{ display: "flex" }}>
                    <img
                      onClick={listViewClick}
                      style={{ marginRight: "7px" }}
                      height={25}
                      width={25}
                      src={item.logoURI}
                    ></img>
                    <b
                      onClick={listViewClick}
                      style={{ cursor: "pointer" }}
                      id={item.address}
                    >
                      {item.name}
                    </b>
                    &nbsp;
                    <FaCopy
                      color="pink.500"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigator.clipboard.writeText(item.address);
                      }}
                    ></FaCopy>
                  </div>
                </ListItem>
              ))}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
