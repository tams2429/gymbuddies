# Fitness Tracker App Development Plan

Complete development roadmap for a fitness tracker mobile app with workout logging, Apple Health/Android Health integration, gamified leaderboards, and social features using React Native and Firebase.

## Phase 1: Planning & Design (Weeks 1-2)

### 1.1 Requirements & Feature Specification

-   Define core user flows: registration, workout logging, leaderboard viewing, friend management
-   Create user personas and use cases
-   Document health data requirements (steps, heart rate, workouts, calories, etc.)
-   Define gamification rules (points system, leaderboard periods, achievements)
-   Privacy and data sharing policies (GDPR, health data regulations)

### 1.2 Technical Architecture

-   **Mobile App Structure:**
    -   Navigation structure (React Navigation)
    -   State management setup (Redux Toolkit or Zustand)
    -   Component library organization
    -   Service layer for API calls and health integration
-   **Firebase Architecture:**
    -   Firestore collections: `users`, `workouts`, `leaderboards`, `friendships`, `achievements`, `badges`, `userBadges`, `titles`, `userTitles`, `pets`, `userPets`, `userProgress`
    -   Cloud Functions for:
        -   XP calculation and level-up detection
        -   Streak tracking and consistency bonus calculation
        -   Achievement/badge unlocking logic
        -   Leaderboard calculations
        -   Pet XP distribution and evolution
        -   Title unlocking
        -   Push notifications
    -   Storage buckets: profile images, workout media, pet images, badge icons
    -   Authentication: Email/password, Google, Apple Sign-In

### 1.3 UI/UX Design

-   Create wireframes for all screens
-   Design system (colors, typography, components)
-   User flow diagrams
-   Prototype key interactions
-   Accessibility considerations

### 1.4 Health Integration Research

-   **iOS HealthKit:**
    -   Required permissions and data types
    -   Background sync capabilities
    -   Privacy requirements
-   **Android Health Connect:**
    -   API capabilities and limitations
    -   Permission model
    -   Data read/write permissions

## Phase 2: Project Setup & Foundation (Week 3)

### 2.1 Development Environment

-   Initialize React Native project (Expo or bare React Native)
-   Configure TypeScript
-   Set up ESLint, Prettier
-   Configure Git workflow and branching strategy
-   Set up CI/CD pipeline (GitHub Actions or similar)

### 2.2 Firebase Setup

-   Create Firebase project
-   Configure iOS and Android apps in Firebase Console
-   Set up Firestore database with initial collections
-   Configure Firebase Authentication providers
-   Set up Firebase Cloud Functions project
-   Configure Firebase Storage buckets
-   Set up Firebase Analytics and Crashlytics

### 2.3 Core Dependencies Installation

```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs

# State Management
npm install @reduxjs/toolkit react-redux

# Health Integration
npm install react-native-health  # iOS HealthKit
npm install react-native-health-connect  # Android Health Connect

# Firebase
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage @react-native-firebase/functions

# UI Components
npm install react-native-vector-icons react-native-chart-kit
npm install react-native-gesture-handler react-native-reanimated

# Utilities
npm install date-fns lodash
```

### 2.4 Project Structure

```
src/
  ├── components/       # Reusable UI components
  ├── screens/          # Screen components
  ├── navigation/       # Navigation configuration
  ├── store/            # Redux store and slices
  ├── services/         # API and health integration services
  ├── utils/            # Helper functions
  ├── types/            # TypeScript types
  └── constants/        # App constants
```

## Phase 3: Core Features Development (Weeks 4-8)

### 3.1 Authentication & User Management

-   **Screens:**
    -   Login/Register screen
    -   Profile setup (initial onboarding)
    -   Profile view/edit screen
-   **Features:**

    -   Email/password authentication
    -   Google Sign-In integration
    -   Apple Sign-In (iOS)
    -   User profile creation and storage
    -   Profile image upload to Firebase Storage

-   **Firebase:**
    -   Firestore user document structure
    -   Cloud Function for user creation hooks

### 3.2 Health Integration Service

