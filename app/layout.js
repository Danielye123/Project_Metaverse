import '../styles/globals.css';
import Starfield from '../components/Starfield';
import WorldAmbienceDom from '../components/WorldAmbienceDom';
import { WorldThemeProvider } from '../context/WorldThemeContext';

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </head>
    <body>
      <WorldThemeProvider>
        <Starfield />
        <WorldAmbienceDom />
        {children}
      </WorldThemeProvider>
    </body>
  </html>
);

export default RootLayout;
