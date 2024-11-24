import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import TestCard from './components/TestCard';
import { mockTests } from './data/mockTests';

function App() {
  const scrollbarRef = useRef(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [tests, setTests] = useState(mockTests);

  useEffect(() => {
    try {
      window.Telegram.WebApp.expand();
    } catch (e) {
      console.log('Not in Telegram');
    }
  }, []);

  const mainStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    touchAction: 'none',
    backgroundImage: 'linear-gradient(-45deg, #60a5fa, #3b82f6, #818cf8, #8b5cf6, #3b82f6)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite'
  };

  const buttonStyle = {
    padding: '20px 40px',
    fontSize: '18px',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  const handleShowAlert = () => {
    try {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      setCurrentPage('poem');
    } catch (e) {
      setCurrentPage('poem');
    }
  };

  const handleShare = () => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const url = encodeURIComponent('https://yourapp.com');
        const text = encodeURIComponent('Я прохожу классный тест в этом приложении! Присоединяйся!');
        const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;

        const tg = window.Telegram.WebApp;
        tg.openTelegramLink(shareUrl);
      } else {
        alert("Это приложение работает только в Telegram");
      }
    } catch (e) {
      console.error('Ошибка:', e);
      alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
    }
  };

  const checkWebApp = () => {
    try {
      if (window.Telegram.WebApp) {
        alert(`WebApp доступен! 
              Версия: ${window.Telegram.WebApp.version}
              Платформа: ${window.Telegram.WebApp.platform}`);
        console.log('WebApp объект:', window.Telegram.WebApp);
      } else {
        alert('WebApp недоступен');
      }
    } catch (e) {
      console.error('Ошибка при проверке WebApp:', e);
      alert('WebApp недоступен');
    }
  };

  const handleTestSelect = (test) => {
    console.log('Selected test:', test);
    // Здесь будет логика перехода к тесту
  };

  return (
    <div style={mainStyle}>
      <AnimatePresence initial={false} mode="wait">
        {currentPage === 'home' ? (
          <motion.div 
            className="min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Верхний градиент */}
            <div className="sticky top-0 h-20 bg-gradient-to-b from-blue-500 to-transparent z-10" />
            
            <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 40px)' }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
              >
                <h1 style={{
                  color: '#ffffff',
                  fontSize: '2.25rem',
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}>
                  ✨ Тесты ✨
                </h1>
              </motion.div>

              <motion.div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', // Вернули auto-fill
                  gap: '16px',
                  padding: '10px',
                  paddingBottom: '100px',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}
              >
                {tests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1,  // Задержка для каждой следующей карточки
                      duration: 0.5,       // Длительность анимации
                      ease: "easeOut"      // Тип анимации
                    }}
                  >
                    <TestCard 
                      test={test} 
                      onSelect={handleTestSelect}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Нижний градиент */}
            <div className="sticky bottom-0 h-20 bg-gradient-to-t from-blue-500 to-transparent z-10" />
          </motion.div>
        ) : (
          <div className="h-full p-6">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage('home')}
              className={`mb-6 px-6 py-3 text-white bg-white/10 backdrop-blur-lg rounded-xl 
                       border border-white/20 shadow-lg`}
            >
              ← Назад
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`h-[calc(100%-80px)] overflow-y-auto rounded-xl 
                       bg-black/5 backdrop-blur-xl p-6`}
            >
              <p className={`text-lg leading-relaxed whitespace-pre-line text-white`}>
                Я помню чудное мгновенье:
                Передо мной явилась ты,
                Как мимолетное виденье,
                Как гений чистой красоты.

                В томленьях грусти безнадежной,
                В тревогах шумной суеты,
                Звучал мне долго голос нежный
                И снились милые черты.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;