import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EMIResult } from '../types';

interface EMIBreakdownCardProps {
  result: EMIResult;
}

const formatCurrency = (value: number): string => `INR ${value.toFixed(2)}`;

export const EMIBreakdownCard = ({ result }: EMIBreakdownCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>EMI Breakdown</Text>

      <View style={styles.highlightBlock}>
        <Text style={styles.highlightLabel}>Monthly EMI</Text>
        <Text style={styles.highlightValue}>{formatCurrency(result.monthlyEMI)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Interest Payable</Text>
        <Text style={styles.value}>{formatCurrency(result.totalInterestPayable)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Amount Payable</Text>
        <Text style={styles.value}>{formatCurrency(result.totalAmountPayable)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0D7E2',
    padding: 16,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  highlightBlock: {
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  highlightLabel: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  highlightValue: {
    color: '#312E81',
    fontSize: 28,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
    marginRight: 8,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});
