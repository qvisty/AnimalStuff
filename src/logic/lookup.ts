import { BRANDS } from '../data/brands';
import { Brand, LookupResult } from '../types';

/** Normaliserer et brandnavn, så fx "L'Oréal-Paris" matcher "loreal paris". */
export function normalize(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9æøå]+/g, ' ')
    .trim();
}

function namesOf(brand: Brand): string[] {
  return [brand.name, ...(brand.aliases ?? [])].map(normalize);
}

/** Finder et brand ud fra et (muligvis upræcist) navn. */
export function findBrand(query: string): Brand | undefined {
  const q = normalize(query);
  if (!q) return undefined;

  let exact: Brand | undefined;
  let partial: Brand | undefined;
  for (const brand of BRANDS) {
    for (const name of namesOf(brand)) {
      if (name === q) exact ??= brand;
      else if (q.includes(name) || name.includes(q)) partial ??= brand;
    }
  }
  return exact ?? partial;
}

/** Søger i databasen og returnerer alle brands, der matcher delvist. */
export function searchBrands(query: string): Brand[] {
  const q = normalize(query);
  if (!q) return [];
  return BRANDS.filter((brand) =>
    namesOf(brand).some((name) => name.includes(q)),
  ).sort((a, b) => a.name.localeCompare(b.name, 'da'));
}

/**
 * Slår en kommasepareret brandliste op (som Open Beauty Facts leverer den)
 * og returnerer det første match.
 */
export function lookupBrandList(brandsField: string): LookupResult {
  const candidates = brandsField
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    const brand = findBrand(candidate);
    if (brand) {
      return { status: brand.status, brand, queriedName: candidate };
    }
  }
  return { status: 'unknown', queriedName: candidates[0] ?? '' };
}
