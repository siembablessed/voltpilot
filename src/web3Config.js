import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig } from 'wagmi'
import { mainnet, polygon, sepolia } from 'wagmi/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'

// 2. Configure chains & providers
const chains = [sepolia, mainnet, polygon] // Add your preferred chains
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export { Web3Modal, ethereumClient, projectId, wagmiConfig }