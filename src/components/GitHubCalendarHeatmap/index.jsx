import React, { useState, useEffect, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import ContributionsAPI from "../../api/contributions";

const GitHubCalendarHeatmap = () => {
  const [selectedYear, setSelectedYear] = useState("last");
  const [contributionsData, setContributionsData] = useState(null);
  const username = window.location.pathname.split("/").pop();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  const currentYear = new Date().getFullYear();
  const availableYears = [
    { value: "last", label: "Last 12 months" },
    ...Array.from({ length: 5 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    }),
  ];

  const data = contributionsData
    ? ContributionsAPI.transformContributionsData(contributionsData)
    : [];

  // --- API Integration ---
  const fetchContributions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ContributionsAPI.getContributions(
        username,
        selectedYear
      );
      setContributionsData(data);
      setStats(ContributionsAPI.getContributionStats(data));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching contributions:", err);
    } finally {
      setLoading(false);
    }
  }, [username, selectedYear]);

  // Handle year selection change
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  const minRange = selectedYear === "last"
    ? Date.now() - 365 * 24 * 60 * 60 * 1000
    : new Date(selectedYear, 0, 1).getTime();
  const maxRange = selectedYear === "last"
    ? Date.now()
    : new Date(selectedYear, 11, 31).getTime();
  const calendarRange = [minRange, maxRange];

  const getOption = () => {
    return {
      title: {
        top: 30,
        left: "center",
        text: `${stats.total || 0} contributions in ${
          selectedYear === "last" ? "the last year" : selectedYear
        }`,
        textStyle: {
          color: "#f0f6fc",
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: {
        padding: 10,
        backgroundColor: "#161b22",
        borderColor: "#30363d",
        borderWidth: 1,
        textStyle: {
          color: "#f0f6fc",
        },
        formatter: function (params) {
          const value = params.value;
          const count = value[1];
          const date = new Date(value[0]).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return `<strong>${count} contribution${
            count !== 1 ? "s" : ""
          }</strong><br/>${date}`;
        },
      },
      legend: {
        top: "bottom",
        left: "center",
        data: ["Contributions"],
        show: false,
      },
      calendar: {
        top: 100,
        left: "center",
        orient: "horizontal",
        range: calendarRange,
        cellSize: 15,
        dayLabel: {
          nameMap: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          firstDay: 0,
          color: "#8b949e",
        },
        monthLabel: {
          nameMap: "EN",
          fontSize: 12,
          color: "#f0f6fc", // Primary text color for month labels
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: "#21262d", // Dark border for the cells
        },
        splitLine: {
          show: false,
        },
      },
      visualMap: {
        min: 0,
        max: Math.max(stats.max || 10, 10),
        calculable: true,
        inRange: {
          color: [
            "#161b22", // Level 0: Dark background
            "#0e4429", // Level 1: Dark green
            "#006d32", // Level 2: Medium green
            "#26a641", // Level 3: Bright green
            "#39d353", // Level 4: Brightest green
          ],
        },
        text: ["More", "Less"],
        textStyle: {
          color: "#f0f6fc", // Light text for dark theme
        },
        show: false,
      },
      series: {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: data,
      },
    };
  };

  if (loading) {
    return (
      <div className="bg-primary p-6 rounded-lg border border-default">
        <div className="animate-pulse">
          <div className="h-6 bg-secondary rounded mb-4 w-1/3"></div>
          <div className="h-32 bg-secondary rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary p-6 rounded-lg border border-default">
        <div className="text-center">
          <div className="text-danger mb-2">⚠️ Error loading contributions</div>
          <p className="text-secondary text-sm mb-3">{error}</p>
          <button
            onClick={fetchContributions}
            className="btn-secondary text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary rounded-lg border border-default p-6">
      {/* Header with Year Selector */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary">
          Contribution Activity
        </h3>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="input-default text-sm pr-8 appearance-none cursor-pointer"
          >
            {availableYears.map((yearOption) => (
              <option key={yearOption.value} value={yearOption.value}>
                {yearOption.label}
              </option>
            ))}
          </select>
          <svg
            className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      
      <div style={{ height: "300px" }}>
        <ReactECharts
          option={getOption()}
        //   style={{ height: "100%", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </div>
  );
};

export default GitHubCalendarHeatmap;
