import { createContext, useContext, useState, ReactNode } from "react";

// Define context type
interface WalletContextType {
    wallet: string | null;
    setWallet: (address: string | null) => void;
}

// Create context with default values
const WalletContext = createContext<WalletContextType | null>(null);

// Context Provider Component
export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [wallet, setWallet] = useState<string | null>(null);

    return (
        <WalletContext.Provider value={{ wallet, setWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

// Custom hook to use the wallet context
export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};