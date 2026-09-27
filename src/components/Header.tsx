import React, { useState } from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: 'organizer' | 'attendee';
  onTabChange: (tab: 'organizer' | 'attendee') => void;
  eventName: string;
  onOpenHelp: () => void;
  currentUser: UserProfile;
  availableUsers: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  eventName,
  onOpenHelp,
  currentUser,
  availableUsers,
  onSelectUser
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/95 backdrop-blur-md border-b border-[#c1c6d4]/40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('organizer')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            {/* Logo with image + fallback pulse */}
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1Wqo1g1eyHY8BPi3HmFm5fVG9uSyVeXe0stUIvVWDLRVplQvPHa1C9JCJNNUeVfC8bYbUo4E7xEFdTPYW7GSTg7afxPlstHLREZPYnCmRT_lWcVfvYIl3nD_bYguLdBDG7owfD3-3iKgkoZGjh6GJTjVlTuhY5w2gsk4FOnhDlwGVbBz9UA_XuCYmBT9E0mIxUFxfbkRyhPaHl3PKm85K1n1do9R7iK81O79DbIHVpeCkYnxtObABy3Gmc"
                alt="EventPulse Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback vector icon if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-8 h-8 rounded-lg bg-[#0a66c2] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">equalizer</span>
              </div>
            </div>
            <span className="font-headline-sm text-[#004e99] tracking-tight font-bold group-hover:text-[#0a66c2] transition-colors">
              EventPulse
            </span>
          </button>
          
          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#004e99] font-label-sm">
            Event Social Kit
          </span>
        </div>

        {/* Central Segmented View Switcher */}
        <div className="flex items-center justify-center">
          <nav className="bg-[#eff4ff] p-1 rounded-xl flex items-center gap-1 border border-[#c1c6d4]/30 shadow-inner">
            <button
              onClick={() => onTabChange('organizer')}
              className={`px-3 sm:px-4 py-1.5 font-label-md transition-all duration-150 inline-block rounded-lg cursor-pointer ${
                activeTab === 'organizer'
                  ? 'bg-white text-[#0b1c30] shadow-sm font-semibold'
                  : 'text-[#414752] hover:text-[#0b1c30] hover:bg-white/40'
              }`}
            >
              Organizer Dashboard
            </button>
            <button
              onClick={() => onTabChange('attendee')}
              className={`px-3 sm:px-4 py-1.5 font-label-md transition-all duration-150 inline-block rounded-lg cursor-pointer ${
                activeTab === 'attendee'
                  ? 'bg-white text-[#0b1c30] shadow-sm font-semibold'
                  : 'text-[#414752] hover:text-[#0b1c30] hover:bg-white/40'
              }`}
            >
              Attendee Generator
            </button>
          </nav>
        </div>

        {/* Right Status & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dae2fd]/70 border border-[#c1c6d4]/30">
            <span className="w-2 h-2 rounded-full bg-[#0a66c2] animate-pulse"></span>
            <span className="font-label-sm text-[#5c647a] truncate max-w-[210px]">
              Active: {eventName}
            </span>
          </div>

          <button
            onClick={onOpenHelp}
            aria-label="Documentation & Help"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#414752] hover:bg-[#e5eeff] hover:text-[#0b1c30] transition-colors cursor-pointer"
            type="button"
            title="EventPulse Guide & Shortcuts"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label="User menu"
              className="flex items-center gap-1 p-1 rounded-full hover:bg-[#e5eeff] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/30"
              type="button"
            >
              <img
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c1c6d4]"
                src={currentUser.avatar}
              />
              <span className="material-symbols-outlined text-[#414752] text-[18px]">
                {userMenuOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#c1c6d4]/40 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-[#eff4ff]">
                    <p className="font-label-md text-[#0b1c30] font-bold">{currentUser.name}</p>
                    <p className="font-body-sm text-[#414752] text-xs truncate">{currentUser.headline}</p>
                  </div>
                  
                  <div className="py-1">
                    <p className="px-3 py-1 text-[11px] font-semibold text-[#565e74] uppercase tracking-wider">
                      Switch Active Profile
                    </p>
                    {availableUsers.map((user) => (
                      <button
                        key={user.name}
                        onClick={() => {
                          onSelectUser(user);
                          setUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                          user.name === currentUser.name
                            ? 'bg-[#eff4ff] text-[#004e99] font-semibold'
                            : 'hover:bg-[#f8f9ff] text-[#0b1c30]'
                        }`}
                      >
                        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                        <div className="min-w-0 flex-1 truncate">
                          <span className="block truncate">{user.name}</span>
                          <span className="block text-[10px] text-[#414752] truncate">{user.headline}</span>
                        </div>
                        {user.name === currentUser.name && (
                          <span className="material-symbols-outlined text-[#0a66c2] text-[16px]">check</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1 border-t border-[#eff4ff]">
                    <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-[#565e74]">
                      <span>Role: Event Speaker / Attendee</span>
                      <span className="text-[#0a66c2] font-semibold">Live Mode</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
