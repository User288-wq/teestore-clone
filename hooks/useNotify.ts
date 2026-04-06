import toast from 'react-hot-toast';

// Fonction pour jouer un son simple (bip)
const playBeep = (type: 'success' | 'error' | 'info' = 'success') => {
  if (typeof window === 'undefined') return;
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.type = 'sine';
  let frequency = 800;
  let duration = 0.2;
  if (type === 'success') { frequency = 880; duration = 0.15; }
  else if (type === 'error') { frequency = 440; duration = 0.3; }
  else if (type === 'info') { frequency = 660; duration = 0.2; }
  oscillator.frequency.value = frequency;
  gainNode.gain.value = 0.3;
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);
  oscillator.stop(audioContext.currentTime + duration);
  // Pour éviter de saturer la console AudioContext, on ne ferme pas immédiatement
  setTimeout(() => audioContext.close(), duration * 1000);
};

// Hook personnalisé
export const useNotify = () => {
  const notifySuccess = (message: string) => {
    toast.success(message);
    playBeep('success');
  };
  const notifyError = (message: string) => {
    toast.error(message);
    playBeep('error');
  };
  const notifyInfo = (message: string) => {
    toast(message);
    playBeep('info');
  };
  return { notifySuccess, notifyError, notifyInfo };
};
