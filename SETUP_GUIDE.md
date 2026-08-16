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

### Step E: Configure Storage RLS Policies (CRITICAL for Image Uploads)
Just marking the bucket public is not enough. You must allow the admin panel to upload images.
1. In the **Storage** section, click on your **`product-images`** bucket.
2. Go to the **Policies** tab.
3. Under **Object policies**, click **New Policy** -> select **For full customization**.
4. Set the **Policy name** to `Allow authenticated admin uploads`.
5. Under **Allowed operations**, check **INSERT**, **UPDATE**, and **DELETE**.
6. Under **Target roles**, select **authenticated** (so only logged-in users like the admin can upload).
7. Under **Policy definition**, set the expression to `true` (or leave default if target is authenticated).
8. Click **Save Policy**.
9. (Optional) Create a second policy for **SELECT** operations, set target roles to **all**, and set the expression to `true` to ensure visitors can read files publicly.

### Step F: Create your Admin Account
1. Go to **Authentication** > **Users** > **Add User** > **Create new user**.
2. Enter your email (e.g., `admin@ostwal.in`) and a secure password. Make sure to toggle off "Auto-confirm user" or check your inbox to confirm, or confirm it manually in the Supabase Auth user list.
3. Use this email and password to log in to `http://localhost:3000/admin-hd-x92/login`.

### Step G: Configure Auth Redirect URLs (Do this after Railway setup)
Once you have your Railway URL, you must let Supabase know it is safe to redirect back to your live site:
1. In Supabase, go to **Authentication** > **URL Configuration**.
2. Set **Site URL** to your Railway domain (e.g., `https://your-app.up.railway.app`).
3. Add `https://your-app.up.railway.app/**` (with the wildcards `/**` at the end) into **Redirect URLs** and click **Add**.

---

## 3. Railway Deployment (Making the website live)

Railway is used to host your Next.js frontend on the internet.

### Step A: Sign Up & Create Project
1. Go to [railway.app](https://railway.app) and sign in using your GitHub account.
2. Click **New Project** (top right) > **Deploy from GitHub repo**.
3. Select your `annadata-scaffold` repository from the list.
4. Click **Deploy Now**. Railway will begin provisioning and building your app.

### Step B: Add Environment Variables (IMPORTANT)
Next.js needs the Supabase keys during the build process. If you don't add these, the build will fail.
1. In your Railway dashboard, click on the **annadata-scaffold** service box.
2. Go to the **Variables** tab.
3. Click **New Variable** and add the exact keys from your local `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL` = *(Your Supabase Project URL)*
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = *(Your Supabase Anon/Public Key)*
4. Click **Save**. Railway will automatically trigger a new redeployment using these variables.

### Step C: Generate Public Domain
1. In the service dashboard, go to the **Settings** tab.
2. Under the **Networking** section, look for **Public Domain**.
3. Click **Generate Domain**. Railway will instantly assign you a URL like `https://annadata-scaffold-production.up.railway.app`.
4. *(Optional)* If you want to connect a custom domain (like `annadata.in` or a subdomain like `test.ostwal.in`):
   - Click **Custom Domain**, enter your domain name.
   - Go to your DNS provider (GoDaddy, Hostinger, etc.) and add a **CNAME** record pointing to the DNS target provided by Railway.

### Step D: Monitor Build & Verify
1. Go to the **Deployments** tab in Railway.
2. Click **View Logs** on the current active deployment. You will see Next.js building:
   - `npm run build` running.
   - Route generation.
3. Once the build completes and status turns to green **Active**, click your public domain URL.
4. Try going to `https://your-app.up.railway.app/admin-hd-x92/login` and log in using the Admin credentials you created in Supabase to test product management.