-   **iOS Implementation:**
    -   Request HealthKit permissions (workouts, heart rate, active energy)
    -   Read workout data (type, duration, calories, distance)
    -   Read activity data (steps, active energy)
    -   Read heart rate data (average, max, min) - **Critical for intensity multiplier calculation**
    -   Match heart rate data to workout sessions by time
    -   Background sync setup
-   **Android Implementation:**

    -   Request Health Connect permissions (exercise sessions, heart rate)
    -   Read exercise sessions (type, duration, calories, distance)
    -   Read steps and activity data
    -   Read heart rate data (average, max, min) - **Critical for intensity multiplier calculation**
    -   Match heart rate data to workout sessions by time
    -   Handle permission denials gracefully

-   **Service Layer:**
    -   Unified health service interface
    -   Data normalization between platforms
    -   Error handling and retry logic
    -   Background sync scheduling

### 3.3 Workout Logging

-   **Screens:**
    -   Workout list/history screen
    -   Workout detail screen
    -   Manual workout entry screen
    -   Active workout tracking screen (optional)
-   **Features:**
    -   Automatic workout detection from health apps
    -   Manual workout entry (type, duration, calories, notes)
    -   Workout editing and deletion
    -   Workout categorization (running, cycling, strength, etc.)
    -   Photo attachment to workouts
-   **Data Model:**
    ```typescript
    Workout {
      id: string
      userId: string
      type: string
      duration: number (minutes)
      calories: number
      distance?: number
      date: Timestamp
      source: 'healthkit' | 'healthconnect' | 'manual'
      healthDataId?: string
      notes?: string
      photos?: string[]
      heartRate?: {
        average?: number
        max?: number
        min?: number
      }
      intensity?: 'low' | 'moderate' | 'high' | 'max'
      xpEarned?: number  // Calculated XP for this workout
    }
    ```

### 3.4 Points & Scoring System (XP)

-   **Workout Points (XP) Calculation:**

    -   Base points: 10 XP per minute of exercise
    -   Intensity multiplier:
        -   Low intensity: 1.0x (no multiplier)
        -   High intensity: 1.5x (heart rate 70-85% max)
        -   Max effort: 2.0x (heart rate >85% max)
    -   Consistency bonus (streak multipliers):
        -   1.1x multiplier for consecutive workouts within 4 days
        -   1.2x multiplier for consecutive workouts within 2 days
    -   Formula: `XP = (duration * 10) * intensityMultiplier * streakMultiplier`

-   **Achievement Points:**

    -   Separate point system for completing challenges and milestones
    -   Awarded when achievements are unlocked
    -   Contributes to total XP but tracked separately for analytics

-   **Implementation:**
    -   Calculate XP when workout is logged
    -   Determine intensity from heart rate data (if available)
    -   Check workout streak (last workout date)
    -   Store XP per workout for transparency
    -   Update user's total XP and level

### 3.5 Leaderboard System

-   **Screens:**
    -   Leaderboard view (global, friends, weekly, monthly, all-time)
    -   Filter and period selection
-   **Features:**
    -   Leaderboards based on total XP earned in period
    -   Multiple leaderboard periods (daily, weekly, monthly, all-time)
    -   Friend-only vs global leaderboards
    -   Rankings and position changes
    -   Show XP difference to next rank
-   **Firebase Cloud Functions:**
    -   Calculate user XP when workout is logged (see 3.4)
    -   Update leaderboard rankings based on XP
    -   Scheduled function for period resets (daily/weekly/monthly)
-   **Data Model:**
    ```typescript
    LeaderboardEntry {
      userId: string
      period: 'daily' | 'weekly' | 'monthly' | 'alltime'
      scope: 'global' | 'friends'
      xp: number  // Total XP in period
      rank: number
      lastUpdated: Timestamp
    }
    ```

### 3.6 Social Features - Friends

-   **Screens:**
    -   Friends list screen
    -   Add friends screen (search, QR code, invite)
    -   Friend requests screen
-   **Features:**
    -   Send friend requests
    -   Accept/decline friend requests
    -   Remove friends
    -   View friend profiles and workouts
    -   Friend activity feed
-   **Data Model:**
    ```typescript
    Friendship {
      id: string
      user1Id: string
      user2Id: string
      status: 'pending' | 'accepted' | 'blocked'
      createdAt: Timestamp
    }
    ```

