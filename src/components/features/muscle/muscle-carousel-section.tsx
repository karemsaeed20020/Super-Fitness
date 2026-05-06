import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Dumbbell } from 'lucide-react';
import * as React from 'react';
import CarouselDots from '@/components/shared/carousel-dots';
import FilterTabs from '@/components/shared/filter-tabes';
import MuscleCardSkeleton from '@/components/skeletons/shared/muscle-card-skeleton';
import type { Muscle } from '@/lib/types/muscle';
import { useEffect, useMemo } from 'react';
import MuscleCard from './muscle-card';

type FilterItem = {
  id: string;
  label: string;
};

type MuscleCarouselSectionProps = {
  tabsLoading?: boolean;
  carouselLoading?: boolean;
  activeId: string | null;
  allTab: {
    id: string;
    label: string;
  };
  tabs: FilterItem[];
  onChange: (id: string | null) => void;
  muscles?: Muscle[];
  emptyText: string;
  cardBasePath: string;
  className?: string;
};

const PAGE_SIZE = 6;

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }

  return result;
}

export default function MuscleCarouselSection({
  tabsLoading = false,
  carouselLoading = false,
  activeId,
  allTab,
  tabs,
  onChange,
  muscles,
  emptyText,
  cardBasePath,
  className,
}: MuscleCarouselSectionProps) {
  //State
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);

  //Variables
  const pages = useMemo(() => {
    return muscles ? chunkArray(muscles, PAGE_SIZE) : [];
  }, [muscles]);

  // Effects
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    onSelect();

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, pages.length]);

  return (
    <section className={className}>
      {/*Filter Tabs  */}
      <FilterTabs
        className="mb-8"
        isLoading={tabsLoading}
        activeId={activeId}
        allTab={allTab}
        items={tabs}
        onChange={onChange}
      />

      {/*Loading */}
      {carouselLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <MuscleCardSkeleton key={index} />
          ))}
        </div>
      ) : muscles && muscles.length > 0 ? (
        <div className="space-y-6">
          {/*Carousel */}
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              containScroll: 'trimSnaps',
            }}
            className="w-full"
          >
            <CarouselContent>
              {pages.map((page, pageIndex) => (
                <CarouselItem key={pageIndex} className="basis-full">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {page.map((muscle) => (
                      <MuscleCard
                        key={muscle._id}
                        muscle={muscle}
                        to={`${cardBasePath}/${muscle._id}`}
                      />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
            
            
          {/* Carousel Dots */}
          <CarouselDots
            count={snapCount}
            activeIndex={activeIndex}
            onDotClick={(index) => api?.scrollTo(index)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Dumbbell size={40} className="text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground text-sm">{emptyText}</p>
        </div>
      )}
    </section>
  );
}
