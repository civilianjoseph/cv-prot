export function getRating(score) {
  const average = (score.environmental + score.economic + score.energetic) / 3;

  if (average >= 70) return { label: 'Cidade Sustentável', icon: '🏆', color: '#22c55e', msg: 'Parabéns! Sua cidade é um modelo de gestão energética sustentável para o Brasil.' };
  if (average >= 55) return { label: 'Bom Progresso', icon: '👍', color: '#f59e0b', msg: 'Boas escolhas! Sua cidade está no caminho certo, mas ainda há espaço para melhorar.' };
  if (average >= 40) return { label: 'Precisa Melhorar', icon: '⚠️', color: '#f97316', msg: 'Algumas decisões comprometeram o equilíbrio da cidade. Tente novamente!' };
  return { label: 'Cidade em Crise', icon: '🚨', color: '#ef4444', msg: 'As decisões geraram impactos negativos graves. A cidade precisa de ajuda urgente!' };
}

export function getWeakestArea(score) {
  const scoreAreas = [
    { key: 'environmental', label: 'Ambiental', icon: '🌿', value: score.environmental },
    { key: 'economic', label: 'Econômico', icon: '💰', value: score.economic },
    { key: 'energetic', label: 'Energético', icon: '⚡', value: score.energetic }
  ];
  return scoreAreas.reduce((lowestSoFar, candidate) => lowestSoFar.value < candidate.value ? lowestSoFar : candidate);
}
