import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, statusMeta } from '../theme';
import { BrandStatus } from '../types';

const STATUS_ORDER: BrandStatus[] = [
  'certified_cruelty_free',
  'cruelty_free',
  'parent_tests',
  'tests',
  'unknown',
];

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Sådan vurderer appen et produkt</Text>
      <Text style={styles.paragraph}>
        Når du scanner en stregkode, slås produktet op i Open Beauty Facts og
        Open Food Facts for at finde mærket bag. Mærket sammenholdes derefter
        med appens database, som bygger på offentlige lister fra Leaping Bunny
        (Cruelty Free International) og PETA samt mærkernes egne erklæringer.
        Hvert resultat viser kildehenvisninger med forklaring, så du selv kan
        efterprøve vurderingen.
      </Text>

      <Text style={styles.heading}>Statusforklaring</Text>
      {STATUS_ORDER.map((status) => {
        const meta = statusMeta[status];
        return (
          <View key={status} style={styles.statusRow}>
            <Text style={styles.statusEmoji}>{meta.emoji}</Text>
            <View style={styles.statusText}>
              <Text style={[styles.statusLabel, { color: meta.color }]}>
                {meta.label}
              </Text>
              <Text style={styles.statusDescription}>{meta.description}</Text>
            </View>
          </View>
        );
      })}

      <Text style={styles.heading}>Mærkningsordninger</Text>
      <Text style={styles.paragraph}>
        🐰 <Text style={styles.bold}>Leaping Bunny</Text> (Cruelty Free
        International) er den strengeste internationale certificering. Den
        kræver, at hverken det færdige produkt eller ingredienserne testes på
        dyr — i hele leverandørkæden — og den kontrolleres af uafhængige
        audits.
      </Text>
      <Text style={styles.paragraph}>
        🐇 <Text style={styles.bold}>PETA “Beauty Without Bunnies”</Text> er en
        amerikansk liste, hvor virksomheder skriver under på, at de ikke
        tester på dyr. Den er bredere end Leaping Bunny, men bygger primært på
        virksomhedernes egne erklæringer.
      </Text>
      <Text style={styles.paragraph}>
        🇪🇺 I <Text style={styles.bold}>EU</Text> har det siden 2013 været
        forbudt at sælge kosmetik, der er testet på dyr. Et mærke kan dog
        stadig være involveret i dyreforsøg, hvis det sælger på markeder uden
        for EU, hvor test kan kræves ved lov.
      </Text>

      <Text style={styles.heading}>Vigtigt forbehold</Text>
      <Text style={styles.paragraph}>
        Appens database er vejledende og kan være forældet — mærker skifter
        ejer, og certificeringer kommer og går. Tjek altid den aktuelle status
        hos crueltyfreeinternational.org eller crueltyfree.peta.org, før du
        træffer en endelig beslutning.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 21,
    marginBottom: 10,
  },
  bold: { fontWeight: '700' },
  statusRow: { flexDirection: 'row', marginBottom: 12 },
  statusEmoji: { fontSize: 22, marginRight: 10, marginTop: 1 },
  statusText: { flex: 1 },
  statusLabel: { fontSize: 14, fontWeight: '700' },
  statusDescription: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
    marginTop: 2,
  },
});