## Phase 4: Gamification & Engagement Features (Weeks 9-12)

### 4.0 XP Calculation & Streak Tracking Implementation

-   **XP Calculation Service:**

    -   Implement base XP calculation (10 XP per minute)
    -   Heart rate intensity detection and multiplier application
    -   Streak detection logic (check last workout date)
    -   Consistency bonus calculation (1.1x or 1.2x multiplier)
    -   Total XP calculation with all multipliers

-   **Streak Tracking:**

    -   Track consecutive workout days
    -   Define streak rules (workout within 2 days = active streak)
    -   Update streak on workout log
    -   Reset streak if gap exceeds threshold
    -   Store longest streak record

-   **Cloud Function: `calculateWorkoutXP`**
    -   Triggered on workout creation
    -   Calculate base XP from duration
    -   Determine intensity from heart rate data
    -   Check user's last workout date for streak
    -   Apply multipliers
    -   Update user's total XP
    -   Check for level up
    -   Distribute XP to pet (if user has pet)
    -   Update leaderboard entries

### 4.1 Levels & Progression System

-   **User Levels (1-100+):**

    -   Level progression based on total XP earned
    -   Exponential XP requirements per level (e.g., Level 2: 100 XP, Level 10: 2,500 XP, Level 50: 50,000 XP)
    -   Level up notifications with celebration animation
    -   Visual progress bar showing current XP and XP needed for next level

-   **Level Unlocks:**

    -   Each level unlocks new features, badges, or customization options
    -   Examples:
        -   Level 5: Unlock profile customization
        -   Level 10: Unlock pet system
        -   Level 20: Unlock advanced statistics
        -   Level 30: Unlock custom titles
        -   Level 50: Unlock exclusive badges

-   **Screens:**

    -   Profile screen with level display and progress bar
    -   Level up celebration screen
    -   Level rewards/preview screen

-   **Data Model:**
    ```typescript
    UserProgress {
      userId: string
      level: number
      totalXP: number
      currentLevelXP: number  // XP in current level
      xpToNextLevel: number
      achievementPoints: number  // Separate from workout XP
      lastWorkoutDate?: Timestamp
      currentStreak: number  // Days
      longestStreak: number
      unlockedFeatures: string[]
    }
    ```

### 4.2 Gym Badges System

-   **Badge Collection:**

    -   Collectible badges for various achievements
    -   Badge display in profile (grid view)
    -   Badge details screen (unlock date, rarity, description)
    -   Badge categories: Milestones, Streaks, PRs, Consistency, Variety

-   **Badge Examples:**

    -   First Steps: First Workout, First Week, First Month
    -   Consistency: 7-Day Streak, 30-Day Streak, 100-Day Streak
    -   Volume: 10 Workouts, 50 Workouts, 100 Workouts, 500 Workouts, 1000 Workouts
    -   Time: 10 Hours, 50 Hours, 100 Hours, 500 Hours
    -   PR Achievements: New Personal Record badges for various exercises
    -   Special: Early Adopter, Beta Tester, Community Contributor

-   **Data Model:**

    ```typescript
    Badge {
      id: string
      name: string
      description: string
      category: 'milestone' | 'streak' | 'volume' | 'time' | 'pr' | 'special'
      icon: string  // Icon name or URL
      rarity: 'common' | 'rare' | 'epic' | 'legendary'
      xpReward: number  // Achievement points awarded
    }

    UserBadge {
      userId: string
      badgeId: string
      unlockedAt: Timestamp
      progress?: number  // For progress-based badges
    }
    ```

### 4.3 Achievement System

-   **Milestone Achievements:**

    -   **First Steps:** First workout, first week, first month
    -   **Volume Achievements:** 10, 50, 100, 500, 1000 workouts completed
    -   **Time Achievements:** 10, 50, 100, 500 hours of exercise
    -   **PR Achievements:** Personal records in various exercises/types
        -   Fastest 5K run
        -   Longest workout duration
        -   Highest calorie burn in single workout
        -   Most workouts in a week/month

