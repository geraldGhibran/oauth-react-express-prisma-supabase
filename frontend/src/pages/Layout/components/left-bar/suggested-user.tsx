import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import fakeUsers from "@/datas/user.json";
import { useState } from "react";
import { User } from "@/types/user";

export function SuggestedUser() {
  const [suggestedUsers] = useState<User[]>(fakeUsers);

  return (
    <Box margin={"30px"}>
      <Card bg={useColorModeValue('green.700', 'gray.700')}>
        <CardBody>
          <Text as="h1" color={"white"} fontWeight={"bold"} mb="10px">
            Suggested for you
          </Text>

          <Box display={"flex"} flexDirection={"column"} gap="20px">
            {suggestedUsers.slice(0,3).map((user) => (
              <Box display={"flex"}>
                <Avatar src={user.profile.profilePicture} />
                <Box>
                  <Text color={"white"}>{user.profile.fullName}</Text>
                  <Text color="brand.secondary.500">@{user.username}</Text>
                </Box>
                <Spacer />
                <Button disabled={user.isFollowed} variant={"outline"} color={"white"}>
                  {user.isFollowed ? "Followed" : "Follow"}
                </Button>
              </Box>
            ))}
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
