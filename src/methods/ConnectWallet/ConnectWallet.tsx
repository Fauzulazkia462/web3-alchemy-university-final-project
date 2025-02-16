import { ethers } from "ethers";

export const ConnectWallet = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);

        if (accounts.length === 0) {
            alert("No account connected!");
            return null;
        }

        return accounts[0]; // Return the first connected account
    } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
    }
};