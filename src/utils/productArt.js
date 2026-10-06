// Studio SVG Product Illustration & Formatting Utility
// Generates crisp, deterministic, zero-broken-image studio illustrations for all products and gallery angles.

export function formatPrice(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

function getIllustrationMarkup(type, colorPrimary, colorSecondary, angle = 'front', label = '') {
  const angleTransform =
    angle === 'angle'
      ? 'transform="translate(300,225) rotate(-8) scale(1.04) translate(-300,-225)"'
      : angle === 'detail'
      ? 'transform="translate(300,225) scale(1.24) translate(-300,-220)"'
      : angle === 'spec'
      ? 'transform="translate(300,210) scale(0.92) translate(-300,-210)"'
      : '';

  let artwork = '';

  switch (type) {
    case 'headphones':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="368" rx="115" ry="14" fill="#cbd5e1" opacity="0.55"/>
          <path d="M195 245 C195 130, 405 130, 405 245" fill="none" stroke="${colorPrimary}" stroke-width="22" stroke-linecap="round"/>
          <path d="M210 245 C210 148, 390 148, 390 245" fill="none" stroke="${colorSecondary}" stroke-width="8" stroke-linecap="round"/>
          <rect x="170" y="220" width="44" height="96" rx="22" fill="${colorPrimary}"/>
          <rect x="386" y="220" width="44" height="96" rx="22" fill="${colorPrimary}"/>
          <rect x="184" y="232" width="22" height="72" rx="11" fill="${colorSecondary}"/>
          <rect x="394" y="232" width="22" height="72" rx="11" fill="${colorSecondary}"/>
          <circle cx="192" cy="268" r="6" fill="#ffffff" opacity="0.6"/>
          <circle cx="408" cy="268" r="6" fill="#ffffff" opacity="0.6"/>
        </g>
      `;
      break;

    case 'smartphone':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="378" rx="95" ry="12" fill="#cbd5e1" opacity="0.6"/>
          <rect x="222" y="88" width="156" height="274" rx="24" fill="${colorPrimary}" stroke="#334155" stroke-width="3"/>
          <rect x="230" y="96" width="140" height="258" rx="18" fill="${colorSecondary}"/>
          <rect x="276" y="106" width="48" height="10" rx="5" fill="#0f172a"/>
          <circle cx="300" cy="215" r="46" fill="#ffffff" opacity="0.14"/>
          <circle cx="300" cy="215" r="28" fill="#ffffff" opacity="0.22"/>
          <rect x="248" y="288" width="104" height="10" rx="5" fill="#ffffff" opacity="0.4"/>
          <rect x="264" y="308" width="72" height="8" rx="4" fill="#ffffff" opacity="0.25"/>
        </g>
      `;
      break;

    case 'laptop':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="360" rx="175" ry="15" fill="#cbd5e1" opacity="0.6"/>
          <rect x="165" y="118" width="270" height="178" rx="14" fill="${colorPrimary}"/>
          <rect x="177" y="130" width="246" height="154" rx="8" fill="${colorSecondary}"/>
          <circle cx="300" cy="205" r="36" fill="#ffffff" opacity="0.18"/>
          <path d="M130 296 L470 296 L448 318 L152 318 Z" fill="#64748b"/>
          <rect x="268" y="296" width="64" height="6" rx="3" fill="#94a3b8"/>
        </g>
      `;
      break;

    case 'watch':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="372" rx="85" ry="12" fill="#cbd5e1" opacity="0.55"/>
          <rect x="268" y="88" width="64" height="274" rx="16" fill="${colorSecondary}"/>
          <circle cx="300" cy="225" r="68" fill="${colorPrimary}" stroke="#e2e8f0" stroke-width="5"/>
          <circle cx="300" cy="225" r="54" fill="#0f172a"/>
          <line x1="300" y1="225" x2="300" y2="188" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
          <line x1="300" y1="225" x2="330" y2="238" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="300" cy="225" r="5" fill="#f8fafc"/>
        </g>
      `;
      break;

    case 'camera':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="358" rx="135" ry="14" fill="#cbd5e1" opacity="0.55"/>
          <rect x="235" y="132" width="76" height="32" rx="8" fill="${colorPrimary}"/>
          <rect x="175" y="154" width="250" height="162" rx="22" fill="${colorPrimary}"/>
          <circle cx="308" cy="236" r="56" fill="#334155" stroke="#e2e8f0" stroke-width="5"/>
          <circle cx="308" cy="236" r="38" fill="${colorSecondary}"/>
          <circle cx="296" cy="224" r="10" fill="#ffffff" opacity="0.45"/>
          <rect x="200" y="176" width="28" height="16" rx="4" fill="#94a3b8"/>
        </g>
      `;
      break;

    case 'speaker':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="364" rx="125" ry="14" fill="#cbd5e1" opacity="0.55"/>
          <rect x="182" y="158" width="236" height="148" rx="46" fill="${colorPrimary}"/>
          <circle cx="250" cy="232" r="42" fill="${colorSecondary}" stroke="#ffffff" stroke-width="3" opacity="0.85"/>
          <circle cx="350" cy="232" r="42" fill="${colorSecondary}" stroke="#ffffff" stroke-width="3" opacity="0.85"/>
          <circle cx="250" cy="232" r="16" fill="#0f172a" opacity="0.5"/>
          <circle cx="350" cy="232" r="16" fill="#0f172a" opacity="0.5"/>
        </g>
      `;
      break;

    case 'apparel':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="370" rx="115" ry="13" fill="#cbd5e1" opacity="0.55"/>
          <path d="M228 112 L268 98 L300 124 L332 98 L372 112 L422 178 L384 206 L360 172 L360 336 L240 336 L240 172 L216 206 L178 178 Z" fill="${colorPrimary}"/>
          <path d="M268 98 L300 128 L332 98" fill="none" stroke="${colorSecondary}" stroke-width="6"/>
          <line x1="300" y1="128" x2="300" y2="336" stroke="${colorSecondary}" stroke-width="3" opacity="0.5"/>
        </g>
      `;
      break;

    case 'sneakers':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="348" rx="150" ry="13" fill="#cbd5e1" opacity="0.6"/>
          <path d="M168 278 C168 232, 224 182, 268 182 L316 226 L412 246 C432 252, 442 272, 440 296 L168 296 Z" fill="${colorPrimary}"/>
          <rect x="162" y="290" width="282" height="28" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
          <path d="M225 248 L338 268" stroke="${colorSecondary}" stroke-width="10" stroke-linecap="round"/>
        </g>
      `;
      break;

    case 'appliance':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="368" rx="115" ry="14" fill="#cbd5e1" opacity="0.55"/>
          <rect x="216" y="102" width="168" height="242" rx="28" fill="${colorPrimary}"/>
          <rect x="238" y="128" width="124" height="78" rx="12" fill="${colorSecondary}"/>
          <circle cx="300" cy="167" r="22" fill="#ffffff" opacity="0.25"/>
          <rect x="246" y="232" width="108" height="82" rx="14" fill="#1e293b"/>
          <circle cx="300" cy="272" r="18" fill="${colorSecondary}"/>
        </g>
      `;
      break;

    case 'beauty':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="366" rx="90" ry="12" fill="#cbd5e1" opacity="0.55"/>
          <rect x="282" y="96" width="36" height="44" rx="8" fill="#334155"/>
          <rect x="272" y="136" width="56" height="18" rx="4" fill="#94a3b8"/>
          <rect x="242" y="152" width="116" height="188" rx="26" fill="${colorPrimary}"/>
          <rect x="256" y="196" width="88" height="104" rx="10" fill="#ffffff" opacity="0.9"/>
          <rect x="270" y="222" width="60" height="8" rx="4" fill="${colorSecondary}"/>
          <rect x="276" y="242" width="48" height="6" rx="3" fill="#94a3b8"/>
        </g>
      `;
      break;

    case 'grocery':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="366" rx="105" ry="13" fill="#cbd5e1" opacity="0.55"/>
          <path d="M226 124 L374 124 L390 336 L210 336 Z" rx="18" fill="${colorPrimary}"/>
          <rect x="220" y="108" width="160" height="22" rx="6" fill="${colorSecondary}"/>
          <rect x="240" y="176" width="120" height="110" rx="14" fill="#ffffff" opacity="0.92"/>
          <circle cx="300" cy="222" r="24" fill="${colorSecondary}" opacity="0.85"/>
        </g>
      `;
      break;

    case 'sports':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="366" rx="125" ry="13" fill="#cbd5e1" opacity="0.55"/>
          <rect x="172" y="196" width="48" height="68" rx="12" fill="${colorPrimary}"/>
          <rect x="216" y="180" width="34" height="100" rx="10" fill="${colorSecondary}"/>
          <rect x="250" y="218" width="100" height="24" rx="6" fill="#64748b"/>
          <rect x="350" y="180" width="34" height="100" rx="10" fill="${colorSecondary}"/>
          <rect x="380" y="196" width="48" height="68" rx="12" fill="${colorPrimary}"/>
        </g>
      `;
      break;

    case 'book':
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="368" rx="105" ry="13" fill="#cbd5e1" opacity="0.55"/>
          <rect x="218" y="96" width="172" height="244" rx="10" fill="#e2e8f0"/>
          <rect x="210" y="102" width="172" height="244" rx="10" fill="${colorPrimary}"/>
          <rect x="210" y="102" width="22" height="244" rx="4" fill="${colorSecondary}"/>
          <rect x="252" y="146" width="102" height="12" rx="6" fill="#ffffff" opacity="0.9"/>
          <rect x="252" y="170" width="76" height="10" rx="5" fill="#ffffff" opacity="0.65"/>
          <circle cx="302" cy="254" r="34" fill="#ffffff" opacity="0.22"/>
        </g>
      `;
      break;

    case 'bag':
    default:
      artwork = `
        <g ${angleTransform}>
          <ellipse cx="300" cy="366" rx="120" ry="14" fill="#cbd5e1" opacity="0.55"/>
          <path d="M254 152 C254 106, 346 106, 346 152" fill="none" stroke="${colorSecondary}" stroke-width="14" stroke-linecap="round"/>
          <rect x="196" y="150" width="208" height="186" rx="26" fill="${colorPrimary}"/>
          <path d="M196 196 Q300 236 404 196" fill="none" stroke="${colorSecondary}" stroke-width="6"/>
          <rect x="284" y="202" width="32" height="26" rx="6" fill="#f8fafc"/>
        </g>
      `;
      break;
  }

  const angleBadge =
    angle === 'angle'
      ? 'Studio Perspective'
      : angle === 'detail'
      ? 'Close-Up Craftsmanship'
      : angle === 'spec'
      ? 'Edition & Dimensions'
      : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="65%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#f1f5f9"/>
      </radialGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bg)"/>
    <circle cx="300" cy="215" r="155" fill="${colorPrimary}" opacity="0.06"/>
    ${artwork}
    ${
      angleBadge
        ? `<text x="300" y="416" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#64748b" letter-spacing="0.04em">${angleBadge} · ${label}</text>`
        : ''
    }
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function createProductGallery(type, colorPrimary, colorSecondary, shortLabel, primaryPhoto = null) {
  const front = primaryPhoto || getIllustrationMarkup(type, colorPrimary, colorSecondary, 'front', shortLabel);
  const angle = getIllustrationMarkup(type, colorPrimary, colorSecondary, 'angle', shortLabel);
  const detail = getIllustrationMarkup(type, colorPrimary, colorSecondary, 'detail', shortLabel);
  const spec = getIllustrationMarkup(type, colorPrimary, colorSecondary, 'spec', shortLabel);

  return {
    image: front,
    images: [front, angle, detail, spec]
  };
}
