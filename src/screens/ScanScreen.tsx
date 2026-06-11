import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { lookupBarcode } from '../api/products';
import ResultCard from '../components/ResultCard';
import { colors } from '../theme';
import { LookupResult } from '../types';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState<LookupResult | null>(null);
  const [barcode, setBarcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scanning = useRef(true);

  const handleScan = useCallback(async (scan: BarcodeScanningResult) => {
    if (!scanning.current) return;
    scanning.current = false;
    setBarcode(scan.data);
    setLoading(true);
    setError(null);
    try {
      setResult(await lookupBarcode(scan.data));
    } catch {
      setError('Opslaget fejlede. Tjek din internetforbindelse og prøv igen.');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setBarcode(null);
    setError(null);
    scanning.current = true;
  }, []);

  if (!permission) {
    return <View style={styles.center} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          Appen skal bruge adgang til kameraet for at kunne scanne stregkoder.
        </Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Giv adgang til kamera</Text>
        </Pressable>
      </View>
    );
  }

  const showResult = loading || result || error;

  return (
    <View style={styles.container}>
      {!showResult ? (
        <>
          <CameraView
            style={StyleSheet.absoluteFill}
            barcodeScannerSettings={{
              barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
            }}
            onBarcodeScanned={handleScan}
          />
          <View style={styles.overlay} pointerEvents="none">
            <View style={styles.frame} />
            <Text style={styles.hint}>Ret kameraet mod produktets stregkode</Text>
          </View>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.resultContainer}>
          {barcode ? (
            <Text style={styles.barcode}>Stregkode: {barcode}</Text>
          ) : null}
          {loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Slår produktet op …</Text>
            </View>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : result ? (
            <>
              <ResultCard result={result} />
              {result.status === 'unknown' && !result.queriedName ? (
                <Text style={styles.unknownHint}>
                  Produktet blev ikke fundet i Open Beauty Facts eller Open Food
                  Facts. Prøv at søge på mærkets navn under fanen “Søg”.
                </Text>
              ) : null}
            </>
          ) : null}
          <Pressable style={styles.button} onPress={reset}>
            <Text style={styles.buttonText}>Scan et nyt produkt</Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  permissionText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 260,
    height: 160,
    borderWidth: 3,
    borderColor: '#FFFFFFCC',
    borderRadius: 16,
  },
  hint: {
    marginTop: 16,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    textShadowColor: '#000',
    textShadowRadius: 4,
  },
  resultContainer: { padding: 16, paddingTop: 24 },
  barcode: { fontSize: 13, color: colors.muted, marginBottom: 4 },
  loadingText: { marginTop: 12, color: colors.muted },
  errorText: { color: '#C53030', fontSize: 15, marginVertical: 16 },
  unknownHint: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
