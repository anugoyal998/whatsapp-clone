import React from 'react';
import { Flex, Spacer, Text, Grid , Box} from '@chakra-ui/react';
export default function RightMsg({ e }) {
  return (
    <Grid templateColumns="1fr 1fr" mb=".5rem" mx="1rem"  >
      <Box></Box>
      <Flex>
        <Spacer />
        <Box bg="#DCF8C6" p=".2rem" borderRadius=".3rem">
            {e && e.message ? (
                <Text wordBreak="break-all">
                    {e.message}
                </Text>
                ) : (
                ''
            )}
           {e && e.audioNPM? <audio controls src={e.audioNPM} autoplay /> : ""}
            <Flex>
                <Spacer/>
                {e && e.createdAt?<Text opacity=".6">{e.createdAt}</Text>:""}
            </Flex>
        </Box>
      </Flex>
    </Grid>
  );
}
