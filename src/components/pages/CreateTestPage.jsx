import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import ImageUploader from '../inputs/ImageUploader';

function CreateTestPage({ onBack }) {
  const [testName, setTestName] = useState('');
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);

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
    setResults([...results, {
      id: newId,
      title: '',
      description: ''
    }]);
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

  const handleAddQuestion = () => {
    const newId = Math.max(...questions.map(q => q.id), 0) + 1;
    const answers = results.map((_, index) => ({
      id: index + 1,
      text: '',
      resultId: null
    }));

    setQuestions([...questions, {
      id: newId,
      text: '',
      answers
    }]);
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const handleAnswerChange = (questionId, answerId, field, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? {
            ...q,
            answers: q.answers.map(a => 
              a.id === answerId ? { ...a, [field]: value } : a
            )
          }
        : q
    ));
  };

  const handleAddAnswer = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newAnswerId = Math.max(...q.answers.map(a => a.id), 0) + 1;
        return {
          ...q,
          answers: [...q.answers, { id: newAnswerId, text: '', resultId: null }]
        };
      }
      return q;
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-4 bg-gradient-to-b from-indigo-600/95 via-indigo-600/90 to-indigo-600/80 
                    backdrop-blur-xl border-b border-white/10">
        <div className="w-[min(100%-2rem,32rem)] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
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
          </motion.div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-bounce">
        <div className="w-[min(100%-2rem,32rem)] mx-auto py-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2,
              ease: "easeOut"
            }}
            className="w-full space-y-4"
          >
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Название теста"
              className="w-full px-3 py-2 bg-white/15 rounded-lg
                       border border-white/20 text-white placeholder-white/60
                       focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            
            <div className="relative">
              {image ? (
                <div className="relative rounded-xl overflow-hidden group">
                  <img 
                    src={image} 
                    alt="Обложка теста" 
                    className="w-full h-40 object-cover"
                  />
                  <motion.button
                    onClick={() => setImage(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full
                             bg-black/50 text-white/90 flex items-center justify-center
                             opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </motion.button>
                </div>
              ) : (
                <motion.label
                  htmlFor="image-upload"
                  className="block w-full h-40 rounded-xl border-2 border-dashed
                           border-white/20 bg-white/5 hover:bg-white/10
                           transition-colors cursor-pointer
                           flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-white/60 text-center">
                    <span className="text-3xl block mb-2">+</span>
                    <p>Нажмите или перетащите файл,<br/>чтобы добавить обложку</p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          if (e.target && e.target.result) {
                            setImage(e.target.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </motion.label>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              ease: "easeOut"
            }}
            className="w-full bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4"
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ 
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        padding: 0,
                        transition: {
                          duration: 0.2,
                          ease: "easeInOut"
                        }
                      }}
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      className="bg-white/5 rounded-lg"
                    >
                      <div className="p-4 space-y-3 border border-white/10
                                   hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-white/90 text-sm font-medium">
                            Результат {index + 1}
                          </span>
                          <div className="flex-grow h-px bg-white/20"></div>
                          {index >= 2 && (
                            <motion.button
                              onClick={() => handleDeleteResult(result.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-white/70 hover:text-white transition-colors
                                       w-6 h-6 rounded-full flex items-center justify-center
                                       bg-white/10 hover:bg-white/20"
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
                          className="w-full px-3 py-2 bg-white/15 rounded-lg
                                   border border-white/20 text-white placeholder-white/60
                                   focus:outline-none focus:ring-2 focus:ring-white/30
                                   transition-colors"
                        />
                        <textarea
                          value={result.description}
                          onChange={(e) => handleResultChange(result.id, 'description', e.target.value)}
                          placeholder="Опишите результат теста..."
                          rows="2"
                          className="w-full px-3 py-2 bg-white/15 rounded-lg
                                   border border-white/20 text-white placeholder-white/60
                                   focus:outline-none focus:ring-2 focus:ring-white/30
                                   transition-colors resize-none"
                        />
                      </div>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.4,
              ease: "easeOut"
            }}
            className="w-full bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4"
          >
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-lg text-white font-semibold flex items-center gap-2 mb-2">
                  <span>❓</span>
                  Вопросы теста
                </h2>
                <p className="text-white/70 text-sm">
                  Добавьте вопросы и варианты ответов. Каждому ответу нужно выбрать результат.
                </p>
              </div>

              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {questions.map((question, qIndex) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white/5 rounded-lg p-4 space-y-4 border border-white/10
                               hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white/90 text-sm font-medium">
                          Вопрос {qIndex + 1}
                        </span>
                        <div className="flex-grow h-px bg-white/20"></div>
                      </div>

                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                        placeholder="Введите вопрос"
                        className="w-full px-3 py-2 bg-white/15 rounded-lg
                                 border border-white/20 text-white placeholder-white/60
                                 focus:outline-none focus:ring-2 focus:ring-white/30
                                 transition-colors"
                      />

                      <div className="space-y-2">
                        {question.answers.map((answer, aIndex) => (
                          <div key={answer.id} className="flex gap-2">
                            <input
                              type="text"
                              value={answer.text}
                              onChange={(e) => handleAnswerChange(question.id, answer.id, 'text', e.target.value)}
                              placeholder={`Вариант ${aIndex + 1}`}
                              className="flex-1 min-w-0 px-3 py-2 bg-white/15 rounded-lg
                                       border border-white/20 text-white placeholder-white/60
                                       focus:outline-none focus:ring-2 focus:ring-white/30"
                            />
                            <ResultSelector
                              selectedId={answer.resultId}
                              results={results}
                              onSelect={(resultId) => handleAnswerChange(question.id, answer.id, 'resultId', resultId)}
                              className="w-52 shrink-0"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <motion.button
                  onClick={handleAddQuestion}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10
                           text-white/70 hover:bg-white/10 hover:text-white 
                           transition-all flex items-center justify-center gap-2
                           hover:border-white/20"
                >
                  <span className="text-xl">+</span>
                  Добавить вопрос
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              delay: 0.5,
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto mt-6 mb-8 px-8 py-3 bg-white rounded-xl text-indigo-600 
                     font-semibold shadow-lg hover:shadow-xl transition-all 
                     flex items-center gap-2"
          >
            <span>✨</span>
            Создать тест
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function ResultSelector({ selectedId, results, onSelect, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedResult = results.find(r => r.id === selectedId);

  return (
    <div ref={popoverRef} className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-white/15 rounded-lg border border-white/20 
                  text-white text-left flex items-center justify-between
                  hover:bg-white/20 transition-colors"
      >
        <span className="truncate">
          {selectedResult 
            ? (selectedResult.title || `Результат ${results.indexOf(selectedResult) + 1}`)
            : "Выберите результат"}
        </span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-indigo-900/95 backdrop-blur-xl 
                      rounded-lg border border-white/20 shadow-xl overflow-hidden"
          >
            {results.map((result, index) => (
              <motion.button
                key={result.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={() => {
                  onSelect(result.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-white/90 
                           ${selectedId === result.id ? 'bg-white/20' : ''}`}
              >
                {result.title || `Результат ${index + 1}`}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CreateTestPage;