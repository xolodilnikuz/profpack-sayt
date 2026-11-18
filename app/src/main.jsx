import { createRoot } from 'react-dom/client';
import { LangProvider } from './i18n/LangProvider.jsx';
import App from './App.jsx';
import './styles.css';

// StrictMode ishlatilmaydi: u dev rejimida effektlarni ikki marta ishga tushiradi va
// 3D sahna bitta <canvas> da ikkinchi WebGL renderer yaratib qo‘yardi.
createRoot(document.getElementById('root')).render(
  <LangProvider>
    <App />
  </LangProvider>,
);
