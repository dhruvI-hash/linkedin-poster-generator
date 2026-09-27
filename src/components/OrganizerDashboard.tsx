import React, { useState } from 'react';
import { EventConfig, ActivityItem } from '../types';

interface OrganizerDashboardProps {
  config: EventConfig;
  onUpdateConfig: (updated: Partial<EventConfig>) => void;
  onPreviewAttendeeFlow: () => void;
  onOpenQRStandee: () => void;
  onOpenActivityFeed: () => void;
  recentActivities: ActivityItem[];
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  config,
  onUpdateConfig,
  onPreviewAttendeeFlow,
  onOpenQRStandee,
  onOpenActivityFeed,
  recentActivities
}) => {
  // Local form state for draft edits
  const [formData, setFormData] = useState<EventConfig>({ ...config });
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formData.portalUrl || `https://eventpulse.ai/post/${formData.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 3000);
  };

  const handleRemoveTag = (indexToRemove: number) => {
    const updatedTags = formData.hashtags.filter((_, idx) => idx !== indexToRemove);
    setFormData({ ...formData, hashtags: updatedTags });
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    let formatted = newTagInput.trim();
    if (!formatted.startsWith('#')) formatted = '#' + formatted;
    formatted = formatted.replace(/\s+/g, '');
    
    if (!formData.hashtags.includes(formatted)) {
      setFormData({
        ...formData,
        hashtags: [...formData.hashtags, formatted]
      });
    }
    setNewTagInput('');
    setIsAddingTag(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdateConfig(formData);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 700);
  };

  const handleResetForm = () => {
    setFormData({ ...config });
  };

  const activePresetsCount = Object.values(formData.activePresets).filter(Boolean).length;

  return (
    <div className="w-full">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* Top Hub Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] font-label-sm font-semibold tracking-wide uppercase">
                Campaign Ops
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c1c6d4]"></span>
              <span className="font-label-sm text-[#004e99] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0a66c2] animate-ping"></span>
                Live Broadcast Synchronized
              </span>
            </div>
            <h1 className="font-headline-lg text-[#0b1c30] tracking-tight">
              Organizer Hub & Event Settings
            </h1>
            <p className="font-body-md text-[#414752] max-w-2xl">
              Configure your event social campaign, manage pre-populated handles, and monitor attendee engagement in real time.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            <button
              onClick={onPreviewAttendeeFlow}
              className="group px-4 py-2.5 rounded-lg bg-white border border-[#c1c6d4]/40 shadow-sm hover:shadow-md hover:bg-[#eff4ff] transition-all duration-150 flex items-center gap-2 text-[#004e99] font-label-md font-semibold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[#004e99] text-[20px] group-hover:scale-110 transition-transform">
                visibility
              </span>
              <span>Preview Attendee Flow</span>
            </button>

            <button
              onClick={onOpenQRStandee}
              className="px-4 py-2.5 rounded-lg bg-[#0a66c2] hover:bg-[#004e99] text-white shadow-sm hover:shadow-md transition-all duration-150 flex items-center gap-2 font-label-md font-semibold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              <span>Download QR Standee Pack</span>
            </button>
          </div>
        </div>

        {/* Active Event Media Strip Banner */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-[#213145] text-[#eaf1ff] p-5 sm:p-6 lg:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDz87jkiJBy_Wald8iZKjlY4-sD7CEXigp3f_lhpqNtlcBLj4tM_496f7f5883QXft1fmp3e-ZA5a8kiPhDB1ZYjvBeu2JEBnjs-Qxf9ezYpHqmfxbdqRuK8iU9eVZYQBi6F6AgE_O9YEoEwrWXyV9So6wTMNzCK0k7PTxqr4qzpihjr0V9zhH_rAey5hkOAXCRmFgjl1YAUOOWaUQ6j0bMANGYOJQ0HZcjPksHCmpOdgT96FfVG4C88Q')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#213145] via-[#213145]/90 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#a8c8ff] shrink-0 border border-white/10">
              <span className="material-symbols-outlined text-[32px]">podium</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-headline-sm text-white tracking-tight font-bold">
                  {formData.eventName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0a66c2] text-white font-label-sm">
                  {formData.stageName || 'Stage A Live'}
                </span>
              </div>
              <p className="font-body-sm text-[#d3e4fe] flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#93ccff]">calendar_today</span>
                  {formData.dates}
                </span>
                <span className="opacity-40">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#93ccff]">pin_drop</span>
                  {formData.location}
                </span>
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="text-right">
                <span className="block font-label-sm text-[#d3e4fe] uppercase tracking-wider text-[10px]">
                  Current Session
                </span>
                <span className="font-title-md text-white font-semibold text-sm">
                  {formData.currentSession}
                </span>
              </div>
              <span className="w-3 h-3 rounded-full bg-[#d6e3ff] animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Form Engine (7 cols / 58%) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-[#c1c6d4]/40 p-5 sm:p-6 flex flex-col gap-6">
              
              {/* Form Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#004e99]">
                    <span className="material-symbols-outlined text-[24px]">tune</span>
                  </div>
                  <div>
                    <h2 className="font-title-md text-[#0b1c30] font-bold">
                      Event Details & Social Defaults
                    </h2>
                    <p className="font-body-sm text-[#414752] text-xs">
                      Default variables auto-injected into attendee post creators.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#e5eeff] font-label-sm text-[#414752]">
                  v2.4 Config
                </span>
              </div>

              {/* Form Fields */}
              <form className="flex flex-col gap-4" onSubmit={handleSaveForm}>
                
                {/* Event Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-[#0b1c30] flex items-center justify-between" htmlFor="event-name">
                    <span>Event Name <span className="text-[#ba1a1a]">*</span></span>
                    <span className="font-label-sm text-[#414752] font-normal">Displayed on badge watermarks</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#727783]">
                      <span className="material-symbols-outlined text-[18px]">badge</span>
                    </span>
                    <input
                      id="event-name"
                      type="text"
                      value={formData.eventName}
                      onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#c1c6d4] text-[#0b1c30] font-body-md text-sm outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Organizer / Host Entity */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-[#0b1c30]" htmlFor="company-name">
                    Organizer / Host Entity <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#727783]">
                      <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
                    </span>
                    <input
                      id="company-name"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#c1c6d4] text-[#0b1c30] font-body-md text-sm outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Hashtags Engine */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-[#0b1c30]">Auto-Appended Hashtags</label>
                    <span className="font-label-sm text-[#004e99] font-medium">
                      {formData.hashtags.length} of 5 recommended
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#c1c6d4]/40 flex flex-wrap items-center gap-2 min-h-[50px]">
                    {formData.hashtags.map((tag, idx) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dae2fd] text-[#0b1c30] font-label-md text-xs font-medium"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(idx)}
                          className="hover:text-[#ba1a1a] transition-colors flex items-center cursor-pointer"
                          aria-label={`Remove ${tag}`}
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}

                    {isAddingTag ? (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-[#0a66c2]">
                        <input
                          type="text"
                          autoFocus
                          placeholder="#NewTag"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            } else if (e.key === 'Escape') {
                              setIsAddingTag(false);
                            }
                          }}
                          className="text-xs text-[#0b1c30] outline-none w-24 px-1"
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="text-[#0a66c2] font-semibold text-xs hover:underline"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAddingTag(true)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white shadow-sm border border-[#c1c6d4]/50 text-[#004e99] font-label-md text-xs cursor-pointer hover:bg-[#e5eeff] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Add Tag</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Verified Social Mentions & Backlinks */}
                <div className="pt-1 flex flex-col gap-3">
                  <span className="font-label-md text-[#0b1c30] font-bold uppercase tracking-wider text-[11px]">
                    Verified Social Mentions & Backlinks
                  </span>

                  {/* LinkedIn */}
                  <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border border-[#c1c6d4] bg-white">
                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-[#dce9ff] text-[#414752] font-label-md text-xs sm:w-56 shrink-0 border-b sm:border-b-0 sm:border-r border-[#c1c6d4]">
                      <svg className="w-4 h-4 fill-[#0a66c2]" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                      linkedin.com/company/
                    </span>
                    <input
                      type="text"
                      value={formData.linkedinHandle}
                      onChange={(e) => setFormData({ ...formData, linkedinHandle: e.target.value })}
                      className="w-full px-3 py-2 bg-white text-[#0b1c30] text-sm outline-none focus:bg-[#f8f9ff]"
                    />
                  </div>

                  {/* Twitter / X */}
                  <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border border-[#c1c6d4] bg-white">
                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-[#dce9ff] text-[#414752] font-label-md text-xs sm:w-56 shrink-0 border-b sm:border-b-0 sm:border-r border-[#c1c6d4]">
                      <span className="font-bold text-[#0b1c30]">𝕏</span>
                      handle (mention)
                    </span>
                    <div className="flex items-center w-full bg-white">
                      <span className="pl-3 text-[#727783] text-sm">@</span>
                      <input
                        type="text"
                        value={formData.twitterHandle}
                        onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                        className="w-full px-2 py-2 bg-white text-[#0b1c30] text-sm outline-none focus:bg-[#f8f9ff]"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border border-[#c1c6d4] bg-white">
                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-[#dce9ff] text-[#414752] font-label-md text-xs sm:w-56 shrink-0 border-b sm:border-b-0 sm:border-r border-[#c1c6d4]">
                      <span className="material-symbols-outlined text-[18px]">public</span>
                      https://
                    </span>
                    <input
                      type="text"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white text-[#0b1c30] text-sm outline-none focus:bg-[#f8f9ff]"
                    />
                  </div>
                </div>

                {/* Key Themes Checkbox Accordion */}
                <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dae2fd] flex flex-col gap-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-[#0b1c30] font-semibold text-sm">
                      Attendee Post Prompt Presets
                    </span>
                    <span className="font-label-sm text-[#004e99] font-medium">
                      {activePresetsCount} Activated
                    </span>
                  </div>
                  <p className="font-body-sm text-[#414752] text-xs">
                    Choose which preset copy tracks will be offered in the attendee wizard:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#c1c6d4]/40 cursor-pointer hover:bg-[#dce9ff]/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.activePresets.keynote}
                        onChange={(e) => setFormData({
                          ...formData,
                          activePresets: { ...formData.activePresets, keynote: e.target.checked }
                        })}
                        className="w-4 h-4 rounded text-[#0a66c2] accent-[#0a66c2] cursor-pointer"
                      />
                      <span className="font-body-sm text-[#0b1c30] font-medium text-xs">
                        Keynote Summary & Takeaways
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#c1c6d4]/40 cursor-pointer hover:bg-[#dce9ff]/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.activePresets.speakerQuote}
                        onChange={(e) => setFormData({
                          ...formData,
                          activePresets: { ...formData.activePresets, speakerQuote: e.target.checked }
                        })}
                        className="w-4 h-4 rounded text-[#0a66c2] accent-[#0a66c2] cursor-pointer"
                      />
                      <span className="font-body-sm text-[#0b1c30] font-medium text-xs">
                        VIP Speaker Quote Highlight
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#c1c6d4]/40 cursor-pointer hover:bg-[#dce9ff]/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.activePresets.networking}
                        onChange={(e) => setFormData({
                          ...formData,
                          activePresets: { ...formData.activePresets, networking: e.target.checked }
                        })}
                        className="w-4 h-4 rounded text-[#0a66c2] accent-[#0a66c2] cursor-pointer"
                      />
                      <span className="font-body-sm text-[#0b1c30] font-medium text-xs">
                        Networking & Booth Check-in
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#c1c6d4]/40 cursor-pointer hover:bg-[#dce9ff]/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.activePresets.productLaunch}
                        onChange={(e) => setFormData({
                          ...formData,
                          activePresets: { ...formData.activePresets, productLaunch: e.target.checked }
                        })}
                        className="w-4 h-4 rounded text-[#0a66c2] accent-[#0a66c2] cursor-pointer"
                      />
                      <span className="font-body-sm text-[#0b1c30] font-medium text-xs">
                        Product Launch Reaction
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Footer Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2.5 rounded-lg text-[#565e74] font-label-md text-xs hover:bg-[#eff4ff] transition-colors cursor-pointer"
                  >
                    Reset Changes
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-lg bg-[#0a66c2] hover:bg-[#004e99] text-white font-label-md text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-150 flex items-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSaving ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                        <span>Saving defaults...</span>
                      </>
                    ) : saveSuccess ? (
                      <>
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>Published Live!</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Save & Publish Changes</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Performance & Portal Share (5 cols / 42%) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Attendee Portal Quick Share Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#c1c6d4]/40 p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] font-label-sm font-semibold mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#0a66c2] animate-pulse"></span>
                    Active Live Stream
                  </div>
                  <h3 className="font-title-md text-[#0b1c30] font-bold text-base">
                    Attendee Instant Post Portal
                  </h3>
                  <p className="font-body-sm text-[#414752] text-xs">
                    Direct your audience to this link or display on presentation slides.
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#eff4ff] text-[#004e99]">
                  <span className="material-symbols-outlined text-[24px]">share</span>
                </div>
              </div>

              {/* URL and Copy Action */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center rounded-xl bg-[#eff4ff] p-1.5 border border-[#dae2fd] shadow-inner">
                  <span className="material-symbols-outlined text-[#727783] ml-2 text-[20px]">link</span>
                  <input
                    className="w-full bg-transparent px-2 py-1 text-[#0b1c30] font-body-sm text-xs focus:outline-none"
                    readOnly
                    value={formData.portalUrl || `https://eventpulse.ai/post/${formData.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  />
                  <button
                    onClick={handleCopyLink}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-[#0a66c2] hover:bg-[#004e99] text-white font-label-md text-xs font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copyToast ? 'done' : 'content_copy'}
                    </span>
                    <span>{copyToast ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                {copyToast && (
                  <div className="text-center py-1 rounded-md bg-[#dae2fd] text-[#5c647a] font-label-sm text-xs animate-in fade-in">
                    Copied to clipboard! Ready to share with audience.
                  </div>
                )}
              </div>

              {/* QR Preview Mini Box */}
              <div className="p-4 rounded-xl bg-[#dce9ff]/40 border border-[#dae2fd] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white p-1 shadow-sm border border-[#c1c6d4]/30 flex items-center justify-center shrink-0">
                    <svg className="w-10 h-10 text-[#0b1c30]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-5 0h2v3h-2v-3zm3 3h2v2h-2v-2zm-3 2h2v3h-2v-3zm5 0h3v3h-3v-3zm0-5h3v2h-3v-2zm-2 5h2v2h-2v-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="font-title-md text-[#0b1c30] font-bold text-xs block">
                      Stage Presentation QR
                    </span>
                    <span className="font-body-sm text-[#414752] text-[11px]">
                      Auto-redirects attendees on iOS & Android
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenQRStandee}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#c1c6d4]/50 shadow-sm hover:bg-[#eff4ff] text-[#0b1c30] font-label-md text-xs font-semibold transition-colors cursor-pointer"
                  type="button"
                >
                  Get SVG
                </button>
              </div>

            </div>

            {/* Real-time Social Post Metrics */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-[#0b1c30] font-bold text-sm">Campaign Performance</h3>
                <span className="font-label-sm text-[#414752] flex items-center gap-1.5 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]"></span> Updated 1m ago
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Metric 1 */}
                <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c1c6d4]/40 flex flex-col justify-between">
                  <span className="font-label-sm text-[#414752] text-xs">Posts Generated</span>
                  <div className="my-1.5">
                    <span className="font-headline-sm text-[#0b1c30] font-bold text-xl sm:text-2xl">
                      1,428
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#004e99] font-label-sm text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    <span>+24% today</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c1c6d4]/40 flex flex-col justify-between">
                  <span className="font-label-sm text-[#414752] text-xs">Est. Impressions</span>
                  <div className="my-1.5">
                    <span className="font-headline-sm text-[#0a66c2] font-bold text-xl sm:text-2xl">
                      348.5K
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#414752] font-label-sm text-xs">
                    <span>Via 2nd degree</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#c1c6d4]/40 flex flex-col justify-between">
                  <span className="font-label-sm text-[#414752] text-xs">Hashtag Reach</span>
                  <div className="my-1.5">
                    <span className="font-headline-sm text-[#00537f] font-bold text-xl sm:text-2xl">
                      89.2K
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#00537f] font-label-sm text-xs font-semibold">
                    <span>Top 3 in AI</span>
                  </div>
                </div>
              </div>

              {/* Sparkline Canvas */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c1c6d4]/40 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-[#414752]">
                  <span className="font-medium">Post Momentum by Hour (Pacific Time)</span>
                  <span className="font-semibold text-[#004e99]">Peak: Keynote 10:30 AM</span>
                </div>

                {/* SVG Bar Sparkline with exact layout */}
                <svg className="w-full h-12 text-[#0a66c2]" preserveAspectRatio="none" viewBox="0 0 300 48">
                  <rect fill="currentColor" height="12" opacity="0.3" rx="2" width="14" x="0" y="36"></rect>
                  <rect fill="currentColor" height="16" opacity="0.3" rx="2" width="14" x="22" y="32"></rect>
                  <rect fill="currentColor" height="20" opacity="0.4" rx="2" width="14" x="44" y="28"></rect>
                  <rect fill="currentColor" height="24" opacity="0.5" rx="2" width="14" x="66" y="24"></rect>
                  <rect fill="currentColor" height="32" opacity="0.7" rx="2" width="14" x="88" y="16"></rect>
                  <rect fill="currentColor" height="40" opacity="0.85" rx="2" width="14" x="110" y="8"></rect>
                  <rect fill="currentColor" height="46" opacity="1.0" rx="2" width="14" x="132" y="2"></rect>
                  <rect fill="currentColor" height="38" opacity="0.85" rx="2" width="14" x="154" y="10"></rect>
                  <rect fill="currentColor" height="30" opacity="0.7" rx="2" width="14" x="176" y="18"></rect>
                  <rect fill="currentColor" height="26" opacity="0.6" rx="2" width="14" x="198" y="22"></rect>
                  <rect fill="currentColor" height="22" opacity="0.5" rx="2" width="14" x="220" y="26"></rect>
                  <rect fill="currentColor" height="28" opacity="0.65" rx="2" width="14" x="242" y="20"></rect>
                  <rect fill="currentColor" height="34" opacity="0.75" rx="2" width="14" x="264" y="14"></rect>
                  <rect fill="currentColor" height="42" opacity="0.95" rx="2" width="14" x="286" y="6"></rect>
                </svg>

                <div className="flex justify-between text-[11px] text-[#414752] opacity-75 font-mono">
                  <span>08:00 AM</span>
                  <span>12:00 PM</span>
                  <span>04:00 PM Now</span>
                </div>
              </div>

            </div>

            {/* Recent Live Attendee Activity Feed */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#c1c6d4]/40 p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-[#0b1c30] font-bold text-sm">Recent Attendee Activity</h3>
                <button
                  type="button"
                  onClick={onOpenActivityFeed}
                  className="font-label-sm text-[#004e99] font-semibold hover:underline cursor-pointer text-xs"
                >
                  View All (1,428)
                </button>
              </div>

              <div className="flex flex-col gap-1 divide-y divide-[#eff4ff]">
                {recentActivities.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 px-1 rounded-xl hover:bg-[#eff4ff] transition-colors"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#c1c6d4]/40"
                      src={item.avatar}
                      alt={item.authorName}
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-title-md text-[#0b1c30] text-xs truncate font-semibold">
                          {item.authorName}
                        </span>
                        <span className="font-label-sm text-[#414752] shrink-0 text-[10px]">
                          {item.timeAgo}
                        </span>
                      </div>
                      <p className="font-body-sm text-[#414752] text-xs truncate">
                        {item.presetTemplate ? (
                          <>Published using <span className="font-semibold text-[#0b1c30]">{item.presetTemplate}</span> preset</>
                        ) : (
                          item.snippet
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.mediaNote && (
                          <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] text-[10px] font-medium">
                            {item.mediaNote}
                          </span>
                        )}
                        {item.tone && (
                          <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] text-[10px] font-medium">
                            {item.tone}
                          </span>
                        )}
                        <a
                          href="https://www.linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-label-sm text-[#004e99] flex items-center gap-0.5 text-[11px] hover:underline ml-auto"
                        >
                          <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
