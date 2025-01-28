import { Point } from '@/types';
import { NextResponse } from 'next/server';

// types.ts
interface TennisScore {
   sets: Record<string, number>[];
   currentGame: Record<string, string>;
   winner: string | null;
}

// TennisMatch.ts
class TennisMatch {
   private static readonly SCORES = ['0', '15', '30', '40'];
   private static readonly POINTS_TO_WIN_GAME = 4;
   private static readonly GAMES_TO_WIN_SET = 6;
   private static readonly SETS_TO_WIN_MATCH = 3;

   private sets: Record<string, number>[] = [];
   private currentSet: Record<string, number> = {};
   private currentGame: Record<string, number> = {};

   constructor(private points: Point[]) {}

   private calculateGameScore(): Record<string, string> {
      const maxScore = Math.max(...Object.values(this.currentGame));
      const diff = this.getScoreDifference(this.currentGame);

      if (maxScore < TennisMatch.POINTS_TO_WIN_GAME) {
         return Object.fromEntries(
            Object.entries(this.currentGame).map(([p, s]) => [
               p,
               TennisMatch.SCORES[s] || '0',
            ])
         );
      }

      if (diff === 0) return this.getTiedScore();
      return this.getAdvantageScore();
   }

   private getScoreDifference(scores: Record<string, number>): number {
      return Math.abs(
         Object.values(scores)[0] - (Object.values(scores)[1] || 0)
      );
   }

   private getTiedScore(): Record<string, string> {
      return Object.fromEntries(
         Object.keys(this.currentGame).map(p => [p, '40'])
      );
   }

   private getAdvantageScore(): Record<string, string> {
      const leader = this.getLeader(this.currentGame);
      return {
         [leader]: 'AV',
         [Object.keys(this.currentGame).find(p => p !== leader) || '']: '-',
      };
   }

   private getLeader(scores: Record<string, number>): string {
      return Object.entries(scores).reduce((a, b) =>
         scores[a[0]] > scores[b[0]] ? a : b
      )[0];
   }

   private processGame(point: Point): void {
      this.currentGame[point.winner] =
         (this.currentGame[point.winner] || 0) + 1;
      const maxScore = Math.max(...Object.values(this.currentGame));
      const diff = this.getScoreDifference(this.currentGame);

      if (maxScore >= TennisMatch.POINTS_TO_WIN_GAME && diff >= 2) {
         this.processSet(point.winner);
      }
   }

   private processSet(winner: string): void {
      this.currentSet[winner] = (this.currentSet[winner] || 0) + 1;
      const setMax = Math.max(...Object.values(this.currentSet));
      const setDiff = this.getScoreDifference(this.currentSet);

      if (
         (setMax >= TennisMatch.GAMES_TO_WIN_SET && setDiff >= 2) ||
         setMax === 7
      ) {
         this.sets.push({ ...this.currentSet });
         this.currentSet = {};
      }
      this.currentGame = {};
   }

   public calculateScore(): TennisScore {
      console.log(this.points);
      this.points.forEach(point => this.processGame(point));

      if (Object.keys(this.currentSet).length) {
         this.sets.push(this.currentSet);
      }

      const setsWon: Record<string, number> = {};
      this.sets.forEach(set => {
         const winner = this.getLeader(set);
         setsWon[winner] = (setsWon[winner] || 0) + 1;
      });

      return {
         sets: this.sets,
         currentGame: this.calculateGameScore(),
         winner:
            Object.entries(setsWon).find(
               ([, wins]) => wins >= TennisMatch.SETS_TO_WIN_MATCH
            )?.[0] || null,
      };
   }
}

// route.ts
export async function POST(req: Request) {
   const { points }: { points: Point[] } = await req.json();
   const match = new TennisMatch(points);
   return NextResponse.json(match.calculateScore());
}
