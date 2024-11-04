import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabase-client';
import { regex } from '../utils/constants';
import { Logo } from '../Logo';
import { OAuthButtonGroup } from './Auth/OAuthButtonGroup';
import { SuggestedUser } from '../pages/components/left-bar/suggested-user';

export const FollowPage = () => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [authButtonState, setAuthButtonState] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [magicEmail, setMagicEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [magicEmailDisabled, setMagicEmailDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [Rmsg, setRMsg] = useState(''); // Registration message
  const [Lmsg, setLMsg] = useState(''); // Login message
  const [user, setUser] = useState<User | null>(); // User object after registration / login
  const [session, setSession] = useState<Session | null>();

  const { isOpen, onToggle } = useDisclosure();

  const onClickReveal = () => {
    onToggle();
  };

  function signInWithSocial(socialName: string): void {
    switch (socialName) {
      case 'Google':
        signGoogle();
        break;
      case 'GitHub':
        signGithub();
        break;
      case 'Discord':
        signDiscord();
        break;
      default:
        break;
    }
  }

  const signInWithGithub = async () => {
    try {
      setLoadingGithub(true);
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'github'
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Error',
        position: 'top',
        description: error.error_description || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const signInWithDiscord = async () => {
    try {
      setLoadingGithub(true);
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'discord'
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Error',
        position: 'top',
        description: error.error_description || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoadingGithub(true);
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Error',
        position: 'top',
        description: error.error_description || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const checkMagicEmail = (e: any) => {
    setMagicEmailDisabled(!regex.test(e.target.value));
    setMagicEmail(e.target.value);
  };

  const checkEmail = (e: any) => {
    setEmailDisabled(!regex.test(e.target.value));
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLoginWithMagic = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signInWithOtp({ email });
      if (error) throw error;
      toast({
        title: 'Account confirmed.',
        position: 'top',
        description: 'Check your email for the login link',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        position: 'top',
        description: error.error_description || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  const signGithub = () => {
    signInWithGithub();
  };

  const signGoogle = () => {
    signInWithGoogle();
  };

  const signDiscord = () => {
    signInWithDiscord();
  };

  const consoleTwitter = () => {
    console.log('Login with twitter...');
  };

  const handleCallBack = useCallback((stringFromChild: string) => {
    signInWithSocial(stringFromChild);
  }, []);

  const handlePasswordCallBack = useCallback((passwordFromChild: string) => {
    setPassword(passwordFromChild);
  }, []);

  const Login = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        toast({
          title: 'Error',
          position: 'top',
          description: error.message,
          status: 'warning',
          duration: 5000,
          isClosable: true
        });
      } else {
        setUser(data.user);
        setSession(data.session);
        navigate('/profile');
      }
    } catch (err) {
      throw err;
    } finally {
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  };

  const Register = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
      });
      if (error) {
        toast({
          title: 'Error',
          position: 'top',
          description: error.message,
          status: 'warning',
          duration: 5000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Success',
          position: 'top',
          description: 'Account created',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        navigate('/profile');
      }
    } catch (err) {
      // console.log(err)
      throw err;
    } finally {
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, []);

  return (
    <Container  maxW="full" py={{ base: '2', md: '-1.5' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="start">
            <Heading fontSize={'4xl'}>{!authButtonState ? 'Follow' : 'Sign in to your account'}</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useColorModeValue('green.900', 'gray.900')}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}>
          <Tabs align="center" isFitted>
            <TabList mb="1em">
              <Tab>Followers</Tab>
              <Tab>Following</Tab>
            </TabList>
            <TabPanels>
              {/* initially mounted */}
              <TabPanel>
                <Stack spacing="6">
                  <Stack spacing="5">
                  <SuggestedUser />

                  </Stack>

                </Stack>
              </TabPanel>
              {/* initially not mounted */}
              <TabPanel>
                <Stack spacing="6">
                  <Stack spacing="5">
                  <SuggestedUser />

                  </Stack>

                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Container>
  );
};

export default FollowPage;
