import React from "react";
import { useEffect, useState } from "react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];
const projectId = "f8f28044f8dc1019446a985fd61528dd";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function WalletConnect({ children }: any) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <>{children}</>
        </WagmiConfig>
      ) : null}

      <Web3Modal
        themeMode="dark"
        themeVariables={{
          "--w3m-background-color": "#623DDF",
          "--w3m-accent-color": "#6833D4",
          "--w3m-overlay-backdrop-filter": "blur(5px)",
          "--w3m-container-border-radius": "0",
          "--w3m-background-border-radius": "0",
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
        explorerRecommendedWalletIds={[
          "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
          "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
        ]}
        explorerExcludedWalletIds="ALL"
      />
    </>
  );
}
