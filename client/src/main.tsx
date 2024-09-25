import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { store } from './redux/store/configureStore.ts';
import './sass/main.scss';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <StoreProvider>
  <Provider store={store}>
    <App />
  </Provider>
  //   </StoreProvider>
  // </StrictMode>
);
