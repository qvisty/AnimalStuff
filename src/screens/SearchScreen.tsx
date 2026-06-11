import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ResultCard from '../components/ResultCard';
import { searchBrands } from '../logic/lookup';
import { colors } from '../theme';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchBrands(query), [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Søg efter et mærke, fx “Nivea” eller “Lush”"
        placeholderTextColor={colors.muted}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      {query.trim().length === 0 ? (
        <Text style={styles.hint}>
          Skriv navnet på et mærke for at se, om det tester på dyr. Du kan også
          scanne produktets stregkode under fanen “Scan”.
        </Text>
      ) : results.length === 0 ? (
        <Text style={styles.hint}>
          Ingen mærker matcher “{query.trim()}”. Databasen er vejledende og
          dækker ikke alle mærker — kig efter Leaping Bunny- eller PETA-logoet
          på emballagen.
        </Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(brand) => brand.name}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <ResultCard
              result={{ status: item.status, brand: item, queriedName: item.name }}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  input: {
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  hint: {
    marginTop: 16,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  list: { paddingTop: 12, paddingBottom: 24 },
});
