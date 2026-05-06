type Props = {
  message: string;
  reset: () => void;
};

export function DefaultError({ message, reset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <button
        onClick={reset}
        className="text-sm underline underline-offset-4 hover:text-primary"
      >
        Try again
      </button>
    </div>
  );
}
