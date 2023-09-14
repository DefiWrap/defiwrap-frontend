import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import styles from "../../styles/Header.module.css";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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

export default function HeaderRepsonsive(props: Props) {
  const { isOpen, onToggle } = useDisclosure();
 const className = props.className ?? "";
 
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={ useColorModeValue( 'gray.600', 'white' ) }
        mt="1"
        mb="1"
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          {/* <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
           <Logo /> 
            
          </Text> */}

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        
        <Flex fontSize="sm" alignItems="center" gap={4}>
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
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue( 'white', 'gray.800' );
      const linkHoverBackgroundColor = useColorModeValue("pink.500", "pink.500");
  const router = useRouter();


  return (
    <Stack direction={ 'row' } >
       <Image
        width={"160px"}
        pr="20px"
        alt={"Logo Image"}
          
          src={"/logo.png"}
        />
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <Link
                as={NextLink}
                href={navItem.href ?? '#'}
                fontSize={'md'}
                fontWeight={500}
                >
              <Button
                    className={
                      router.pathname === navItem.href ? styles.navItem : ""
                    }
                  size="sm"
                  color={linkColor}
                    p={4}
                  _selected={ {
                     color: "white",
                      bg: "pink",
                      rounded: "lg",
                  }}
                    _hover={{
                      color: "white",
                      bg: linkHoverBackgroundColor,
                      rounded: "lg",
                      cursor: "pointer",
                              } }>
                                         {navItem.label}
     
                    </Button>
              </Link>
            

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
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
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
          href={ href }
          
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'md'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <>
     <Image
          width={"160px"}
         
          alt={"Login Image"}
          
          src={"/logo.png"}
      />
      <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={ { md: 'none' } }>
      
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
    </>
    
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={"2"}
        as={Link}
        href={href ?? '#'}
        // justify={'space-between'}
        // align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
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

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
    },
  {
    label: "Invest",
      href: "/invest",
    
      children: [
      {
        label: "Positions",
        href: "/positions",
      },
      {
            label: "Details",
            href: "/positionsdetail",
      },
    ],
    },
   {
    label: "Swap",
    href: "/swap",
  },
  {
    label: "Positions",
    href: "/positions",
  },
  {
    label: "Details",
    href: "/positionsdetail",
  },
 
  
];
