import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { EMIBreakdownCard } from './EMIBreakdownCard';
import { useEMICalculator } from './useEMICalculator';

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  keyboardType: 'numeric' | 'decimal-pad';
  error?: string;
  onChangeText: (text: string) => void;
}

const FormField = ({
  label,
  value,
  placeholder,
  keyboardType,
  error,
  onChangeText,
}: FormFieldProps) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={[styles.input, error ? styles.inputError : undefined]}
      placeholderTextColor="#9CA3AF"
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const EMICalculatorScreen = () => {
  const { inputs, errors, result, setInputValue, calculate } = useEMICalculator();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>EMI Calculator</Text>
        <Text style={styles.subHeading}>
          Enter loan details to calculate your monthly EMI.
        </Text>

        <FormField
          label="Loan Amount"
          value={inputs.loanAmount}
          placeholder="e.g. 500000"
          keyboardType="numeric"
          error={errors.loanAmount}
          onChangeText={text => setInputValue('loanAmount', text)}
        />

        <FormField
          label="Interest Rate (% per annum)"
          value={inputs.interestRate}
          placeholder="e.g. 10.5"
          keyboardType="decimal-pad"
          error={errors.interestRate}
          onChangeText={text => setInputValue('interestRate', text)}
        />

        <FormField
          label="Tenure (months)"
          value={inputs.tenureMonths}
          placeholder="e.g. 240"
          keyboardType="numeric"
          error={errors.tenureMonths}
          onChangeText={text => setInputValue('tenureMonths', text)}
        />

        <Pressable style={styles.calculateButton} onPress={calculate}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </Pressable>

        {result ? <EMIBreakdownCard result={result} /> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subHeading: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 14,
    color: '#6B7280',
  },
  fieldContainer: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    marginTop: 4,
    color: '#DC2626',
    fontSize: 12,
  },
  calculateButton: {
    marginTop: 10,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EMICalculatorScreen;
