import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, statusMeta } from '../theme';
import { LookupResult } from '../types';

interface Props {
  result: LookupResult;
}

export default function ResultCard({ result }: Props) {
  const meta = statusMeta[result.status];
  const brand = result.brand;

  return (
    <View style={[styles.card, { borderLeftColor: meta.color }]}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{meta.emoji}</Text>
        <View style={styles.headerText}>
          <Text style={styles.brandName}>
            {brand?.name ?? result.queriedName ?? 'Ukendt mærke'}
          </Text>
          <Text style={[styles.statusLabel, { color: meta.color }]}>
            {meta.label}
          </Text>
        </View>
        {result.imageUrl ? (
          <Image source={{ uri: result.imageUrl }} style={styles.image} />
        ) : null}
      </View>

      {result.productName ? (
        <Text style={styles.productName}>Produkt: {result.productName}</Text>
      ) : null}

      <Text style={styles.description}>{meta.description}</Text>

      {brand?.certifications?.length ? (
        <Text style={styles.detail}>
          Certificeringer: {brand.certifications.join(', ')}
        </Text>
      ) : null}
      {brand?.parentCompany ? (
        <Text style={styles.detail}>Moderselskab: {brand.parentCompany}</Text>
      ) : null}
      {brand?.note ? <Text style={styles.note}>{brand.note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderLeftWidth: 6,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  emoji: { fontSize: 32, marginRight: 12 },
  headerText: { flex: 1 },
  brandName: { fontSize: 18, fontWeight: '700', color: colors.text },
  statusLabel: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  image: { width: 48, height: 48, borderRadius: 6, marginLeft: 8 },
  productName: { marginTop: 10, fontSize: 14, color: colors.text },
  description: { marginTop: 8, fontSize: 14, color: colors.muted, lineHeight: 20 },
  detail: { marginTop: 6, fontSize: 13, color: colors.text },
  note: {
    marginTop: 8,
    fontSize: 13,
    color: colors.muted,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
