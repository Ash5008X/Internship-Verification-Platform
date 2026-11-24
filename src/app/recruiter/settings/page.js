
"use client";

import { useState } from "react";
import SettingsSection from "@/components/shared/SettingsSection";
import Toggle from "@/components/ui/Toggle";

export default function RecruiterSettingsPage() {
  const [settings, setSettings] = useState({
    emailApplications: true,
    emailUpdates: true,
    emailFeedback: true,
    browserNotifications: false,
    profileVisibility: true,
  });

  function updateSetting(key, value) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7">

        {/* Page heading */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-primary" />

            <span className="font-ui text-xs font-bold uppercase tracking-wider text-text-muted">
              Recruiter Workspace
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl text-text tracking-tight">
            Settings
          </h1>

          <p className="font-ui text-sm text-text-secondary mt-1">
            Manage your notification preferences and privacy settings.
          </p>
        </section>

        {/* Notification preferences */}
        <SettingsSection
          title="Notification Preferences"
          description="Choose which updates you want to receive."
        >
          <Toggle
            label="New Applications"
            description="Get notified when a student applies to one of your internships."
            checked={settings.emailApplications}
            onChange={(value) =>
              updateSetting("emailApplications", value)
            }
          />

          <div className="border-t border-border" />

          <Toggle
            label="Internship Updates"
            description="Receive updates about your internship listings and their status."
            checked={settings.emailUpdates}
            onChange={(value) =>
              updateSetting("emailUpdates", value)
            }
          />

          <div className="border-t border-border" />

          <Toggle
            label="Student Feedback"
            description="Get notified when students submit feedback about their internship experience."
            checked={settings.emailFeedback}
            onChange={(value) =>
              updateSetting("emailFeedback", value)
            }
          />

          <div className="border-t border-border" />

          <Toggle
            label="Browser Notifications"
            description="Receive notifications while using InternCheck in your browser."
            checked={settings.browserNotifications}
            onChange={(value) =>
              updateSetting("browserNotifications", value)
            }
          />
        </SettingsSection>

        {/* Privacy settings */}
        <SettingsSection
          title="Privacy"
          description="Control how students can interact with your company profile."
        >
          <Toggle
            label="Company Profile Visibility"
            description="Allow students to view your company's public profile and published internship listings."
            checked={settings.profileVisibility}
            onChange={(value) =>
              updateSetting("profileVisibility", value)
            }
          />
        </SettingsSection>

        {/* Information notice */}
        <div className="bg-rose-soft/50 border border-primary/10 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.3 3.9L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
                />
              </svg>
            </div>

            <div>
              <h3 className="font-ui text-sm font-bold text-text">
                Your preferences
              </h3>

              <p className="font-ui text-xs text-text-secondary mt-1 leading-5">
                Changes to these switches take effect immediately in this
                page. Your preferences will need to be connected to your
                account settings API to persist across sessions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
