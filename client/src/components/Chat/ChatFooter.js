import { Flex, Input, Box, Image } from '@chakra-ui/react';
import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import { useReactMediaRecorder } from 'react-media-recorder';
import SendIcon from '../../img/send-icon.png';
export default function ChatFooter({
  conversationId,
  showEmoji,
  setShowEmoji,
  file,
  setFile,
  incomingMessage,
  setIncomingMessage,
}) {
  const [text, setText] = useState();
  const {account, socket, newMsgFlag, setNewMsgFlag} = useContext(AccountContext);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
  const recieverid = conversationId?.members?.find(member=> member !== account.googleId)
  useEffect(()=> {
    socket.current.on('getMessage', data => {
      setIncomingMessage({
        sender: data.senderid,
        text: data.text,
        createdAt: Date.now()
      })
    })
  },[newMsgFlag])
  console.log("incomingMessage",incomingMessage)
  const handleKeyPress = async e => {
    if (!text) return;
    let code = e.keyCode || e.which;
    let value = text;
    if (code === 13) {
      setText('');
      setNewMsgFlag(prev => !prev);
      socket.current.emit('sendMessage',{
        senderid: account.googleId,
        recieverid,
        text: value,
      })
      try {
        const url = 'http://localhost:5000';
        await axios.post(`${url}/message/add`, {
          conversationId: conversationId._id,
          senderId: account.googleId,
          message: value,
        });
        console.log('message save success');
      } catch (err) {
        console.log('error while adding conversation frontend', err);
      }
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    if (text) setText(text + emojiObject.emoji);
    else setText(emojiObject.emoji);
  };

  const handleStopRecording = async () => {
    stopRecording();
    console.log('stop recording');
    if (!mediaBlobUrl) return;
    try {
      const url = 'http://localhost:5000';
      await axios.post(`${url}/message/add`, {
        conversationId,
        senderId: account.googleId,
        audioNPM: mediaBlobUrl,
      });
      console.log('audio saved successfully');
    } catch (error) {
      console.log('error while adding conversation frontend', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  return (
    <Flex direction="column">
      {showEmoji ? <Picker onEmojiClick={onEmojiClick} preload={true} /> : ''}
      <Flex bg="#ededed" alignItems="center" p=".4rem">
        <Box
          mx=".3rem"
          fontSize="1.3rem"
          cursor="pointer"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <i class="far fa-grin"></i>
        </Box>
        <Box mx=".3rem" fontSize="1.3rem" cursor="pointer">
          <input type="file" id="file_input" hidden onChange={handleFileChange} />
          <label for="file_input" style={{cursor: "pointer"}}><i class="fas fa-paperclip"></i></label>
        </Box>
        <Input
          mx=".3rem"
          placeholder="Type here"
          borderRadius="50px"
          borderWidth="1px"
          borderColor="#968d86"
          onChange={e => setText(e.target.value)}
          value={text}
          onKeyPress={e => handleKeyPress(e)}
        />
        {status === 'idle' || status === 'stopped' ? (
          <Box
            mx=".3rem"
            fontSize="1.3rem"
            cursor="pointer"
            onClick={startRecording}
          >
            <i class="fas fa-microphone"></i>
          </Box>
        ) : (
          ''
        )}
        {status === 'recording' ? (
          <Box
            mx=".3rem"
            fontSize="1.3rem"
            cursor="pointer"
            onClick={handleStopRecording}
          >
            <Image src={SendIcon} w={30} />
          </Box>
        ) : (
          ''
        )}
      </Flex>
    </Flex>
  );
}
