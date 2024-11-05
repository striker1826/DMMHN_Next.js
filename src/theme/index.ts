import { defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react';

const arrowRight = defineStyle({
  position: 'absolute',
  right: '-24',
  top: '40%',
  height: '20%',
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
  height: '20%',
  borderRadius: 'full',
  backgroundColor: 'blackAlpha.0',
  color: 'whiteAlpha.600',
  fontSize: '58px',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  _hover: { color: 'whiteAlpha.900', backgroundColor: 'blackAlpha.300' },
});

const circle = defineStyle({
  width: '280px',
  height: '280px',
  rounded: 'full',
  fontSize: '4xl',
  backgroundColor: 'green.600',
  color: 'white',
  transition: 'all 0.1s ease-in-out',
  _hover: { width: '300px', height: '300px', fontSize: '5xl' },
  _selected: { backgroundColor: 'green.800' },
});

const buttonTheme = defineStyleConfig({
  variants: { arrowRight, arrowLeft, circle },
});

export const theme = extendTheme({
  components: { Button: buttonTheme },
});
