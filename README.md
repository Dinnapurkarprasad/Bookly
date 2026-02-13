# Bookly : Smart Bookmark App

Bookly is a secure and modern realtime bookmark manager that allows users to sign in using Google and manage their personal bookmarks effortlessly.
The application features a clean, responsive, and animated UI designed for a smooth user experience.

Live Demo: https://bookly-orcin-six.vercel.app/

With Bookly, users can:
- Sign in securely using Google OAuth
- Add bookmarks (title + URL)
- View their private bookmarks
- Delete their own bookmarks
- Experience realtime updates without refreshing the page

Each user’s data is completely private and protected using database-level security policies.

---

## 🚀 Tech Stack

### Frontend
- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion (for animations and smooth transitions)
- Sonner (for toast notifications)

The UI is fully responsive and designed with a modern layout using Tailwind CSS.  
Framer Motion is used to enhance user interactions with smooth animations.

### Backend
- Supabase
  - PostgreSQL Database
  - Supabase Auth (Google OAuth Provider)
  - Supabase Realtime
  - Row Level Security (RLS)
    
 
## 📚 What I Learned

- Setting up and configuring Supabase from scratch
- Integrating Google OAuth with Supabase Auth
- Creating tables in PostgreSQL
- Writing Row Level Security (RLS) policies to ensure private user data
- Implementing realtime database subscriptions
- Structuring a full-stack application using Next.js App Router
- Designing a clean and responsive UI with Tailwind CSS and Framer Motion

This project strengthened my understanding of building secure, realtime full-stack applications using modern tools.

## 🧠 Challenges & Exploration

Since this was my first time working with Supabase, I explored the documentation thoroughly to understand authentication flow, session management, and database policies.

A key learning experience was understanding how Row Level Security works at the database level and how it ensures true backend protection beyond frontend validation.

Rather than facing major blockers, this project became an opportunity to explore a new backend ecosystem and understand how efficiently full-stack applications can be built using Next.js and Supabase together.


## 🌍 Deployment

The application is deployed on Vercel and connected to Supabase for production authentication and database services.


## ⏳ Time Taken

Completed within the 72-hour time limit.
