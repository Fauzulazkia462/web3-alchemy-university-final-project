import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpdateTarget } from "@/methods/UpdateState";
import { useWallet } from "@/store";

export const UpdateTargetTab = () => {
    const { wallet } = useWallet();
    const [target, setTarget] = useState("");

    const handleUpdate = async () => {
        if (!target) {
            alert("Please enter an address");
            return;
        }

        if (!wallet) {
            alert("No connected wallet found. Please connect your wallet.");
            return;
        }

        try {
            const response = await UpdateTarget(target);
            if(response) {
                alert("Update successfully!");
            }
            
        } catch (error) {
            console.error(error);
            alert("Update failed. Check console for details.");
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-12">Update Charity Target Address</h1>

            {/* Warning Message */}
            <p className="text-red-400 bg-red-900 px-4 py-2 rounded-lg mb-6 text-center">
                ⚠️ This action can only be performed by the contract owner.
            </p>
            
            {/* Donation Amount Section */}
            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg mt-10 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4 w-full">
                    <Input
                        className="bg-gray-700 text-white flex-1 py-3 px-4 rounded-lg text-lg text-center"
                        type="text"
                        placeholder="Enter Address"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                    <Button className="bg-green-600 hover:bg-green-700 py-3 px-6 text-lg rounded-lg" onClick={handleUpdate}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
};
