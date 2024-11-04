import { ColorModeSwitcher } from '@/ColorModeSwitcher';
import { supabaseClient } from '@/config/supabase-client';
import eventBus from '@/eventBus';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  useBreakpointValue,

} from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const WelcomePage = () => {
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>();
  const [avatar_url, setAvatarUrl] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [profile, setProfile] = useState<IProfile>()
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  useEffect(() => {
    // we listen here if someone cleans the storage in the browser
    // so we push him back and logout
    // check: https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
    const handleLocalStorage = () => {
      window.addEventListener('storage', (event) => {
        if (event) supabaseClient.auth.signOut()
      })
    }
    //if (session) getAvatarUrl();
    //if (session) refetch()
    handleLocalStorage()
  }, []);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      if (session) {
        setSession(session)
        //setUser(session.user)
      }
    };

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT') {
        localStorage.removeItem('user');
      }
      setSession(session);
    });

    setData();
  }, []);

  // const fetchProfile = async () => {
  //   const res: AxiosResponse<ApiDataType> = await getProfileByAuthorEmail(session?.user?.email!)
  //   return res.data;
  // };

//   const { data: profileData, error, isLoading: isFetchingProfile, refetch: refetchProfile } = useQuery('profile', fetchProfile, {
//     enabled: false, onSuccess(res: IProfile) {
//       setProfile(res)
//     },
//     onError: (err) => {
//       console.log(err)
//     }
//   });

//  const fetchProfilePicture = async () => {
//     const res: AxiosResponse<ApiDataType> = await getPictureByProfileId(profile?.id!)
//     return res.data
//   }

//   const { data: pictureData, isLoading, isError, refetch: refetchPicture } = useQuery('profilePicture', fetchProfilePicture, {
//     enabled: false, retry: 2, cacheTime: 0, onSuccess(res: IPicture) {
//       //setPicture(res)
//     },
//     onError: (error: any) => {
//       console.log(error)
//     }
//   })

  useEffect(() => {

    if (avatar_url) downloadImage(avatar_url);
  }, [avatar_url]);

  async function downloadImage(path: any) {
    try {
      const { data, error }: any = await supabaseClient.storage.from('images').download(path);
      if (error) {
        throw error;
      }
      const url: any = URL.createObjectURL(data);
      setImageUrl(url);
    } catch (error: any) {
      console.log('Error downloading image: ', error.message);
    }
  }

  // we listen for potential ProfilePage.tsx updates especially avatar
  // and we reload the gravatar url
  eventBus.on('profileUpdated', (hasUpdated: boolean) => {
    if (hasUpdated) {
      // refetchProfile()
      // refetchPicture()
    }
  });

  useEffect(() => {
    if (session?.user) {
      // console.log('user->', session.user.email)
      // console.log('env->', process.env.REACT_APP_BACKEND_URL)
      setUser(session.user)
      // refetchProfile()
    }
    
   if (user) {
    
    //setProfile(profileData)
    setAvatarUrl(profile?.picture?.avatarUrl)
   }
  }, [session?.user, profile, user])

  const signOut = async () => {
    await supabaseClient.auth.signOut()
    setAvatarUrl('')
    navigate("/signin");
    Cookies.remove('token')
  }

  return (
    <Flex
      w={'full'}
      h={'100vh'}
      // backgroundImage={
      //   'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
      // }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            DevCircle
          </Text>
          <Stack direction={'row'}>
          <Flex alignItems={'center'}>
            {session ? (
              <>
                <Button
                  onClick={signOut}
                  variant={'solid'}
                  colorScheme={'teal'}
                  size={'sm'}
                  mr={4}
                  leftIcon={<FiLogOut />}>
                  Logout
                </Button>
                <Menu>
                  <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                    <HStack>
                      <Avatar size={'sm'} src={avatar_url ? imageUrl : ''} />
                      <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                        <Text fontSize="sm">{profile?.username}</Text>
                        <Text fontSize="xs" color="gray.600">
                          Admin
                        </Text>
                      </VStack>
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? 'lightblue' : '' })} end>
                      <MenuItem>Profile</MenuItem>
                    </NavLink>

                    <MenuItem>Settings</MenuItem>
                    <MenuItem>Billing</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => signOut}>Sign out</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <NavLink to="/signin" style={({ isActive }) => ({ color: isActive ? 'lightblue' : '' })} end>
                Login
              </NavLink>
            )}
            <ColorModeSwitcher justifySelf="flex-end" marginLeft={4} />
          </Flex>
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'blue.500' }}>
              Start connecting
            </Button>
            <Button
              bg={'whiteAlpha.300'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'whiteAlpha.500' }}>
              Explore profiles
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  )
}

export default WelcomePage