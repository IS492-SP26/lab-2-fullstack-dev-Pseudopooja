# Supabase Integration Guide

## Setup Instructions

### 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com) and sign up/login
- Click "New Project" and fill in the project details
- Wait for the project to be created

### 2. Get Your Credentials
- In your Supabase dashboard, go to **Settings > API**
- Copy:
  - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Update `.env.local`
Replace the placeholder values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create the Feedback Table

In Supabase SQL Editor, run this query:

```sql
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (public access)
CREATE POLICY "Allow public inserts" 
  ON feedback 
  FOR INSERT 
  WITH CHECK (TRUE);

-- Allow reading feedback (optional - for your dashboard)
CREATE POLICY "Allow public read" 
  ON feedback 
  FOR SELECT 
  WITH CHECK (TRUE);
```

### 5. Test the Integration
- Run your dev server: `npm run dev`
- Visit your portfolio
- Scroll 30% down or wait 20 seconds
- Click the "Feedback" button
- Submit feedback and check your Supabase database

### API Endpoint
The form submits to: **POST `/api/feedback`**

This endpoint:
- Validates required fields
- Converts "Anonymous" users to "Anonymous" in the name field
- Inserts data into Supabase
- Returns success/error response

## Troubleshooting

**Issue: "Missing Supabase environment variables"**
- Make sure `.env.local` is in the root directory
- Verify the keys are correctly copied
- Restart your dev server after updating `.env.local`

**Issue: "Failed to submit feedback"**
- Check that the `feedback` table exists in Supabase
- Verify RLS policies allow public inserts
- Check browser console for error details

**Issue: Keys appear in console logs**
- These are safe - they only have `public/anon` permissions (read/insert only)
- Never commit `.env.local` to git (already in `.gitignore`)
