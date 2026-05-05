import { cn } from '@/lib/utils/tailwind-merge/cn';
import SmartCoachChat from '@/pages/app/chatbot/page';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from './app-navbar';
import Footer from './Footer';

export default function AppLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="relative">
      {/* Navbar */}
      <AppNavbar />

      {/* Main Content */}
      <section className="pt-16">
        <Outlet />
      </section>

      {/* Footer */}
      <Footer />

      <button
        className={cn(
          'fixed right-4 z-50 cursor-pointer rounded-full p-3 text-white',
          isChatOpen ? 'top-0 right-36' : 'bottom-4',
        )}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <img src="/assets/images/bot.png" alt="chatbot" className="h-14 w-14" />
        {isChatOpen && (
          <p className="rounded-full bg-orange-600 px-2 py-1 text-center text-xs font-bold text-white">
            tap to close
          </p>
        )}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed top-20 right-8 z-40 w-[320px] overflow-hidden rounded-lg border border-gray-700 bg-gray-900/90 shadow-xl backdrop-blur-lg transition-all duration-300">
          <SmartCoachChat />
        </div>
      )}
    </main>
  );
}
