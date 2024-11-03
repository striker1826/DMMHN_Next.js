import { defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react';

const arrowRight = defineStyle({
  position: 'absolute',
  right: '-20',
  top: '0',
  height: '100%',
  background: 'none',
  color: 'whiteAlpha.600',
  fontSize: '58px',
  transition: 'right 0.3s ease-in-out, color 0.3s ease-in-out',
  _hover: { color: 'whiteAlpha.900', right: '-24' },
});

const arrowLeft = defineStyle({
  position: 'absolute',
  left: '-20',
  top: '0',
  height: '100%',
  background: 'none',
  color: 'whiteAlpha.600',
  fontSize: '58px',
  transition: 'left 0.3s ease-in-out, color 0.3s ease-in-out',
  _hover: { color: 'whiteAlpha.900', left: '-24' },
});

const buttonTheme = defineStyleConfig({
  variants: { arrowRight, arrowLeft },
});

export const theme = extendTheme({
  components: { Button: buttonTheme },
});
