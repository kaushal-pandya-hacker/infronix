import React, { useState, useEffect, useRef, useId, useCallback } from 'react';
import {
  Download,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  ShieldCheck,
  AlertCircle,
  Eye,
  Printer,
  X,
  Link as LinkIcon
} from 'lucide-react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { siteConfig } from '../config/siteConfig';
import { generatePrintSvgString } from '../utils/qrGenerator';

interface AdminQRStudioProps {
  onClose: () => void;
}

export const AdminQRStudio: React.FC<AdminQRStudioProps> = ({ onClose }) => {
  // Configurable states
  const [encodedUrl, setEncodedUrl] = useState<string>(siteConfig.publishedUrl);
  const [colorTheme, setColorTheme] = useState<'dark-electric' | 'print-white' | 'cyan-glow'>('dark-electric');
  const [includeCenterLogo, setIncludeCenterLogo] = useState<boolean>(true);
  const [pixelSize, setPixelSize] = useState<number>(1024);
  const [margin, setMargin] = useState<number>(2);
  
  // Status states
  const [scanResult, setScanResult] = useState<{
    tested: boolean;
    success: boolean;
    decodedText?: string;
    matches: boolean;
    error?: string;
  }>({
    tested: false,
    success: false,
    matches: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const printAreaRef = useRef<HTMLDivElement | null>(null);
  const previewCanvasId = useId();

  // Color mapping based on theme
  const getThemeColors = useCallback(() => {
    switch (colorTheme) {
      case 'print-white':
        return {
          dark: '#050B18',      // Midnight black/navy
          light: '#FFFFFF',     // Pure white for crisp physical paper print
        };
      case 'cyan-glow':
        return {
          dark: '#00D4FF',      // Neon cyber cyan
          light: '#040914',     // Dark navy
        };
      case 'dark-electric':
      default:
        return {
          dark: '#0066FF',      // Electric blue
          light: '#040914',     // Dark navy
        };
    }
  }, [colorTheme]);

  // Generate canvas QR and validate live with jsQR
  const renderAndVerifyQR = useCallback(async () => {
    setIsGenerating(true);
    try {
      const colors = getThemeColors();
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Render standard high-error-correction QR onto canvas
      await QRCode.toCanvas(canvas, encodedUrl, {
        width: 480,
        margin: margin,
        errorCorrectionLevel: 'H',
        color: {
          dark: colors.dark,
          light: colors.light,
        },
      });

      // If center logo requested, draw safe center emblem onto canvas
      if (includeCenterLogo) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          const centerSize = Math.round(w * 0.22);
          const x = (w - centerSize) / 2;
          const y = (h - centerSize) / 2;

          // Background rounded protective shield
          ctx.save();
          ctx.fillStyle = colors.light;
          ctx.strokeStyle = colors.dark;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x - 3, y - 3, centerSize + 6, centerSize + 6, 12);
          ctx.fill();
          ctx.stroke();

          // Inner emblem dark box
          ctx.fillStyle = '#0B1528';
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, centerSize - 4, centerSize - 4, 8);
          ctx.fill();

          // Draw stylized Infronix "I-X" icon
          const scale = centerSize / 100;
          ctx.save();
          ctx.translate(x + 2, y + 2);
          ctx.scale(scale, scale);

          // "I" bar
          ctx.fillStyle = '#0066FF';
          ctx.fillRect(28, 28, 12, 44);

          // Diagonal "X" crossbars
          ctx.fillStyle = '#00D4FF';
          ctx.beginPath();
          ctx.moveTo(48, 28);
          ctx.lineTo(68, 72);
          ctx.lineTo(58, 72);
          ctx.lineTo(44, 42);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#0066FF';
          ctx.beginPath();
          ctx.moveTo(68, 28);
          ctx.lineTo(48, 72);
          ctx.lineTo(58, 72);
          ctx.lineTo(74, 38);
          ctx.closePath();
          ctx.fill();

          // Center glowing node
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(58, 50, 4.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
          ctx.restore();
        }
      }

      // Live jsQR decode verification test
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const decoded = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth',
        });

        if (decoded && decoded.data) {
          setScanResult({
            tested: true,
            success: true,
            decodedText: decoded.data,
            matches: decoded.data.trim() === encodedUrl.trim(),
          });
        } else {
          setScanResult({
            tested: true,
            success: false,
            error: 'Decoder could not read image. Try increasing margin or turning off logo.',
            matches: false,
          });
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error during QR generation';
      setScanResult({
        tested: true,
        success: false,
        error: msg,
        matches: false,
      });
    } finally {
      setIsGenerating(false);
    }
  }, [encodedUrl, getThemeColors, includeCenterLogo, margin]);

  useEffect(() => {
    renderAndVerifyQR();
  }, [renderAndVerifyQR]);

  // Download High-Res PNG
  const downloadPng = async () => {
    try {
      const colors = getThemeColors();
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = pixelSize;
      exportCanvas.height = pixelSize;

      await QRCode.toCanvas(exportCanvas, encodedUrl, {
        width: pixelSize,
        margin: margin,
        errorCorrectionLevel: 'H',
        color: {
          dark: colors.dark,
          light: colors.light,
        },
      });

      if (includeCenterLogo) {
        const ctx = exportCanvas.getContext('2d');
        if (ctx) {
          const w = exportCanvas.width;
          const h = exportCanvas.height;
          const centerSize = Math.round(w * 0.22);
          const x = (w - centerSize) / 2;
          const y = (h - centerSize) / 2;

          ctx.save();
          ctx.fillStyle = colors.light;
          ctx.strokeStyle = colors.dark;
          ctx.lineWidth = Math.max(3, Math.round(pixelSize * 0.005));
          ctx.beginPath();
          ctx.roundRect(x - 4, y - 4, centerSize + 8, centerSize + 8, 24);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#0B1528';
          ctx.beginPath();
          ctx.roundRect(x + 4, y + 4, centerSize - 8, centerSize - 8, 16);
          ctx.fill();

          const scale = centerSize / 100;
          ctx.save();
          ctx.translate(x + 4, y + 4);
          ctx.scale(scale, scale);

          ctx.fillStyle = '#0066FF';
          ctx.fillRect(28, 28, 12, 44);

          ctx.fillStyle = '#00D4FF';
          ctx.beginPath();
          ctx.moveTo(48, 28);
          ctx.lineTo(68, 72);
          ctx.lineTo(58, 72);
          ctx.lineTo(44, 42);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#0066FF';
          ctx.beginPath();
          ctx.moveTo(68, 28);
          ctx.lineTo(48, 72);
          ctx.lineTo(58, 72);
          ctx.lineTo(74, 38);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(58, 50, 4.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
          ctx.restore();
        }
      }

      const pngUrl = exportCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `infronix-qr-${colorTheme}-${pixelSize}x${pixelSize}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('PNG export failed', err);
    }
  };

  // Download Print-Quality Scalable Vector Graphics (SVG)
  const downloadSvg = async () => {
    try {
      const colors = getThemeColors();
      const svgString = await generatePrintSvgString(encodedUrl, {
        darkColor: colors.dark,
        lightColor: colors.light,
        margin: margin,
        includeCenterEmblem: includeCenterLogo,
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `infronix-qr-print-${colorTheme}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('SVG export failed', err);
    }
  };

  const copyUrlToClipboard = async () => {
    await navigator.clipboard.writeText(encodedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 rounded-3xl bg-[#070E1C] border border-[#1A2A48] shadow-2xl shadow-blue-950/80 p-6 md:p-8 text-[#F0F6FF]">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#14233C]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0066FF]/20 text-[#00D4FF] text-xs font-semibold uppercase tracking-wider border border-[#0066FF]/40">
                White-Label Generator
              </span>
              <span className="text-xs text-[#8EA7CC]">Direct URL Encoding</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>INFRONIX Smart QR Studio</span>
            </h2>
            <p className="text-xs text-[#8EA7CC] mt-1">
              Encodes the official landing page into print-ready SVG and high-resolution PNG with real-time decode verification.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close QR Studio"
            className="p-2 rounded-xl bg-[#0D182B] hover:bg-[#162744] text-[#8EA7CC] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Target URL (Strictly landing page requirement) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[#00D4FF]" />
                  Encoded Landing Page URL
                </span>
                <span className="text-[11px] text-[#00D4FF] font-medium">Must be Landing Page</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="url"
                  value={encodedUrl}
                  onChange={(e) => setEncodedUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-20 rounded-xl bg-[#0B1528] border border-[#1B2B48] text-xs font-mono text-cyan-200 focus:outline-none focus:border-[#00D4FF] transition-colors"
                  placeholder="https://..."
                />
                <button
                  onClick={copyUrlToClipboard}
                  className="absolute right-2 px-2.5 py-1 rounded-lg bg-[#122038] hover:bg-[#1A2E50] text-[11px] text-[#8EA7CC] hover:text-white transition-all flex items-center gap-1"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#7187AA]">
                Current default is synced from <code className="text-[#00D4FF]">siteConfig.publishedUrl</code>.
              </p>
            </div>

            {/* Styling & Color Themes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#0066FF]" />
                Brand Color Preset
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setColorTheme('dark-electric')}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                    colorTheme === 'dark-electric'
                      ? 'border-[#0066FF] bg-[#0066FF]/15 text-white shadow-md shadow-blue-900/30'
                      : 'border-[#162540] bg-[#0A1324] text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0066FF] border border-blue-400" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#040914] border border-slate-700" />
                  </div>
                  <div className="font-semibold text-white">Dark Electric</div>
                  <div className="text-[10px] text-slate-400">Navy + Electric Blue</div>
                </button>

                <button
                  type="button"
                  onClick={() => setColorTheme('cyan-glow')}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                    colorTheme === 'cyan-glow'
                      ? 'border-[#00D4FF] bg-[#00D4FF]/15 text-white shadow-md shadow-cyan-900/30'
                      : 'border-[#162540] bg-[#0A1324] text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#00D4FF] border border-cyan-300" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#040914] border border-slate-700" />
                  </div>
                  <div className="font-semibold text-white">Cyber Cyan</div>
                  <div className="text-[10px] text-slate-400">Neon Cyan + Navy</div>
                </button>

                <button
                  type="button"
                  onClick={() => setColorTheme('print-white')}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                    colorTheme === 'print-white'
                      ? 'border-white bg-white/10 text-white shadow-md'
                      : 'border-[#162540] bg-[#0A1324] text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#050B18] border border-slate-600" />
                    <span className="w-3.5 h-3.5 rounded-full bg-white border border-slate-300" />
                  </div>
                  <div className="font-semibold text-white">Print Classic</div>
                  <div className="text-[10px] text-slate-400">Crisp Paper White</div>
                </button>
              </div>
            </div>

            {/* Logo and Error Correction Switches */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#091222] border border-[#162540] cursor-pointer hover:border-slate-600">
                <span className="text-xs font-medium text-slate-200">
                  Embed Center Logo
                </span>
                <input
                  type="checkbox"
                  checked={includeCenterLogo}
                  onChange={(e) => setIncludeCenterLogo(e.target.checked)}
                  className="w-4 h-4 accent-[#0066FF] cursor-pointer"
                />
              </label>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#091222] border border-[#162540]">
                <span className="text-xs font-medium text-slate-200">
                  Error Correction
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0066FF]/20 text-[#00D4FF] text-xs font-mono font-bold">
                  Level H (30%)
                </span>
              </div>
            </div>

            {/* Resolution & Margin Selectors */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  PNG Export Resolution:
                </span>
                <div className="flex gap-2">
                  {[1024, 2048, 4096].map((res) => (
                    <button
                      key={res}
                      type="button"
                      onClick={() => setPixelSize(res)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                        pixelSize === res
                          ? 'bg-[#0066FF] text-white font-bold'
                          : 'bg-[#0B1528] text-slate-400 hover:text-white border border-[#182844]'
                      }`}
                    >
                      {res}px
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Quiet Zone (Margin):
                </span>
                <div className="flex gap-2">
                  {[1, 2, 4].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMargin(m)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                        margin === m
                          ? 'bg-[#0066FF] text-white font-bold'
                          : 'bg-[#0B1528] text-slate-400 hover:text-white border border-[#182844]'
                      }`}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: SVG & PNG Downloads */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                onClick={downloadPng}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0055DD] text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG ({pixelSize}px)</span>
              </button>

              <button
                onClick={downloadSvg}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0D182B] hover:bg-[#13223D] border border-[#00D4FF]/40 text-[#00D4FF] font-semibold text-xs transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Vector SVG</span>
              </button>
            </div>

            {/* Print Standee / Table Card Button */}
            <div className="pt-1">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#081120] hover:bg-[#0F1D36] border border-[#1B2C4B] text-slate-300 text-xs font-medium transition-colors"
              >
                <Printer className="w-4 h-4 text-[#00D4FF]" />
                <span>Print Physical Standee / Event Card</span>
              </button>
            </div>
          </div>

          {/* Live Preview & Verification Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between p-5 rounded-2xl bg-[#040914] border border-[#162542]">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#00D4FF]" />
                Live Generated Canvas
              </span>
              <button
                onClick={renderAndVerifyQR}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Re-render & Scan"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Display Box for Canvas */}
            <div
              ref={printAreaRef}
              className={`relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all ${
                colorTheme === 'print-white'
                  ? 'bg-white text-slate-900 border border-slate-300 shadow-xl'
                  : 'bg-[#040914] text-white border border-[#162744] shadow-xl'
              }`}
            >
              {/* Printable header if printed */}
              <div className="hidden print:block text-center mb-2">
                <h3 className="font-bold text-lg">{siteConfig.name}</h3>
                <p className="text-xs text-slate-600">Scan to Connect with our Agency</p>
              </div>

              <canvas
                id={previewCanvasId}
                ref={canvasRef}
                className="max-w-full h-auto rounded-xl shadow-md"
                style={{ width: '260px', height: '260px' }}
              />

              {/* Printable footer if printed */}
              <div className="hidden print:block text-center mt-2">
                <p className="text-[10px] text-slate-500 font-mono">{encodedUrl}</p>
              </div>
            </div>

            {/* Verification Status Card */}
            <div className="w-full mt-4 p-3.5 rounded-xl bg-[#091325] border border-[#192A4A] text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
                  jsQR Decoder Verification
                </span>
                {scanResult.tested && (
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      scanResult.matches
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                    }`}
                  >
                    {scanResult.matches ? '100% VERIFIED' : 'FAILED'}
                  </span>
                )}
              </div>

              {scanResult.tested ? (
                scanResult.matches ? (
                  <div className="space-y-1">
                    <p className="text-[11px] text-emerald-300 leading-snug">
                      ✓ QR decoded successfully by computer vision decoder.
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">
                      Payload: {scanResult.decodedText}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      Payload mismatch or scan failed: {scanResult.error}
                    </p>
                  </div>
                )
              ) : (
                <p className="text-[11px] text-slate-400">Verifying readability...</p>
              )}
            </div>

            {/* Pre-packaged quick assets */}
            <div className="w-full mt-3 flex items-center justify-between text-[11px] text-[#7187AA]">
              <span>Ready assets in <code className="text-slate-300">/public/qr-exports</code></span>
              <a
                href="/qr-exports/infronix-qr-dark.png"
                download
                className="text-[#00D4FF] hover:underline"
              >
                Dark PNG
              </a>
              <span>•</span>
              <a
                href="/qr-exports/infronix-qr-print.png"
                download
                className="text-[#00D4FF] hover:underline"
              >
                Print PNG
              </a>
              <span>•</span>
              <a
                href="/qr-exports/infronix-qr-dark.svg"
                download
                className="text-[#00D4FF] hover:underline"
              >
                SVG
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
