import { Menu, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import { LogoutButton } from '@/components/shared/logout-button';
import ThemeToggle from '@/components/shared/theme-toggle';
import LocaleSwitcher from '@/components/shared/locale-switcher';
import { useAuth } from '@/hooks/shared/use-auth';
import { useTranslations } from 'use-intl';

type NavItem = {
  labelKey: string;
  to: string;
  end?: boolean;
};

const navigation: NavItem[] = [
  { labelKey: 'nav-home', to: ROUTES.app.home, end: true },
  { labelKey: 'nav-about', to: ROUTES.app.about },
  { labelKey: 'nav-classes', to: ROUTES.app.classes },
  { labelKey: 'nav-healthy', to: ROUTES.app.healthy },
];

export default function AppNavbar() {
  // Translation
  const t = useTranslations();
  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // hook
  const { isAuthenticated } = useAuth();
  return (
    <header className="fixed inset-x-0 z-40 border-b border-foreground/10 bg-white dark:bg-[#1a1a1a] backdrop-blur-sm">
      <div className="mx-auto flex h-17 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to={ROUTES.app.home}
          aria-label="Go to home page"
          className="flex items-center md:pe-4"
        >
          <img
            src="/assets/logo.png"
            alt="Super Fitness logo"
            className="h-12 w-20 object-contain sm:h-15"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.labelKey}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'hover:text-main text-lg leading-none font-semibold transition-colors duration-300',
                  isActive ? 'text-main' : 'text-foreground/90',
                )
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>
        <div className="switcher me-3 hidden grow items-center justify-end gap-4 md:flex">
          {/*locale toggle */}
          <LocaleSwitcher />
          {/* them toggle */}
          <ThemeToggle />
          <div className="hidden md:flex">
            <Link
              to={ROUTES.app.profile}
              aria-label="Open profile"
              className="bg-main hover:bg-background hover:text-main inline-flex size-9 items-center justify-center rounded-full text-white transition-colors duration-300"
            >
              <UserRound size={14} />
            </Link>
          </div>
          {/* logout-button */}
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Link to={ROUTES.auth.login} className="text-zinc-100">
              {t('login')}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to={ROUTES.app.profile}
            aria-label="Open profile"
            className="bg-main inline-flex size-9 items-center justify-center rounded-full text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <UserRound size={14} />
          </Link>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-foreground/20 text-foreground/90 hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 md:hidden cursor-pointer transition-colors duration-300"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-white dark:bg-[#1a1a1a] backdrop-blur-sm md:hidden">
          <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.labelKey}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2 text-[15px] font-semibold transition-colors duration-300',
                      isActive
                        ? 'text-main bg-foreground/10'
                        : 'text-foreground/90 hover:bg-foreground/5',
                    )
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </nav>

            <div className="mt-3 border-t border-foreground/10 pt-3">
              <div className="mb-3 flex items-center justify-between rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2">
                <LocaleSwitcher />
                <ThemeToggle />
              </div>

              {isAuthenticated ? (
                <div className="flex justify-start">
                  <LogoutButton />
                </div>
              ) : (
                <Link
                  to={ROUTES.auth.login}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-md border border-foreground/15 bg-foreground/5 px-3 py-2 text-center text-sm font-semibold text-foreground/95"
                >
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
