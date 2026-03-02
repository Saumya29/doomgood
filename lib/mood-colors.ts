// Mood color config — used for card backgrounds and mood selector chips
export const MOOD_COLORS: Record<string, { from: string; to: string; text: string; chip: string }> = {
  anxious:     { from: '#92400e', to: '#78350f', text: '#fef3c7', chip: '#d97706' },
  sad:         { from: '#1e3a8a', to: '#1e2f6b', text: '#dbeafe', chip: '#3b82f6' },
  lonely:      { from: '#4c1d95', to: '#3b0764', text: '#ede9fe', chip: '#7c3aed' },
  overwhelmed: { from: '#134e4a', to: '#0d3b38', text: '#ccfbf1', chip: '#0d9488' },
  angry:       { from: '#7f1d1d', to: '#5f1414', text: '#fee2e2', chip: '#ef4444' },
  hopeless:    { from: '#1f2937', to: '#111827', text: '#d1d5db', chip: '#6b7280' },
  stressed:    { from: '#713f12', to: '#54300d', text: '#fef9c3', chip: '#ca8a04' },
  numb:        { from: '#1e293b', to: '#0f172a', text: '#cbd5e1', chip: '#64748b' },
  restless:    { from: '#164e63', to: '#0e3b4e', text: '#cffafe', chip: '#0891b2' },
  lost:        { from: '#1a2e05', to: '#14240a', text: '#d9f99d', chip: '#65a30d' },
}

export function getMoodColors(moodId: string) {
  return MOOD_COLORS[moodId] ?? { from: '#1f2937', to: '#111827', text: '#f9fafb', chip: '#6b7280' }
}
