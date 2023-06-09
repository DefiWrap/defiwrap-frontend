import React from "react";
import { Box, useColorMode, Icon } from "@chakra-ui/react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { PhoneIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'


interface Props {
  className?: string;
}

export function ThemeSwitcher(props: Props) {
  const className = props.className ?? "";
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      className={className}
      onClick={toggleColorMode}
      _hover={{ cursor: "pointer" }}
    >
      {colorMode === "light" ? (
        <Icon as={MoonIcon} w={6} h={6} color="black.600" />
      ) : (
        <Icon as={SunIcon} w={6} h={6} color="yellow.100" />
      )}
    </Box>
  );
}
