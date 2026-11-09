import test from 'node:test';
import assert from 'node:assert/strict';
import {
  transformLeetCodeGraphQL,
  parseSubmissionCalendar,
  getFallbackStats,
} from '../src/services/leetcodeAdapter.js';

test('LeetCode Data Adapter Unit Tests', async (t) => {
  await t.test('correctly parses valid submission calendar JSON string', () => {
    const rawMap = { '1700000000': 3, '1700086400': 5 };
    const jsonString = JSON.stringify(rawMap);
    const parsed = parseSubmissionCalendar(jsonString);

    assert.equal(parsed['1700000000'], 3);
    assert.equal(parsed['1700086400'], 5);
  });

  await t.test('handles corrupt or null submission calendar safely', () => {
    const parsedNull = parseSubmissionCalendar(null);
    assert.equal(typeof parsedNull, 'object');
    assert.ok(Object.keys(parsedNull).length > 0);

    const parsedInvalid = parseSubmissionCalendar('{ invalid json string ...');
    assert.equal(typeof parsedInvalid, 'object');
  });

  await t.test('transforms valid GraphQL response into normalized LeetCodeStats', () => {
    const mockGraphQL = {
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

    assert.equal(stats.totalSolved, 250);
    assert.equal(stats.easySolved, 120);
    assert.equal(stats.mediumSolved, 110);
    assert.equal(stats.hardSolved, 20);
    assert.equal(stats.ranking, 85400);
    assert.equal(stats.isMock, false);
    assert.equal(stats.submissionCalendar['1710000000'], 4);
  });

  await t.test('returns graceful fallback when matchedUser is null or missing', () => {
    const emptyResponse = {
      data: {
        matchedUser: undefined,
      },
      errors: [{ message: 'User does not exist' }],
    };

    const stats = transformLeetCodeGraphQL(emptyResponse, 'nonexistent');

    assert.ok(stats.totalSolved > 0);
    assert.equal(stats.easySolved + stats.mediumSolved + stats.hardSolved, stats.totalSolved);
    assert.equal(stats.isMock, true);
  });

  await t.test('ensures getFallbackStats produces consistent data model', () => {
    const fallback = getFallbackStats('TODO: LEETCODE_USERNAME');

    assert.equal(fallback.totalSolved, fallback.easySolved + fallback.mediumSolved + fallback.hardSolved);
    assert.ok(fallback.totalSolved <= fallback.totalQuestions);
    assert.ok(fallback.acceptanceRate > 0);
    assert.ok(fallback.acceptanceRate <= 100);
  });
});

