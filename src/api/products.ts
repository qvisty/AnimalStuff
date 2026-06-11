import { lookupBrandList } from '../logic/lookup';
import { LookupResult } from '../types';

interface OffProduct {
  product_name?: string;
  brands?: string;
  image_front_small_url?: string;
}

interface OffResponse {
  status: number;
  product?: OffProduct;
}

const SOURCES = [
  'https://world.openbeautyfacts.org/api/v2/product/',
  'https://world.openfoodfacts.org/api/v2/product/',
];

async function fetchProduct(barcode: string): Promise<OffProduct | undefined> {
  for (const base of SOURCES) {
    try {
      const res = await fetch(`${base}${encodeURIComponent(barcode)}.json`, {
        headers: { 'User-Agent': 'AnimalStuff/1.0 (cruelty-free checker)' },
      });
      if (!res.ok) continue;
      const data: OffResponse = await res.json();
      if (data.status === 1 && data.product?.brands) return data.product;
    } catch {
      // Prøv næste kilde
    }
  }
  return undefined;
}

/** Slår en stregkode op og vurderer produktets brand. */
export async function lookupBarcode(barcode: string): Promise<LookupResult> {
  const product = await fetchProduct(barcode);
  if (!product?.brands) {
    return { status: 'unknown', queriedName: '' };
  }
  const result = lookupBrandList(product.brands);
  return {
    ...result,
    productName: product.product_name,
    imageUrl: product.image_front_small_url,
  };
}
