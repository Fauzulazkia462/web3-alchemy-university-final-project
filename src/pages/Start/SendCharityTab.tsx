import { Button } from "@/components/ui/button";
import { SendCharity } from "@/methods/UpdateState";
import { useWallet } from "@/store";

export const SendCharityTab = () => {
    const { wallet } = useWallet();

    const handleSend = async () => {
        if (!wallet) {
            alert("No connected wallet found. Please connect your wallet.");
            return;
        }

        try {
            const response = await SendCharity();
            if (response) {
                alert("Sent successfully!");
            }

        } catch (error) {
            console.error(error);
            alert("Sending failed. Check console for details.");
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-12">Execute The Charity</h1>

            {/* Warning Message */}
            <p className="text-red-400 bg-red-900 px-4 py-2 rounded-lg mb-6 text-center">
                ⚠️ This action can only be performed by the contract owner.
            </p>

            {/* Donation Amount Section */}
            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg mt-10 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4 w-full">
                    <Button className="bg-green-600 hover:bg-green-700 py-3 px-6 text-lg rounded-lg" onClick={handleSend}>
                        Proceed
                    </Button>
                </div>
            </div>
        </div>
    );
};
