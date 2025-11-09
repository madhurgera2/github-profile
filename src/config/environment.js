// Environment configuration
export const config = {
  githubToken: process.env.REACT_APP_GITHUB_PAT,
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
};

// Check if GitHub token is available
export const hasGitHubToken = () => {
  return Boolean(
    config.githubToken &&
      config.githubToken !== "your_github_personal_access_token_here"
  );
};

// Display warning if token is missing
export const checkGitHubConfig = () => {
  if (!hasGitHubToken()) {
    console.warn(
      "⚠️ GitHub Personal Access Token not configured.\n" +
        "Some features may be limited due to rate limiting.\n" +
        "Please add REACT_APP_GITHUB_PAT to your .env file.\n" +
        "Get your token from: https://github.com/settings/tokens"
    );
    return false;
  }
  return true;
};
