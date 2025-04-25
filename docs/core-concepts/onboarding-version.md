# Onboarding Version Management

The Dewey application includes an onboarding flow that helps new users get started. The onboarding version is managed through a constant in `src-tauri/src/constants.rs`:

```rust
// Onboarding version - increment this when onboarding content changes
pub const ONBOARDING_VERSION: i32 = 1;
```

## When to Update the Version

You should increment the `ONBOARDING_VERSION` constant when:
- The onboarding flow content or steps change significantly
- New features are added that require user education
- The user experience flow is modified

## What Happens When the Version Changes

When the onboarding version is incremented:
1. All users who have previously completed onboarding will see the new onboarding flow
2. The system checks if the user's last completed onboarding version matches the current version
3. If there's a mismatch, the onboarding flow will be shown again
4. Users can complete the new onboarding flow to update their version record

This ensures that all users receive important updates to the onboarding experience, even if they've completed it before.

## Technical Implementation

The onboarding version is stored in the database and checked against the current version when the application starts. The system uses the following components:

- `OnboardingRepository`: Manages the storage and retrieval of onboarding state
- `should_run_onboarding`: Command that checks if onboarding should be shown
- `store_onboarding`: Command that stores the completion state and version

The version check is performed automatically when the application starts, ensuring users always see the most up-to-date onboarding experience. 