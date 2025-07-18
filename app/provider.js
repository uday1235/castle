'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../redux/store'; // Adjust the path as needed
import { SessionProvider } from "next-auth/react";

export default function CombinedProvider({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </SessionProvider>
  );
}