-   **Achievement Tracking:**

    -   Real-time progress tracking for each achievement
    -   Progress indicators (e.g., "45/50 workouts completed")
    -   Automatic unlocking when criteria met
    -   Achievement history timeline

-   **Features:**

    -   Achievement definitions and criteria
    -   Achievement unlocking logic (Cloud Function)
    -   Achievement display in profile
    -   Push notifications for achievements
    -   Achievement sharing to social feed

-   **Data Model:**

    ```typescript
    Achievement {
      id: string
      name: string
      description: string
      category: 'milestone' | 'volume' | 'time' | 'pr' | 'streak'
      criteria: {
        type: 'workout_count' | 'total_hours' | 'streak_days' | 'pr_type' | 'custom'
        target: number
        exerciseType?: string  // For PR achievements
      }
      xpReward: number
      badgeId?: string  // Associated badge
    }

    UserAchievement {
      userId: string
      achievementId: string
      unlockedAt: Timestamp
      progress: number
      isUnlocked: boolean
    }
    ```

### 4.4 Virtual Rewards - Titles System

-   **Title System:**

    -   Unlockable titles based on achievements, level, or activity
    -   Display title under username in profile and leaderboards
    -   Title categories: Performance, Consistency, Variety, Special

-   **Title Examples:**

    -   Performance: "Iron Warrior", "Cardio King", "Yoga Master", "Marathon Runner"
    -   Consistency: "Streak Master", "Daily Devotee", "Weekend Warrior"
    -   Variety: "Jack of All Trades", "Explorer", "Versatile Athlete"
    -   Special: "Early Adopter", "Community Leader", "Legend"

-   **Title Unlock Criteria:**

    -   Based on workout type distribution (e.g., "Cardio King" for 80%+ cardio workouts)
    -   Based on level milestones
    -   Based on specific achievements
    -   Based on leaderboard positions

-   **Data Model:**

    ```typescript
    Title {
      id: string
      name: string
      description: string
      category: 'performance' | 'consistency' | 'variety' | 'special'
      unlockCriteria: {
        type: 'level' | 'achievement' | 'workout_distribution' | 'leaderboard'
        value: any
      }
    }

    UserTitle {
      userId: string
      titleId: string
      unlockedAt: Timestamp
      isActive: boolean  // User can select active title
    }
    ```

### 4.5 Virtual Rewards - Pet System

-   **Pet Unlocking:**

    -   Unlock pet after reaching a certain level (e.g., Level 10)
    -   Multiple pet options to choose from
    -   Pet becomes companion that grows with user

-   **Pet Progression:**

    -   Pets level up based on workout XP earned
    -   Visual growth stages (baby → adolescent → adult → evolved)
    -   Each pet has multiple evolution stages
    -   Pet level displayed in profile

-   **Pet Features:**

    -   Pet displayed on home screen or profile
    -   Pet reacts to workout completions (animations)
    -   Pet shows encouragement messages
    -   Pet customization (colors, accessories unlocked at higher levels)
    -   Pet stats (total XP contributed, level, evolution stage)

-   **Screens:**

    -   Pet selection screen (when first unlocked)
    -   Pet profile/view screen
    -   Pet evolution celebration screen

-   **Data Model:**

    ```typescript
    Pet {
      id: string
      name: string
      species: string
      baseImage: string
      evolutionStages: {
        stage: number
        name: string
        image: string
        xpRequired: number
      }[]
      unlockLevel: number
    }

    UserPet {
      userId: string
      petId: string
      level: number
      currentStage: number
      totalXPContributed: number  // XP from workouts that went to pet
      unlockedAt: Timestamp
      customization?: {
        color?: string
        accessories?: string[]
      }
    }
    ```

-   **XP Distribution:**
    -   User earns XP from workouts (see 3.4)
    -   Pet receives a percentage of workout XP (e.g., 10-20%)
    -   Pet levels up independently
    -   User can see both their XP and pet XP progress

### 4.6 Push Notifications

-   **Firebase Cloud Messaging Setup:**
    -   Configure FCM for iOS and Android
    -   Request notification permissions
    -   Handle notification tokens
