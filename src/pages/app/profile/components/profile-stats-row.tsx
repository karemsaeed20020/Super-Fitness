import { RefreshCw } from "lucide-react";
import { useFormatter, useTranslations } from "use-intl";
import {
  getActivityLevelTranslationKey,
  getGoalTranslationKey,
  isValidActivityLevel,
  isValidGoal,
} from "@/lib/constants/user-options.constant";
import { useProfile } from "../hooks/use-profile";

function StatPill({ label, onEdit }: { label: string; onEdit: () => void }) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="inline-flex w-full items-center justify-between gap-2 rounded-full bg-main px-4 py-2.5 text-left text-sm font-bold text-white shadow-md transition hover:bg-main/90"
    >
      <span className="min-w-0 truncate">{label}</span>
      <RefreshCw className="size-4 shrink-0 opacity-95" aria-hidden />
    </button>
  );
}

export default function ProfileStatsRow() {
  const t = useTranslations();
  const format = useFormatter();
  const { user, isLoading, error, isError } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-[120px] items-center justify-center py-8">
        <div className="size-8 animate-spin rounded-full border-2 border-main border-t-transparent" />
      </div>
    );
  }

  if (isError) throw new Error(error?.message);
  if (!user) throw new Error(t("something-went-wrong"));

  // Validate user data against registration options
  if (!isValidGoal(user.goal)) {
    console.warn(`Invalid goal from registration: ${user.goal}`);
  }
  if (!isValidActivityLevel(user.activityLevel)) {
    console.warn(`Invalid activity level from registration: ${user.activityLevel}`);
  }

  // Use shared functions based on register input data
  const goalLabel = t(getGoalTranslationKey(user.goal));
  const levelLabel = t(getActivityLevelTranslationKey(user.activityLevel));
  const weightLabel = `${format.number(user.weight, "number")} ${t("kg")}`;

  const noop = () => { };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-6 pt-8 md:px-6 md:pb-8 md:pt-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        <div className="flex flex-col items-center gap-2 text-center md:items-stretch md:text-left">
          <h2 className="text-center text-2xl font-bold text-charcoal dark:text-white">
            {t("profile-page.your-goal")}
          </h2>
          <button
            type="button"
            onClick={noop}
            className="text-xs font-semibold uppercase tracking-wide text-charcoal/65 underline decoration-charcoal/40 underline-offset-4 dark:text-white/55 dark:decoration-white/30"
          >
            {t("profile-page.tap-to-change")}
          </button>
          <StatPill label={goalLabel} onEdit={noop} />
        </div>

        <div className="flex flex-col items-center gap-2 text-center md:items-stretch md:text-left">
          <h2 className="text-center text-2xl font-bold text-charcoal dark:text-white">
            {t("profile-page.level")}
          </h2>
          <button
            type="button"
            onClick={noop}
            className="text-xs font-semibold uppercase tracking-wide text-charcoal/65 underline decoration-charcoal/40 underline-offset-4 dark:text-white/55 dark:decoration-white/30"
          >
            {t("profile-page.tap-to-change")}
          </button>
          <StatPill label={levelLabel} onEdit={noop} />
        </div>

        <div className="flex flex-col items-center gap-2 text-center md:items-stretch md:text-left">
          <h2 className="text-center text-2xl font-bold text-charcoal dark:text-white">
            {t("weight")}
          </h2>
          <button
            type="button"
            onClick={noop}
            className="text-xs font-semibold uppercase tracking-wide text-charcoal/65 underline decoration-charcoal/40 underline-offset-4 dark:text-white/55 dark:decoration-white/30"
          >
            {t("profile-page.tap-to-change")}
          </button>
          <StatPill label={weightLabel} onEdit={noop} />
        </div>
      </div>
    </section>
  );
}
