import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/constants";

export const SendCharity = async () => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const send = await contract.sendCharity();
        send.wait();

        return true;
    } catch (error: any) {
        throw error;
    }
}