-   **Notification Types:**
    -   Friend request received
    -   Friend accepted request
    -   Achievement unlocked
    -   Badge earned
    -   Level up
    -   Pet evolution
    -   Title unlocked
    -   Leaderboard position change
    -   Streak reminder (if streak in danger)
    -   Daily workout reminders
    -   Weekly summary

### 4.7 Additional Engagement Features

-   **Workout Statistics Dashboard:**
    -   Weekly/monthly summaries
    -   Charts (workout frequency, calories burned, distance)
    -   Personal records
    -   Progress tracking
-   **Challenges:**
    -   Create custom challenges
    -   Join community challenges
    -   Challenge progress tracking
-   **Social Feed:**
    -   Recent workouts from friends
    -   Likes and comments on workouts
    -   Share workouts externally

## Phase 5: Polish & Optimization (Weeks 11-12)

### 5.1 UI/UX Refinement

-   Implement design system consistently
-   Add loading states and skeletons
-   Error handling and user feedback
-   Animations and transitions
-   Dark mode support (optional)

### 5.2 Performance Optimization

-   Image optimization and caching
-   List virtualization for large datasets
-   Lazy loading of screens
-   Optimize Firestore queries (indexes)
-   Reduce bundle size

### 5.3 Testing

-   Unit tests for utilities and services
-   Integration tests for critical flows
-   E2E tests for main user journeys
-   Test on multiple devices and OS versions
-   Health integration testing on real devices

### 5.4 Security & Privacy

-   Implement data encryption for sensitive health data
-   Review Firebase security rules
-   GDPR compliance (data export, deletion)
-   Privacy policy and terms of service
-   Health data sharing permissions UI

## Phase 6: Pre-Production Preparation (Week 13)

### 6.1 App Store Assets

-   **iOS (App Store):**
    -   App icon (1024x1024)
    -   Screenshots (all required sizes)
    -   App preview video (optional)
    -   App description and keywords
    -   Privacy policy URL
    -   Support URL
-   **Android (Google Play):**
    -   App icon (512x512)
    -   Feature graphic (1024x500)
    -   Screenshots (phone, tablet, TV)
    -   App description
    -   Privacy policy URL

### 6.2 App Configuration

-   **iOS:**
    -   Configure Info.plist (HealthKit usage description)
    -   Set up App Store Connect account
    -   Configure app identifiers and certificates
    -   Set up TestFlight for beta testing
-   **Android:**
    -   Configure AndroidManifest.xml (Health Connect permissions)
    -   Set up Google Play Console account
    -   Generate signed APK/AAB
    -   Set up internal testing track

### 6.3 Legal & Compliance

-   Privacy policy (health data handling)
-   Terms of service
-   End User License Agreement (EULA)
-   Data processing agreements
-   Health data compliance (HIPAA considerations if applicable)

### 6.4 Analytics & Monitoring

-   Firebase Analytics events tracking
-   Crashlytics error monitoring
-   Performance monitoring
-   User behavior analytics
-   A/B testing setup (optional)

## Phase 7: Beta Testing (Week 14)

### 7.1 Internal Testing

-   TestFlight (iOS) - internal testers
-   Google Play Internal Testing (Android)
-   Test all features thoroughly
-   Collect feedback and bug reports

### 7.2 External Beta Testing

-   TestFlight (iOS) - external testers (up to 10,000)
-   Google Play Closed/Open Beta (Android)
-   Gather user feedback
-   Monitor crash reports and analytics
-   Iterate based on feedback

## Phase 8: Production Release (Week 15)

### 8.1 Final Build Preparation

-   Remove debug code and console logs
-   Optimize app bundle
-   Final security review
-   Update version numbers
-   Generate production builds

### 8.2 App Store Submission

-   **iOS App Store:**
    -   Submit for App Review
    -   Answer review questions
    -   Handle review feedback
    -   Typical review time: 24-48 hours
-   **Google Play:**
    -   Upload release bundle (AAB)
    -   Complete store listing
    -   Submit for review
    -   Typical review time: 1-3 days

### 8.3 Launch Preparation

-   Prepare marketing materials
-   Set up customer support channels
-   Monitor app store listings
-   Plan launch announcement

