import { useHomeHref } from './useNav.js';

// Profpack logotipi (matn bilan: «Prof» qutichada + «pack»). Uslubi — styles.css dagi .logo
export function LogoText() {
  return <><span className="logo__prof">Prof</span><span className="logo__pack">pack</span></>;
}

// bosh sahifaga havola (header va footer): bosh sahifada — tepaga, alohida sahifalarda — bosh sahifaga
export function LogoLink({ label }) {
  return <a className="logo" href={useHomeHref()} aria-label={label}><LogoText /></a>;
}
