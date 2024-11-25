import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import ImageUploader from '../inputs/ImageUploader';

function CreateTestPage({ onBack }) {
  const [testName, setTestName] = useState('');
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([
    { id: 1, title: '', description: '' },
    { id: 2, title: '', description: '' }
  ]);

  const scrollRef = useRef(null);

  const handleImageSelect = (imageData) => {
    setImage(imageData);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
  };

  const handleAddResult = () => {
    const newId = Math.max(...results.map(r => r.id), 0) + 1;
    setResults([...results, { id: newId, title: '', description: '' }]);
    
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleResultChange = (id, field, value) => {
    setResults(results.map(result => 
      result.id === id ? { ...result, [field]: value } : result
    ));
  };

  const handleDeleteResult = (id) => {
    if (results.length > 2) {
      setTimeout(() => {
        setResults(prev => prev.filter(result => result.id !== id));
      }, 0);
    }
  };

  const slideAnimation = {
    initial: { 
      opacity: 0,
      x: -20,
    },
    animate: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 bg-gradient-to-b from-blue-600/95 via-blue-600/90 to-blue-600/80 
                    backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-4 py-2 text-white bg-white/10 backdrop-blur-lg rounded-xl 
                      border border-white/20 shadow-lg flex items-center"
          >
            ← Назад
          </motion.button>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xl text-white font-semibold"
          >
            ✨ Создание теста ✨
          </motion.h1>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-bounce will-change-scroll
                   scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20
                   hover:scrollbar-thumb-white/30 transition-colors"
        style={{
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="max-w-3xl mx-auto w-full p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 w-full"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="Введите название Вашего теста"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg rounded-xl 
                           border border-white/20 text-white placeholder-white/50
                           focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                {image ? (
                  <div className="relative">
                    <motion.img
                      src={image}
                      alt="Превью теста"
                      className="w-full h-40 object-cover rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                    <motion.button
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full
                                hover:bg-black/70 transition-colors flex items-center justify-center
                                backdrop-blur-sm border border-white/10"
                      onClick={handleRemoveImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-white text-sm">✕</span>
                    </motion.button>
                  </div>
                ) : (
                  <ImageUploader onImageSelect={handleImageSelect} />
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6"
            >
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-lg text-white font-semibold flex items-center gap-2 mb-2">
                    <span>🎯</span>
                    Результаты теста
                  </h2>
                  <p className="text-white/70 text-sm">
                    Добавьте возможные результаты теста. К каждому результату можно будет привязать ответы на вопросы.
                  </p>
                </div>

                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {results.map((result, index) => (
                      <motion.div
                        key={result.id}
                        exit={{ 
                          opacity: 0,
                          transition: { duration: 0.15 }
                        }}
                        className="bg-white/5 rounded-lg p-4 space-y-3 border border-white/5
                                   hover:border-white/10 transition-colors group relative"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white/40 text-sm">
                            Результат {index + 1}
                          </span>
                          <div className="flex-grow h-px bg-white/10"></div>
                          {index >= 2 && (
                            <motion.button
                              onClick={() => handleDeleteResult(result.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-white/40 hover:text-white/80 transition-colors
                                       w-6 h-6 rounded-full flex items-center justify-center
                                       bg-white/5 hover:bg-white/10"
                            >
                              ✕
                            </motion.button>
                          )}
                        </div>

                        <input
                          type="text"
                          value={result.title}
                          onChange={(e) => handleResultChange(result.id, 'title', e.target.value)}
                          placeholder="Название результата"
                          className="w-full px-3 py-2 bg-white/10 rounded-lg
                                   border border-white/10 text-white placeholder-white/40
                                   focus:outline-none focus:ring-2 focus:ring-white/30
                                   group-hover:border-white/20 transition-colors"
                        />
                        <textarea
                          value={result.description}
                          onChange={(e) => handleResultChange(result.id, 'description', e.target.value)}
                          placeholder="Опишите результат теста..."
                          rows="2"
                          className="w-full px-3 py-2 bg-white/10 rounded-lg
                                   border border-white/10 text-white placeholder-white/40
                                   focus:outline-none focus:ring-2 focus:ring-white/30
                                   group-hover:border-white/20 transition-colors
                                   resize-none"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddResult}
                  className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10
                           text-white/70 hover:bg-white/10 hover:text-white 
                           transition-all flex items-center justify-center gap-2
                           hover:border-white/20"
                >
                  <span className="text-xl">+</span>
                  Добавить ещё один результат
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CreateTestPage;