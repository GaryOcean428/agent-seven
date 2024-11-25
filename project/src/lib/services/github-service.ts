import { thoughtLogger } from '../logging/thought-logger';
import { AppError } from '../errors/AppError';

export class GitHubService {
  private static instance: GitHubService;
  private baseUrl = 'https://api.github.com';
  private token: string | undefined;

  private constructor() {
    this.token = import.meta.env.VITE_GITHUB_TOKEN;
  }

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  async fetchRepositoryInfo(owner: string, repo: string): Promise<any> {
    thoughtLogger.log('execution', `Fetching repository info: ${owner}/${repo}`);

    try {
      const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new AppError(`GitHub API error: ${response.statusText}`, 'API_ERROR');
      }

      return await response.json();
    } catch (error) {
      thoughtLogger.log('error', 'Failed to fetch repository info', { error });
      throw error instanceof AppError ? error : new AppError('Failed to fetch repository info', 'API_ERROR');
    }
  }

  async searchRepositories(query: string): Promise<any[]> {
    thoughtLogger.log('execution', `Searching repositories: ${query}`);

    try {
      const response = await fetch(
        `${this.baseUrl}/search/repositories?q=${encodeURIComponent(query)}`,
        { headers: this.getHeaders() }
      );

      if (!response.ok) {
        throw new AppError(`GitHub API error: ${response.statusText}`, 'API_ERROR');
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      thoughtLogger.log('error', 'Failed to search repositories', { error });
      throw error instanceof AppError ? error : new AppError('Failed to search repositories', 'API_ERROR');
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    return headers;
  }
}