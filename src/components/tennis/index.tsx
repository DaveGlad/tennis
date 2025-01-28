'use client';
import { Player, Point, Score } from '@/types';
import { useEffect, useState } from 'react';
import TennisIcon from '../svgs/tennis-icon';

export default function Tennis() {
   const [mounted, setMounted] = useState(false);
   const [player1, setPlayer1] = useState<Player>({ name: '', level: 5 });
   const [player2, setPlayer2] = useState<Player>({ name: '', level: 5 });
   const [points, setPoints] = useState<Point[]>([]);
   const [score, setScore] = useState<Score | null>(null);

   useEffect(() => setMounted(true), []);

   const validateLevel = (
      value: number,
      player: Player,
      setPlayer: (p: Player) => void
   ) => {
      if (value >= 1 && value <= 10) {
         setPlayer({ ...player, level: value });
      }
   };

   const generatePoints = () => {
      if (!player1.name || !player2.name) {
         alert('Entrez les noms des joueurs');
         return;
      }

      const totalLevel = player1.level + player2.level;
      const p1Probability = player1.level / totalLevel;

      setPoints(
         Array.from({ length: 150 }, (_, i) => ({
            point: i + 1,
            winner: Math.random() < p1Probability ? player1.name : player2.name,
         }))
      );
   };

   const calculateScore = async () => {
      if (!points.length) {
         alert("Générez d'abord les points");
         return;
      }

      try {
         const res = await fetch('/api/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ points }),
         });
         setScore(await res.json());
      } catch (error) {
         console.error(error, 'Error fetching points');
         alert('Erreur de calcul du score');
      }
   };

   if (!mounted) return null;

   return (
      <main className="max-w-4xl min-h-screen mx-auto mt-7 p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
         <div className="grid grid-cols-2 gap-8 mb-8">
            {[
               { player: player1, setPlayer: setPlayer1, label: 'Joueur 1' },
               { player: player2, setPlayer: setPlayer2, label: 'Joueur 2' },
            ].map(({ player, setPlayer, label }) => (
               <div key={label}>
                  <input
                     placeholder={`Nom ${label}`}
                     value={player.name}
                     onChange={e =>
                        setPlayer({ ...player, name: e.target.value })
                     }
                     className="w-full p-3 mb-4 border rounded bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                  />
                  <input
                     type="number"
                     placeholder="Niveau (1-10)"
                     min={1}
                     max={10}
                     value={player.level}
                     onChange={e =>
                        validateLevel(+e.target.value, player, setPlayer)
                     }
                     className="w-full p-3 border rounded bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                  />
               </div>
            ))}
         </div>

         <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
               onClick={generatePoints}
               className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded transition-colors"
            >
               Générer les points
            </button>
            <button
               onClick={calculateScore}
               className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded transition-colors"
            >
               Calculer le score
            </button>
         </div>
         {points.length > 0 && (
            <div className="mb-8 p-6 rounded shadow bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
               <h3 className="text-lg font-bold mb-4">Points générés</h3>
               <div className="h-64 overflow-y-auto space-y-1">
                  {points.map(point => (
                     <div
                        key={point.point}
                        className="text-gray-700 dark:text-gray-300"
                     >
                        Point {point.point} : remporté par {point.winner}
                     </div>
                  ))}
               </div>
            </div>
         )}

         {score && (
            <div className="p-6 rounded shadow bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
               <div className="flex items-center gap-2 mb-4">
                  <TennisIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-bold">
                     {score.winner
                        ? `Victoire de ${score.winner}`
                        : 'Jeu en cours, pas de vainqueur'}
                  </h3>
               </div>

               <table className="w-full border-collapse">
                  <thead>
                     <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left p-2">Joueur</th>
                        {score.sets.map((_, i) => (
                           <th key={i} className="text-center p-2">
                              Set {i + 1}
                           </th>
                        ))}
                        <th className="text-center p-2">Jeu en cours</th>
                     </tr>
                  </thead>
                  <tbody>
                     {[player1, player2].map(player => (
                        <tr
                           key={player.name}
                           className="border-b border-gray-200 dark:border-gray-700"
                        >
                           <td className="p-2">{player.name}</td>
                           {score.sets.map((set, i) => (
                              <td key={i} className="text-center p-2">
                                 {set[player.name] || 0}
                              </td>
                           ))}
                           <td className="text-center p-2">
                              {score.currentGame[player.name] || '-'}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </main>
   );
}
