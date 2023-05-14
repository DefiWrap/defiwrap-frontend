import '@rainbow-me/rainbowkit/styles.css'
import merge from 'lodash.merge';
// import
//   {
  
//   RainbowKitProvider,
//   darkTheme,
//     Theme,
//   getDefaultWallets
// } from '@rainbow-me/rainbowkit';
// import { getDefaultWallets, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode, useEffect } from 'react'
import { infuraProvider } from 'wagmi/providers/infura'
import { NETWORKS, INFURA_KEY, SITE_NAME } from '../configuration/Config'
import React from 'react'
import {
    argentWallet,
    coinbaseWallet,
    imTokenWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    omniWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { ConnectButton, connectorsForWallets, RainbowKitProvider,
  darkTheme,
    Theme,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
  
import { particleWallet } from '@particle-network/rainbowkit-ext';
import { useMemo } from 'react';
import { ParticleNetwork } from '@particle-network/auth';


const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#EA4C89',
  },
} as Theme);

interface Props {
  children: ReactNode
}





export function Web3Provider ( props: Props )
{
    const particle = useMemo(() => {
            return new ParticleNetwork({
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
                appId: process.env.NEXT_PUBLIC_APP_ID as string,
                chainName: 'Ethereum',
                chainId: 1,
                wallet: {
                    displayWalletEntry: true,
                },
            });
        }, []);
 
   
const { chains, provider } = configureChains(NETWORKS, [ infuraProvider( { apiKey: INFURA_KEY } ),publicProvider() ] )

   const popularWallets = useMemo(() => {
        return {
            groupName: 'Popular',
            wallets: [
                particleWallet({ chains, authType: 'google' }),
                particleWallet({ chains, authType: 'facebook' }),
                particleWallet({ chains, authType: 'apple' }),
                particleWallet({ chains }),
                injectedWallet({ chains }),
                rainbowWallet({ chains }),
                coinbaseWallet({ appName: SITE_NAME, chains }),
                metaMaskWallet({ chains }),
                walletConnectWallet({ chains }),
            ],
        };
   }, [ particle ] );
  
// const { connectors } = getDefaultWallets({
//   appName: SITE_NAME,
//   chains,
// })
  
    const connectors = connectorsForWallets([
        popularWallets,
        {
            groupName: 'Other',
            wallets: [
                argentWallet({ chains }),
                trustWallet({ chains }),
                omniWallet({ chains }),
                imTokenWallet({ chains }),
                ledgerWallet({ chains }),
            ],
        },
    ]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider modalSize="compact" theme={myTheme} coolMode chains={chains}>
        { props.children }
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