## Phase 9: Post-Launch (Ongoing)

### 9.1 Monitoring & Maintenance

-   Monitor crash reports daily
-   Track key metrics (DAU, retention, engagement)
-   Respond to user reviews
-   Fix critical bugs immediately

### 9.2 Iteration & Updates

-   Plan feature updates based on user feedback
-   Regular bug fixes and improvements
-   Performance optimizations
-   New feature releases

### 9.3 Growth & Marketing

-   App Store Optimization (ASO)
-   Social media presence
-   User acquisition campaigns
-   Community building

## Additional Popular Features to Increase Engagement

### High-Impact Features:

1. **Workout Plans & Programs**

    - Pre-built workout programs
    - Custom workout plan creation
    - Progress tracking through programs

2. **Social Sharing**

    - Share workouts to social media
    - Workout photos and stories
    - Activity feed with likes/comments

3. **Challenges & Competitions**

    - Weekly/monthly challenges
    - Team challenges
    - Custom challenge creation

4. **Progress Photos**

    - Before/after photo tracking
    - Body measurement logging
    - Visual progress timeline

5. **Nutrition Integration** (Future Phase)

    - Calorie tracking
    - Meal logging
    - Integration with nutrition apps

6. **Wearable Device Support**

    - Apple Watch app
    - Wear OS integration
    - Direct sync from wearables

7. **AI-Powered Insights**

    - Workout recommendations
    - Recovery time suggestions
    - Performance analysis

8. **Reminders & Notifications**

    - Workout reminders
    - Rest day suggestions
    - Achievement celebrations

9. **Workout Library**

    - Exercise database with instructions
    - Video demonstrations
    - Muscle group targeting

10. **Community Features**

    - Groups/teams
    - Discussion forums
    - Workout sharing marketplace

## Key Files to Create

### Mobile App Structure:

-   `App.tsx` - Main app entry point
-   `src/navigation/AppNavigator.tsx` - Navigation setup
-   `src/services/HealthService.ts` - Health integration service
-   `src/services/FirebaseService.ts` - Firebase operations
-   `src/store/slices/workoutSlice.ts` - Workout state management
-   `src/store/slices/leaderboardSlice.ts` - Leaderboard state
-   `src/store/slices/progressSlice.ts` - User XP, level, and progress state
-   `src/store/slices/achievementSlice.ts` - Achievements and badges state
-   `src/store/slices/petSlice.ts` - Pet system state
-   `src/services/XPCalculationService.ts` - XP calculation logic
-   `src/services/StreakService.ts` - Workout streak tracking
-   `src/screens/WorkoutLogScreen.tsx` - Workout logging UI
-   `src/screens/LeaderboardScreen.tsx` - Leaderboard UI
-   `src/screens/FriendsScreen.tsx` - Social features UI
-   `src/screens/ProfileScreen.tsx` - Profile with level, badges, pet
-   `src/screens/AchievementsScreen.tsx` - Achievements and badges view
-   `src/screens/PetScreen.tsx` - Pet profile and evolution
-   `src/components/LevelProgressBar.tsx` - Level progress visualization
-   `src/components/BadgeGrid.tsx` - Badge collection display
-   `src/components/PetDisplay.tsx` - Pet visualization component

### Firebase:

-   `functions/src/index.ts` - Cloud Functions entry point
-   `functions/src/workoutXP.ts` - XP calculation on workout creation
-   `functions/src/levelUp.ts` - Level up detection and processing
-   `functions/src/streakTracking.ts` - Streak calculation and consistency bonus
-   `functions/src/achievements.ts` - Achievement unlocking logic
-   `functions/src/badges.ts` - Badge unlocking logic
-   `functions/src/petEvolution.ts` - Pet XP distribution and evolution
-   `functions/src/leaderboard.ts` - Leaderboard calculations
-   `functions/src/notifications.ts` - Push notification triggers
-   `firestore.rules` - Security rules
-   `firestore.indexes.json` - Database indexes

### Configuration:

-   `app.json` / `app.config.js` - App configuration
-   `ios/Info.plist` - iOS permissions
-   `android/app/src/main/AndroidManifest.xml` - Android permissions
