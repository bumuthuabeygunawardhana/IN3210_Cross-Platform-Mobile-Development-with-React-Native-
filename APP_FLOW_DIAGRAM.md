# 📱 FitBuddy App Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      APP LAUNCH                              │
│                          ↓                                   │
│              Check AsyncStorage for Token                    │
│                          ↓                                   │
│            ┌─────────────┴─────────────┐                    │
│            ↓                           ↓                     │
│     Token Found                  No Token                   │
│          ↓                             ↓                     │
│   Load User Data                  LOGIN SCREEN               │
│          ↓                             ↓                     │
│    Navigate to Home          [Enter Email & Password]       │
│                                       ↓                      │
│                           ┌───────────┴────────────┐        │
│                           ↓                        ↓         │
│                      Login Success         New User?        │
│                           ↓                        ↓         │
│                      HOME SCREEN         REGISTER SCREEN    │
│                                                   ↓          │
│                                      [Name, Email, Password] │
│                                                   ↓          │
│                                          Register Success    │
│                                                   ↓          │
└───────────────────────────────────────────────────┴─────────┘
                                                    ↓
┌───────────────────────────────────────────────────────────────┐
│                      HOME SCREEN (Tab 1)                       │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Header: "Welcome back, [User Name]"     [Bell Icon] │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  Search: [🔍 Search exercises...]           [X]      │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  Filters: [All] [chest] [back] [legs] [shoulders]   │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [Activity Icon]                           │     │    │
│  │  │  Push-ups                          [❤️]    │     │    │
│  │  │  [🎯 chest] [📊 beginner]                  │     │    │
│  │  │  Start in a plank position...              │     │    │
│  │  │  [📦 body_only]                      [→]   │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [Activity Icon]                           │     │    │
│  │  │  Squats                                    │     │    │
│  │  │  [🎯 quadriceps] [📊 beginner]             │     │    │
│  │  │  Stand with feet shoulder-width...         │     │    │
│  │  │  [📦 body_only]                      [→]   │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  [Tap Exercise Card] → EXERCISE DETAILS SCREEN               │
└───────────────────────────────────────────────────────────────┘
                                ↓
