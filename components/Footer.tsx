import { useState, useEffect } from 'react';

const Footer = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) setShowCookieBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  return (
    <>
      <footer className="bg-gray-100 py-12 mt-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2026 T‑Shirt Store. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-6 flex justify-between items-center z-50">
          <p className="text-sm">This website uses cookies. By using this website, you automatically accept that.</p>
          <button onClick={acceptCookies} className="bg-white text-black px-4 py-1 rounded-sm text-sm font-medium hover:bg-gray-200 transition ml-4">Got it!</button>
        </div>
      )}
    </>
  );
};
export default Footer;
