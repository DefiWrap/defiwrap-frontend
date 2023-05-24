import { ThemingProps } from '@chakra-ui/react'
import { mainnet, goerli, bsc, bscTestnet, polygonMumbai } from '@wagmi/chains'
import { StepsTheme as Steps } from "chakra-ui-steps";


export const SITE_NAME = 'DefiWrap'
export const SITE_DESCRIPTION = 'Easy crypto investments'
export const SITE_URL = '#'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = ''
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR , Steps }

export const SOCIAL_MEDIUM = '#'
export const SOCIAL_TWITTER = '#'
export const SOCIAL_GITHUB = '#'
export const SOCIAL_LINKEDIN = '#'
export const SOCIAL_DISCORD = '#'

export const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY
export const NETWORKS = [mainnet, goerli, bsc ,bscTestnet, polygonMumbai]