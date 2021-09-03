import { Box, Flex, Tag, Text, toast } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { AccountContext } from '../context/AccountProvider';
import { useToast } from "@chakra-ui/react"
import axios from 'axios'
export default function Landing() {
    const url = 'http://localhost:5000'
    const {account,setAccount} = useContext(AccountContext)
    const onLoginSuccess = async (res) => {
        setAccount(res.profileObj)
        console.log('onLoginSuccess')
        try {
            await axios.post(`${url}/add-user`,res.profileObj)
            console.log("user added successfully")
        } catch (error) {
            console.log("Error in adding user to db frontend", error)
        }
    }
    const onLoginFailure = () => {
        console.log('onLoginFailure')
    }
    const cid = "826534209774-bp42kiil9tor1ndjtc3eltjbmngm5f6g.apps.googleusercontent.com"
    const breakpoints = createBreakpoints({
        sm: "30em",
        md: "48em",
        lg: "62em",
        xl: "80em",
        "2xl": "96em",
      })
    return (
        <div>
            <Flex h="180px" bg="teal">
                <Text color="white" fontWeight="bold" left="12%" pos="absolute"  top="12%" fontSize="xl">WHATSAPP</Text>
            </Flex>
                <Flex w={{lg: "75%",md: "75%", sm: "100%"}} h="75vh" pos="absolute" pos="absolute" top="50%" left={{lg: "12%", md: "12%", sm: "0"}}  borderWidth={1}  bg="white" p={{xl: "5rem", lg: "4rem", md: "3rem"}} justify={["center", "center", "center","space-between","space-between"]} align={{sm: "center"}} direction={["column", "column", "column", "column", "row"]} >
                    <Flex direction="column" px={["1rem", "1rem", "1rem", "0rem", "0rem"]} >
                        <Text fontSize="3xl" mb="1rem" >To use Whatsapp on your computer</Text>
                        <Text mt=".5rem" fontSize="xl">1. Open Whatsapp on your phone</Text>
                        <Text mt=".5rem" fontSize="xl">2. Tap <strong>Menu</strong> <Tag><i class="fas fa-ellipsis-v"></i></Tag> or <strong>Settings</strong> <Tag><i class="fas fa-cog"></i></Tag> and select <strong>Linked Devices</strong> </Text>
                        <Text mt=".5rem" fontSize="xl">3. Point your phone to this screen and scan the code</Text> 
                    </Flex>
                    <Flex justify={["center", "center", "center","center","flex-end"]}>
                        <Box mt={["2rem","2rem","2rem","0rem","2rem"]}>
                        <GoogleLogin
                        clientId={cid}
                        buttonText="Login"
                        onSuccess={onLoginSuccess}
                        onFailure={onLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={{"fontSize": "1.2rem", "color": "white", "padding": ".7rem", background: "#008080"}} ><i class="fab fa-google"></i> Login with Google</button>
                          )}
                          isSignedIn={true}
                        />
                        </Box>
                    </Flex>
                </Flex>
        </div>
    )
}
