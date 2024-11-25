import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageUploader from '../inputs/ImageUploader';

function CreateTestPage({ onBack }) {
  const [testName, setTestName] = useState('');
  const [image, setImage] = useState(null);

  const handleImageSelect = (imageData) => {
    setImage(imageData);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
  };

  return (
    <div className="h-full p-6 max-w-3xl mx-auto w-full">
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
          Создание теста ✨
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 w-full"
      >
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

        {(testName && image) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full px-4 py-3 bg-white text-blue-500 rounded-xl
                     font-semibold shadow-lg hover:bg-white/90 transition-colors"
          >
            Продолжить
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default CreateTestPage;