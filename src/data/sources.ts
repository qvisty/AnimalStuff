import { BrandStatus, SourceRef } from '../types';

/**
 * Standardkilder pr. status. Vises sammen med resultatet, så brugeren altid
 * kan se, hvor vurderingen kommer fra, og selv efterprøve den.
 */
export const STATUS_SOURCES: Record<BrandStatus, SourceRef[]> = {
  certified_cruelty_free: [
    {
      title: 'Leaping Bunny (Cruelty Free International)',
      url: 'https://crueltyfreeinternational.org/',
      explanation:
        'Leaping Bunny-certificeringen kræver, at hverken færdige produkter eller ingredienser testes på dyr i hele leverandørkæden, og den kontrolleres ved uafhængige audits. Søg på mærket for at se den aktuelle certificering.',
    },
    {
      title: 'PETA Beauty Without Bunnies',
      url: 'https://crueltyfree.peta.org/',
      explanation:
        'PETA’s søgbare database over virksomheder, der har forpligtet sig til ikke at teste på dyr.',
    },
  ],
  cruelty_free: [
    {
      title: 'Mærkets egen erklæring',
      url: 'https://crueltyfree.peta.org/',
      explanation:
        'Statussen bygger på mærkets egen offentlige erklæring om ikke at teste på dyr. Der findes ingen uafhængig certificering — søg på mærket i PETA’s database for at se, om det senere er blevet optaget.',
    },
  ],
  parent_tests: [
    {
      title: 'PETA Beauty Without Bunnies',
      url: 'https://crueltyfree.peta.org/',
      explanation:
        'Selve mærket er opført som dyreforsøgsfrit, men databasen markerer samtidig, at det ejes af et moderselskab, der tester på dyr eller sælger på markeder med krav om dyreforsøg.',
    },
    {
      title: 'Leaping Bunny (Cruelty Free International)',
      url: 'https://crueltyfreeinternational.org/',
      explanation:
        'Her kan du se, om mærket selv er certificeret, selvom koncernen bag ikke er det.',
    },
  ],
  tests: [
    {
      title: 'PETA – virksomheder der tester på dyr',
      url: 'https://crueltyfree.peta.org/',
      explanation:
        'Mærket (eller dets moderselskab) står på PETA’s liste over virksomheder, der tester på dyr — typisk fordi produkterne sælges på markeder som det kinesiske fastland, hvor myndighederne kan kræve dyreforsøg, eller fordi virksomheden ikke har afvist test, hvor loven kræver det.',
    },
    {
      title: 'Cruelty Free International',
      url: 'https://crueltyfreeinternational.org/',
      explanation:
        'Mærket er ikke Leaping Bunny-certificeret. Organisationen forklarer, hvordan salg på visse markeder kan indebære dyreforsøg, selvom produkterne er fremstillet i EU.',
    },
  ],
  unknown: [
    {
      title: 'Søg i PETA’s database',
      url: 'https://crueltyfree.peta.org/',
      explanation:
        'Mærket findes ikke i appens database. Søg på mærket hos PETA eller Leaping Bunny, og kig efter kanin-logoerne på emballagen.',
    },
  ],
};
