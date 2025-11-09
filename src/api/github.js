// GitHub API service
import { config, checkGitHubConfig } from "../config/environment";

const GITHUB_API_BASE = "https://api.github.com";

class GitHubAPI {
  constructor() {
    this.headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (config.githubToken) {
      this.headers["Authorization"] = `Bearer ${config.githubToken}`;
    }

    checkGitHubConfig();
  }

  async makeRequest(endpoint) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("GitHub API request failed:", error);
      throw error;
    }
  }

  async getUserProfile(username) {
    return this.makeRequest(`/users/${username}`);
  }

}

const gitHubAPI = new GitHubAPI();
export default gitHubAPI;
