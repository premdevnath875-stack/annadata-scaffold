# Annadata Website — Setup & Deployment Guide

This guide explains how to run the Annadata website locally on your machine, and how to set up the necessary backend services (Supabase) and hosting platform (Railway).

## 1. Local Setup (Run on your computer)

To test and run the website locally, follow these steps:

1. Open your terminal or VS Code and navigate to the project folder:
   ```bash
   cd d:\Ostwal\Ostwal\annadata-scaffold
   ```
2. Install the required Node.js dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:3000`. You will see the Annadata website!

---

## 2. Supabase Setup (Database & Authentication)

Supabase handles the Database (PostgreSQL), Admin Login (Auth), and Image Uploads (Storage).

### Step A: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account/sign in.
2. Click **New Project**, give it a name (e.g., `annadata-db`), set a strong database password, and choose a region close to India (like Mumbai or Singapore).
3. Wait for the project to finish setting up (takes a few minutes).

### Step B: Get your Environment Variables
1. In your Supabase dashboard, go to **Project Settings** (gear icon) > **API**.
2. Copy the **Project URL** and the **anon `public` API key**.
3. In your local `annadata-scaffold` folder, create a new file named `.env.local` and add these keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### Step C: Setup Database Tables
1. In the Supabase dashboard, go to the **SQL Editor** (from the left menu).
2. Click **New Query**.
3. Copy the entire SQL code from `SECTION 5` and `SECTION 5A` of your Master Prompt. Paste it here and click **Run**.
   *(This will create all the tables, seed the 37 products, and set up Row Level Security).*

### Step D: Setup Storage for Images
1. Go to **Storage** in the left menu.
2. Create a new bucket named **`product-images`**.
3. Mark the bucket as **Public** so website visitors can see the images.

### Step E: Create your Admin Account
1. Go to **Authentication** > **Users** > **Add User** > **Create new user**.
2. Enter your email (e.g., `admin@ostwal.in`) and a secure password.
3. Use this email and password to log in to `http://localhost:3000/admin-hd-x92/login`.

---

## 3. Railway Deployment (Making the website live)

Railway is used to host your Next.js frontend on the internet.

1. **Push to GitHub**: First, upload this `annadata-scaffold` folder to a GitHub repository.
2. **Create Railway Account**: Go to [railway.app](https://railway.app) and sign in with GitHub.
3. **Deploy Project**:
   - Click **New Project** > **Deploy from GitHub repo**.
   - Select your Annadata repository.
4. **Add Environment Variables**:
   - Once the service is created, click on it, go to the **Variables** tab.
   - Add the exact same variables you put in your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Generate Domain**:
   - Go to the **Settings** tab in Railway.
   - Under **Networking**, click **Generate Domain** to get a free `.up.railway.app` URL, or connect your custom domain (like `ostwal.in`).

Once Railway finishes building, your website will be live globally!
