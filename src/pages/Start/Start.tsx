import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuBar } from "@/components/MenuBar";

import { InquiryTab } from "./InquiryTab";
import { DonateTab } from "./DonateTab";
import { UpdateTargetTab } from "./UpdateTargetTab";
import { TransferOwnershipTab } from "./TransferOwnershipTab";
import { SendCharityTab } from "./SendCharityTab";
import { ConnectWallet } from "@/methods/ConnectWallet";
import { useWallet } from "@/store";

export const Start = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState('inquiry');
    const { wallet, setWallet } = useWallet();

    useEffect(() => {
        const walletAddress = localStorage.getItem('walletAddress');
        setWallet(walletAddress);
    }, []);

    const handleConnectWallet = async () => {
        const account = await ConnectWallet();
        if (account) {
            setWallet(account);
            localStorage.setItem('walletAddress', account);
        }
    }

    return (
        <>
            <MenuBar
                menus={[
                    { label: "Home", onClick: () => navigate("/") },
                    { label: "Inquiry", onClick: () => setTab("inquiry") },
                    { label: "Donate", onClick: () => setTab("donate") },
                    { label: "Update Target", onClick: () => setTab("updateTarget") },
                    { label: "Transfer Ownership", onClick: () => setTab("transferOwnership") },
                    { label: "Send Charity", onClick: () => setTab("send") },
                    { label: 
                        wallet ?
                            `Connected: ${wallet.slice(0, 6)}...` 
                            :
                            "Connect Wallet", onClick: handleConnectWallet
                    },
                ]}
            />

            { !wallet && <p className="text-red-200 text-center mt-4">Please connect your wallet before doing transaction</p> }

            { tab=="inquiry" && <InquiryTab /> }
            { tab=="donate" && <DonateTab /> }
            { tab=="updateTarget" && <UpdateTargetTab /> }
            { tab=="transferOwnership" && <TransferOwnershipTab /> }
            { tab=="send" && <SendCharityTab /> }
        </>
    )
}