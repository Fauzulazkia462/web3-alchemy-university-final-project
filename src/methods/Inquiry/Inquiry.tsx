import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/constants";

export const GetHistoryCount = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const count = await contract.getHistoryCount();

        return count;
    } catch (error: any) {
        throw error;
    }
};

export const GetCharityHistory = async ( index: number ) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const history = await contract.getCharityHistory(index);

        const formattedHistory = JSON.parse(JSON.stringify(history, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));

        return formattedHistory;
    } catch (error: any) {
        throw error;
    }
};

export const GetDonors = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const donors = await contract.getDonors();

        return donors;
    } catch (error: any) {
        throw error;
    }
};

export const GetDonationAmount = async (address: string) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Fetch the donation amount (BigInt)
        const amount: bigint = await contract.getDonationAmount(address);

        return ethers.formatEther(amount);
    } catch (error: any) {
        throw error;
    }
};

export const GetCurrentOwner = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const owner = await contract.owner();

        return owner;
    } catch (error: any) {
        throw error;
    }
};

export const GetCurrentCharityTarget = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const target = await contract.charityTarget();

        return target;
    } catch (error: any) {
        throw error;
    }
};

export const GetCurrentContractBalance = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Fetch the balance (BigInt)
        const balance: bigint = await contract.contractBalance();

        return ethers.formatEther(balance);
    } catch (error: any) {
        throw error;
    }
};