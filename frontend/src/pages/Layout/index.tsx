import { Box, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { LeftBar } from './components/left-bar';
import { RightBar } from './components/right-bar';

const AppLayout = () => {
  return (
    <Box display={'flex'} bg={useColorModeValue('green.900', 'gray.900')}>
      <LeftBar />
      <Box bg={useColorModeValue('green.900', 'gray.900')} w={'1061px'} p={'30px'}>
        <Outlet />
      </Box>
      <RightBar />
    </Box>
  );
};

export default AppLayout;
