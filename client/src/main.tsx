import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './sass/main.scss';
import { StoreProvider } from './context/storeContext.tsx';
import { configureStore } from './redux/store/configureStore.ts';
import { Provider } from 'react-redux';

const store = configureStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </StoreProvider>
  </StrictMode>
);
