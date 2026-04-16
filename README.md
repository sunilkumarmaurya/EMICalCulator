# EMI Calculator
Run with `npm install`, then `npm start`, then `npm run android` (or `npm run ios` on Mac).
This app uses React Native + TypeScript with Redux Toolkit and React Navigation.
Assumption: values are entered as numbers only and currency is shown in INR format.
Assumption: last EMI result is kept in Redux while app is running (not after full restart).
- Validation used: amount > 0, interest 1-36%, tenure 3-360 months.
- EMI is calculated on device using the standard formula, no backend API used.
- I would also add persistence (AsyncStorage), reset button, and better accessibility.

