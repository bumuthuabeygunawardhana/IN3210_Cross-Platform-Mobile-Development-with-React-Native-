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
      instructions: 'Start in a plank position with hands placed shoulder-width apart on the floor. Your body should form a straight line from head to heels. Engage your core muscles and keep your glutes tight.\n\nLower your body in a controlled manner until your chest nearly touches the floor. Keep your elbows at about a 45-degree angle to your body. Maintain the straight body line throughout the movement.\n\nPush yourself back up to the starting position by extending your arms. Focus on using your chest and tricep muscles. Exhale as you push up. Keep your neck neutral by looking at a spot on the floor about a foot in front of you.\n\nCommon mistakes to avoid: letting hips sag, flaring elbows too wide, or not going low enough. Start with knee push-ups if needed to build strength.',
      image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80',
    },
    {
      name: 'Bench Press',
      type: 'strength',
      muscle: 'chest',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Lie flat on a bench with your feet firmly planted on the floor. Position yourself so your eyes are directly under the barbell. Grip the bar with hands slightly wider than shoulder-width apart, using an overhand grip.\n\nUnrack the bar and hold it directly above your chest with arms fully extended. This is your starting position. Take a deep breath and slowly lower the bar to your mid-chest, keeping your elbows at about a 45-degree angle from your body.\n\nPause briefly when the bar touches your chest, then explosively press the bar back up to the starting position. Exhale as you push. Focus on contracting your chest muscles throughout the movement.\n\nSafety tips: Always use a spotter when lifting heavy weights. Keep your shoulder blades retracted and pressed into the bench. Your feet should remain flat on the floor throughout the exercise. Avoid bouncing the bar off your chest.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    },
    {
      name: 'Dumbbell Flyes',
      type: 'strength',
      muscle: 'chest',
      equipment: 'dumbbell',
      difficulty: 'intermediate',
      instructions: 'Lie on a flat bench holding a dumbbell in each hand at arm\'s length above your chest. Your palms should be facing each other, and there should be a slight bend in your elbows.\n\nSlowly lower the dumbbells out to your sides in a wide arc until you feel a deep stretch in your chest. Keep the slight bend in your elbows constant throughout the movement. The dumbbells should travel in a semicircular path.\n\nWhen you feel a good stretch at the bottom, reverse the movement and bring the dumbbells back up in the same arc-like motion, as if you\'re giving someone a big hug. Squeeze your chest muscles at the top of the movement.\n\nImportant tips: Don\'t go too heavy on this exercise as it puts stress on the shoulder joints. Focus on the stretch and squeeze rather than moving heavy weight. Keep your back flat against the bench and feet planted firmly on the ground.',
      image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80',
    },
    {
      name: 'Squats',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Stand with your feet shoulder-width apart, toes pointing slightly outward. Keep your chest up and your core engaged. Your arms can be extended forward for balance or crossed over your chest.\n\nBegin the movement by pushing your hips back as if you\'re sitting into a chair. Bend your knees and lower your body while keeping your chest up and your weight in your heels. Your knees should track in line with your toes.\n\nLower yourself until your thighs are at least parallel to the ground, or as low as your mobility allows. Your knees should not cave inward. Hold this position briefly.\n\nDrive through your heels and push your hips forward to return to the starting position. Squeeze your glutes at the top. Keep your core tight throughout the entire movement. This exercise works your quads, glutes, hamstrings, and core.',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80',
    },
    {
      name: 'Barbell Back Squat',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Position the barbell on your upper back (trapezius muscles), not on your neck. Step back from the rack and stand with your feet shoulder-width apart, toes slightly turned out. Take a deep breath and brace your core.\n\nBegin the descent by simultaneously pushing your hips back and bending your knees. Keep your chest proud and your gaze slightly upward. Your knees should track over your toes as you descend.\n\nLower your body until your thighs are at least parallel to the ground. Your hip crease should drop below your knee level. Maintain a neutral spine throughout the movement - don\'t let your lower back round.\n\nDrive powerfully through your heels and midfoot to return to standing. Push your hips forward and squeeze your glutes at the top. Exhale as you ascend. This compound movement targets quads, glutes, hamstrings, and core. Always use proper form over heavy weight.',
      image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80',
    },
    {
      name: 'Leg Press',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'machine',
      difficulty: 'beginner',
      instructions: 'Sit in the leg press machine and place your feet on the platform about shoulder-width apart. Your feet should be positioned in the middle of the platform with toes pointing slightly outward.\n\nGrasp the handles beside the seat and press the platform up until your legs are fully extended but not locked. Release the safety handles - this is your starting position. Keep your back and head pressed firmly against the padded support.\n\nSlowly lower the platform by bending your knees, bringing them toward your chest. Continue until your thighs form a 90-degree angle or slightly less. Don\'t let your lower back lift off the pad.\n\nPress through your heels and the balls of your feet to extend your legs and return to the starting position. Don\'t lock your knees at the top. Control the weight on both the up and down phases. The leg press is safer than squats for beginners but still very effective for building quad strength.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
    },
    {
      name: 'Pull-ups',
      type: 'strength',
      muscle: 'back',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Grip the pull-up bar with your hands slightly wider than shoulder-width apart, using an overhand grip (palms facing away from you). Hang with your arms fully extended and your feet off the ground. Cross your ankles if desired.\n\nEngage your core and shoulder blades. Begin pulling yourself up by driving your elbows down toward your sides. Focus on using your back muscles rather than just your arms. Keep your chest up and avoid swinging.\n\nContinue pulling until your chin clears the bar. Pause briefly at the top while squeezing your shoulder blades together. This is the most challenging part of the exercise.\n\nLower yourself back down with control to the starting position. Don\'t just drop down - the eccentric (lowering) portion is crucial for building strength. Fully extend your arms at the bottom before starting the next rep. If you can\'t do a full pull-up yet, use resistance bands or an assisted pull-up machine to build strength.',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
    },
    {
      name: 'Bent Over Row',
      type: 'strength',
      muscle: 'back',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Stand holding a barbell with an overhand grip, hands slightly wider than shoulder-width. Bend at your hips and knees, lowering your torso until it\'s almost parallel to the floor. Let the bar hang at arm\'s length with your arms perpendicular to your torso.\n\nKeep your back naturally arched and your core braced. Your head should be in line with your spine. This is your starting position. Take a breath and prepare for the pull.\n\nPull the barbell up to your lower chest by driving your elbows back and squeezing your shoulder blades together. Focus on pulling with your back muscles, not just your arms. Keep your torso stationary - don\'t use momentum.\n\nPause briefly at the top, feeling the contraction in your mid-back. Then slowly lower the bar back to the starting position with control. This exercise targets the lats, rhomboids, and middle back. Maintain proper form throughout - don\'t round your back or use jerking movements.',
      image: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&q=80',
    },
    {
      name: 'Lat Pulldown',
      type: 'strength',
      muscle: 'back',
      equipment: 'cable',
      difficulty: 'beginner',
      instructions: 'Sit at lat pulldown machine, grip bar wider than shoulder-width. Pull bar down to upper chest while keeping torso stationary. Slowly return to start position.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
    },
    {
      name: 'Plank',
      type: 'strength',
      muscle: 'abdominals',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Start by getting into a push-up position. Then lower yourself down onto your forearms, with your elbows positioned directly beneath your shoulders. Your forearms should be parallel to each other.\n\nExtend your legs straight behind you with your feet together or hip-width apart. Your body should form a perfectly straight line from the top of your head to your heels. Don\'t let your hips sag or pike up.\n\nEngage your core by pulling your belly button toward your spine. Squeeze your glutes and quadriceps. Keep your neck neutral by looking at a spot on the floor about a foot in front of your hands. Breathe steadily - don\'t hold your breath.\n\nHold this position for your target time, starting with 20-30 seconds and working up to a minute or more. The plank is one of the most effective core exercises, working your abs, obliques, lower back, and even your shoulders. Focus on quality over duration - maintain perfect form rather than holding a poor position for longer.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    },
    {
      name: 'Bicycle Crunches',
      type: 'strength',
      muscle: 'abdominals',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Lie flat on your back on a mat with your legs extended. Place your hands lightly behind your head with your elbows pointing out to the sides. Lift your shoulder blades off the ground and raise your legs to a 90-degree angle at the knees.\n\nBring your right elbow toward your left knee while simultaneously straightening your right leg. Rotate your torso to really bring your elbow close to your knee. Focus on using your abs to create the twisting motion, not pulling on your neck.\n\nNow switch sides in a smooth, controlled motion - bring your left elbow to your right knee while extending your left leg. Continue alternating sides in a pedaling motion, as if you\'re riding a bicycle.\n\nKeep your core engaged throughout the entire exercise. Your shoulder blades should stay off the ground. Breathe rhythmically. This exercise effectively targets your rectus abdominis and obliques. Aim for controlled movements rather than speed - quality trumps quantity.',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80',
    },
    {
      name: 'Russian Twists',
      type: 'strength',
      muscle: 'abdominals',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Sit on floor with knees bent and feet lifted. Lean back slightly, keeping back straight. Rotate torso from side to side, touching the floor beside you with each twist.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    },
    {
      name: 'Shoulder Press',
      type: 'strength',
      muscle: 'shoulders',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand or sit with dumbbells at shoulder height, palms forward. Press weights overhead until arms are extended. Lower back to shoulders with control.',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
    },
    {
      name: 'Lateral Raises',
      type: 'strength',
      muscle: 'shoulders',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand with dumbbells at sides. Raise arms out to sides until parallel to floor, leading with elbows. Keep a slight bend in elbows throughout. Lower with control.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
    },
    {
      name: 'Front Raises',
      type: 'strength',
      muscle: 'shoulders',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand with dumbbells in front of thighs. Raise one arm forward and up to shoulder level. Lower slowly and alternate arms. Keep core tight and avoid swinging.',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    },
    {
      name: 'Bicep Curls',
      type: 'strength',
      muscle: 'biceps',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand with dumbbells at sides, palms forward. Curl weights up toward shoulders, keeping elbows stationary. Squeeze biceps at top, then lower slowly.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
    },
    {
      name: 'Hammer Curls',
      type: 'strength',
      muscle: 'biceps',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Stand with dumbbells at sides, palms facing each other. Curl weights up while maintaining neutral grip. Lower with control.',
      image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80',
    },
    {
      name: 'Tricep Dips',
      type: 'strength',
      muscle: 'triceps',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Position hands shoulder-width on bench or parallel bars. Lower body by bending elbows until upper arms are parallel to floor. Press back up to starting position.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    },
    {
      name: 'Overhead Tricep Extension',
      type: 'strength',
      muscle: 'triceps',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: 'Hold dumbbell overhead with both hands. Lower weight behind head by bending elbows. Extend arms back to starting position, keeping upper arms stationary.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    },
    {
      name: 'Lunges',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Step forward with one leg, lowering your hips until both knees are bent at 90-degree angles. Front knee should be over ankle, not pushed out past toes. Push back to starting position and repeat on other leg.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    },
    {
      name: 'Deadlift',
      type: 'strength',
      muscle: 'back',
      equipment: 'barbell',
      difficulty: 'intermediate',
      instructions: 'Stand with feet hip-width apart, barbell over feet. Bend at hips and knees to grip bar. Keeping back straight, drive through heels to stand, lifting bar. Lower with control.',
      image: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&q=80',
    },
    {
      name: 'Jumping Jacks',
      type: 'cardio',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Start standing with feet together and arms at sides. Jump while spreading legs shoulder-width apart and raising arms overhead. Jump back to starting position and repeat continuously.',
      image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80',
    },
    {
      name: 'Mountain Climbers',
      type: 'cardio',
      muscle: 'abdominals',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'Start in a plank position with arms extended. Alternately bring knees toward chest in a running motion. Maintain plank position with hips level throughout the movement.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    },
    {
      name: 'Burpees',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'intermediate',
      instructions: 'From standing, squat down and place hands on floor. Jump feet back to plank position. Perform a push-up, jump feet back to hands, then explosively jump up with arms overhead.',
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80',
    },
    {
      name: 'High Knees',
      type: 'cardio',
      muscle: 'quadriceps',
      equipment: 'body_only',
      difficulty: 'beginner',
      instructions: 'Run in place, bringing knees up to hip level with each step. Pump arms in running motion. Maintain quick pace and stay on balls of feet.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    },
  ];
};
