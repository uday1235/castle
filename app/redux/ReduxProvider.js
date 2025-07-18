// app/redux/ReduxProvider.js
'use client'; // This is important to ensure this component is treated as a client component

import { Provider } from 'react-redux';
import { store } from './store';

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
