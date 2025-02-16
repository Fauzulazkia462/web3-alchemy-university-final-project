import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/constants";

export const Donate = async ( wei: string ) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const donate = await contract.donate({ value: wei });
        donate.wait();

        return true;
    } catch (error: any) {
        throw error;
    }
}