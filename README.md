# Kaninfri 🐰

En mobilapp (Expo / React Native), der hjælper dig med at afgøre, om et produkt
er testet på dyr.

## Funktioner

- **📷 Scan stregkode** — scan produktets stregkode med kameraet. Appen slår
  produktet op i [Open Beauty Facts](https://world.openbeautyfacts.org) og
  [Open Food Facts](https://world.openfoodfacts.org), finder mærket bag og
  vurderer dets dyreforsøgs-status.
- **🔍 Søg efter mærke** — søg direkte i appens database over kendte mærker.
- **🐰 Info** — forklaring af statusserne og mærkningsordningerne
  (Leaping Bunny, PETA, EU's forbud mod dyretestet kosmetik).

## Statusser

| Status | Betydning |
|---|---|
| 🐰 Fri for dyreforsøg (certificeret) | Certificeret af Leaping Bunny og/eller PETA |
| ✅ Erklæret fri for dyreforsøg | Mærkets egen erklæring, ingen uafhængig certificering |
| ⚠️ Mærket tester ikke – moderselskabet gør | Fx NYX/Urban Decay (L'Oréal) eller The Ordinary (Estée Lauder) |
| ❌ Tester på dyr | Tester på dyr eller sælger på markeder med lovkrav om dyreforsøg |
| ❓ Ukendt | Mærket findes ikke i databasen |

## Kom i gang

```bash
npm install
npx expo start
```

Scan QR-koden med [Expo Go](https://expo.dev/go) på din telefon, eller kør
appen i en simulator med `npx expo run:ios` / `npx expo run:android`.

> Bemærk: Stregkodescanneren kræver en fysisk enhed (eller en simulator med
> kameraadgang). Søgefunktionen virker overalt, også på web (`npx expo start --web`).

## Datakilder og forbehold

Branddatabasen (`src/data/brands.ts`) er **vejledende** og bygger på offentlige
lister fra [Leaping Bunny](https://crueltyfreeinternational.org) og
[PETA Beauty Without Bunnies](https://crueltyfree.peta.org) samt mærkernes egne
erklæringer. Mærker skifter ejere, og certificeringer ændrer sig — tjek altid
den aktuelle status, før du træffer en endelig beslutning.

## Projektstruktur

```
App.tsx                    # Navigation (tabs: Scan, Søg, Info)
src/
  api/products.ts          # Opslag af stregkoder i Open Beauty/Food Facts
  components/ResultCard.tsx# Visning af et vurderingsresultat
  data/brands.ts           # Vejledende branddatabase
  logic/lookup.ts          # Normalisering, søgning og matchning af brands
  screens/                 # ScanScreen, SearchScreen, InfoScreen
  theme.ts                 # Farver og statusmetadata
  types.ts                 # Delte typer
```
