/**
 * GitHub integration utilities for charts
 * Extracted from CommitsCounter component
 */

import type { GitHubCommit } from "@utils/content/types";

/** Maximum pages to fetch to prevent infinite loops */
const MAX_PAGES = 100;

/** Result of fetching commits with metadata about success/failure */
export interface FetchCommitsResult {
  commits: GitHubCommit[];
  success: boolean;
  error?: string;
  rateLimited?: boolean;
}

/** Sparkline chart configuration options */
export interface SparklineOptions {
  smooth?: boolean;
  lineWidth?: number;
  fill?: boolean;
}

/** ECharts tooltip parameter type */
interface TooltipParam {
  dataIndex: number;
  value: number;
}

/**
 * Validate GitHub repository identifier (username or repo name).
 * GitHub names: alphanumeric, hyphens, max 39 chars for users, 100 for repos.
 */
function isValidGitHubName(name: string): boolean {
  if (!name || typeof name !== "string") {
    return false;
  }
  // GitHub allows alphanumeric and hyphens, cannot start or end with hyphen
  const gitHubNameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
  return gitHubNameRegex.test(name) && name.length <= 100;
}

/**
 * GitHub API utilities
 */
export const githubApi = {
  /**
   * Fetch all commits from a GitHub repository with pagination.
   *
   * @param username - GitHub username/owner
   * @param repoName - Repository name
   * @returns FetchCommitsResult with commits array and status metadata
   */
  fetchAllCommits: async (
    username: string,
    repoName: string
  ): Promise<FetchCommitsResult> => {
    // Input validation
    if (!isValidGitHubName(username)) {
      return {
        commits: [],
        success: false,
        error: `Invalid GitHub username: "${username}"`,
      };
    }
    if (!isValidGitHubName(repoName)) {
      return {
        commits: [],
        success: false,
        error: `Invalid repository name: "${repoName}"`,
      };
    }

    const allCommits: GitHubCommit[] = [];
    let page = 1;
    let rateLimited = false;

    while (page <= MAX_PAGES) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/commits?page=${page}&per_page=100`
        );

        // Handle rate limiting
        if (response.status === 403) {
          rateLimited = true;
          console.warn("GitHub API rate limit reached");
          break;
        }

        if (!response.ok) {
          return {
            commits: allCommits,
            success: false,
            error: `GitHub API error: ${response.status} ${response.statusText}`,
          };
        }

        const commits: GitHubCommit[] = await response.json();

        if (commits.length === 0) {
          break;
        }

        allCommits.push(...commits);
        page++;

        // If we got less than 100 commits, we've reached the end
        if (commits.length < 100) {
          break;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Error fetching GitHub commit data:", error);
        return {
          commits: allCommits,
          success: false,
          error: errorMessage,
        };
      }
    }

    if (page > MAX_PAGES) {
      console.warn(
        `Reached maximum page limit (${MAX_PAGES}) while fetching commits`
      );
    }

    return {
      commits: allCommits,
      success: true,
      rateLimited,
    };
  },
};

/**
 * Commit data processing utilities
 */
export const commitProcessor = {
  /**
   * Process commits into daily contribution counts.
   * Returns an array where index 0 is the oldest day and the last index is today.
   *
   * @param commits - Array of GitHub commits
   * @param daysToFetch - Number of days to include in the output
   * @returns Array of contribution counts per day
   */
  processContributions: (
    commits: GitHubCommit[],
    daysToFetch: number = 30
  ): number[] => {
    // Validate input
    const validDays = Math.max(1, Math.floor(daysToFetch));

    if (!Array.isArray(commits) || commits.length === 0) {
      return Array(validDays).fill(0);
    }

    const contributionsMap: Record<string, number> = {};
    const today = new Date();
    const cutoffDate = new Date(
      today.getTime() - validDays * 24 * 60 * 60 * 1000
    );

    // Count commits per day
    for (const commit of commits) {
      const dateStr = commit?.commit?.author?.date;
      if (!dateStr) {
        continue;
      }

      const commitDate = new Date(dateStr);
      if (commitDate >= cutoffDate && commitDate <= today) {
        const dateString = commitDate.toISOString().split("T")[0];
        contributionsMap[dateString] = (contributionsMap[dateString] || 0) + 1;
      }
    }

    // Build output array (index 0 = oldest day, last index = today)
    const contributions = Array(validDays).fill(0);
    for (let i = 0; i < validDays; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().split("T")[0];
      contributions[validDays - 1 - i] = contributionsMap[dateString] || 0;
    }

    return contributions;
  },

  /**
   * Calculate total contributions from daily counts.
   *
   * @param contributions - Array of daily contribution counts
   * @returns Total number of contributions
   */
  getTotalContributions: (contributions: number[]): number => {
    if (!Array.isArray(contributions)) {
      return 0;
    }
    return contributions.reduce((sum, value) => sum + (value || 0), 0);
  },
};

/** ECharts series configuration type */
interface EChartsSeries {
  type: string;
  data: number[];
  showSymbol: boolean;
  smooth: boolean;
  lineStyle: {
    width: number;
    color: {
      type: string;
      x: number;
      y: number;
      x2: number;
      y2: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  areaStyle?:
    | {
        color: {
          type: string;
          x: number;
          y: number;
          x2: number;
          y2: number;
          colorStops: Array<{ offset: number; color: string }>;
        };
      }
    | undefined;
}

/** ECharts options type for sparkline */
export interface EChartsSparklineOptions {
  grid: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  xAxis: {
    type: string;
    show: boolean;
    boundaryGap: boolean;
    data: number[];
  };
  yAxis: {
    type: string;
    show: boolean;
  };
  tooltip: {
    trigger: string;
    axisPointer: {
      type: string;
      label: {
        backgroundColor: string;
      };
    };
    formatter: (params: TooltipParam[]) => string;
  };
  series: EChartsSeries[];
}

/**
 * Chart options generator for commit sparklines.
 */
export const chartOptions = {
  /**
   * Generate ECharts options for commit sparkline.
   *
   * @param contributions - Array of daily contribution counts
   * @param isDark - Whether to use dark theme colors
   * @param options - Sparkline styling options
   * @returns ECharts configuration object
   */
  generateSparklineOptions: (
    contributions: number[],
    isDark: boolean = false,
    options: SparklineOptions = {}
  ): EChartsSparklineOptions => {
    const { smooth = true, lineWidth = 2, fill = true } = options;

    const gradientColors = isDark
      ? ["#4A148C", "#6A1B9A", "#8E24AA"]
      : ["#1565C0", "#1976D2", "#2196F3"];

    const colorStopCount = Math.max(1, gradientColors.length - 1);

    return {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      xAxis: {
        type: "category",
        show: false,
        boundaryGap: false,
        data: Array.from({ length: contributions.length }, (_, i) => i),
      },
      yAxis: {
        type: "value",
        show: false,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
        formatter: (params: TooltipParam[]): string => {
          if (!Array.isArray(params) || params.length === 0) {
            return "";
          }
          const dataIndex = params[0].dataIndex;
          const date = new Date();
          date.setDate(date.getDate() - (contributions.length - 1 - dataIndex));
          return `${date.toLocaleDateString()}: ${params[0].value} commits`;
        },
      },
      series: [
        {
          type: "line",
          data: contributions,
          showSymbol: false,
          smooth,
          lineStyle: {
            width: lineWidth,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: gradientColors.map((color, index) => ({
                offset: index / colorStopCount,
                color: color,
              })),
            },
          },
          areaStyle: fill
            ? {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: gradientColors[0] + "80",
                    },
                    {
                      offset: 1,
                      color: gradientColors[gradientColors.length - 1] + "20",
                    },
                  ],
                },
              }
            : undefined,
        },
      ],
    };
  },
}; 