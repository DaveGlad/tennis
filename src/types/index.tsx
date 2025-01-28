export interface Player {
   name: string;
   level: number;
}

export interface Point {
   point: number;
   winner: string;
}

export interface Score {
   sets: Record<string, number>[];
   currentGame: Record<string, string>;
   winner: string | null;
}
