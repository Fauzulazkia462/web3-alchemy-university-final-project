import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/constants";

export const UpdateTarget = async (address: string) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const update = await contract.updateCharityTarget(address);
        update.wait();

        return true;
    } catch (error: any) {
        throw error;
    }
}