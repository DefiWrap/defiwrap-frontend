import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { Web3Provider } from "../configuration/Web3";
import { ChakraProvider } from "../configuration/Chakra";
import { useIsMounted } from "../hooks/UseIsMounted";
import React from "react";
import { useRouter } from "next/router";
import { Head } from "../components/layout/Head";
import SEO from "../components/SEO";

// //particle code
// import { ModalProvider, Ethereum, EthereumGoerli, evmWallets } from '@particle-network/connect-react-ui';
// import { WalletEntryPosition } from '@particle-network/auth';
// import { Ethereum, EthereumGoerli } from '@particle-network/common';  

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();
  const router = useRouter();

    //the root component
    return (
      <ChakraProvider>
        <SEO />
        <Head />
        <Web3Provider>
          {isMounted && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Web3Provider>
      </ChakraProvider>
    );
}
