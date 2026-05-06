import type { ReactNode } from 'react';

export type PageHeroProps = {
  badge?: string;
  titleStart?: string;
  titleHighlight?: string;
  titleEnd?: string;
  backgroundText?: string;
  className?: string;
  icon?: ReactNode;
  contentClassName?: string;
  badgeClassName?: string;
  titleClassName?: string;
  backgroundTextClassName?: string;
};
