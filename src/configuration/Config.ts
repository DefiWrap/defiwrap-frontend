import { ThemingProps } from '@chakra-ui/react'
import { mainnet, goerli, sepolia, polygon, optimism, arbitrum } from '@wagmi/chains'

export const SITE_NAME = 'DefiWrap'
export const SITE_DESCRIPTION = 'Easy crypto investments'
export const SITE_URL = '#'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'orange'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }

export const SOCIAL_MEDIUM = '#'
export const SOCIAL_TWITTER = '#'
export const SOCIAL_GITHUB = '#'
export const SOCIAL_LINKEDIN = '#'
export const SOCIAL_DISCORD = '#'

export const INFURA_KEY = '817597f04d6941649c41255a1b10e815'
export const NETWORKS = [mainnet, goerli, sepolia, polygon, optimism, arbitrum]