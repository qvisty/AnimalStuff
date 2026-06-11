export type BrandStatus =
  | 'certified_cruelty_free' // Certificeret af Leaping Bunny og/eller PETA
  | 'cruelty_free' // Erklærer sig fri for dyreforsøg, men uden uafhængig certificering
  | 'parent_tests' // Selve mærket tester ikke, men moderselskabet gør
  | 'tests' // Tester på dyr eller sælger på markeder, der kræver dyreforsøg
  | 'unknown';

export interface SourceRef {
  title: string;
  url: string;
  /** Kort forklaring på, hvad kilden dokumenterer */
  explanation: string;
}

export interface Brand {
  name: string;
  aliases?: string[];
  status: Exclude<BrandStatus, 'unknown'>;
  parentCompany?: string;
  certifications?: ('Leaping Bunny' | 'PETA')[];
  note?: string;
  /** Brand-specifikke kilder ud over standardkilderne for statussen */
  sources?: SourceRef[];
}

export interface LookupResult {
  status: BrandStatus;
  brand?: Brand;
  /** Brandnavnet som det stod på produktet/i søgningen */
  queriedName: string;
  productName?: string;
  imageUrl?: string;
}
