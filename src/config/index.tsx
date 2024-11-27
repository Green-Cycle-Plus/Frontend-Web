import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import {
  liskSepolia,
} from "wagmi/chains";

// Get projectId from <https://cloud.reown.com>
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "GreenCyclePlus",
  description: "Turn your waste into wealth and make the environment and the world a better place for us all to live in recycling one waste at a time",
  url: "",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [
  // mainnet,
  // arbitrum,
  // optimism,
  liskSepolia,
  // base,
  // lisk,
  // baseSepolia,
  // liskSepolia,
] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    // @ts-expect-error needed by typescript linting
    email: true,
    socials: ["google"],
    showWallets: true,
    walletFeatures: true,
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
