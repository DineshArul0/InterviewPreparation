# Interactive Interview Prep Platform

This is a simple, client-side web application designed to help users prepare for technical interviews. It dynamically loads questions from JSON files and provides an interactive interface for studying.

## Features

-   **Dynamic Topic Loading:** Topics are loaded from a central `topics.json` manifest.
-   **Multi-Part JSON:** Each topic's questions are split into smaller, manageable JSON files for faster loading.
-   **Client-Side Search:** Filter questions within a topic in real-time.
-   **Pagination:** Navigate through questions with clean pagination controls.
-   **Customizable Page Size:** Choose how many questions to display per page.
-   **Dark/Light Mode:** Toggle between themes for comfortable viewing.
-   **Responsive Design:** Works on various screen sizes.

## Local Development

The application is purely client-side (HTML, CSS, JavaScript). However, due to browser security policies (CORS), you cannot simply open the `index.html` file directly from your local file system.

To run the application locally, use the included batch script:

1.  **Run the server:**
    ```bash
    start_app.bat
    ```
2.  **Open in browser:** The script will automatically open the application in your default browser at `http://localhost:8000`.

This script starts a simple Python HTTP server to serve the files, which resolves the CORS issues.

## Deployment to GitHub Pages

This application is fully compatible with GitHub Pages. Here’s how to deploy it:

### Step 1: Prepare Your Repository

1.  **Create a GitHub Repository:** If you haven't already, create a new public repository on GitHub.
2.  **Push Your Code:** Push the entire `InterviewPrep_App` directory contents to your new repository. Your repository's root should contain `index.html`, `css/`, `js/`, `data/`, etc.

    *Note: You can either make the `InterviewPrep_App` folder the root of your repository or keep it as a subfolder.*

### Step 2: Configure GitHub Pages

1.  **Go to Settings:** In your GitHub repository, go to the "Settings" tab.
2.  **Select Pages:** In the left sidebar, click on "Pages".
3.  **Choose a Source:**
    *   Under "Build and deployment", for the "Source" option, select **"Deploy from a branch"**.
    *   **Branch:** Select the branch you want to deploy from (e.g., `main` or `master`).
    *   **Folder:**
        *   If you pushed the app contents to the **root** of your repository, select **`/ (root)`**.
        *   If you pushed the `InterviewPrep_App` folder itself, select **`/InterviewPrep_App`**.
4.  **Save:** Click "Save".

### Step 3: Access Your Site

-   GitHub will build your site and provide you with a URL (e.g., `https://<your-username>.github.io/<your-repo-name>/`).
-   It may take a few minutes for the site to become live. You can track the deployment progress under the "Actions" tab in your repository.

That's it! Your Interactive Interview Prep platform is now live on GitHub Pages.
