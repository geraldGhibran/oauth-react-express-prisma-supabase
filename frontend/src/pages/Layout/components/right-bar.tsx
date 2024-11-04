import { Box, useColorModeValue } from "@chakra-ui/react";
import { MyProfile } from "./left-bar/my-profile";
import { Credit } from "./left-bar/credit";
import { SuggestedUser } from "./left-bar/suggested-user";

export function RightBar() {
  return (
    <Box
      w={"422.25px"}
      h={"100vh"}
      bg={useColorModeValue('green.900', 'gray.900')}
    >
      <MyProfile />
      <SuggestedUser />
      <Credit />
    </Box>
  );
}
