// GitHub Contributions API service
const CONTRIBUTIONS_API_BASE =
  "https://github-contributions-api.jogruber.de/v4";

class ContributionsAPI {
 
  async getContributions(username, year = "last") {
    try {
      const url = `${CONTRIBUTIONS_API_BASE}/${username}?y=${year}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Contributions API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch contributions:", error);
      throw error;
    }
  }

  transformContributionsData(contributionsData) {
    if (!contributionsData || !contributionsData.contributions) {
      return [];
    }

    return contributionsData.contributions.map((contribution) => [
      contribution.date,
      contribution.count,
    ]);
  }

  getContributionStats(contributionsData) {
    if (!contributionsData || !contributionsData.contributions) {
      return {
        total: 0,
        max: 0,
        average: 0,
        activeDays: 0,
      };
    }

    const contributions = contributionsData.contributions;
    const counts = contributions.map((c) => c.count);
    const total = counts.reduce((sum, count) => sum + count, 0);
    const activeDays = contributions.filter((c) => c.count > 0).length;
    const max = Math.max(...counts);
    const average = Math.round((total / contributions.length) * 10) / 10;

    return {
      total,
      max,
      average,
      activeDays,
      totalDays: contributions.length,
    };
  }
}

const contributionsAPI = new ContributionsAPI();
export default contributionsAPI;
