import tailwindConfigModule from '../../../../tailwind.config.js';
import { createTheme } from '@mui/material/styles';
import { defaultTheme } from 'react-admin';
import resolveConfig from 'tailwindcss/resolveConfig';

const tailwindConfig: any = resolveConfig(tailwindConfigModule as any);

export const AdminTheme = createTheme({
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      main: tailwindConfig.theme?.colors?.nsAdmin?.DEFAULT
    },
    secondary: {
      main: 'rgb(255, 255, 255)'
    }
  },
  typography: {
    fontFamily: tailwindConfig.theme?.fontFamily?.alpha?.join(',')
  }
  //  spacing: [0, 24, 24, 0]
});
