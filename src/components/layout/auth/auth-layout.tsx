import { cn } from '@/lib/utils/tailwind-merge/cn';
import { Outlet } from 'react-router-dom';
import AuthLayoutImages from './auth-layout-images';
import SmartCoachChat from '@/pages/app/chatbot/page';
import { useState } from 'react';

export default function AuthLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main
      className={cn(
        'relative min-h-screen w-full',
        'before:absolute before:inset-0',
        "before:bg-[url('/assets/images/person-fit.png')]",
        'before:bg-cover before:bg-center',
        "before:content-['']",
        'after:absolute after:inset-0',
        'after:bg-[#24242499] after:backdrop-blur-xl',
        "after:content-['']",
      )}
    >
      {/* Content */}
      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        
        {/* Left */}
        <section className="hidden items-center justify-center border-r-[rgba(255,65,0,0.2)] text-white lg:flex lg:flex-col lg:border-r-2">
          <AuthLayoutImages />
        </section>

        {/* Right */}
        <section className="flex items-center justify-center p-6">
          <Outlet />

          {/* Chat Button */}
          <button
            className={cn(
              "fixed right-4 z-50 rounded-full p-3 text-white  cursor-pointer",
              isChatOpen ? "top-0 right-36" : "bottom-4"
            )}
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <img
              src="/assets/images/bot.png"
              alt="chatbot"
              className="h-14 w-14"
            />
            {isChatOpen && <p className=" rounded-full bg-orange-600 px-2 py-1 text-xs text-center font-bold text-white">tap to close</p>}
          </button>

          {/* Chat Window */}
          {isChatOpen && (
            <div className="fixed top-20 right-8  z-40 w-[320px] rounded-lg overflow-hidden border border-gray-700 bg-gray-900/90 shadow-xl backdrop-blur-lg transition-all duration-300">
              <SmartCoachChat />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}