import { UserProvider } from '@auth0/nextjs-auth0';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@/styles/globals.css';
import customTheme from '@/styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <ThemeProvider theme={customTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
