import { createPublicClient, http, fallback, createWalletClient, publicActions } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const arbitrumSepoliaRpc = process.env.ARBITRUM_SEPOLIA_RPC;

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

export const arbitrumSepoliaClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(arbitrumSepoliaRpc, {
        batch: true,
    }),
});

export const walletArbitrumClient = createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(arbitrumSepoliaRpc),
}).extend(publicActions);

export function getChainClient(chain: string, isWallet = false): any {
    switch (chain) {
        case "arbitrum-sepolia":
            return isWallet ? walletArbitrumClient : arbitrumSepoliaClient;
        default:
            throw new Error(`Unsupported chain ${chain}`);
    }
}
