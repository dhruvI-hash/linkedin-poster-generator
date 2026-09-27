import React, { useState } from 'react';
import { ActivityItem } from '../types';

interface ActivityFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityItem[];
}

export const ActivityFeedModal: React.FC<ActivityFeedModalProps> = ({
  isOpen,
  onClose,
  activities
}) => {
  const [search, setSearch] = useState('');
  const [filterTone, setFilterTone] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = activities.filter((item) => {
    const matchesSearch = item.authorName.toLowerCase().includes(search.toLowerCase()) ||
      item.snippet.toLowerCase().includes(search.toLowerCase());
    const matchesTone = filterTone === 'all' || (item.tone && item.tone.toLowerCase().includes(filterTone.toLowerCase()));
    return matchesSearch && matchesTone;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-[#c1c6d4]/40 flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dce9ff] text-[#004e99] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">dynamic_feed</span>
            </div>
            <div>
              <h3 className="font-title-md text-[#0b1c30] font-bold text-lg">Live Attendee Social Activity Feed</h3>
              <p className="font-body-sm text-[#414752] text-xs">Real-time pulse of posts published through your event portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#727783] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-[#eff4ff] bg-white flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#727783]">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input
              type="text"
              placeholder="Search by attendee or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#eff4ff] text-xs text-[#0b1c30] outline-none focus:ring-1 focus:ring-[#0a66c2]"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'Keynote', 'Quote', 'Networking'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterTone(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                  filterTone === t
                    ? 'bg-[#0a66c2] text-white'
                    : 'bg-[#eff4ff] text-[#414752] hover:bg-[#e5eeff]'
                }`}
              >
                {t === 'all' ? 'All Activity' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Feed List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 divide-y divide-[#eff4ff] space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#727783]">
              <span className="material-symbols-outlined text-[36px] text-[#c1c6d4] block mb-2">inbox</span>
              <p className="text-sm">No activity records match your filter.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-start gap-3">
                <img
                  src={item.avatar}
                  alt={item.authorName}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#c1c6d4]/50"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-sm text-[#0b1c30]">{item.authorName}</span>
                    <span className="text-xs text-[#727783]">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-[#414752] mt-0.5 line-clamp-2">{item.snippet}</p>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {item.mediaNote && (
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#0b1c30] text-[11px] font-medium">
                        {item.mediaNote}
                      </span>
                    )}
                    {item.presetTemplate && (
                      <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#004e99] text-[11px] font-medium">
                        Template: {item.presetTemplate}
                      </span>
                    )}
                    {item.tone && (
                      <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] text-[11px]">
                        {item.tone}
                      </span>
                    )}
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0a66c2] hover:underline flex items-center gap-0.5 ml-auto font-medium"
                    >
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                      View on {item.platform}
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#eff4ff] bg-[#f8f9ff] flex items-center justify-between text-xs text-[#565e74]">
          <span>Showing {filtered.length} of 1,428 active community posts</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#c1c6d4] text-[#0b1c30] font-semibold hover:bg-[#eff4ff] transition-colors cursor-pointer"
          >
            Close Feed
          </button>
        </div>

      </div>
    </div>
  );
};
