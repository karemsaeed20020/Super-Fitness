import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { slides } from '@/lib/constants/home/hero.constants';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Star } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { useLocale } from 'use-intl';

const looped = [...slides, ...slides];

export default function HeroCarousel() {
  // Translations
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar' || locale === 'he' || locale === 'fa';

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        dragFree: true,
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      plugins={[
        AutoScroll({
          speed: 1,
          stopOnInteraction: false,
          direction: isRTL ? 'forward' : 'backward',
        }),
      ]}
      className="overflow-hidden"
    >
      <CarouselContent className="-ml-0 gap-0">
        {looped.map((slide, i) => (
          <CarouselItem key={i} className="basis-auto pl-0">
            <div className="bg-main -mr-px flex h-20 flex-row items-center gap-16 px-7">
              <h3 className="text-xl font-bold tracking-wide whitespace-nowrap text-white uppercase">
                {t(`slides.${slide.id}`)}
              </h3>
              <Star size={14} className="shrink-0 fill-white text-white" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
