import './css/App.css';
import AppRouter from './AppRouter';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import { UserDataProvider } from './context/UserData';


function App() {
  return (
    <ClerkProvider>
      <UserDataProvider>
        <Router>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main>
              <AppRouter />
            </main>
          </div>
        </Router>
      </UserDataProvider>
    </ClerkProvider>
  );
}

export default App;