┌───────────────────────────────────────────────────────────────┐
│                   EXERCISE DETAILS SCREEN                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  [← Back]    Push-ups              [❤️ Favorite]    │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  ┌──────────────────────────────────────────┐       │    │
│  │  │     [Large Activity Icon]                │       │    │
│  │  │          Push-ups                        │       │    │
│  │  └──────────────────────────────────────────┘       │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  Details:                                            │    │
│  │  ┌──────────┬──────────┐  ┌──────────┬──────────┐  │    │
│  │  │ [🎯]     │ [⚡]     │  │ [📦]     │ [📊]     │  │    │
│  │  │ Muscle   │ Type     │  │ Equipment│ Difficulty│  │    │
│  │  │ Chest    │ Strength │  │ Body Only│ Beginner  │  │    │
│  │  └──────────┴──────────┘  └──────────┴──────────┘  │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  📖 Instructions:                                    │    │
│  │  Start in a plank position. Lower your body...      │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  Recommendations:                                    │    │
│  │  ✓ Perform 3-4 sets of 8-12 repetitions            │    │
│  │  ✓ Rest 60-90 seconds between sets                 │    │
│  │  ✓ Focus on proper form over speed                 │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                    FAVORITES SCREEN (Tab 2)                    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  [❤️] Favorites                                      │    │
│  │  3 exercises saved                                   │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [Activity Icon]              [❤️ Remove]  │     │    │
│  │  │  Push-ups                                   │     │    │
│  │  │  [🎯 chest] [📊 beginner]                  │     │    │
│  │  │  Start in a plank position...              │     │    │
│  │  │  [📦 body_only]                      [→]   │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  │  ... more favorite exercises ...                    │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  Empty State (if no favorites):                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │           [Large Heart Icon]                         │    │
│  │           No favorites yet                           │    │
│  │   Start adding exercises to your favorites!          │    │
│  │     [Explore Exercises Button]                       │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                    PROFILE SCREEN (Tab 3)                      │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Profile                                             │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  ┌──────────────────────────────────────────┐       │    │
│  │  │         [Avatar: J]                      │       │    │
│  │  │         John Doe                         │       │    │
│  │  │      john@example.com                    │       │    │
│  │  │                                          │       │    │
│  │  │  [3 Favorites] [0 Workouts] [0 Days]   │       │    │
│  │  └──────────────────────────────────────────┘       │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  PREFERENCES                                         │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [🌙] Dark Mode         [Toggle Switch]   │     │    │
│  │  │  Enabled                                   │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [🔔] Notifications            [→]        │     │    │
│  │  │  Manage notifications                      │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [🌍] Language                [→]         │     │    │
│  │  │  English                                   │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  ABOUT                                               │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [ℹ️] About FitBuddy           [→]        │     │    │
│  │  │  Version 1.0.0                             │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [❓] Help & Support           [→]        │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [🛡️] Privacy Policy           [→]        │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  [🚪] Logout                   [→]        │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  │                                                      │    │
│  │  Made with ❤️ for fitness enthusiasts               │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                  BOTTOM TAB NAVIGATION                         │
│  ┌────────────┬────────────┬────────────┐                    │
│  │   [🏠]    │   [❤️]     │   [👤]     │                    │
│  │   Home     │ Favorites  │  Profile   │                    │
│  │  (Active)  │            │            │                    │
│  └────────────┴────────────┴────────────┘                    │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                     DARK MODE VERSION                          │
│  All screens adapt with:                                      │
│  • Dark background (#121212)                                  │
│  • Dark cards (#1E1E1E)                                       │
│  • White text (#FFFFFF)                                       │
│  • Gray secondary text (#B0B0B0)                              │
│  • Same green primary color (#4CAF50)                         │
│  • Dark borders (#333333)                                     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT FLOW                        │
│                                                               │
│  User Action → Dispatch Redux Action → API Call (if needed)  │
│       ↓                                        ↓              │
│  Redux Reducer Updates State        Response Data            │
│       ↓                                        ↓              │
│  Component Rerenders         Update Redux State              │
│       ↓                                        ↓              │
│  UI Updates              AsyncStorage (if persistence)        │
│                                                               │
│  Example: Add to Favorites                                   │
│  1. Tap Heart Icon                                           │
│  2. Dispatch toggleFavorite(exercise)                        │
│  3. Redux updates favorites array                            │
│  4. Dispatch saveFavorites(updatedArray)                     │
│  5. AsyncStorage saves data                                  │
│  6. Component rerenders with new state                       │
│  7. Heart icon fills red                                     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                  DATA PERSISTENCE FLOW                         │
│                                                               │
│  App Startup:                                                │
│  1. Check AsyncStorage for token → Auto-login               │
│  2. Load favorites from AsyncStorage                         │
│  3. Load theme preference from AsyncStorage                  │
│                                                               │
│  During Use:                                                 │
│  1. Add favorite → Save to AsyncStorage immediately          │
│  2. Toggle theme → Save to AsyncStorage immediately          │
│  3. Login → Save token and user to AsyncStorage             │
│                                                               │
│  App Restart:                                                │
│  1. All preferences restored                                 │
│  2. User stays logged in                                     │
│  3. Favorites preserved                                      │
│  4. Theme preference maintained                              │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                   USER JOURNEY EXAMPLE                         │
│                                                               │
│  Day 1:                                                      │
│  1. User opens app → Sees Login                             │
│  2. Taps "Sign Up" → Enters details                         │
│  3. Registers → Auto-navigates to Home                      │
│  4. Browses exercises → Adds 3 to favorites                 │
│  5. Goes to Profile → Enables Dark Mode                     │
│  6. Closes app                                              │
│                                                               │
│  Day 2:                                                      │
│  1. User opens app → Auto-logged in (token from storage)   │
│  2. Sees Home in Dark Mode (preference from storage)        │
│  3. Checks Favorites → Still has 3 exercises (from storage) │
│  4. Searches for "push" → Finds push-ups                    │
│  5. Views details → Adds to favorites (4 total)            │
│  6. Removes one favorite → Back to 3                        │
│  7. Happy with the app! 🎉                                  │
└───────────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

### Light Mode:
- Background: `#F5F5F5`
- Cards: `#FFFFFF`
- Text: `#000000`
- Secondary Text: `#666666`
- Primary: `#4CAF50` (Green)
- Border: `#E0E0E0`

### Dark Mode:
- Background: `#121212`
- Cards: `#1E1E1E`
- Text: `#FFFFFF`
- Secondary Text: `#B0B0B0`
- Primary: `#4CAF50` (Green)
- Border: `#333333`

### Difficulty Colors:
- Beginner: `#4CAF50` (Green)
- Intermediate: `#FF9800` (Orange)
- Expert: `#F44336` (Red)

## 📐 Layout Patterns

### Card Pattern:
```
┌────────────────────────────┐
│   [Colored Header with Icon]│
├────────────────────────────┤
│   Title (Bold, Large)       │
│   [Tag] [Tag]              │
│   Description preview...    │
│   [Icon] Info      [→]     │
└────────────────────────────┘
```

### Detail Pattern:
```
┌────────────────────────────┐
│   [Hero Section]           │
├────────────────────────────┤
│   Detail Grid              │
│   [Icon] [Icon] [Icon]     │
├────────────────────────────┤
│   Instructions Section     │
├────────────────────────────┤
│   Recommendations          │
└────────────────────────────┘
```

### Profile Pattern:
```
┌────────────────────────────┐
│   [Avatar]                 │
│   Name & Email             │
│   Stats Row                │
├────────────────────────────┤
│   Settings Menu Items      │
│   [Icon] Text      [→]    │
└────────────────────────────┘
```
