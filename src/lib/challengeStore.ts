// src/lib/challengeStore.ts
interface ChallengeData {
  originalScore: number;
  questionIds: (string | number)[];
  createdAt: number;
}
// WARNING: Still temporary and not production-ready!
export const challengeStore: Record<string, ChallengeData> = {};
