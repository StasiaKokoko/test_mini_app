import { motion } from 'framer-motion';
import WebApp from '@twa-dev/sdk';
import './App.css';

function App() {
  const handleShowAlert = () => {
    try {
      WebApp.showAlert('Это работает! 🎉');
    } catch (e) {
      alert('Это работает! 🎉 (Но мы не в Telegram)');
    }
  };

  const handleShowPopup = () => {
    try {
      WebApp.showPopup({
        title: 'Привет!',
        message: 'Это всплывающее окно Telegram',
        buttons: [
          {text: 'Супер!', type: 'ok'},
          {text: 'Закрыть', type: 'close'}
        ]
      });
    } catch (e) {
      alert('В браузере это было бы красивое окно Telegram 😉');
    }
  };

  const handleHapticFeedback = () => {
    try {
      WebApp.HapticFeedback.impactOccurred('heavy');
    } catch (e) {
      console.log('Вибрация работает только в Telegram');
    }
  };

  return (
    <div className="App">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <h1>Привет, Telegram!</h1>
      </motion.div>

      <motion.div
        style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShowAlert}
          style={{
            padding: '20px 40px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#0088cc',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Показать Alert
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShowPopup}
          style={{
            padding: '20px 40px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#179cde',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Открыть Popup
        </motion.button>

        <motion.button
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0px 0px 8px rgb(255,255,255)' 
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleHapticFeedback}
          style={{
            padding: '20px 40px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#27a7f7',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Вибрация
        </motion.button>
      </motion.div>

      <motion.div
        style={{ 
          position: 'fixed', 
          bottom: '20px',
          fontSize: '12px',
          opacity: 0.7 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
      >
        Тестовое приложение
      </motion.div>
    </div>
  );
}

export default App;
