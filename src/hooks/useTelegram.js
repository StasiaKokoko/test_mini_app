export function useTelegram(setCurrentPage) {
  const handleShowAlert = () => {
    try {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      setCurrentPage('poem');
    } catch (e) {
      setCurrentPage('poem');
    }
  };

  const handleShare = () => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const url = encodeURIComponent('https://yourapp.com');
        const text = encodeURIComponent('Я прохожу классный тест в этом приложении! Присоединяйся!');
        const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;

        const tg = window.Telegram.WebApp;
        tg.openTelegramLink(shareUrl);
      } else {
        alert("Это приложение работает только в Telegram");
      }
    } catch (e) {
      console.error('Ошибка:', e);
      alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
    }
  };

  return { handleShare, handleShowAlert };
} 