import { createTheme } from '@mui/material/styles';

const rolePalettes = {
  ADMIN: { primary: { main: '#1976d2' }, background: { default: "#e3f2fd" } },
  MANAGER: { primary: { main: '#388e3c' }, background: { default: "#e8f5e9" } },
  EMPLOYEE: { primary: { main: '#8e24aa' }, background: { default: "#f3e5f5" } },
};

export const getRoleTheme = (role) => createTheme({
  palette: {
    mode: 'light',
    ...rolePalettes[role] || rolePalettes.EMPLOYEE,
  }
});
