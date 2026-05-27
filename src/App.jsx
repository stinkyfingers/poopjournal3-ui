
import './css/App.css';
import AppRouter from './AppRouter';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react'

function App() {
  return (
    <ClerkProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ marginLeft: 200, flex: 1 }}>
            <AppRouter />
          </main>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
