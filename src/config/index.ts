import { getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
    zerionWallet,
    rainbowWallet,
    trustWallet,
    ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets"
import {
    arbitrum,
    arbitrumSepolia,
    arbitrumNova,
    arbitrumGoerli,
    localhost,
} from "wagmi/chains"

const { wallets } = getDefaultWallets()

export const WALLETCONNECT_PROJECT_ID =
    process.env.NEXT_PUBLIC_PROJECT_ID ?? ""
if (!WALLETCONNECT_PROJECT_ID) {
    console.warn(
        "You need to provide a NEXT_PUBLIC_PROJECT_ID env variable"
    )
}
export const config = getDefaultConfig({
    appName: "RainbowKit demo",
    projectId: WALLETCONNECT_PROJECT_ID,
    wallets: [
        ...wallets,
        {
            groupName: "Other",
            wallets: [zerionWallet, rainbowWallet, trustWallet, ledgerWallet],
        },
    ],
    chains: [
        arbitrum,
        arbitrumSepolia,
        arbitrumNova,
        arbitrumGoerli,
        localhost,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [arbitrumSepolia, arbitrumNova, arbitrumGoerli]
            : []),
    ],
    ssr: true,
})
