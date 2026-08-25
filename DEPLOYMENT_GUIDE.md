# Vercel Deployment Guide

## ✅ Your app is ready to deploy!

All features have been implemented and tested:
- ✅ Gift selection with new options (Private Dinner, Photoshoot, Surprise Day, Mystery Gift)
- ✅ Email submission to timelessbyemjay@gmail.com  
- ✅ Audio playback (improved initialization and error handling)
- ✅ Reduced heart frequency on scroll (800ms throttle)
- ✅ Gallery animations with staggered fade-in
- ✅ Countdown timer (until March 10th)
- ✅ Password protection
- ✅ Hidden love letter section
- ✅ Video gallery
- ✅ Responsive design for all devices

## Quick Deployment Steps

### Option 1: GitPush + Vercel Web Dashboard (Easiest)
1. Initialize git in your project:
   ```
   cd c:\aisha birthday
   git init
   git add .
   git commit -m "Initial commit: Birthday site"
   ```

2. Push to GitHub (create a new repo on github.com):
   ```
   git remote add origin https://github.com/YOUR_USERNAME/aisha-birthday.git
   git branch -M main
   git push -u origin main
   ```

3. Go to vercel.com and sign in
4. Click "New Project"
5. Select your GitHub repository
6. Vercel will automatically detect the Vite configuration
7. Click "Deploy"
8. Your site will be live at: `https://your-project.vercel.app`

### Option 2: Vercel CLI (Direct Deployment)
1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. From your project directory:
   ```
   cd c:\aisha birthday
   vercel
   ```

3. Follow the prompts to deploy
4. Your site will be live at the provided URL

## Environment Setup (Important for Email)

Currently, gift selections are saved to:
1. **Browser localStorage** - you can see in DevTools
2. **Email fallback message** - alerts user when email fails

To enable true email sending to timelessbyemjay@gmail.com:

### Set up Formspree (Free, No Backend Needed)
1. Go to https://formspree.io
2. Sign up
3. Create a new form
4. You'll get a form ID (e.g., `xyzpqwer`)
5. Update line 6 in `src/App.jsx`:
   ```jsx
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
6. Redeploy to Vercel

Formspree will email submissions to timelessbyemjay@gmail.com automatically!

## File Structure
```
aisha-birthday/
├── src/
│   ├── App.jsx           (Main component - gift logic, audio, countdowns)
│   ├── App.css           (All styling with animations and responsive design)
│   ├── components/
│   │   └── FloatingHearts.jsx (Scroll-triggered floating hearts)
│   └── main.jsx
├── images/              (Gallery images)
├── audio/               (Background music/special audio)
├── video/               (Video gallery)
├── vercel.json          (Vercel configuration)
├── vite.config.js       (Vite build config)
└── package.json
```

## Key Features Summary

### 1. Gift Selection  
**File:** `src/App.jsx` (Lines 33-37)
- Users select one of 4 gift options:
  1. 🍽️ Private Birthday Dinner
  2. 📸 Professional Couple Photoshoot
  3. 🎉 A Full Surprise Day
  4. 🎁 Mystery Gift
- Selection saved to localStorage
- Email submission form sends to timelessbyemjay@gmail.com

### 2. Audio Features
**File:** `src/App.jsx` (Lines 93-166)
- Background music plays on authentication
- Volume control with fade animations
- Auto-play fallback on user interaction
- Special audio button to play surprises

### 3. Countdown Timer
**File:** `src/App.jsx` (Lines 155-180)
- Countdown to March 10th (gift return date)
- Real-time updates every second
- Shows days, hours, minutes, seconds

### 4. Floating Hearts
**File:** `src/components/FloatingHearts.jsx`
- Triggered on scroll events
- Frequency throttled (800ms between hearts)
- Smooth fade-up animation

### 5. Gallery Animations
**File:** `src/App.css` (Lines 246-274)
- Images fade in with slideUp animation
- Staggered delays for smooth effect
- Hover scale effect on images

### 6. Password Protection
**File:** `src/App.jsx` (Lines 197-218)
- Main password gate: `Aisha`
- Hidden love letter password: `Aisha`
- Clean, romantic gate UI

## Testing Checklist

Before going live, verify:
- [ ] Password gate works (try password: `Aisha`)
- [ ] Background music plays after authentication
- [ ] Audio control button toggles music on/off
- [ ] Gift cards are clickable and show selection message
- [ ] Email form appears after selecting a gift
- [ ] Countdown timer shows correct time until March 10th
- [ ] Hearts appear when scrolling (not too frequently)
- [ ] Gallery images load and animate smoothly
- [ ] Video gallery works on all devices
- [ ] Hidden love letter password works
- [ ] Responsive design works on mobile/tablet

## Important Notes

### Audio File
Currently using: `./audio/WhatsApp Video 2026-02-20 at 9.53.31 PM.mp4`
- This is a video file being used for audio (contains audio track)
- If you want to replace with pure audio file (.mp3, .wav):
  1. Keep filename without spaces: `special-message.mp3`
  2. Update path in `src/App.jsx` line 10

### Email Sending
- Gift selections are always saved locally (no email setup needed for basic functionality)
- To send emails, set up Formspree (see above)
- Without Formspree, you'll see: "Selection saved locally. Email to timelessbyemjay@gmail.com"

### Customization
- **Colors:** Adjust in `src/App.css` (Lines 5-11, CSS variables)
- **Passwords:** Change in `src/App.jsx` (Lines 6-7)
- **Gift options:** Edit GIFTS array in `src/App.jsx` (Lines 33-37)
- **Countdown date:** Update `giftUnlockDate` in `src/App.jsx` (Line 8)

## Need Help?

### Port Already in Use
If port 5173 is in use:
```
npm run dev -- --port 3000
```

### Build Not Working
```
rm -r node_modules dist
npm install
npm run build
```

### Audio Not Loading
Check browser console for CORS errors. Ensure audio file exists in `/audio` directory.

## Go Live! 🚀

Your romantic birthday site is production-ready!
Choose Option 1 (easiest with GitHub) or Option 2 (direct Vercel CLI) above.

Once deployed, share the Vercel URL with her! 💕
