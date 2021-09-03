import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  toast,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { GoogleLogout } from 'react-google-login';
import ShowUsers from '../ShowUsers';
import Messages from './Messages';

export default function Chatbox() {
  const toast = useToast();
  const {account, setAccount} = useContext(AccountContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const cid =
    '826534209774-bp42kiil9tor1ndjtc3eltjbmngm5f6g.apps.googleusercontent.com';
  const onLogout = () => {
    setAccount(null);
    console.log('on logout');
  };
  useEffect(()=> {
    toast({ title: "Successfully Login",status: 'success', isClosable: true, duration: 3000 , position: 'top-right'});
  },[account])
  const [text,setText] = useState('')
  return (
    <div>
      <Grid templateColumns="1.5fr 3.5fr">
        <Box borderRightWidth={1} borderColor="#ededed" h="100vh">
          <Flex p="1rem" justify="space-between" bg="#ededed" align="center">
            {account && account.imageUrl ? (
              <button ref={btnRef} onClick={onOpen}>
                <img
                  src={account.imageUrl}
                  style={{ borderRadius: '50%', width: '40px' }}
                />
              </button>
            ) : (
              ''
            )}
            <MyDrawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              btnRef={btnRef}
            />
            <Flex>
              <button><Text fontSize="xl" mx="1rem">
                <i class="fas fa-envelope"></i>
              </Text></button>
              <Menu>
                <MenuButton>
                  <i class="fas fa-ellipsis-v"></i>
                </MenuButton>
                <MenuList>
                  <MenuItem ref={btnRef} onClick={onOpen}>
                    Profile
                  </MenuItem>
                  <MenuItem>
                    <GoogleLogout
                      clientId={cid}
                      render={renderProps => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          Logout
                        </button>
                      )}
                      onLogoutSuccess={onLogout}
                      isSignedIn={false}
                    ></GoogleLogout>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <Box px="1rem" bg="#ededed">
            <Input placeholder="Search" bg="#fff" mb=".5rem" onChange={(e)=> setText(e.target.value)} />
          </Box>
          <ShowUsers  text={text}   />
        </Box>
        <Box>
          <Messages/>
        </Box>
      </Grid>
    </div>
  );
}

const MyDrawer = ({ isOpen, placement, onClose, btnRef }) => {
  const {account, setAccount} = useContext(AccountContext);
  return (
    <Drawer
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Flex bg="teal" color="#fff" h="20vh">
          <DrawerHeader>Profile</DrawerHeader>
          <DrawerCloseButton mt=".5rem" focus="none" outline="0" />
        </Flex>

        <Box bg="#ededed" h="100vh">
          <Flex justify="center" align="center" mt="2rem">
            {account && account.imageUrl ? (
              <img
                src={account.imageUrl}
                style={{ width: '150px', borderRadius: '50%' }}
              />
            ) : (
              ''
            )}
          </Flex>
          <Flex bg="#fff" direction="column" py="2rem" mt="2rem">
            <Text ml="2">Your Name</Text>
            <Flex justify="space-between" align="center">
              {account && account.name ? (
                <Text ml="2" fontWeight="bold">
                  {account.name}
                </Text>
              ) : (
                ''
              )}
              <button><Text fontWeight="bold" fontSize="1.2rem" mr="2"><i class="far fa-edit"></i></Text></button>
            </Flex>
          </Flex>
          <Flex bg="#fff" direction="column" py="2rem" mt="2rem">
            <Text ml="2">Your Status</Text>
            <Flex justify="space-between" align="center">
              <Text ml="2" fontWeight="bold">
                Hey, There i am using Whatsapp
              </Text>
              <button><Text fontWeight="bold" fontSize="1.2rem" mr="2"><i class="far fa-edit"></i></Text></button>
            </Flex>
          </Flex>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};
