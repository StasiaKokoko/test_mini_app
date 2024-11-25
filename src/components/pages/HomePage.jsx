import { motion } from 'framer-motion';
import MainButton from '../buttons/MainButton';
import ActionButton from '../buttons/ActionButton';

function HomePage({ onShowPoem, onShare, onCreateTest }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 overflow-hidden touch-none select-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <h1 style={{
          color: '#ffffff',
          fontSize: '2.25rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          ✨ Волшебное приложение ✨
        </h1>
      </motion.div>

      <MainButton onClick={onCreateTest} />
      <ActionButton onClick={onShowPoem} text="✨ Нажми меня" delay={0.2} />
      <ActionButton onClick={onShare} text="🌟 Поделиться" delay={0.3} />
    </div>
  );
}

export default HomePage;