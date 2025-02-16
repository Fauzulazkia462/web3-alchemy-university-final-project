import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/constants";

export const TransferOwnership = async (address: string) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const transfer = await contract.transferOwnership(address);
        transfer.wait();

        return true;
    } catch (error: any) {
        throw error;
    }
}