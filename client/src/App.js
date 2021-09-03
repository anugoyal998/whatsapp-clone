import React from 'react';
import dotenv from 'dotenv'
import {
  ChakraProvider,

  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import AccountProvider from './context/AccountProvider';
import PersonProvider from './context/PersonProvider'
import ConversationProvider from './context/ConversationIdProvider'
import Messenger from './components/Messenger';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AccountProvider>
        <PersonProvider>
          <ConversationProvider>
            <Messenger/>
          </ConversationProvider>
        </PersonProvider>
      </AccountProvider>
    </ChakraProvider>
  );
}

export default App;
