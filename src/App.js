import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import HomePage from './components/pages/HomePage';
import PoemPage from './components/pages/PoemPage';
import CreateTestPage from './components/pages/CreateTestPage';
import { mainStyle } from './styles/mainStyles';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { handleShare, handleShowAlert } = useTelegram(setCurrentPage);

  useEffect(() => {
    try {
      window.Telegram.WebApp.expand();
    } catch (e) {
      console.log('Not in Telegram');
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage 
          onShowPoem={handleShowAlert} 
          onShare={handleShare}
          onCreateTest={() => setCurrentPage('create')}
        />;
      case 'poem':
        return <PoemPage onBack={() => setCurrentPage('home')} />;
      case 'create':
        return <CreateTestPage onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={mainStyle}>
      <AnimatePresence initial={false} mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>
  );
}

export default App;