import { useState } from "react";
import { Donate } from "@/methods/UpdateState";
import { parseEther } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/store";

export const DonateTab = () => {
    const { wallet } = useWallet();
    const [eth, setEth] = useState("");

    const handleDonate = async () => {
        if (!eth || isNaN(Number(eth)) || Number(eth) <= 0) {
            alert("Please enter a valid ETH amount.");
            return;
        }

        if (!wallet) {
            alert("No connected wallet found. Please connect your wallet.");
            return;
        }

        try {
            const wei = parseEther(eth).toString();
            await Donate(wei);
            alert("Donation successful!");
        } catch (error) {
            console.error(error);
            alert("Donation failed. Check console for details.");
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-12">Donate your treasure</h1>

            {/* Donation Amount Section */}
            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg mt-10 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4 w-full">
                    <Input
                        className="bg-gray-700 text-white flex-1 py-3 px-4 rounded-lg text-lg text-center"
                        type="text"
                        placeholder="Enter ETH Amount"
                        value={eth}
                        onChange={(e) => setEth(e.target.value)}
                    />
                    <Button className="bg-green-600 hover:bg-green-700 py-3 px-6 text-lg rounded-lg" onClick={handleDonate}>
                        Donate
                    </Button>
                </div>
            </div>
        </div>
    );
};
