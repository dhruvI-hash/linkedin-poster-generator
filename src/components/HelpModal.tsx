import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-[#c1c6d4]/40 flex flex-col">
        
        <div className="px-6 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#dce9ff] text-[#004e99] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">help_center</span>
            </div>
            <div>
              <h3 className="font-title-md text-[#0b1c30] font-bold">EventPulse Playbook</h3>
              <p className="font-body-sm text-[#414752] text-xs">How to turn event attendees into high-impact brand advocates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#727783] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-[#414752] leading-relaxed">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#0a66c2] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
            <div>
              <h4 className="font-semibold text-sm text-[#0b1c30]">Configure in Organizer Hub</h4>
              <p>Set your event hashtags, verified company handles (@NexusDynamics), and select default prompt tracks. Changes sync instantly to all attendees using the portal.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#0a66c2] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
            <div>
              <h4 className="font-semibold text-sm text-[#0b1c30]">Display Stage QR & Standees</h4>
              <p>Project the presentation QR code between keynote talks or place printed table tents in dining areas. Attendees scan to immediately launch their personalized creator screen.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#0a66c2] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
            <div>
              <h4 className="font-semibold text-sm text-[#0b1c30]">Attendees Compose & One-Click Publish</h4>
              <p>Attendees snap or select stage photos, choose their voice tone (Executive Brief, Grateful Attendee, etc.), and copy or open directly in LinkedIn with optimal spacing and hashtags.</p>
            </div>
          </div>

          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dae2fd] text-[11px] text-[#004e99] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
            <span>Tip: Switch between "Organizer Dashboard" and "Attendee Generator" at any time from the top bar!</span>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-[#eff4ff] bg-[#f8f9ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0a66c2] text-white font-semibold text-xs hover:bg-[#004e99] transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>

      </div>
    </div>
  );
};
