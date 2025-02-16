import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

export const Landing = () => {
    const navigate = useNavigate();
    const [walletInstalled, setWalletInstalled] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            setWalletInstalled(true);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            {/* Hero Section */}
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold">Welcome to Decentralized Charity Site</h1>
            </header>

            {/* Contract Info */}
            <Card className="w-full max-w-lg bg-gray-800 border-gray-700 text-center mx-auto">
                <CardContent className="space-y-2">
                    <p><strong>Contract Address:</strong> 0x8b7d31c7b71258acD778Ec14Af13824Df39cB908</p>
                    <p><strong>Network:</strong> Sepolia Testnet</p>
                    <p><strong>Purpose:</strong> Provides a trustworthy charity platform with complete transparency.</p>
                </CardContent>
            </Card>

            {/* Wallet Check */}
            {!walletInstalled && (
                <div className="mt-6 text-red-400 flex items-center gap-2 text-center">
                    <AlertCircle className="w-5 h-5" />
                    No wallet detected. Please install a Web3 wallet extension to proceed.
                </div>
            )}

            {/* Get Started Button */}
            <Button
                className={`mt-6 px-6 py-3 text-lg mx-auto ${walletInstalled ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                onClick={() => navigate("/start")}
                disabled={!walletInstalled} // Disable if no wallet
            >
                Get Started
            </Button>
        </div>
    );
};
