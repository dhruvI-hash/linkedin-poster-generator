import React, { useState } from 'react';
import { EventConfig } from '../types';

interface QRStandeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: EventConfig;
}

export const QRStandeeModal: React.FC<QRStandeeModalProps> = ({
  isOpen,
  onClose,
  config
}) => {
  const [format, setFormat] = useState<'table' | 'slide' | 'badge'>('table');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadSVG = () => {
    // Generate standalone SVG file
    const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#004e99" />
          <stop offset="100%" stop-color="#0a66c2" />
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="#ffffff" rx="24"/>
      <rect width="600" height="16" fill="url(#grad)"/>
      <text x="300" y="80" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#0b1c30">${config.eventName}</text>
      <text x="300" y="115" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#565e74">Hosted by ${config.companyName}</text>
      
      <!-- Frame for QR -->
      <rect x="150" y="160" width="300" height="300" fill="#eff4ff" rx="16" stroke="#c1c6d4" stroke-width="2"/>
      
      <!-- Stylized QR Representation -->
      <g transform="translate(180, 190) scale(10)">
        <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-5 0h2v3h-2v-3zm3 3h2v2h-2v-2zm-3 2h2v3h-2v-3zm5 0h3v3h-3v-3zm0-5h3v2h-3v-2zm-2 5h2v2h-2v-2z" fill="#0b1c30"/>
      </g>
      
      <text x="300" y="510" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#004e99">Scan to Post on LinkedIn</text>
      <text x="300" y="540" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#414752">Instant generator with auto-tagged hashtags</text>
      
      <rect x="80" y="580" width="440" height="80" fill="#f8f9ff" rx="12" stroke="#dae2fd"/>
      <text x="300" y="615" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="600" fill="#0a66c2">${config.hashtags.join('  ')}</text>
      <text x="300" y="640" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#565e74">Direct URL: ${config.portalUrl}</text>

      <text x="300" y="740" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#727783">Powered by EventPulse Social Kit</text>
    </svg>
    `;

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.eventName.replace(/\s+/g, '_')}_QR_Standee.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#c1c6d4]/40 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dce9ff] text-[#004e99] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
            </div>
            <div>
              <h3 className="font-title-md text-[#0b1c30] font-bold text-lg">QR Standee & Stage Kit</h3>
              <p className="font-body-sm text-[#414752] text-xs">Printable physical signage and presentation slide graphics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#727783] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-6 pt-4 pb-2 border-b border-[#eff4ff] flex items-center gap-2">
          <button
            onClick={() => setFormat('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              format === 'table'
                ? 'bg-[#0a66c2] text-white'
                : 'bg-[#eff4ff] text-[#414752] hover:bg-[#e5eeff]'
            }`}
          >
            Tabletop Tent Standee
          </button>
          <button
            onClick={() => setFormat('slide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              format === 'slide'
                ? 'bg-[#0a66c2] text-white'
                : 'bg-[#eff4ff] text-[#414752] hover:bg-[#e5eeff]'
            }`}
          >
            Stage Slide 16:9
          </button>
          <button
            onClick={() => setFormat('badge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              format === 'badge'
                ? 'bg-[#0a66c2] text-white'
                : 'bg-[#eff4ff] text-[#414752] hover:bg-[#e5eeff]'
            }`}
          >
            Lanyard Badge Insert
          </button>
        </div>

        {/* Standee Live Preview Canvas */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#eff4ff]/50 flex items-center justify-center">
          <div className={`bg-white rounded-xl shadow-lg border border-[#c1c6d4]/40 p-6 flex flex-col items-center text-center transition-all ${
            format === 'slide' ? 'w-full aspect-video justify-center' : 'w-72'
          }`}>
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <span className="font-bold text-[#004e99] text-xs">EventPulse</span>
              <span className="text-[10px] text-[#727783]">{config.dates}</span>
            </div>

            <div className="my-3">
              <h4 className="font-bold text-sm text-[#0b1c30]">{config.eventName}</h4>
              <p className="text-[11px] text-[#565e74]">Presented by {config.companyName}</p>
            </div>

            {/* QR Code Illustration */}
            <div className="p-3 bg-white rounded-xl border-2 border-[#dce9ff] shadow-inner my-2">
              <svg className="w-28 h-28 text-[#0b1c30]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-5 0h2v3h-2v-3zm3 3h2v2h-2v-2zm-3 2h2v3h-2v-3zm5 0h3v3h-3v-3zm0-5h3v2h-3v-2zm-2 5h2v2h-2v-2z"></path>
              </svg>
            </div>

            <p className="font-bold text-xs text-[#0a66c2] mt-1">Scan to Post on LinkedIn</p>
            <p className="text-[10px] text-[#727783] mb-3">Instant post wizard with stage photos</p>

            <div className="w-full py-1.5 px-2 bg-[#f8f9ff] rounded text-[10px] text-[#004e99] font-medium border border-[#dae2fd]">
              {config.hashtags.join(' ')}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#eff4ff] bg-[#f8f9ff] flex items-center justify-between">
          <span className="text-xs text-[#565e74]">
            {downloadSuccess ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span> SVG Standee downloaded!
              </span>
            ) : (
              'Vector SVG ready for high-dpi print & rollups'
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-lg bg-white border border-[#c1c6d4] text-[#0b1c30] text-xs font-semibold hover:bg-[#eff4ff] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Print Now
            </button>
            <button
              onClick={handleDownloadSVG}
              className="px-4 py-2 rounded-lg bg-[#0a66c2] hover:bg-[#004e99] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download SVG Pack
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
