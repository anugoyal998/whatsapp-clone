import React, { useContext, useEffect, useState } from 'react';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import { ConversationIdContext } from '../../context/ConversationIdProvider';
import { PersonContext } from '../../context/PersonProvider';
import { Box, Image, Flex } from '@chakra-ui/react';
import FilePreview from './FilePreview';
export default function Messages() {
  const [conversationId, setConversationId] = useContext(ConversationIdContext);
  const [person, setPerson] = useContext(PersonContext);
  const [showEmoji, setShowEmoji] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState()
  const [file, setFile] = useState();
  if (conversationId && person) {
    return (
      <div>
        <ChatHeader />
        {!file ? (
          <>
            <ChatMessage
              conversationId={conversationId}
              showEmoji={showEmoji}
              incomingMessage={incomingMessage}
            />
            <ChatFooter
              conversationId={conversationId}
              showEmoji={showEmoji}
              setShowEmoji={setShowEmoji}
              file={file}
              setFile={setFile}
              incomingMessage={incomingMessage}
              setIncomingMessage={setIncomingMessage}
            />
          </>
        ) : (
          <FilePreview file={file} />
        )}
      </div>
    );
  } else {
    return (
      <Flex bg="#F8FAFB" h="100vh" justify="center">
        <Image
          src="https://ik.imagekit.io/ag/wp-content/uploads/2015/01/QR-connected.png"
          transform="scale(.9,.9)"
        />
      </Flex>
    );
  }
}
