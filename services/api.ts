import axios from 'axios';
import { Exercise, User } from '../types';

// API Configuration
const EXERCISE_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with actual API key from api-ninjas.com
const EXERCISE_API_URL = 'https://api.api-ninjas.com/v1/exercises';

// Dummy Auth API (using dummyjson.com)
const AUTH_API_URL = 'https://dummyjson.com/auth';
const USERS_API_URL = 'https://dummyjson.com/users';

// Exercise API
export const exerciseAPI = {
  getExercises: async (muscle: string = ''): Promise<Exercise[]> => {
    // Always use dummy data for demo purposes
    // This ensures the app works without requiring an API key
    console.log('Fetching exercises for muscle:', muscle || 'all');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get dummy exercises
    const allExercises = getDummyExercises();
    
    // Filter by muscle if specified
    if (muscle) {
      return allExercises.filter(ex => 
        ex.muscle.toLowerCase().includes(muscle.toLowerCase())
      );
    }
    
    return allExercises;
  },
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    try {
      // Simple demo authentication - accepts any credentials
      // In production, this would validate against a real API
      
      // Create a mock user based on the email
      const namePart = email.split('@')[0];
      const user: User = {
        id: Math.random().toString(36).substring(7),
        username: namePart,
        email: email,
        name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      };

      // Generate a mock token
      const token = 'token_' + Math.random().toString(36).substring(7);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        user,
        token,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    }
  },

  register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    try {
      // Create a user object for registration
      const userId = Math.random().toString(36).substring(7);
      const user: User = {
        id: userId,
        username: email.split('@')[0],
        email: email,
        name: name,
      };

      // Generate a token
      const token = 'token_' + Math.random().toString(36).substring(7);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return { user, token };
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  },
};

