import type { ReactNode } from 'react';

interface Props {
  errors: Error | null;
  children: ReactNode;
}

const ListError = ({ errors, children }: Props) => {
  if (errors) {
    return (
      <div className="dark:text-black-500 dark:bg-softpink-200 col-span-full flex h-auto w-full items-center justify-center bg-zinc-50 p-8">
        <p>
          <strong className="mx-1 font-bold dark:text-black">Error!</strong>
          <span className="dark:text-black">{errors.message}</span>
        </p>
      </div>
    );
  }

  return children;
};

export default ListError;
