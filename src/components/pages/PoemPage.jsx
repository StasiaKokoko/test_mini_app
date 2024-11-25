import { motion } from 'framer-motion';

function PoemPage({ onBack }) {
  const poem = `Я помню чудное мгновенье:
Передо мной явилась ты,
Как мимолетное виденье,
Как гений чистой красоты.

В томленьях грусти безнадежной,
В тревогах шумной суеты,
Звучал мне долго голос нежный
И снились милые черты.`;  // Выносим текст в переменную

  return (
    <div className="h-full p-6">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBack}
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
          {poem}
        </p>
      </motion.div>
    </div>
  );
}

export default PoemPage;