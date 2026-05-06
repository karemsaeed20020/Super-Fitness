import { useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind-merge/cn";
import { ROUTES } from "@/lib/constants/routes/routes.constant";
import { useRegisterStore } from "@/lib/store/register.store";
import type { RegisterBody } from "@/lib/types/register";
import {
  ACTIVITY_LEVEL_OPTIONS,
  ACTIVITY_LEVEL_TRANSLATION_KEYS,
  GOAL_OPTIONS,
  GOAL_TRANSLATION_KEYS,
  type ActivityLevelOption,
  type GoalOption,
} from "@/lib/constants/user-options.constant";
import GenderStep, { type GenderOption } from "./gender-step";
import NumberSelectionStep from "./number-selection-step";
import ProgressRing from "./progress-ring";
import SelectOptionsStep, {
  type SelectOptionItem,
} from "./select-options-step";
import { useRegister } from "../../register/hooks/use-register";

const TOTAL_STEPS = 6;

type KycDraft = {
  gender: GenderOption | null;
  age: number;
  weight: number;
  height: number;
  goal: GoalOption | null;
  activityLevel: ActivityLevelOption | null;
};

// Use shared configuration from register input data
const GOAL_VALUES: GoalOption[] = [...GOAL_OPTIONS];
const ACTIVITY_LEVEL_VALUES: ActivityLevelOption[] = [...ACTIVITY_LEVEL_OPTIONS];

// Use shared translation keys from register input data

type KycStep = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  canContinue: (draft: KycDraft) => boolean;
  content: (
    draft: KycDraft,
    setDraft: (next: Partial<KycDraft>) => void,
  ) => ReactNode;
};

const INITIAL_DRAFT: KycDraft = {
  gender: null,
  age: 25,
  weight: 90,
  height: 175,
  goal: null,
  activityLevel: null,
};

export default function KycWizard() {
  const t = useTranslations();
  const navigate = useNavigate();
  const { data } = useRegisterStore();
  const { onRegister, isPending } = useRegister();
  const [draft, setDraftState] = useState<KycDraft>(INITIAL_DRAFT);
  const [stepIndex, setStepIndex] = useState(0);

  const setDraft = (next: Partial<KycDraft>) => {
    setDraftState((prev) => ({ ...prev, ...next }));
  };

  const goalOptions: SelectOptionItem<GoalOption>[] = GOAL_VALUES.map(
    (value) => ({
      value,
      label: t(GOAL_TRANSLATION_KEYS[value]),
    }),
  );

  const activityLevelOptions: SelectOptionItem<ActivityLevelOption>[] =
    ACTIVITY_LEVEL_VALUES.map((value) => ({
      value,
      label: t(ACTIVITY_LEVEL_TRANSLATION_KEYS[value]),
    }));

  const personalizedPlanSubtitle = t(
    "kyc-wizard.shared.personalized-plan-subtitle",
  );

  const steps: KycStep[] = [
    {
      title: t("kyc-wizard.steps.gender-step.title"),
      subtitle: t("kyc-wizard.steps.gender-step.subtitle"),
      buttonLabel: t("kyc-wizard.shared.next-button"),
      canContinue: (data) => Boolean(data.gender),
      content: (data, update) => (
        <GenderStep
          value={data.gender}
          onChange={(value) => update({ gender: value })}
        />
      ),
    },
    {
      title: t("kyc-wizard.steps.age-step.title"),
      subtitle: personalizedPlanSubtitle,
      buttonLabel: t("kyc-wizard.shared.next-button"),
      canContinue: () => true,
      content: (data, update) => (
        <NumberSelectionStep
          key="age-step"
          label={t("kyc-wizard.units.years-old")}
          min={18}
          max={65}
          value={data.age}
          onChange={(value) => update({ age: value })}
        />
      ),
    },
    {
      title: t("kyc-wizard.steps.weight-step.title"),
      subtitle: personalizedPlanSubtitle,
      buttonLabel: t("kyc-wizard.shared.next-button"),
      canContinue: () => true,
      content: (data, update) => (
        <NumberSelectionStep
          key="weight-step"
          label={t("kyc-wizard.units.kg")}
          min={40}
          max={150}
          value={data.weight}
          onChange={(value) => update({ weight: value })}
        />
      ),
    },
    {
      title: t("kyc-wizard.steps.height-step.title"),
      subtitle: personalizedPlanSubtitle,
      buttonLabel: t("kyc-wizard.shared.next-button"),
      canContinue: () => true,
      content: (data, update) => (
        <NumberSelectionStep
          key="height-step"
          label={t("kyc-wizard.units.cm")}
          min={140}
          max={220}
          value={data.height}
          onChange={(value) => update({ height: value })}
        />
      ),
    },
    {
      title: t("kyc-wizard.steps.goal-step.title"),
      subtitle: personalizedPlanSubtitle,
      buttonLabel: t("kyc-wizard.shared.next-button"),
      canContinue: (data) => Boolean(data.goal),
      content: (data, update) => (
        <SelectOptionsStep
          value={data.goal}
          options={goalOptions}
          onChange={(value) => update({ goal: value })}
        />
      ),
    },
    {
      title: t("kyc-wizard.steps.activity-level-step.title"),
      subtitle: personalizedPlanSubtitle,
      buttonLabel: t("kyc-wizard.shared.done-button"),
      canContinue: (data) => Boolean(data.activityLevel),
      content: (data, update) => (
        <SelectOptionsStep
          value={data.activityLevel}
          options={activityLevelOptions}
          onChange={(value) => update({ activityLevel: value })}
        />
      ),
    },
  ];

  const currentStep = steps[stepIndex];
  const canContinue = currentStep.canContinue(draft);

  const handleNext = () => {
    if (!canContinue || isPending) {
      return;
    }

    const isLastStep = stepIndex === steps.length - 1;

    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.rePassword ||
      !draft.gender ||
      !draft.goal ||
      !draft.activityLevel
    ) {
      toast.error("Please complete register data first.");
      navigate(ROUTES.auth.register);
      return;
    }

    const payload: RegisterBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      rePassword: data.rePassword,
      gender: draft.gender,
      age: draft.age,
      height: draft.height,
      weight: draft.weight,
      goal: draft.goal,
      activityLevel: draft.activityLevel,
    };

    onRegister(payload);
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white font-sans">


      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full">
          <ProgressRing current={stepIndex + 1} total={TOTAL_STEPS} />

          <header className="mt-4 text-center">
            <h1 className="text-[2.15rem] leading-tight uppercase font-black sm:text-[3rem]">
              {currentStep.title}
            </h1>
            <p className="mt-2 sm:text-lg">{currentStep.subtitle}</p>
          </header>

          <div className="mt-10">{currentStep.content(draft, setDraft)}</div>

          <Button
            type="button"
            onClick={handleNext}
            isLoading={isPending}
            disabled={!canContinue || isPending}
            className={cn(
              "mt-6 h-12 w-full max-w-xs mx-auto flex items-center justify-center rounded-full cursor-pointer",
            )}
          >
            {currentStep.buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
