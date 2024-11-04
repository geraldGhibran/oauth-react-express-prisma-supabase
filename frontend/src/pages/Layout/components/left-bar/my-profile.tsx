import { BGProfileCover } from "@/assets";
import { Avatar, Box, Button, Card, CardBody, Text, useColorModeValue } from "@chakra-ui/react";

export function MyProfile() {

  return (
    <Box margin={"30px"}>
      <Card bg={useColorModeValue('green.700', 'gray.700')}>
        <CardBody>
          <Text as="h1" color={"white"} fontWeight={"bold"} mb="10px">
            My Profile
          </Text>
          <Box>
            <Box
              backgroundImage={BGProfileCover}
              w={"100%"}
              height="75px"
              position={"relative"}
            >
              <Avatar
                w={"100px"}
                h={"100px"}
                bottom={"-10"}
                left={"3"}
                position={"absolute"}
                border={"1px solid black"}
              />
            </Box>
            <Box mt={"20px"} display={"flex"} justifyContent={"flex-end"}>
              <Button variant={"outline"} color={"white"} fontSize={"sm"}>
                Edit Profile
              </Button>
            </Box>
            <Box>
              <Text as="h1" color={"white"} fontWeight={"bold"} fontSize={"xl"}>
                
              </Text>
              <Text as="h1" color={"brand.secondary.500"}>
                @gerald
              </Text>
              <Text as="h1" color={"white"}>
                Gerald GG
              </Text>
              <Box display={"flex"} gap="20px" mt="10px">
                <Text as="h1" color={"white"}>
                  <Text as="span" fontWeight={"bold"}>
                    123
                  </Text>
                  Following
                </Text>
                <Text as="h1" color={"white"}>
                  <Text as="span" fontWeight={"bold"}>
                    123
                  </Text>
                  Followers
                </Text>
              </Box>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
