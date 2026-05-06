import { ErrorBoundary } from "@/components/shared/error-boundary";
import { LogoutCard } from "./components/logout-card";
import { MoodCard } from "./components/mood-card";
import { PrivacyCard } from "./components/privacy-card";
import { SecurityCard } from "./components/security-card";
import { ChangePasswordCard } from "./components/change-password-card";
import { LanguageCard } from "./components/language-card";
import { HelpCard } from "./components/help-card";
import ProfileHeader from "./components/profile-header";
import ProfileStatsRow from "./components/profile-stats-row";

export default function ProfilePage() {
  return (
    <section className="mx-auto w-full max-w-5xl pb-10">
      <div className="relative min-h-screen overflow-hidden ">

        <div className="relative z-10 pb-16">

          <ProfileHeader />

          <ErrorBoundary>
            <ProfileStatsRow />
          </ErrorBoundary>

          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 justify-items-center gap-4 px-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            <ChangePasswordCard />
            <LanguageCard />
            <MoodCard />
            <SecurityCard />
            <PrivacyCard />
            <HelpCard />
          </div>
          <div className="mx-auto mt-8 flex w-full max-w-4xl justify-center px-4">
            <LogoutCard />
          </div>
        </div>
      </div>
    </section>
  );
}
