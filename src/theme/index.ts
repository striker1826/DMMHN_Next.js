import { defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react';

const arrowRight = defineStyle({
  position: 'absolute',
  right: '-36',
  top: '50%',
  height: '20%',
  transform: 'translateY(250%)',
  borderRadius: 'full',
  backgroundColor: 'blackAlpha.0',
  color: 'whiteAlpha.600',
  fontSize: '58px',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  _hover: { color: 'whiteAlpha.900', backgroundColor: 'blackAlpha.300' },
});

const arrowLeft = defineStyle({
  position: 'absolute',
  left: '-24',
  top: '40%',
  height: '100%',
  borderRadius: 'full',
  backgroundColor: 'blackAlpha.0',
  color: 'whiteAlpha.600',
  fontSize: '58px',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  _hover: { color: 'whiteAlpha.900', backgroundColor: 'blackAlpha.300', height: '100%' },
});

const buttonTheme = defineStyleConfig({
  variants: { arrowRight, arrowLeft },
});

export const theme = extendTheme({
  components: { Button: buttonTheme },
});
