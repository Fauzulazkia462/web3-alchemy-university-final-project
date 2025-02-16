import { useEffect, useState } from "react";
import {
    GetCharityHistory,
    GetCurrentCharityTarget,
    GetCurrentContractBalance,
    GetCurrentOwner,
    GetDonationAmount,
    GetHistoryCount,
    GetDonors
} from "@/methods/Inquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const InquiryTab = () => {
    const [charityHistory, setCharityHistory] = useState<any>(null);
    const [charityTarget, setCharityTarget] = useState<any>(null);
    const [contractBalance, setContractBalance] = useState<any>(null);
    const [owner, setOwner] = useState<string | null>(null);
    const [donors, setDonors] = useState<any>(null);
    const [donationAmount, setDonationAmount] = useState<any>(null);
    const [historyCount, setHistoryCount] = useState<number | null>(null);

    const [charityIndex, setCharityIndex] = useState<string>("");
    const [donationAddress, setDonationAddress] = useState<string>("");

    useEffect(() => {
        fetchStaticData();
    }, []);

    const fetchStaticData = async () => {
        try {
            setCharityTarget(await GetCurrentCharityTarget());
            setContractBalance(await GetCurrentContractBalance());
            setOwner(await GetCurrentOwner());
            setHistoryCount(await GetHistoryCount());
            setDonors(await GetDonors());
        } catch (error) {
            console.error("Error fetching static data:", error);
        }
    };

    const fetchCharityHistory = async () => {
        if (!charityIndex) return alert("Please enter an index.");
        try {
            const data = await GetCharityHistory(Number(charityIndex));
            setCharityHistory(data);
        } catch (error) {
            console.error("Error fetching charity history:", error);
        }
    };

    const fetchDonationAmount = async () => {
        if (!donationAddress) return alert("Please enter a wallet address.");
        try {
            const data = await GetDonationAmount(donationAddress);
            setDonationAmount(data);
        } catch (error) {
            console.error("Error fetching donation amount:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-12">Inquiry Charity Data</h1>

            {/* General Data Section */}
            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg mt-10">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">📜 General Data</h2>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg" onClick={fetchStaticData}>
                    Refresh Data
                </Button>
                <div className="text-sm space-y-3 mt-4">
                    <p><strong>🎯 Charity Target:</strong> {charityTarget ?? "N/A"}</p>
                    <p><strong>💰 Contract Balance:</strong> {contractBalance ?? "N/A"} ETH</p>
                    <p><strong>👑 Contract Owner:</strong> {owner ?? "N/A"}</p>
                    <p><strong>🙌 Current Donor(s):</strong></p>
                    <ul>
                        {donors?.map((donor: string, index: number) => (
                            <li key={index} className="break-all">{donor}</li>
                        ))}
                    </ul>
                    <p><strong>📜 History Count:</strong> {historyCount ?? "N/A"}</p>
                </div>
            </div>

            {/* Donation Amount Section */}
            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg mt-10">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">💸 Get Current Donation Amount</h2>
                <div className="flex gap-4">
                    <Input
                        className="bg-gray-700 text-white flex-1 py-3 px-4 rounded-lg text-lg"
                        type="text"
                        placeholder="Enter wallet address"
                        value={donationAddress}
                        onChange={(e) => setDonationAddress(e.target.value)}
                    />
                    <Button className="bg-green-600 hover:bg-green-700 py-3 px-6 text-lg rounded-lg" onClick={fetchDonationAmount}>
                        Get Data
                    </Button>
                </div>
                <p className="text-sm mt-4"><strong>💵 Donation Amount:</strong> {donationAmount ?? "N/A"}</p>
            </div>

            {/* Charity History Section */}
            <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg mt-10">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">📜 Get Charity History</h2>
                <p className="text-gray-400 text-sm">
                    Use <strong>(history length - 1)</strong> as the latest index.
                </p>
                <div className="flex gap-4">
                    <Input
                        className="bg-gray-700 text-white flex-1 py-3 px-4 rounded-lg text-lg"
                        type="number"
                        placeholder="Enter index"
                        value={charityIndex}
                        onChange={(e) => setCharityIndex(e.target.value)}
                    />
                    <Button className="bg-green-600 hover:bg-green-700 py-3 px-6 text-lg rounded-lg" onClick={fetchCharityHistory}>
                        Get Data
                    </Button>
                </div>

                {/* Charity History Display */}
                <div className="text-sm bg-gray-700 p-4 rounded-md overflow-auto max-h-60 mt-4 space-y-3">
                    {charityHistory ? (
                        <>
                            <p><strong>🏦 Target Address:</strong> <span className="break-all">{charityHistory[0]}</span></p>
                            <p><strong>🙌 Donors:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                {charityHistory[1]?.map((donor: string, index: number) => (
                                    <li key={index} className="break-all">{donor}</li>
                                ))}
                            </ul>
                            <p><strong>💰 Donation Amounts (ETH):</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                {charityHistory[2]?.map((amount: string, index: number) => (
                                    <li key={index}>{(Number(amount) / 1e18).toFixed(20)} ETH</li>
                                ))}
                            </ul>
                            <p><strong>🤑 Total Donations:</strong> {(Number(charityHistory[3]) / 1e18).toFixed(20)} ETH</p>
                        </>
                    ) : (
                        <p className="text-gray-400">No data available</p>
                    )}
                </div>
            </div>

        </div>
    );
};
