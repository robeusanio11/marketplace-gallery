# Deployment Guide

This guide walks you through deploying this marketplace app from scratch. No coding experience required. Set aside about 30–45 minutes.

---

## What you'll set up

- **Supabase** — the database and file storage where product listings and images are stored
- **Vercel** — the hosting platform that runs the website
- **GitHub** — connects your code to Vercel so the site updates automatically

---

## Step 1: Customize your site info

Before deploying, update the site's name, contact details, and social links.

Open the file `lib/config.ts` in the code editor and fill in your real information:

```ts
export const siteConfig = {
  companyName: "Your Company Name",
  tagline: "Quality items at great prices.",
  description: "Browse our latest listings and find something you love.",

  contact: {
    phone: "(555) 123-4567",
    email: "contact@example.com",
    location: "City, State",
  },

  social: {
    facebook: "https://facebook.com/yourpage",
  },
};
```

Save the file. This controls what appears on the homepage and contact page.

---

## Step 2: Set up Supabase

Supabase is the database. It stores all your product listings and images.

### 2a. Create an account and project

1. Go to [supabase.com](https://supabase.com) and click **Start your project**
2. Sign in with GitHub or create an account
3. Click **New project**
4. Fill in:
   - **Name**: anything you want (e.g. `marketplace`)
   - **Database Password**: create a strong password and save it somewhere safe
   - **Region**: pick the one closest to you
5. Click **Create new project** and wait ~2 minutes for it to spin up

### 2b. Create the database table

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open the file `supabase-setup.sql` from this repo and copy its entire contents
4. Paste it into the SQL editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned." — that's correct

### 2c. Create the image storage bucket

1. Click **Storage** in the left sidebar
2. Click **New bucket**
3. Name it exactly: `product-images` (spelling matters)
4. Check the box for **Public bucket**
5. Click **Save**

### 2d. Copy your API keys

1. Click **Project Settings** (gear icon) in the left sidebar
2. Click **API**
3. You'll see two values you need — keep this tab open:
   - **Project URL** (looks like `https://xxxxxxxxxxxx.supabase.co`)
   - **anon / public** key (a long string of characters)

---

## Step 3: Get a Web3Forms key (for the contact form)

The contact form uses Web3Forms to send emails.

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email address and click **Create Access Key**
3. Check your email and copy the access key they send you

---

## Step 4: Push the code to GitHub

Vercel deploys from GitHub. If the code isn't on GitHub yet:

1. Go to [github.com](https://github.com) and create a free account if you don't have one
2. Click the **+** icon → **New repository**
3. Name it (e.g. `marketplace`), set it to **Private**, click **Create repository**
4. Follow GitHub's instructions to push your existing code ("push an existing repository")

If someone else is handing this off to you with the code already on GitHub, skip this step.

---

## Step 5: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and click **Sign Up**
2. Sign in with GitHub
3. Click **Add New → Project**
4. Find your repository in the list and click **Import**
5. Vercel will auto-detect that it's a Next.js app — leave all settings as-is
6. **Before clicking Deploy**, click **Environment Variables** and add these three:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | The Project URL from Step 2d |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The anon/public key from Step 2d |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | The access key from Step 3 |

7. Click **Deploy**
8. Wait 1–2 minutes. When it says "Congratulations!", your site is live.
9. Click the preview link to see your site

---

## Step 6: Create your admin login

The admin area (where you manage listings) requires a login. You need to create one user account in Supabase.

1. Go back to your Supabase project
2. Click **Authentication** in the left sidebar
3. Click **Users**
4. Click **Invite user** (or **Add user** → **Create new user**)
5. Enter your email and a strong password
6. Click **Create user**

That's your login. Go to `yoursite.vercel.app/login` to access the admin panel.

---

## You're done

Your site is now live. Here's a summary of what each part does:

| URL | What it is |
|-----|------------|
| `yoursite.vercel.app` | The public homepage |
| `yoursite.vercel.app/products` | The product listings page |
| `yoursite.vercel.app/login` | Admin login |
| `yoursite.vercel.app/admin` | Manage all listings |

---

## Making changes to the site

Anytime you push code changes to GitHub, Vercel will automatically rebuild and redeploy the site within a couple of minutes. You don't need to do anything else.

---

## Troubleshooting

**The site loads but products don't appear**
- Double-check that the environment variables in Vercel exactly match the values from Supabase (no extra spaces)
- Go to Vercel → your project → Settings → Environment Variables and verify

**Images aren't uploading**
- Make sure the `product-images` bucket in Supabase is set to **Public**
- Make sure you ran the full `supabase-setup.sql` script (the storage policies are at the bottom)

**Can't log in to admin**
- Make sure you created a user in Supabase → Authentication → Users
- The login page is at `/login`, not `/admin`

**Contact form isn't sending**
- Verify the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable is set correctly in Vercel
- Check your spam folder for the test email
