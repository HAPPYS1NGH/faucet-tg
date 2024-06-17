import { createPublicClient, http, fallback } from "viem";
import { arbitrumSepolia, sepolia } from "viem/chains";
// import { arbitrumStylus } from "@/lib/utils/arbitrumStylus";
// import { Alchemy, Network } from "alchemy-sdk";

const arbitrumSepoliaRpc = process.env.ARBITRUM_SEPOLIA_RPC;

export const arbitrumSepoliaClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
});

// export const stylusClient = createPublicClient({
//   chain: arbitrumStylus,
//   transport: http("https://stylus-testnet.arbitrum.io/rpc"),
// });

// const sepoliaConfig = {
//   apiKey: process.env.ALCHEMY_KEY,
//   network: Network.ETH_SEPOLIA,
// };

// export const sepoliaAlchemy = new Alchemy(sepoliaConfig);

// const arbitrumComfig = {
//   apiKey: process.env.ALCHEMY_KEY,
//   network: Network.ARB_SEPOLIA,
// };
// export const arbitrumAlchemy = new Alchemy(arbitrumComfig);
