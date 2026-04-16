export interface EMIResult {
  monthlyEMI: number;
  totalInterestPayable: number;
  totalAmountPayable: number;
}

export interface EMIFormInputs {
  loanAmount: string;
  interestRate: string;
  tenureMonths: string;
}

export interface EMIFormErrors {
  loanAmount?: string;
  interestRate?: string;
  tenureMonths?: string;
}
