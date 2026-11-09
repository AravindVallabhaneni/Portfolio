import { describe, it, expect } from 'vitest';
import {
  transformLeetCodeGraphQL,
  parseSubmissionCalendar,
  getFallbackStats,
  RawLeetCodeGraphQLResponse,
} from './leetcodeAdapter';

describe('LeetCode Data Adapter Unit Tests', () => {
  it('correctly parses valid submission calendar JSON string', () => {
    const rawMap = { '1700000000': 3, '1700086400': 5 };
    const jsonString = JSON.stringify(rawMap);
    const parsed = parseSubmissionCalendar(jsonString);

    expect(parsed['1700000000']).toBe(3);
    expect(parsed['1700086400']).toBe(5);
  });

  it('handles corrupt or null submission calendar safely', () => {
    const parsedNull = parseSubmissionCalendar(null);
    expect(typeof parsedNull).toBe('object');
    expect(Object.keys(parsedNull).length).toBeGreaterThan(0);

    const parsedInvalid = parseSubmissionCalendar('{ invalid json string ...');
    expect(typeof parsedInvalid).toBe('object');
  });

  it('transforms valid GraphQL response into normalized LeetCodeStats', () => {
    const mockGraphQL: RawLeetCodeGraphQLResponse = {
      data: {
        matchedUser: {
          username: 'aravind-test',
          profile: {
            ranking: 85400,
            reputation: 120,
          },
          submitStatsGlobal: {
            acSubmissionNum: [
              { difficulty: 'All', count: 250, submissions: 400 },
              { difficulty: 'Easy', count: 120, submissions: 150 },
              { difficulty: 'Medium', count: 110, submissions: 200 },
              { difficulty: 'Hard', count: 20, submissions: 50 },
            ],
          },
          userCalendar: {
            submissionCalendar: JSON.stringify({ '1710000000': 4 }),
            streak: 15,
            totalActiveDays: 90,
          },
        },
        allQuestionsCount: [
          { difficulty: 'All', count: 3300 },
          { difficulty: 'Easy', count: 830 },
          { difficulty: 'Medium', count: 1720 },
          { difficulty: 'Hard', count: 750 },
        ],
      },
    };

    const stats = transformLeetCodeGraphQL(mockGraphQL, 'aravind-test');

    expect(stats.totalSolved).toBe(250);
    expect(stats.easySolved).toBe(120);
    expect(stats.mediumSolved).toBe(110);
    expect(stats.hardSolved).toBe(20);
    expect(stats.ranking).toBe(85400);
    expect(stats.isMock).toBe(false);
    expect(stats.submissionCalendar['1710000000']).toBe(4);
  });

  it('returns graceful fallback when matchedUser is null or missing', () => {
    const emptyResponse: RawLeetCodeGraphQLResponse = {
      data: {
        matchedUser: undefined,
      },
      errors: [{ message: 'User does not exist' }],
    };

    const stats = transformLeetCodeGraphQL(emptyResponse, 'nonexistent');

    expect(stats.totalSolved).toBeGreaterThan(0);
    expect(stats.easySolved + stats.mediumSolved + stats.hardSolved).toBe(stats.totalSolved);
    expect(stats.isMock).toBe(true);
  });

  it('ensures getFallbackStats produces consistent data model', () => {
    const fallback = getFallbackStats('TODO: LEETCODE_USERNAME');

    expect(fallback.totalSolved).toBe(
      fallback.easySolved + fallback.mediumSolved + fallback.hardSolved
    );
    expect(fallback.totalSolved).toBeLessThanOrEqual(fallback.totalQuestions);
    expect(fallback.acceptanceRate).toBeGreaterThan(0);
    expect(fallback.acceptanceRate).toBeLessThanOrEqual(100);
  });
});

