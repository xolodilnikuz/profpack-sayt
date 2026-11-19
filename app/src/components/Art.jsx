// Mahsulot rasmlari (SVG). Nomi bo‘yicha olinadi: texts/products.js va texts/pages/*.js dagi art.
// Bosh sahifadagi «Mahsulotlar» panellari va alohida sahifalarning bosh ekranida ishlatiladi.
// Eslatma: bitta rasm bitta sahifada faqat bir marta chizilishi kerak (ichidagi id lar takrorlanmasin).
export const ART = {
  // rulon qog‘oz
  roll: (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <defs><linearGradient id="gRoll" x1="0" x2="1"><stop offset="0" stopColor="#9C7245" /><stop offset=".3" stopColor="#CFA36E" /><stop offset=".5" stopColor="#E2C18F" /><stop offset=".78" stopColor="#C39663" /><stop offset="1" stopColor="#8E6640" /></linearGradient></defs>
      <ellipse cx="108" cy="142" rx="70" ry="9" fill="#1B2152" opacity=".16" />
      <path d="M138 116 C150 128 166 134 194 134 L194 142 C164 142 146 136 134 126 Z" fill="#F0DCB9" />
      <path d="M56 38 V118 A44 16 0 0 0 144 118 V38 Z" fill="url(#gRoll)" />
      <ellipse cx="100" cy="38" rx="44" ry="16" fill="#EAD3AC" />
      <g fill="none" stroke="#B88C59" strokeWidth=".9" opacity=".85"><ellipse cx="100" cy="38" rx="38" ry="13.8" /><ellipse cx="100" cy="38" rx="32" ry="11.6" /><ellipse cx="100" cy="38" rx="26" ry="9.4" /><ellipse cx="100" cy="38" rx="20" ry="7.3" /></g>
      <ellipse cx="100" cy="38" rx="13" ry="4.8" fill="#7A5634" />
      <ellipse cx="100" cy="38.8" rx="9.5" ry="3.3" fill="#3E2A18" />
      <rect x="70" y="68" width="28" height="24" rx="1.5" fill="#F6F5F1" />
      <path d="M74 73.5h18M74 77.5h12" stroke="#1B2152" strokeWidth="1.6" />
      <path d="M74 82v6M76 82v6M79 82v6M80.5 82v6M83 82v6M86 82v6M87.5 82v6M90 82v6M92.5 82v6" stroke="#1B2152" strokeWidth="1" />
    </svg>
  ),
  // gofrokarton listlar
  sheets: (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <defs>
        <g id="pSlab">
          <polygon points="100,30 172.74,72 124.24,100 51.5,58" fill="#E6CA9C" />
          <g transform="matrix(.866 .5 0 1 51.5 58)">
            <rect width="84" height="16" fill="#6E4E2E" />
            <rect width="84" height="3" fill="#D7B07B" />
            <rect y="13" width="84" height="3" fill="#C9A06A" />
            <path d="M0 8Q2.625 -2 5.25 8T10.5 8T15.75 8T21 8T26.25 8T31.5 8T36.75 8T42 8T47.25 8T52.5 8T57.75 8T63 8T68.25 8T73.5 8T78.75 8T84 8" fill="none" stroke="#E2C18F" strokeWidth="1.8" />
          </g>
          <g transform="matrix(.866 -.5 0 1 124.24 100)">
            <rect width="56" height="16" fill="#B08455" />
            <rect width="56" height="3" fill="#C59968" />
            <rect y="13" width="56" height="3" fill="#A97E50" />
            <rect y="7.2" width="56" height="1.6" fill="#CFA673" opacity=".7" />
          </g>
        </g>
      </defs>
      <ellipse cx="114" cy="142" rx="68" ry="9" fill="#1B2152" opacity=".16" />
      <use href="#pSlab" transform="translate(6 21)" />
      <use href="#pSlab" />
    </svg>
  ),
  // gofroquti (karobka)
  box: (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <defs><linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8A6440" /><stop offset="1" stopColor="#4B331E" /></linearGradient></defs>
      <ellipse cx="108" cy="146" rx="66" ry="8" fill="#1B2152" opacity=".16" />
      <polygon points="100,50 151.96,80 162.36,53.2 110.4,23.2" fill="#C69A66" />
      <polygon points="100,50 61.03,72.5 50.63,45.7 89.6,23.2" fill="#DDB988" />
      <polygon points="100,50 151.96,80 112.99,102.5 61.03,72.5" fill="url(#gIn)" />
      <polygon points="112.99,102.5 151.96,80 151.96,125 112.99,147.5" fill="#B4895A" />
      <polygon points="61.03,72.5 112.99,102.5 112.99,147.5 61.03,117.5" fill="#D3A876" />
      <polygon points="61.03,72.5 112.99,102.5 94.99,100.9 43.03,70.9" fill="#E9CB9C" />
      <polygon points="112.99,102.5 151.96,80 169.96,78.4 130.99,100.9" fill="#C29463" />
      <path d="M61.03 72.5L112.99 102.5L151.96 80" fill="none" stroke="#F3E2C4" strokeWidth="1" />
      <path d="M61.03 117.5L112.99 147.5L151.96 125" fill="none" stroke="#1B2152" strokeWidth="1" strokeDasharray="3 2.5" opacity=".35" />
    </svg>
  ),
  // brendli quti (logotip bosilgan)
  branded: (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <ellipse cx="110" cy="140" rx="64" ry="8" fill="#1B2152" opacity=".16" />
      <polygon points="100,26 153.69,57 113.85,80 60.16,49" fill="#E3C597" />
      <polygon points="60.16,49 113.85,80 113.85,132 60.16,101" fill="#D3A876" />
      <polygon points="113.85,80 153.69,57 153.69,109 113.85,132" fill="#B38657" />
      <polygon points="84.41,35 138.1,66 129.44,71 75.75,40" fill="#EFDAB2" opacity=".95" />
      <polygon points="138.1,66 129.44,71 129.44,91 138.1,86" fill="#CDA676" />
      <g transform="matrix(.866 .5 0 1 60.16 49)">
        <rect x="7" y="16" width="48" height="14.2" rx="3" fill="none" stroke="#1B2152" strokeWidth="1.3" />
        <rect x="9.1" y="18" width="21.3" height="10.2" rx=".8" fill="#1B2152" />
        <text x="19.75" y="26.4" textAnchor="middle" fontFamily="Saira, sans-serif" fontWeight="600" fontSize="9" fill="#D3A876">Prof</text>
        <text x="43.3" y="26.4" textAnchor="middle" fontFamily="Saira, sans-serif" fontWeight="600" fontSize="9" fill="#1B2152">pack</text>
        <path d="M10 38h26M10 42h18" stroke="#1B2152" strokeWidth="1.4" opacity=".75" />
      </g>
      <g transform="matrix(.866 -.5 0 1 113.85 80)" fill="#1B2152" stroke="#1B2152">
        <path d="M7 20V10M13 20V10" strokeWidth="1.4" fill="none" />
        <path d="M7 6l-2.6 4.4h5.2zM13 6l-2.6 4.4h5.2z" stroke="none" />
        <path d="M4 22.5h12" strokeWidth="1.4" />
        <path d="M23 30l7 12H16z" fill="none" strokeWidth="1.5" strokeDasharray="8 3" />
      </g>
    </svg>
  ),
  // makulatura toyi (taxlab, lenta bilan bog‘langan karton)
  bale: (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <ellipse cx="110" cy="140" rx="64" ry="8" fill="#1B2152" opacity=".16" />
      <polygon points="100,26 153.69,57 113.85,80 60.16,49" fill="#E3C597" />
      <polygon points="60.16,49 113.85,80 113.85,132 60.16,101" fill="#D3A876" />
      <polygon points="113.85,80 153.69,57 153.69,109 113.85,132" fill="#B38657" />
      <g transform="matrix(.866 .5 0 1 60.16 49)" fill="none" stroke="#8E6A43" strokeWidth="1" opacity=".8">
        <path d="M0 6.5h62M0 12h62M0 19.5h62M0 25h62M0 32.5h62M0 38h62M0 45.5h62" />
      </g>
      <g transform="matrix(.866 -.5 0 1 113.85 80)" fill="none" stroke="#7A5634" strokeWidth="1" opacity=".75">
        <path d="M0 6.5h46M0 12h46M0 19.5h46M0 25h46M0 32.5h46M0 38h46M0 45.5h46" />
      </g>
      <g fill="none" stroke="#1B2152" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M75.75 110V58L115.59 35" />
        <path d="M98.26 123V71L138.1 48" />
      </g>
    </svg>
  ),
};
