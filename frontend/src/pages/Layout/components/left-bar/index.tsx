import { Logo, Logout } from '@/assets/index';
import { GreenButton } from '@/components/green-button';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { leftBarMenu } from '../../constants/left-bar.constant';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabaseClient } from '@/config/supabase-client';
import { FiLogOut } from 'react-icons/fi';
import { ColorModeSwitcher } from '@/ColorModeSwitcher';
import { AxiosResponse } from 'axios';
import { getProfileByAuthorEmail } from '@/api';
// import { useQuery } from 'react-query';

export function LeftBar() {
  const [session, setSession] = useState<Session | null>();
  const [avatar_url, setAvatarUrl] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [profile, setProfile] = useState<IProfile>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error
      } = await supabaseClient.auth.getSession();
      if (error) throw error;
      if (session) {
        setSession(session);
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

  const fetchProfile = async () => {
    const res: AxiosResponse<ApiDataType> = await getProfileByAuthorEmail(session?.user?.email!);
    return res.data;
  };

  // const {
  //   data: profileData,
  //   error,
  //   isLoading: isFetchingProfile,
  //   refetch: refetchProfile
  // } = useQuery('profile', fetchProfile, {
  //   enabled: false,
  //   onSuccess(res: IProfile) {
  //     setProfile(res);
  //   },
  //   onError: err => {
  //     console.log(err);
  //   }
  // });

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    setAvatarUrl('');
    navigate('/login');
  };

  return (
    <Box
      w={'312.75px'}
      h={'100vh'}
      bg={useColorModeValue('green.900', 'gray.900')}>
      <Box marginLeft={'45px'} marginTop={'30px'}>
        <Image src={Logo} w={'135px'} />
        <Box display={'flex'} flexDirection={'column'} marginTop={'40px'} w={'252.75px'} gap={'6px'}>
          {leftBarMenu.map(menu => (
            <Button
              onClick={() => {
                navigate(menu.path);
              }}
              justifyContent={'flex-start'}
              display={'flex'}
              alignItems={'center'}
              variant={'ghost'}
              gap={'16px'}
              _hover={{
                backgroundColor: 'rgba(255,255,255, 0.1)'
              }}>
              {location.pathname === menu.path ? (
                <>
                  <Image src={menu.icon.solid} w={'24px'} /> <Text color="white">{menu.name}</Text>
                </>
              ) : (
                <>
                  <Image src={menu.icon.outline} w={'24px'} />{' '}
                  <Text color="white" fontWeight={'bold'}>
                    {menu.name}
                  </Text>
                </>
              )}
            </Button>
          ))}
          <GreenButton bg={useColorModeValue('green.700', 'gray.700')} mb={'auto'}>Create Post</GreenButton>
          <Box marginTop={'270px'} justifyContent={'flex-start'} display={'flex'} alignItems={'center'} gap={'16px'}>
            {/* <Image src={Logout} w={'24px'} /> <Text color="white">Logout</Text> */}
            <Box>
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
                  <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'lightblue' : '' })} end>
                    Login
                  </NavLink>
                )}
              </Flex>
            </Box>
            <ColorModeSwitcher justifySelf="flex-end" marginLeft={4} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
