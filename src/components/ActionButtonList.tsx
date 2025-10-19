'use client'
import { useDisconnect, useAppKit, useAppKitNetwork } from '@reown/appkit/react'
import { networks } from '@/config'
import { useSendTransaction } from 'wagmi';
import { parseUnits } from 'viem';

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchNetwork, caipNetworkId } = useAppKitNetwork();

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  }

  const handleSwitch = async () => {
    try {
      if (caipNetworkId === "eip155:1") {
        await switchNetwork(networks[1]);
      } else if (caipNetworkId === "eip155:56") {
        await switchNetwork(networks[2]);
      } else {
        await switchNetwork(networks[0]);
      }
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  }

  const handleEVMSendTransaction = async () => {
    try {
      await sendTransactionAsync({
        data: "0x",
        to: "0xb3A6419E7f70eC2EF42d1F048b027d2c96326d67" as `0x${string}`,
        value: parseUnits("0.00001", 18),
      });
    } catch (error) {
      console.error("Failed to send transaction:", error);
    }
  }

  return (
    <div>
      <button onClick={() => open()}>Open</button>
      <button onClick={handleDisconnect}>Disconnect</button>
      <button onClick={handleSwitch}>Switch</button>
      <button onClick={handleEVMSendTransaction}>Send EVM Transaction</button>
    </div>
  )
}
