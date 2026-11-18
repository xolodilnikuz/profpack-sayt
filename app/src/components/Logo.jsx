// Profpack logotipi (matn bilan: «Prof» qutichada + «pack»). Uslubi — styles.css dagi .logo
export function LogoText() {
  return <><span className="logo__prof">Prof</span><span className="logo__pack">pack</span></>;
}

// bosh sahifaga havola (header va footer)
export function LogoLink({ label }) {
  return <a className="logo" href="#top" aria-label={label}><LogoText /></a>;
}