// Dummy exercises data (fallback)
const getDummyExercises = (): Exercise[] => {
  return [
    {
      name: 'Push-ups',
      type: 'strength',
      muscle: 'chest',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, keeping your body in a straight line. Push yourself back up to the starting position. Repeat for desired repetitions.',
    },
    {
      name: 'Bench Press',
      type: 'strength',
      muscle: 'chest',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Lie on a flat bench with feet flat on the floor. Grip the barbell slightly wider than shoulder-width. Lower the bar to your chest, then press it back up until arms are extended. Control the weight throughout the movement.',
    },
    {
      name: 'Dumbbell Flyes',
      type: 'strength',
      muscle: 'chest',
      equipment: 'dumbbell',
      difficulty: 'intermediate',
      instructions: 'Lie on a flat bench holding dumbbells above your chest. With a slight bend in elbows, lower weights out to sides until you feel a stretch. Bring weights back up in a hugging motion.',
    },
    {
      name: 'Squats',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Stand with feet shoulder-width apart, toes slightly turned out. Lower your body as if sitting back into a chair, keeping chest up and knees tracking over toes. Push through heels to return to standing.',
    },
    {
      name: 'Barbell Back Squat',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Position barbell on upper back. Stand with feet shoulder-width apart. Descend by bending knees and hips, keeping chest up. Lower until thighs are parallel to ground, then drive back up through heels.',
    },
    {
      name: 'Leg Press',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'machine',
      difficulty: 'beginner',
      instructions: 'Sit in leg press machine with feet shoulder-width apart on platform. Release the safety handles and lower the weight by bending knees. Press through heels to extend legs back to start position.',
    },
    {
      name: 'Pull-ups',
      type: 'strength',
      muscle: 'back',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Hang from a pull-up bar with hands slightly wider than shoulder-width, palms facing away. Pull yourself up until chin is over the bar. Lower back down with control.',
    },
    {
      name: 'Bent Over Row',
      type: 'strength',
      muscle: 'back',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Bend at hips with slight knee bend, holding barbell with overhand grip. Pull bar to lower chest, squeezing shoulder blades together. Lower bar with control.',
    },
    {
      name: 'Lat Pulldown',
      type: 'strength',
      muscle: 'back',
      equipment: 'cable',
      difficulty: 'beginner',
      instructions: 'Sit at lat pulldown machine, grip bar wider than shoulder-width. Pull bar down to upper chest while keeping torso stationary. Slowly return to start position.',
    },
    {
      name: 'Plank',
      type: 'strength',
      muscle: 'abdominals',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Hold a push-up position with forearms on the ground, elbows under shoulders. Keep your body in a straight line from head to heels. Engage your core and hold for desired time.',
    },
    {
      name: 'Bicycle Crunches',
      type: 'strength',
      muscle: 'abdominals',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Lie on your back with hands behind head. Bring opposite elbow to opposite knee while extending the other leg. Alternate sides in a cycling motion, keeping core engaged throughout.',
    },
    {
      name: 'Russian Twists',
      type: 'strength',
      muscle: 'abdominals',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Sit on floor with knees bent and feet lifted. Lean back slightly, keeping back straight. Rotate torso from side to side, touching the floor beside you with each twist.',
    },
    {
      name: 'Shoulder Press',
      type: 'strength',
      muscle: 'shoulders',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand or sit with dumbbells at shoulder height, palms forward. Press weights overhead until arms are extended. Lower back to shoulders with control.',
    },
    {
      name: 'Lateral Raises',
      type: 'strength',
      muscle: 'shoulders',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand with dumbbells at sides. Raise arms out to sides until parallel to floor, leading with elbows. Keep a slight bend in elbows throughout. Lower with control.',
    },
    {
      name: 'Front Raises',
      type: 'strength',
      muscle: 'shoulders',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand with dumbbells in front of thighs. Raise one arm forward and up to shoulder level. Lower slowly and alternate arms. Keep core tight and avoid swinging.',
    },
    {
      name: 'Bicep Curls',
      type: 'strength',
      muscle: 'biceps',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand with dumbbells at sides, palms forward. Curl weights up toward shoulders, keeping elbows stationary. Squeeze biceps at top, then lower slowly.',
    },
    {
      name: 'Hammer Curls',
      type: 'strength',
      muscle: 'biceps',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand with dumbbells at sides, palms facing each other. Curl weights up while maintaining neutral grip. Lower with control.',
    },
    {
      name: 'Tricep Dips',
      type: 'strength',
      muscle: 'triceps',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Position hands shoulder-width on bench or parallel bars. Lower body by bending elbows until upper arms are parallel to floor. Press back up to starting position.',
    },
    {
      name: 'Overhead Tricep Extension',
      type: 'strength',
      muscle: 'triceps',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Hold dumbbell overhead with both hands. Lower weight behind head by bending elbows. Extend arms back to starting position, keeping upper arms stationary.',
    },
    {
      name: 'Lunges',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Step forward with one leg, lowering your hips until both knees are bent at 90-degree angles. Front knee should be over ankle, not pushed out past toes. Push back to starting position and repeat on other leg.',
    },
    {
      name: 'Deadlift',
      type: 'strength',
      muscle: 'back',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Stand with feet hip-width apart, barbell over feet. Bend at hips and knees to grip bar. Keeping back straight, drive through heels to stand, lifting bar. Lower with control.',
    },
    {
      name: 'Jumping Jacks',
      type: 'cardio',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Start standing with feet together and arms at sides. Jump while spreading legs shoulder-width apart and raising arms overhead. Jump back to starting position and repeat continuously.',
    },
    {
      name: 'Mountain Climbers',
      type: 'cardio',
      muscle: 'abdominals',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Start in a plank position with arms extended. Alternately bring knees toward chest in a running motion. Maintain plank position with hips level throughout the movement.',
    },
    {
      name: 'Burpees',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'From standing, squat down and place hands on floor. Jump feet back to plank position. Perform a push-up, jump feet back to hands, then explosively jump up with arms overhead.',
    },
    {
      name: 'High Knees',
      type: 'cardio',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Run in place, bringing knees up to hip level with each step. Pump arms in running motion. Maintain quick pace and stay on balls of feet.',
    },
  ];
};
