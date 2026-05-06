import { cn } from '@/lib/utils/tailwind-merge/cn';
import { Link } from 'react-router-dom';

interface CommonCardProps {
  image: string;
  alt: string;
  title: string;
  text: string;
  icon: string;
  to: string;
  className?: string;
}
export default function CommonCard({
  title,
  text,
  icon,
  image,
  alt,
  to,
  className,
}: CommonCardProps) {
  const actionClassName =
    'flex w-fit cursor-pointer items-center justify-start gap-2 transition-transform duration-300 group-hover:translate-x-1';

  const actionContent = (
    <>
      <p className="text-main text-base leading-4 font-semibold capitalize sm:text-lg">
        {text}
      </p>

      <span className="bg-main flex size-6 items-center justify-center rounded-full">
        <img src={icon} alt="" aria-hidden="true" className="size-2" />
      </span>
    </>
  );

  return (
    <article
      className={cn(
        'group relative h-full overflow-hidden rounded-xl border border-white/15 bg-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:bg-white/5',
        className,
      )}
    >
      <figure className="relative h-full">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <figcaption className="absolute inset-x-0 bottom-0 bg-white/70 p-4 text-black backdrop-blur-xl dark:bg-black/70 dark:text-white">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-extrabold tracking-[0.06em] uppercase sm:text-lg">
              {title}
            </h3>

            <Link to={to} className={actionClassName}>
              {actionContent}
            </Link>
          </div>
        </figcaption>
      </figure>
    </article>
  );
}
