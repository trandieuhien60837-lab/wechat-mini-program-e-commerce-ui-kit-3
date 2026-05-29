import React from 'react';

interface ProductImageProps {
  type: string;
  className?: string;
  showOrangeHighlight?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  type,
  className = "w-full h-full",
  showOrangeHighlight = true,
}) => {
  // Common colors
  const strokeColor = "#333333";
  const primaryColor = showOrangeHighlight ? "#FF7A2F" : "#333333";
  const lightGrey = "#F5F5F5";
  const softBg = "#FBFBFB";

  // Match illustration based on key
  switch (type) {
    case 'humidifier':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Steam puffs */}
          <path d="M50,15 C48,22 52,22 50,30" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
          <path d="M45,18 C43,24 47,24 45,31" stroke="#999999" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
          <path d="M55,18 C53,24 57,24 55,31" stroke="#999999" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
          {/* Main body of humidifier */}
          <rect x="35" y="35" width="30" height="40" rx="4" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
          <line x1="35" y1="45" x2="65" y2="45" stroke={strokeColor} strokeWidth="1.5" />
          {/* Light indicator / branding strip */}
          <rect x="42" y="55" width="16" height="2" rx="1" fill={primaryColor} />
          <circle cx="50" cy="65" r="1.5" fill="#CCCCCC" />
        </svg>
      );

    case 'lamp':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Light rays glow */}
          <circle cx="50" cy="35" r="18" fill={showOrangeHighlight ? "rgba(255, 122, 47, 0.08)" : "transparent"} />
          {/* Head & Neck */}
          <path d="M35,65 L50,35 L65,35" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="58" y="28" width="14" height="14" rx="3" transform="rotate(20 58 28)" fill="#FFFFFF" stroke={strokeColor} strokeWidth="2" />
          {/* Wooden pole */}
          <line x1="35" y1="65" x2="35" y2="78" stroke={strokeColor} strokeWidth="2" />
          {/* Wooden base */}
          <rect x="25" y="78" width="20" height="4" rx="1" fill={primaryColor} />
          <line x1="22" y1="82" x2="48" y2="82" stroke={strokeColor} strokeWidth="2" />
          {/* Tiny turn switch */}
          <circle cx="62" cy="35" r="1" fill={primaryColor} />
        </svg>
      );

    case 'headphones':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Headband */}
          <path d="M30,55 C30,30 70,30 70,55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Earcups */}
          <rect x="24" y="50" width="8" height="18" rx="3" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
          <rect x="68" y="50" width="8" height="18" rx="3" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
          {/* Inner metal sliders */}
          <line x1="28" y1="45" x2="28" y2="50" stroke={primaryColor} strokeWidth="2" />
          <line x1="72" y1="45" x2="72" y2="50" stroke={primaryColor} strokeWidth="2" />
          {/* Control details */}
          <circle cx="28" cy="62" r="1" fill={strokeColor} />
          <circle cx="72" cy="62" r="1" fill={strokeColor} />
        </svg>
      );

    case 'bottle':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Cap */}
          <rect x="43" y="24" width="14" height="6" rx="1" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
          <line x1="43" y1="27" x2="57" y2="27" stroke={primaryColor} strokeWidth="1" />
          {/* Collar */}
          <rect x="41" y="30" width="18" height="4" rx="1.5" stroke={strokeColor} strokeWidth="2" fill={primaryColor} />
          {/* Mug/Bottle body */}
          <path d="M38,36 C38,34 62,34 62,36 L62,72 C62,75 60,77 57,77 L43,77 C40,77 38,75 38,72 Z" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
          {/* Minimal design details */}
          <line x1="46" y1="48" x2="54" y2="48" stroke="#E5E5E5" strokeWidth="1" />
          <line x1="46" y1="52" x2="54" y2="52" stroke="#E5E5E5" strokeWidth="1" />
          <circle cx="50" cy="62" r="2.5" fill={primaryColor} />
        </svg>
      );

    case 'scrub':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Tub Lid */}
          <ellipse cx="50" cy="35" rx="20" ry="4" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
          {/* Tub Body */}
          <path d="M30,35 C30,35 32,70 50,70 C68,70 70,35 70,35" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFFFFF" />
          {/* Accent Label */}
          <rect x="38" y="44" width="24" height="12" rx="1" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="42" y1="50" x2="58" y2="50" stroke={primaryColor} strokeWidth="1.5" />
          {/* Pine tree minimal illustration on label */}
          <path d="M50,45 L47,49 H53 L50,45 Z" fill={primaryColor} />
        </svg>
      );

    case 'shirt':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Shirt Outlines */}
          <path d="M30,28 L40,24 L45,28 L55,28 L60,24 L70,28 L66,42 L58,40 L58,78 L42,78 L42,40 L34,42 Z" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" fill="#FFFFFF" />
          {/* Collar seam */}
          <path d="M45,28 C45,31 55,31 55,28" stroke={primaryColor} strokeWidth="1.5" />
          {/* Hanger loop */}
          <path d="M50,23 C50,20 48,19 49,17" stroke="#999999" strokeWidth="1.2" />
          {/* Pocket or waffle texture concept represented as fine dots/grid */}
          <line x1="45" y1="46" x2="55" y2="46" stroke={lightGrey} strokeWidth="1" strokeDasharray="1 1" />
          <line x1="45" y1="50" x2="55" y2="50" stroke={lightGrey} strokeWidth="1" strokeDasharray="1 1" />
          <line x1="45" y1="54" x2="55" y2="54" stroke={lightGrey} strokeWidth="1" strokeDasharray="1 1" />
        </svg>
      );

    case 'wallet':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Standard bi-fold wallet drawing */}
          <rect x="28" y="32" width="44" height="34" rx="4" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
          {/* Back layer curve */}
          <path d="M28,36 H72" stroke={strokeColor} strokeWidth="1.5" />
          {/* Hand sewn stitch line */}
          <path d="M31,35 V63 H69 V35" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="2 2" />
          {/* Brass snap button */}
          <circle cx="62" cy="49" r="3" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="62" cy="49" r="1.2" fill={primaryColor} />
        </svg>
      );

    case 'cup':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Handle */}
          <path d="M62,42 C70,42 70,58 62,58" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Mug body */}
          <path d="M34,35 C34,32 62,32 62,35 L60,68 C60,72 58,74 54,74 L42,74 C38,74 36,72 36,68 Z" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" strokeLinejoin="round" />
          {/* Dynamic Steam */}
          <path d="M42,22 C41,26 44,26 43,30" stroke="#CCCCCC" strokeWidth="1" strokeLinecap="round" />
          <path d="M48,19 C47,24 50,24 49,29" stroke={primaryColor} strokeWidth="1" strokeLinecap="round" />
          <path d="M54,22 C53,26 56,26 55,30" stroke="#CCCCCC" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    case 'bag':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Straps */}
          <path d="M40,36 C40,20 48,20 48,36" stroke={strokeColor} strokeWidth="2" fill="none" />
          <path d="M52,36 C52,20 60,20 60,36" stroke={strokeColor} strokeWidth="2" fill="none" />
          {/* Canvas bag main body */}
          <path d="M30,36 L70,36 L66,80 L34,80 Z" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" fill="#FFFFFF" />
          {/* Simple leaf icon / eco sign in orange */}
          <circle cx="50" cy="58" r="8" stroke="#E5E5E5" strokeWidth="1" />
          <path d="M47,61 C47,56 50,55 53,55" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M53,55 C53,60 50,61 47,61" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <line x1="47" y1="61" x2="53" y2="55" stroke={primaryColor} strokeWidth="1.5" />
        </svg>
      );

    case 'spoon':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Spoon 1 */}
          <g transform="translate(15, 10) rotate(15)">
            <path d="M25,65 C25,75 35,75 35,65 L33,25 C33,23 27,23 27,25 Z" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
            <ellipse cx="30" cy="65" rx="4" ry="6" fill={primaryColor} opacity="0.1" />
          </g>
          {/* Spoon 2 - horizontal overlay */}
          <g transform="translate(45, 15) rotate(-35)">
            <path d="M25,65 C25,75 35,75 35,65 L33,25 C33,23 27,23 27,25 Z" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
            <circle cx="30" cy="65" r="2" fill={primaryColor} />
          </g>
        </svg>
      );

    case 'bookmark':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Brass Ribbon/Bookmark */}
          <rect x="42" y="24" width="16" height="52" rx="2" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
          {/* Engraving lines */}
          <circle cx="50" cy="34" r="3" stroke={primaryColor} strokeWidth="1.5" />
          <line x1="47" y1="46" x2="53" y2="46" stroke="#999999" strokeWidth="1.2" />
          <line x1="45" y1="52" x2="55" y2="52" stroke="#999999" strokeWidth="1.2" />
          <line x1="47" y1="58" x2="53" y2="58" stroke="#999999" strokeWidth="1.2" />
          {/* Book tassle */}
          <path d="M50,24 C50,15 54,12 56,15" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'glass':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          {/* Outer Glass */}
          <path d="M35,28 L38,72 C38,75 41,77 44,77 L56,77 C59,77 62,75 62,72 L65,28 Z" stroke={strokeColor} strokeWidth="2" fill="none" strokeLinejoin="round" />
          {/* Inner wall */}
          <path d="M39,32 L41,68 C41,70 43,72 45,72 L55,72 C57,72 59,70 59,68 L61,32 Z" stroke={strokeColor} strokeWidth="1.5" fill="#FFFFFF" strokeLinejoin="round" />
          {/* Water level wavy line or highlights */}
          <path d="M41,50 Q45,48 50,50 T59,50" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />
          {/* Floating Bubble */}
          <circle cx="45" cy="40" r="1.5" fill="#E5E5E5" />
          <circle cx="54" cy="43" r="1" fill="#E5E5E5" />
        </svg>
      );

    default:
      // Fallback empty box
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="8" fill={softBg} />
          <rect x="30" y="30" width="40" height="40" rx="4" stroke="#999999" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M30,30 L70,70 M70,30 L30,70" stroke="#CCCCCC" strokeWidth="1" />
        </svg>
      );
  }
};
