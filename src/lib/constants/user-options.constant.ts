import type { User } from "@/lib/types/auth";

/**
 * Shared User Options Configuration
 *
 * This file contains the centralized configuration for user goals and activity levels
 * that are collected during the registration process (KYC wizard) and displayed in profiles.
 *
 * Key Features:
 * - Single source of truth for all user option values
 * - Type-safe option definitions
 * - Translation key mappings
 * - Validation utilities
 * - Used across registration flow and profile display
 *
 * When adding new goals or activity levels:
 * 1. Update the GOAL_OPTIONS or ACTIVITY_LEVEL_OPTIONS arrays
 * 2. Add corresponding translation keys in i18n files
 * 3. Update the translation key mappings
 * 4. Update the User type if needed
 */

/**
 * Shared configuration for user goals and activity levels
 * Used across registration (KYC) and profile display
 */

// Goal configuration - matches KYC wizard values
export const GOAL_OPTIONS = [
    "Gain weight",
    "Lose weight",
    "Get fitter",
    "Gain more flexible",
    "Learn the basic",
] as const;

export type GoalOption = typeof GOAL_OPTIONS[number];

// Activity level configuration - matches KYC wizard values
export const ACTIVITY_LEVEL_OPTIONS = [
    "level1",
    "level2",
    "level3",
    "level4",
    "level5",
] as const;

export type ActivityLevelOption = typeof ACTIVITY_LEVEL_OPTIONS[number];

// Translation key mappings - matches KYC wizard
export const GOAL_TRANSLATION_KEYS: Record<GoalOption, string> = {
    "Gain weight": "kyc-wizard.goal-options.gain-weight",
    "Lose weight": "kyc-wizard.goal-options.lose-weight",
    "Get fitter": "kyc-wizard.goal-options.get-fitter",
    "Gain more flexible": "kyc-wizard.goal-options.gain-more-flexible",
    "Learn the basic": "kyc-wizard.goal-options.learn-the-basic",
};

export const ACTIVITY_LEVEL_TRANSLATION_KEYS: Record<ActivityLevelOption, string> = {
    level1: "kyc-wizard.activity-level-options.level-1",
    level2: "kyc-wizard.activity-level-options.level-2",
    level3: "kyc-wizard.activity-level-options.level-3",
    level4: "kyc-wizard.activity-level-options.level-4",
    level5: "kyc-wizard.activity-level-options.level-5",
};

// Utility functions for working with user data
export const getGoalTranslationKey = (goal: User["goal"]): string => {
    return GOAL_TRANSLATION_KEYS[goal as GoalOption] || "something-went-wrong";
};

export const getActivityLevelTranslationKey = (level: User["activityLevel"]): string => {
    return ACTIVITY_LEVEL_TRANSLATION_KEYS[level as ActivityLevelOption] || "something-went-wrong";
};

export const isValidGoal = (goal: string): goal is GoalOption => {
    return GOAL_OPTIONS.includes(goal as GoalOption);
};

export const isValidActivityLevel = (level: string): level is ActivityLevelOption => {
    return ACTIVITY_LEVEL_OPTIONS.includes(level as ActivityLevelOption);
};

// Get all available options for dynamic UI generation
export const getAllGoals = (): GoalOption[] => [...GOAL_OPTIONS];

export const getAllActivityLevels = (): ActivityLevelOption[] => [...ACTIVITY_LEVEL_OPTIONS];