import { CssBaseline } from '@material-ui/core'
import { ptBR } from '@material-ui/core/locale'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Routes from './routes'
import { AuthProvider } from './hooks/useAuth'

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(31,45,75, 0.95)',
    },
    secondary: {
      main: '#EED44D'
    },
    error: {
      main: "#EE4F4F"
    },
    white: '#F6F8FC',
    gray: '#A9A9A9',
    darkGray: '#777777'
  }
}, ptBR);

function App() {
  
  return (
    <AuthProvider>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <main>
          <Routes />
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
