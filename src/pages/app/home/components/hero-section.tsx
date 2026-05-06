import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import HeroCarousel from './hero-carousel';
import { stats } from '@/lib/constants/home/hero.constants';
import { useTranslations } from 'use-intl';
import { ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  // Translations
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-screen flex-col bg-white bg-[url('/assets/images/Theo_Vance.png')] bg-cover bg-bottom-right bg-no-repeat text-zinc-800 md:min-h-50 dark:bg-transparent dark:text-white">
      {/* Gradient */}
      <div
        className="absolute inset-0 bg-linear-to-l from-white/90 via-white/75 to-white/50 backdrop-blur-2xl dark:from-zinc-900/80 dark:via-zinc-800/60 dark:to-zinc-800/40"
        aria-hidden="true"
      />

      {/* Hero content row */}
      <div className="relative z-10 flex flex-col items-start px-6 pt-10 sm:px-12 md:flex-row md:items-center md:px-20 md:py-0">
        {/* Text Content*/}
        <div className="w-10/12 text-center md:max-w-[55%] md:flex-1 md:pe-8 md:text-start">
          <p className="mb-6 text-start text-3xl leading-normal font-bold uppercase sm:text-4xl md:text-5xl">
            {t.rich('title', {
              span: (chunks) => <span className="text-main">{chunks}</span>,
            })}
          </p>

          <p className="before:bg-main relative mb-8 max-w-160 ps-4 text-start text-base font-normal text-zinc-600 before:absolute before:inset-y-0 before:inset-s-0 before:w-1 sm:text-lg md:text-xl dark:text-white/80">
            {t('description')}
          </p>

          {/* Stats List */}
          <ul className="mb-10 flex flex-col items-start justify-center gap-6 py-5 sm:flex-row sm:justify-start sm:gap-10 md:gap-12">
            {stats.map((stat) => (
              <li key={stat.id} className="text-center md:text-start">
                <span className="text-xl font-bold sm:text-2xl">
                  {t(`stats.${stat.id}.number`)}
                </span>
                <span className="mt-1 block text-base font-normal text-zinc-700 sm:text-xl dark:text-white/90">
                  {t(`stats.${stat.id}.label`)}
                </span>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex justify-between gap-16 md:mb-2 md:justify-start">
            <Button className="group relative w-36 cursor-pointer">
              {t('cta.start')}
              <span className="bg-main absolute -inset-e-3.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-600 rtl:rotate-270">
                <ArrowUpRight size={20} className="text-white" />
              </span>
            </Button>

            <Button
              variant="outline"
              className="group border-main text-main hover:bg-main/10 hover:text-main relative w-36 cursor-pointer dark:bg-transparent"
            >
              {t('cta.explore')}
              <span className="bg-main group-hover:bg-main absolute -inset-e-3.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white transition-all duration-300 group-hover:scale-110 rtl:rotate-270">
                <ArrowUpRight size={20} className="text-white" />
              </span>
            </Button>
          </div>
        </div>

        {/* Right image */}
        <div className="relative flex w-full items-end justify-center pt-10 md:flex-1 md:pt-5">
          <Image
            src="/assets/images/Theo-Vance.svg"
            alt={t('imageAlt')}
            width={467}
            height={700}
            className="max-h-180 w-auto object-contain object-top"
            priority
          />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative z-10 mt-auto">
        <HeroCarousel />
      </div>
    </section>
  );
}
