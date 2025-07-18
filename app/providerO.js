// app/providers.js
'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Adjust the path as needed


export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

