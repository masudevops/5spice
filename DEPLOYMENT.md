# Deployment Guide for Five Spice

 This guide covers deploying the "Five Spice" application to Vercel, Azure, and AWS.

## 1. Vercel (Recommended for Frontend)

**Frontend (Client)**
1. Push your code to a generic Git repository (GitHub, GitLab, Bitbucket).
2. Log in to Vercel and click "Add New... > Project".
3. Import your repository.
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
5. Click **Deploy**.

**Backend (Server)**
*Note: Vercel is primarily for frontend/serverless. For a standard Express app, `vercel.json` configuration is needed to run as a serverless function, or use a dedicated backend host like Render or Railway.*

**To deploy Express on Vercel:**
1. Create a `vercel.json` in the `server` directory:
   ```json
   {
     "version": 2,
     "builds": [{ "src": "index.js", "use": "@vercel/node" }],
     "routes": [{ "src": "/(.*)", "dest": "index.js" }]
   }
   ```
2. Deploy the `server` directory as a separate Vercel project or part of the monorepo configuration.

---

## 2. Microsoft Azure

**Frontend (Azure Static Web Apps)**
1. Go to Azure Portal > **Create a resource** > **Static Web App**.
2. Select your subscription and resource group.
3. Name: `five-spice-client`.
4. Deployment details: GitHub.
5. Login to GitHub and select repo.
6. Build Details:
   - **App location**: `/client`
   - **Output location**: `dist`
7. Click **Review + create**.

**Backend (Azure App Service)**
1. Go to Azure Portal > **Create a resource** > **Web App**.
2. Select Runtime stack: **Node.js 18 LTS** (or newer).
3. Connect your GitHub repository via **Deployment Center**.
4. Configure the build to run `npm install` and start the server in the `server` directory.
   - You may need to set `Project` to `server` in the deployment settings or customize the startup command.

---

## 3. AWS Amplify

**For Fullstack (Gen 2) or Frontend Hosting:**
1. Log in to AWS Console > **AWS Amplify**.
2. Click **Create new app**.
3. Select GitHub as the source.
4. Select your repository.
5. Amplify should auto-detect the settings.
6. Edit the build settings (`amplify.yml`) to point to the `client` directory:
   ```yaml
   version: 1
   applications:
     - frontend:
         phases:
           preBuild:
             commands:
               - cd client && npm install
           build:
             commands:
               - cd client && npm run build
         artifacts:
           baseDirectory: client/dist
           files:
             - '**/*'
         cache:
           paths:
             - client/node_modules/**/*
   ```
7. Click **Save and Deploy**.

*(For the backend on AWS, Elastic Beanstalk or ECS is often used for Express apps if not using Amplify's managed backend features).*
