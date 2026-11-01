import QRCodeStyling from 'qr-code-styling';
import type {
  Options,
  DotType,
  CornerSquareType,
  CornerDotType,
  ErrorCorrectionLevel,
} from 'qr-code-styling';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { getInfronixLogoDataUri } from '../components/BrandLogo';

export interface CustomQROptions {
  url: string;
  size?: number;
  dotColor?: string;
  cornerColor?: string;
  backgroundColor?: string;
  includeLogo?: boolean;
  dotType?: DotType;
  cornerType?: CornerSquareType;
  cornerDotType?: CornerDotType;
  errorCorrectionLevel?: ErrorCorrectionLevel;
}

export const createQRStylingInstance = (options: CustomQROptions): QRCodeStyling => {
  const {
    url,
    size = 1000,
    dotColor = '#0066FF',
    cornerColor = '#00D4FF',
    backgroundColor = '#040914',
    includeLogo = true,
    dotType = 'rounded',
    cornerType = 'extra-rounded',
    cornerDotType = 'dot',
    errorCorrectionLevel = 'H',
  } = options;

  const qrConfig: Options = {
    width: size,
    height: size,
    type: 'canvas',
    data: url,
    image: includeLogo ? getInfronixLogoDataUri() : undefined,
    margin: 16,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: errorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.28,
      margin: 6,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: dotColor,
      type: dotType,
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      color: cornerColor,
      type: cornerType,
    },
    cornersDotOptions: {
      color: cornerColor,
      type: cornerDotType,
    },
  };

  return new QRCodeStyling(qrConfig);
};

/**
 * Generate print-ready SVG string using standard robust QRCode engine
 */
export const generatePrintSvgString = async (
  url: string,
  options: {
    darkColor?: string;
    lightColor?: string;
    margin?: number;
    includeCenterEmblem?: boolean;
  } = {}
): Promise<string> => {
  const {
    darkColor = '#0066FF',
    lightColor = '#040914',
    margin = 2,
    includeCenterEmblem = true,
  } = options;

  const baseSvg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin,
    color: {
      dark: darkColor,
      light: lightColor,
    },
  });

  if (!includeCenterEmblem) {
    return baseSvg;
  }

  // Calculate coordinates to safely embed the center vector logo within the 30% H-level tolerance
  const viewBoxMatch = baseSvg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1].split(' ').map(Number) : [0, 0, 100, 100];
  const totalW = viewBox[2];
  const totalH = viewBox[3];
  const centerSize = Math.round(totalW * 0.22);
  const centerX = (totalW - centerSize) / 2;
  const centerY = (totalH - centerSize) / 2;

  const emblem = `
    <!-- INFRONIX Brand Emblem -->
    <rect x="${centerX - 0.8}" y="${centerY - 0.8}" width="${centerSize + 1.6}" height="${centerSize + 1.6}" rx="5" fill="${lightColor}" stroke="${darkColor}" stroke-width="0.8" />
    <g transform="translate(${centerX}, ${centerY})">
      <svg width="${centerSize}" height="${centerSize}" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="qr-svg-grad-${Math.random().toString(36).substring(2, 7)}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00F0FF" />
            <stop offset="100%" stop-color="#0066FF" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="88" height="88" rx="20" fill="#0A1428" stroke="#00D4FF" stroke-width="2"/>
        <path d="M30 28 H40 V72 H30 Z" fill="#00D4FF" />
        <path d="M48 30 L66 70 H56 L44 42 Z" fill="#0066FF" />
        <path d="M66 30 L48 70 H58 L72 38 Z" fill="#00D4FF" />
        <circle cx="56" cy="50" r="4" fill="#FFFFFF" />
      </svg>
    </g>
  `;

  return baseSvg.replace('</svg>', `${emblem}</svg>`);
};

/**
 * Validates scan readability using jsQR in browser context
 */
export const validateQrCanvas = (canvas: HTMLCanvasElement): { success: boolean; data?: string; error?: string } => {
  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) return { success: false, error: 'Could not acquire 2D canvas context' };

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'attemptBoth',
    });

    if (code && code.data) {
      return { success: true, data: code.data };
    }
    return { success: false, error: 'QR pattern could not be recognized by decoder.' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown validation error';
    return { success: false, error: message };
  }
};
