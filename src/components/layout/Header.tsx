import React from "react";
import styles from "../../styles/Header.module.css";
import {
  Text,
  Flex,
  useColorModeValue,
  Spacer,
  Box,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Logo } from "../../Reusables/helper";
import { SITE_NAME } from "../../configuration/Config";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  className?: string;
}

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export function Header(props: Props) {
  const className = props.className ?? "";
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        className={className}
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
        opacity={1}
        px={4}
        // py={2}
        // mb={8}
        //pos="fixed"
        h={"tiny"}
        pos="sticky"
        w="full"
        alignItems="center"
        borderBottom="1px"
        borderBottomWidth="small"
        borderBottomStyle="solid"
        borderBottomColor="white"
      >
        <Flex
          style={{ display: "flex", alignItems: "center" }}
          flex={{ base: 2 }}
          justify={{ base: "center", md: "start" }}
        >
          <Link
            href={"/"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            color={useColorModeValue("gray.800", "white")}
            _selected={{ color: "white", bg: "#D53F8C" }}
            _hover={{
              textDecoration: "none",
              color: useColorModeValue("gray.800", "white"),
              bg: useColorModeValue("green.200", "green.900"),
            }}
          >
            <Logo />
          </Link>
          <Flex display={{ base: "none", md: "flex",  }} ml={5}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Spacer />

        <Flex alignItems="center" gap={4}>
          <ConnectButton
            accountStatus={{
              smallScreen: "address",
              largeScreen: "full",
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
          <ThemeSwitcher />
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Flex>
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("white", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const linkHoverBackgroundColor = useColorModeValue("pink.500", "pink.500");
  const router = useRouter();
  return (
    <>
      <Stack direction={"row"}  spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box
            style={{ display: "flex", alignItems: "center",height:"75px" }}
            key={navItem.label}
          >
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  as={NextLink}
                  p={4}
                  href={navItem.href}
                  fontSize={"lg"}
                  fontWeight={500}
                  color={ linkColor }
                  rounded={"sm"}
                  _selected={{ color: "white", bg: "#D53F8C" }}
                >
                  <Text
                    className={
                      router.pathname === navItem.href ? styles.navItem : ""
                    }
                    p={4}
                    fontSize="1rem"
                    _hover={{
                      color: "white",
                      bg: linkHoverBackgroundColor,
                      rounded: "lg",
                      cursor: "pointer",
                    }}>
                    {navItem.label}
                  </Text>
                </Link>
              </PopoverTrigger>
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    </>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.500", "gray.900") }}
      _selected={{ color: "white", bg: "#D53F8C" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      // display={{ md: "none" }}
      _selected={{ color: "white", bg: "#D53F8C" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "bold",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          _selected={{ color: "white", bg: "#D53F8C" }}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          _selected={{ color: "white", bg: "#D53F8C" }}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Positions",
    href: "/positions",
  },
  {
    label: "Details",
    href: "/positionsdetail",
  },
  {
    label: "Swap",
    href: "/swap",
  },
  {
    label: "Landing",
    href :"/landing"
  },
];
