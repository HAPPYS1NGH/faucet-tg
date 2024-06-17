import { config } from "../constants";
import { getChainClient } from "@/lib/client";

export const isTokenDrippedToAddressInLast24Hours = async (
    address: string,
    network: network
) => {
    const contract = config[network];
    const client: any = getChainClient(network);
    console.log("client", client);
    const hasReceivedWithin24Hours = await client.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi,
        functionName: "isTokenDrippedToAddressInLast24Hours",
        args: [address],
    });
    return hasReceivedWithin24Hours;
};

export const isTokenDrippedToUsernameInLast24Hours = async (
    username: string,
    network: network
) => {
    const contract = config[network];
    const client: any = getChainClient(network);

    // Convert the username to bytes
    const usernameBytes = new TextEncoder().encode(username);

    const hasReceivedWithin24Hours = await client.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi,
        functionName: "isTokenDrippedToUsernameInLast24Hours",
        args: [usernameBytes],
    });
    return hasReceivedWithin24Hours;
};

export const isBalanceAboveThreshold = async (
    address: string,
    network: network
) => {
    const contract = config[network];
    const client: any = getChainClient(network);

    const hasEnoughFunds = await client.readContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi,
        functionName: "isBalanceAboveThreshold",
        args: [address],
    });
    return hasEnoughFunds;
};

export const dripTokensToAddress = async (
    to: string,
    username: string,
    amount: bigint,
    network: network
) => {
    try {
        console.log("dripTokensToAddress", to, username, amount, network);

        const contract = config[network];
        const client: any = getChainClient(network, true);

        // Convert the username to bytes
        const usernameBytes = new TextEncoder().encode(username);

        const { request } = await client.simulateContract({
            address: contract.address as `0x${string}`,
            abi: contract.abi,
            functionName: "dripTokensToAddress",
            args: [to, usernameBytes, amount.toString()],
        });
        console.log("request", request);
        const hash = await client.writeContract(request);

        console.log("hash", hash);
        return hash;
    } catch (error) {
        console.error("Error in dripTokensToAddress", error);
        return false;
    }
};



export const canDripTokens = async (
    address: string,
    username: string,
    network: network
): Promise<true | string> => {
    try {
        // Check if the address has already received tokens in the last 24 hours
        const hasAddressReceived = await isTokenDrippedToAddressInLast24Hours(address, network);
        if (hasAddressReceived) {
            return "Tokens have already been dripped to this address within the last 24 hours.";
        }

        // Check if the username has already received tokens in the last 24 hours
        const hasUsernameReceived = await isTokenDrippedToUsernameInLast24Hours(username, network);
        if (hasUsernameReceived) {
            return "Tokens have already been dripped to this username within the last 24 hours.";
        }

        // Check if the address has a balance above the threshold
        const hasEnoughFunds = await isBalanceAboveThreshold(address, network);
        if (hasEnoughFunds) {
            return "The address balance is above the threshold.";
        }

        // All checks passed
        return true;
    } catch (error) {
        console.error("Error in canDripTokens:", error);
        return "An unknown error occurred.";
    }
};