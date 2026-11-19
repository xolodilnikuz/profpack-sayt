import { useCallback, useEffect, useState } from 'react';
import { HOME } from './data/pages.js';
import { TOPICS } from './i18n/texts';
import { OrderProvider } from './components/OrderContext.jsx';
import Header from './components/Header.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import Story from './components/Story.jsx';
import Products from './components/Products.jsx';
import Eco from './components/Eco.jsx';
import Waste from './components/Waste.jsx';
import Why from './components/Why.jsx';
import Calculator from './components/Calculator.jsx';
import HowToOrder from './components/HowToOrder.jsx';
import Faq from './components/Faq.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import TopicPage from './components/TopicPage.jsx';

// Sahifa tuzilishi. page — qaysi sahifa: 'home' (bosh sahifa) yoki alohida sahifa (src/data/pages.js dagi id).
//  • bosh sahifa — bo‘limlar tartibi shu yerda;
//  • alohida sahifalar (karobka, pechat, makulatura …) — bitta qolipda: src/components/TopicPage.jsx.
// Matnlar — src/i18n/texts/, aloqa — src/data/site.js.
export default function App({ page = HOME }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // mobil menyu ochiq bo‘lsa, orqadagi sahifa aylanmaydi (body.menu-open)
  const setMenu = useCallback(open => {
    setMenuOpen(open);
    document.body.classList.toggle('menu-open', open);
  }, []);

  // shriftlar yuklangach (ko‘pi bilan 1,2 s) bosh sarlavha animatsiyasi boshlanadi (.is-loaded)
  useEffect(() => {
    const markLoaded = () => requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
    if (document.fonts) Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1200))]).then(markLoaded);
    else markLoaded();
  }, []);

  const topic = TOPICS[page];
  return (
    // alohida sahifada so‘rov formasidagi «Nima kerak?» shu sahifa mavzusida turadi
    <OrderProvider need={topic && topic.need}>
      <Header menuOpen={menuOpen} setMenu={setMenu} />
      <MobileMenu open={menuOpen} setMenu={setMenu} />
      <main>
        {topic ? <TopicPage id={page} /> : (
          <>
            <Story />
            <Products />
            <Eco />
            <Waste />
            <Why />
            <Calculator />
            <HowToOrder />
            <Faq />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </OrderProvider>
  );
}
