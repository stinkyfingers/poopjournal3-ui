import './css/App.css';
import AppRouter from './AppRouter';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import { FoodProvider } from './context/FoodProvider';
import { PoopProvider } from './context/PoopProvider';


function App() {
  return (
    <ClerkProvider>
      <FoodProvider>
        <PoopProvider>
          <Router>
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <main>
                <AppRouter />
              </main>
            </div>
          </Router>
        </PoopProvider>
      </FoodProvider>
    </ClerkProvider>
  );
}

export default App;
