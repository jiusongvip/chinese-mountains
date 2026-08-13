import type { Mountain, VibeGroup, MountainDepth } from "../types/mountain";
import raw from "./mountains-data.json";
import depthRaw from "./mountains-depth.json";

export const mountains: Mountain[] = raw.mountains as Mountain[];
export const vibeGroups: VibeGroup[] = raw.vibes as VibeGroup[];
export const depthData = depthRaw as Record<string, MountainDepth>;

export function getMountain(slug: string): Mountain | undefined {
  return mountains.find(m => m.slug === slug);
}
export function getMountainDepth(slug: string): MountainDepth | undefined {
  return depthData[slug];
}
export function getMountainsByVibe(vibeId: string): Mountain[] {
  const group = vibeGroups.find(v => v.id === vibeId);
  if (!group) return [];
  return group.mountainIds.map(id => mountains.find(m => m.id === id)!).filter(Boolean);
}
export function getMountainsByRegion(region: string): Mountain[] {
  return mountains.filter(m => m.location.region === region);
}
export function getMountainsBySeason(month: string): Mountain[] {
  return mountains.filter(m => m.tourism.bestSeason.includes(month));
}
export function recommendMountains(season: string, preference: string, difficulty: string): Mountain[] {
  return mountains.filter(m => m.tourism.bestSeason.includes(season))
    .filter(m => {
      if (difficulty === "easy") return m.tourism.difficulty === "easy" || m.tourism.difficulty === "moderate";
      if (difficulty === "hard") return m.tourism.difficulty === "hard" || m.tourism.difficulty === "extreme";
      return true;
    }).sort((a, b) => {
      if (preference === "scenery") return b.rating.scenery - a.rating.scenery;
      if (preference === "culture") return b.rating.culturalValue - a.rating.culturalValue;
      if (preference === "hiking") return b.rating.hikingExperience - a.rating.hikingExperience;
      return b.rating.overall - a.rating.overall;
    }).slice(0, 3);
}
export const allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const allRegions = ["north","south","east","west","central","southwest","northwest"] as const;
export const difficultyLevels = ["easy","moderate","hard","extreme"] as const;
