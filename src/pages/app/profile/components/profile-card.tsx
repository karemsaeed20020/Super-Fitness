import { useTranslations } from "use-intl";
import { useFormatter } from "use-intl";
import { useProfile } from "../hooks/use-profile";

export default function ProfileCard() {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  // Data
  const { user, isLoading, error, isError } = useProfile();

  // Loading
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-main border-t-transparent" />
      </div>
    );
  }

  // throw to ErrorBoundary
  if (isError) throw new Error(error?.message);
  if (!user) throw new Error(t("something-went-wrong"));

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 p-6">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={user.photo}
          alt={`${user.firstName} ${user.lastName}`}
          className="size-24 rounded-full object-cover ring-2 ring-main ring-offset-2"
        />
        <div className="text-center">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-white/50">
            {user.email}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 rounded-[1.25rem] border border-zinc-200 p-6 dark:border-white/10">
        {/* Gender */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 dark:text-white/45">
            {t("gender")}
          </span>
          <span className="text-sm font-medium capitalize text-zinc-900 dark:text-white">
            {user.gender}
          </span>
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 dark:text-white/45">
            {t("age")}
          </span>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            {format.number(user.age, "number")}
          </span>
        </div>

        {/* Weight */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 dark:text-white/45">
            {t("weight")}
          </span>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            {format.number(user.weight, "number")} {t("kg")}
          </span>
        </div>

        {/* Height */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 dark:text-white/45">
            {t("height")}
          </span>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            {format.number(user.height, "number")} {t("cm")}
          </span>
        </div>

        {/* Activity Level */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 dark:text-white/45">
            {t("activity-level")}
          </span>
          <span className="text-sm font-medium capitalize text-zinc-900 dark:text-white">
            {user.activityLevel}
          </span>
        </div>

        {/* Goal */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 dark:text-white/45">
            {t("goal")}
          </span>
          <span className="text-sm font-medium capitalize text-zinc-900 dark:text-white">
            {user.goal}
          </span>
        </div>

        {/* Member Since */}
        <div className="col-span-2 flex flex-col gap-1">
          <span className="text-xs text-zinc-500 dark:text-white/45">
            {t("member-since")}
          </span>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            {format.dateTime(new Date(user.createdAt), "date-only")}
          </span>
        </div>
      </div>
    </section>
  );
}
