import { motion } from 'framer-motion';

function ActionButton({ onClick, text, delay = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '12px 24px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '12px',
        backdropFilter: 'blur(10px)',
        width: '200px'
      }}
    >
      {text}
    </motion.button>
  );
}

export default ActionButton; 