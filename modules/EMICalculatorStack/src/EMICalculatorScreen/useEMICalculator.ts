import { useState } from 'react';

import { setLastCalculatedResult } from '../store/emiSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { EMIFormErrors, EMIFormInputs, EMIResult } from '../types';

const DEFAULT_INPUTS: EMIFormInputs = {
  loanAmount: '',
  interestRate: '',
  tenureMonths: '',
};

const roundTo2Decimals = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const useEMICalculator = () => {
  const dispatch = useAppDispatch();
  const persistedResult = useAppSelector(state => state.emi.lastCalculatedResult);

  const [inputs, setInputs] = useState<EMIFormInputs>(DEFAULT_INPUTS);
  const [errors, setErrors] = useState<EMIFormErrors>({});
  const [result, setResult] = useState<EMIResult | null>(persistedResult);

  const setInputValue = (field: keyof EMIFormInputs, value: string): void => {
    setInputs(previous => ({
      ...previous,
      [field]: value,
    }));

    setErrors(previous => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const validateInputs = (): {
    isValid: boolean;
    parsedValues: { principal: number; annualInterestRate: number; tenure: number };
  } => {
    const nextErrors: EMIFormErrors = {};

    const principal = Number(inputs.loanAmount);
    const annualInterestRate = Number(inputs.interestRate);
    const tenure = Number(inputs.tenureMonths);

    if (!inputs.loanAmount.trim()) {
      nextErrors.loanAmount = 'Loan amount is required';
    } else if (Number.isNaN(principal) || principal <= 0) {
      nextErrors.loanAmount = 'Loan amount must be greater than 0';
    }

    if (!inputs.interestRate.trim()) {
      nextErrors.interestRate = 'Interest rate is required';
    } else if (
      Number.isNaN(annualInterestRate) ||
      annualInterestRate < 1 ||
      annualInterestRate > 36
    ) {
      nextErrors.interestRate = 'Interest rate must be between 1% and 36%';
    }

    if (!inputs.tenureMonths.trim()) {
      nextErrors.tenureMonths = 'Tenure is required';
    } else if (Number.isNaN(tenure) || tenure < 3 || tenure > 360) {
      nextErrors.tenureMonths = 'Tenure must be between 3 and 360 months';
    }

    setErrors(nextErrors);

    return {
      isValid: Object.keys(nextErrors).length === 0,
      parsedValues: {
        principal,
        annualInterestRate,
        tenure,
      },
    };
  };

  const calculate = (): void => {
    const { isValid, parsedValues } = validateInputs();
    if (!isValid) {
      return;
    }

    const { principal, annualInterestRate, tenure } = parsedValues;
    const monthlyRate = annualInterestRate / 12 / 100;
    const growthFactor = Math.pow(1 + monthlyRate, tenure);
    const emi = (principal * monthlyRate * growthFactor) / (growthFactor - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    const nextResult: EMIResult = {
      monthlyEMI: roundTo2Decimals(emi),
      totalInterestPayable: roundTo2Decimals(totalInterest),
      totalAmountPayable: roundTo2Decimals(totalAmount),
    };

    setResult(nextResult);
    dispatch(setLastCalculatedResult(nextResult));
  };

  return {
    inputs,
    errors,
    result,
    setInputValue,
    calculate,
  };
};
