'use client'
import { useDisconnect, useAppKit, useAppKitNetwork } from '@reown/appkit/react'
import { networks } from '@/config'

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
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
      } else {
        await switchNetwork(networks[0]);
      }
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  }
  return (
    <div>
      <button onClick={() => open()}>Open</button>
      <button onClick={handleDisconnect}>Disconnect</button>
      <button onClick={handleSwitch}>Switch</button>
    </div>
  )
}
