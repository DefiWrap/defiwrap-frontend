import { ChakraProvider as ChakraUiProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { THEME_COLOR_SCHEME, THEME_CONFIG } from '../configuration/Config'
import { StepsTheme as Steps } from "chakra-ui-steps";



interface Props {
  children: ReactNode
}

const theme = extendTheme(withDefaultColorScheme({ colorScheme: THEME_COLOR_SCHEME }), {
  ...THEME_CONFIG,
   
    fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
    
})

export function ChakraProvider(props: Props) {
  return <ChakraUiProvider theme={theme}>{props.children}</ChakraUiProvider>
}
