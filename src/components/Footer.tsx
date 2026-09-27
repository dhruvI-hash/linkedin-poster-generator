import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  return (
    <footer className="w-full bg-[#eff4ff] border-t border-[#c1c6d4]/30 py-6 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="font-headline-sm text-[#004e99] font-bold text-base">EventPulse</span>
          <span className="font-body-sm text-[#414752] text-xs">
            © 2025 EventPulse Technologies Inc. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-label-md text-[#414752] flex-wrap justify-center">
          <button
            onClick={() => setModalTitle('LinkedIn Compliance & Best Practices')}
            className="hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            LinkedIn Compliance
          </button>
          <button
            onClick={() => setModalTitle('Privacy Policy')}
            className="hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setModalTitle('Terms of Service')}
            className="hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => setModalTitle('Support & Organizer Helpdesk')}
            className="hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            Support
          </button>
        </div>

      </div>

      {modalTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-[#c1c6d4]/40">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-title-md text-[#0b1c30] font-bold text-base">{modalTitle}</h3>
              <button
                onClick={() => setModalTitle(null)}
                className="text-[#727783] hover:text-[#0b1c30] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#414752] leading-relaxed mb-4">
              EventPulse adheres to standard LinkedIn social posting guidelines and fair use policies. Content generated is authenticated and customizable by each individual attendee before publishing to their feed.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setModalTitle(null)}
                className="px-4 py-1.5 rounded-lg bg-[#0a66c2] text-white text-xs font-semibold hover:bg-[#004e99] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
