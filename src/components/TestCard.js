import { motion } from 'framer-motion';

const TestCard = ({ test, onSelect, dimensions }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(test)}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Заголовок */}
      <h3 
        style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          color: 'white',
          marginBottom: '8px',
          lineHeight: '1.3',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        {test.title}
      </h3>

      {/* Нижняя часть с лайками и автором */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '0.9rem'
        }}>
          <span style={{ color: '#ff5757' }}>❤️</span>
          {test.likes}
        </div>
        
        <div style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.85rem',
          fontStyle: 'italic'
        }}>
          by {test.author.firstName}
        </div>
      </div>

      {/* Декоративный элемент */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent)',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
};

export default TestCard; 