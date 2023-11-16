import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'


const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

window.Buffer = window.Buffer || Buffer;

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
} 

const root = ReactDOM.createRoot(document.getElementById('root'));


// 1. Get projectId
const projectId = '57c3ed3f7633af987eda789d503edfee'

// 2. Create wagmiConfig
const metadata = {
  name: 'web3-modal-setup',
  description: 'Web3 Modal Example',
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

root.render(
  <React.StrictMode>

    <WagmiConfig config={wagmiConfig}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <App />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
    </WagmiConfig>
    <NotificationContainer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
