# FitBuddy - Fitness Tracking Mobile App

A comprehensive React Native mobile application for tracking exercises, water intake, and wellness tips. Built with Expo, Redux Toolkit, and modern best practices.

## 🚀 Features

### Core Features
- ✅ **User Authentication** - Registration and login with form validation using Yup
- ✅ **Exercise List** - Browse exercises fetched from API with filtering by muscle group
- ✅ **Exercise Details** - View detailed information about each exercise
- ✅ **Favorites** - Save favorite exercises with AsyncStorage persistence
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Search & Filter** - Search exercises and filter by muscle groups
- ✅ **User Profile** - View profile, stats, and app settings

### Technical Features
- Redux Toolkit for state management
- AsyncStorage for local data persistence
- Axios for API calls
- Formik + Yup for form handling and validation
- Feather Icons for consistent iconography
- Responsive design for various screen sizes
- Bottom tab navigation with Expo Router

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator
- Physical device with Expo Go app (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd "E:\React-Native Assignment\Assignment_React_Native"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key (Optional)**
   
   To use the real Exercise API from api-ninjas.com:
   - Sign up at https://api-ninjas.com/
   - Get your API key
   - Open `services/api.ts`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

   Note: The app includes dummy data as fallback, so it works without an API key.

## 🚀 Running the App

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Run on different platforms**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your physical device

## 📱 App Structure

```
app/
├── (tabs)/              # Tab navigation screens
│   ├── index.tsx       # Home screen with exercise list
│   ├── favorites.tsx   # Favorite exercises screen
│   └── profile.tsx     # User profile screen
├── _layout.tsx         # Root layout with Redux Provider
├── login.tsx           # Login screen
├── register.tsx        # Registration screen
└── exercise-details.tsx # Exercise detail view

store/
├── index.ts            # Redux store configuration
└── slices/
    ├── authSlice.ts    # Authentication state
    ├── exerciseSlice.ts # Exercises state
    ├── favoritesSlice.ts # Favorites state
    └── themeSlice.ts   # Theme state

services/
└── api.ts              # API service layer

types/
└── index.ts            # TypeScript type definitions
```

## 🔑 Demo Credentials

For quick testing, you can use any email and password to login. The app uses a demo authentication API.

Example:
- Email: `demo@fitbuddy.com`
- Password: `password123`

## 📚 Key Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Expo Router** - File-based routing
- **AsyncStorage** - Local storage
- **Axios** - HTTP client
- **Formik** - Form handling
- **Yup** - Form validation
- **Feather Icons** - Icon library

## 🎨 Design Features

- Clean and modern UI
- Smooth animations and transitions
- Consistent color scheme with primary green accent (#4CAF50)
- Dark mode support with persisted preference
- Card-based layout for exercises
- Difficulty color coding (Beginner: Green, Intermediate: Orange, Expert: Red)

## 🔐 Security Best Practices

- Secure token storage using AsyncStorage
- Form validation on client side
- Proper authentication flow
- Protected routes with auth guards

## 📊 State Management

The app uses Redux Toolkit with the following slices:
- **auth**: User authentication and session management
- **exercises**: Exercise data and API state
- **favorites**: Favorite exercises with persistence
- **theme**: Dark/light mode preferences

## 🧪 Testing the App

1. **Authentication Flow**
   - Register a new account
   - Login with credentials
   - Verify user name appears in header

2. **Exercise Features**
   - Browse exercise list
   - Filter by muscle groups
   - Search for specific exercises
   - View exercise details
   - Add/remove favorites

3. **Dark Mode**
   - Toggle dark mode in Profile
   - Verify theme persists after app restart

4. **Favorites**
   - Add exercises to favorites
   - View favorites tab
   - Remove from favorites
   - Verify persistence after app restart

## 📝 Assignment Requirements Checklist

✅ User Authentication with registration and login
✅ Form validation using Yup
✅ Navigation to home screen after login
✅ User name visible in app header
✅ Secure local storage for auth state
✅ React Navigation with tab navigation
✅ Dynamic item list from API
✅ Cards with image/icon, title, and description
✅ Item interaction opening details screen
✅ Redux Toolkit for state management
✅ Favorites feature with persistence
✅ Consistent styling with Feather Icons
✅ Responsive design
✅ Dark mode toggle (Bonus feature)
✅ Proper validations
✅ Decoupled, reusable code
✅ Best practices and industry standards

## 🐛 Troubleshooting

**If exercises don't load:**
- Check internet connection
- The app will use dummy data if API fails
- Optional: Add your API key in `services/api.ts`

**If app crashes on startup:**
```bash
npm start --clear
```

**If authentication doesn't work:**
- Clear app data and restart
- The app uses demo authentication which accepts any credentials

## 📄 License

This project is created for educational purposes as part of a React Native assignment.

## 👨‍💻 Author

Created as part of IN3210 - Cross-Platform Mobile Development with React Native course.

## 🙏 Acknowledgments

- Exercise data from API-Ninjas
- Icons from Feather Icons
- Dummy API from DummyJSON
