
// Loan types
export type LoanType = 'personal' | 'home' | 'auto' | 'education' | 'business';

// User financial profile
export interface FinancialProfile {
  income: number;
  creditScore: number;
  employmentMonths: number;
  existingLoans: number;
  debtToIncomeRatio?: number;
}

// Loan offer details
export interface LoanOffer {
  amount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  eligibility: 'high' | 'medium' | 'low' | 'ineligible';
}

// Check loan eligibility
export const checkEligibility = (
  profile: FinancialProfile, 
  loanType: LoanType,
  requestedAmount: number
): LoanOffer | null => {
  // Calculate debt-to-income ratio if not provided
  const dti = profile.debtToIncomeRatio || 
    (profile.existingLoans / (profile.income / 12)) * 100;

  // Basic eligibility criteria
  let eligible = true;
  let eligibilityScore = 0;

  // Credit score check
  if (profile.creditScore < 580) {
    eligible = false;
  } else if (profile.creditScore >= 580 && profile.creditScore < 670) {
    eligibilityScore += 1; // Low
  } else if (profile.creditScore >= 670 && profile.creditScore < 740) {
    eligibilityScore += 2; // Medium
  } else {
    eligibilityScore += 3; // High
  }

  // Income check (simplified)
  const minimumIncome = {
    personal: 20000,
    home: 50000,
    auto: 30000,
    education: 20000,
    business: 60000
  };

  if (profile.income < minimumIncome[loanType]) {
    eligible = false;
  } else if (profile.income >= minimumIncome[loanType] * 2) {
    eligibilityScore += 3; // High
  } else if (profile.income >= minimumIncome[loanType] * 1.5) {
    eligibilityScore += 2; // Medium
  } else {
    eligibilityScore += 1; // Low
  }

  // Employment history
  if (profile.employmentMonths < 6) {
    eligible = false;
  } else if (profile.employmentMonths >= 24) {
    eligibilityScore += 3; // High
  } else if (profile.employmentMonths >= 12) {
    eligibilityScore += 2; // Medium
  } else {
    eligibilityScore += 1; // Low
  }

  // DTI check
  if (dti > 43) {
    eligible = false;
  } else if (dti <= 28) {
    eligibilityScore += 3; // High
  } else if (dti <= 36) {
    eligibilityScore += 2; // Medium
  } else {
    eligibilityScore += 1; // Low
  }

  // Return null if ineligible
  if (!eligible) {
    return null;
  }

  // Determine interest rate based on eligibility score
  let interestRate = 0;
  let eligibilityLevel: 'high' | 'medium' | 'low' | 'ineligible' = 'ineligible';

  if (eligibilityScore >= 10) {
    interestRate = getBaseRate(loanType) + 0;
    eligibilityLevel = 'high';
  } else if (eligibilityScore >= 7) {
    interestRate = getBaseRate(loanType) + 2;
    eligibilityLevel = 'medium';
  } else {
    interestRate = getBaseRate(loanType) + 4;
    eligibilityLevel = 'low';
  }

  // Calculate loan details
  const termMonths = getDefaultTerm(loanType);
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = 
    (requestedAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - requestedAmount;

  return {
    amount: requestedAmount,
    interestRate,
    termMonths,
    monthlyPayment,
    totalInterest,
    totalPayment,
    eligibility: eligibilityLevel
  };
};

// Get base interest rate by loan type
const getBaseRate = (loanType: LoanType): number => {
  const baseRates = {
    personal: 7.5,
    home: 4.5,
    auto: 5.5,
    education: 5.0,
    business: 6.5
  };
  return baseRates[loanType];
};

// Get default loan term by loan type
const getDefaultTerm = (loanType: LoanType): number => {
  const terms = {
    personal: 36,
    home: 360,
    auto: 60,
    education: 120,
    business: 60
  };
  return terms[loanType];
};

// Calculate monthly payment
export const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  termMonths: number
): number => {
  const monthlyRate = annualRate / 100 / 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
};
