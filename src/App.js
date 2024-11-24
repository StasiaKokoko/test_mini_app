import { motion } from 'framer-motion';
import WebApp from '@twa-dev/sdk';

function App() {
  const handleShowAlert = () => {
    try {
      WebApp.showAlert('✨ Магия работает! ✨');
    } catch (e) {
      alert('✨ Магия работает! (Но мы не в Telegram) ✨');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#7f7fd5] via-[#86a8e7] to-[#91eae4] bg-[length:400%_400%] animate-gradient">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white text-shadow">
          ✨ Волшебное приложение ✨
        </h1>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShowAlert}
        className="px-10 py-5 text-lg text-white bg-white/10 backdrop-blur-lg rounded-xl 
                   border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/20 
                   transition-all duration-300 relative overflow-hidden
                   before:content-[''] before:absolute before:inset-0 
                   before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                   before:animate-[shine_3s_ease-in-out_infinite]"
      >
        ✨ Нажми меня
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
        className="fixed bottom-5 text-sm text-white/70"
      >
        Создано с любовью ❤️
      </motion.div>
    </div>
  );
}

export default App;
