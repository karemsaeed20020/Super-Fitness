import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslations } from "use-intl";

import SocialLogin from "@/components/shared/social-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/constants/routes/routes.constant";
import { createRegisterSchema, type RegisterFields } from "@/lib/schemes/auth/register.schema";
import { useRegisterStore } from "@/lib/store/register.store";

const defaultValues: RegisterFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  rePassword: "",
};

const inputProps = {
  className: "bg-transparent",
  inputClassName: "text-white",
} as const;

export default function RegisterStepOne() {
  // Translations
  const t = useTranslations();
  // Navigation
  const navigate = useNavigate();

  // Store
  const { data, setStepData, nextStep } = useRegisterStore();

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<RegisterFields>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: { ...defaultValues, ...data },
    mode: "onTouched",
  });

  // Handlers
  function handleNext(incoming: RegisterFields) {
    setStepData(incoming);
    nextStep();
    navigate(ROUTES.auth.kyc);
  }

  return (
    <section className="flex w-full max-w-lg flex-col items-center">
      {/* Heading */}
      <div className="mb-6 text-center">
        <p className="text-sm font-medium tracking-widest text-white/60 uppercase">
          {t("hey-there")}
        </p>
        <h1 className="text-4xl font-extrabold text-white">
          {t("create-an-account")}
        </h1>
      </div>

      {/* Card */}
      <Card className="w-11/12 rounded-[3.125rem] border border-gray-50/20 bg-transparent px-10 py-8">
        <CardHeader className="mb-1 p-0">
          <h2 className="text-center text-2xl font-bold text-white">
            {t("register")}
          </h2>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit(handleNext)} className="space-y-4">

            {/* First Name */}
            <Input
              {...inputProps}
              {...register("firstName")}
              id="firstName"
              type="text"
              aria-label={t("first-name")}
              placeholder={t("first-name")}
              error={errors.firstName?.message}
            />

              {/* Last Name */}
            <Input
              {...inputProps}
              {...register("lastName")}
              id="lastName"
              type="text"
              aria-label={t("last-name")}
              placeholder={t("last-name")}
              error={errors.lastName?.message}
            />

            {/* Email */}
            <Input
              {...inputProps}
              {...register("email")}
              id="email"
              type="email"
              aria-label={t("email")}
              placeholder={t("email")}
              error={errors.email?.message}
            />

              {/* Password */}
            <Input
              {...inputProps}
              {...register("password")}
              id="password"
              type="password"
              aria-label={t("password")}
              placeholder={t("password")}
              error={errors.password?.message}
            />

              {/* Confirm Password */}
            <Input
              {...inputProps}
              {...register("rePassword")}
              id="rePassword"
              type="password"
              aria-label={t("confirm-password")}
              placeholder={t("confirm-password")}
              error={errors.rePassword?.message}
            />

            {/* Register Button */}
            <Button
              type="submit"
              disabled={!isValid && isSubmitted}
              className="w-full rounded-full cursor-pointer bg-main py-5 text-base font-bold text-white hover:bg-orange-700"
            >
              {t("register")}
            </Button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          <p className="mt-4 text-center text-sm text-white/70">
            {t("already-have-account")}
            <Link
              to={ROUTES.auth.login}
              className="ms-1 font-semibold text-main hover:underline"
            >
              {t("login")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}