import { motion } from 'framer-motion';

function MainButton({ onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'absolute',
        bottom: '40px',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content',
        backgroundColor: '#ffffff',
        color: '#4F46E5',
        padding: '16px 32px',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 20px 50px rgba(0, 0, 0, 0.3)",
        border: 'none'
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: '20px' }}>✨</span>
      Создать тест бесплатно
    </motion.button>
  );
}

export default MainButton;