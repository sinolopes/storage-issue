import {
  http,
  createConfig,
  cookieStorage,
  createStorage,
  fallback,
  unstable_connector,
} from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, coinbaseWallet } from "wagmi/connectors";

export function getAllConnectors() {
  return [];
}

export function getInitialConnectors() {
  return [
    metaMask({
      dappMetadata: {
        name: "My Wagmi App",
        url: "https://example.com",
        iconUrl: "https://example.com/favicon.ico",
      },
    }),
    coinbaseWallet({
      preference: "eoaOnly",
    }),
    coinbaseWallet({
      preference: "smartWalletOnly",
    }),
  ];
}

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    ssr: true,
    storage: createStorage({
      key: "sino",
      storage: cookieStorage,
    }),
    connectors: getInitialConnectors(),
    transports: {
      [mainnet.id]: fallback([unstable_connector(injected), http()]),
      [sepolia.id]: fallback([unstable_connector(injected), http()]),
    },
    multiInjectedProviderDiscovery: true,
    syncConnectedChain: true,
  });
}
