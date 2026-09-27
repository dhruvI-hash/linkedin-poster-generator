import React, { useState, useEffect } from 'react';
import { EventConfig, ToneType, PostImage, UserProfile } from '../types';
import { generatePostContent } from '../utils/postGenerator';

interface AttendeeGeneratorProps {
  config: EventConfig;
  currentUser: UserProfile;
}

const DEFAULT_STAGE_PHOTO: PostImage = {
  id: 'media-1',
  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfwUb6T-DIsTiVMRhlIOryWn5lZ-8m0syOEAJ56FPYyvkWsOc-VqmIxUbDzuOCflfEMEeP700bxQ7PUstBhI4eymnUESazVzp3eDlHIx177FkYYAL-xqdSIes2VI7gAAAjhD2QIyToACmUrNcee7jdrgOhjVUwNaBce4eIEUislDFxC90nEmoZ7rlYdBb3PDV757-XfzEYAoSHMb4cwUKo1gjAT1MvLBED4IyFbl7QAiLRaUgnOSDanQ',
  name: 'Keynote_Stage_A1.jpg',
  size: '1.4 MB',
  tag: 'Keynote Stage',
  isPrimary: true
};

const EXTRA_STAGE_PHOTOS: PostImage[] = [
  {
    id: 'media-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz87jkiJBy_Wald8iZKjlY4-sD7CEXigp3f_lhpqNtlcBLj4tM_496f7f5883QXft1fmp3e-ZA5a8kiPhDB1ZYjvBeu2JEBnjs-Qxf9ezYpHqmfxbdqRuK8iU9eVZYQBi6F6AgE_O9YEoEwrWXyV9So6wTMNzCK0k7PTxqr4qzpihjr0V9zhH_rAey5hkOAXCRmFgjl1YAUOOWaUQ6j0bMANGYOJQ0HZcjPksHCmpOdgT96FfVG4C88Q',
    name: 'Main_Auditorium_Wide.jpg',
    size: '2.1 MB',
    tag: 'Auditorium',
    isPrimary: false
  },
  {
    id: 'media-3',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZJnuO8Mt0cygT7XJk86kCiZsVYxECByN86AfX2HrLDkFYV_QSIRQ63fbNM8ufEu_3ihGHRl0oid3STVBo8yzR_SXOnTkA_XzRrAy58HrpVbCHFu5FbSLQMVomgzlVaTq8gjMVhT5nXrDTQS-FJu5BXwIr2Z6ou2Jj8QTZDvg1sVCnlbCRB_4qWLso0Er_iL14Ns5jNqx2eSKcO4v8VaU_-JkAdfvcdoVe0MrzSG20SUAA-5qRI3OFYA',
    name: 'Attendee_VIP_Badge.jpg',
    size: '890 KB',
    tag: 'Badge Snap',
    isPrimary: false
  }
];

export const AttendeeGenerator: React.FC<AttendeeGeneratorProps> = ({
  config,
  currentUser
}) => {
  const [selectedTone, setSelectedTone] = useState<ToneType>('grateful');
  const [highlightsText, setHighlightsText] = useState(
    `Mind blown by the keynote on agentic AI workflows at ${config.hashtags[0] || '#TechUnbound2025'}! Incredible insights on scaling models responsibly, plus stellar networking with top engineering leaders. Huge thanks to the @${config.companyName.replace(/\s+Inc\.?|\s+LLC/gi, '').trim()} team for putting together a flawless event!`
  );
  const [tagSpeakers, setTagSpeakers] = useState(true);
  const [hookPreview, setHookPreview] = useState(true);
  const [isHookExpanded, setIsHookExpanded] = useState(false);
  const [images, setImages] = useState<PostImage[]>([DEFAULT_STAGE_PHOTO]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [seed, setSeed] = useState(0);

  // Social interactions state
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentsList, setCommentsList] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);
  const [repostCount, setRepostCount] = useState(5);
  const [reposted, setReposted] = useState(false);

  // Synchronize initial text if config company/tags change
  useEffect(() => {
    // If text was pristine, keep in sync
    if (highlightsText.includes('TechUnbound2025') && config.hashtags[0] && !highlightsText.includes(config.hashtags[0])) {
      setHighlightsText((prev) => prev.replace(/#[A-Za-z0-9]+/g, config.hashtags[0]));
    }
  }, [config]);

  const activePost = generatePostContent(config, selectedTone, highlightsText, tagSpeakers, seed);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSeed((prev) => prev + 1);
      setIsGenerating(false);
      setIsHookExpanded(false);
    }, 600);
  };

  const handleAddSamplePhoto = () => {
    const nextPhoto = EXTRA_STAGE_PHOTOS.find((p) => !images.some((img) => img.id === p.id));
    if (nextPhoto) {
      setImages([...images, nextPhoto]);
    } else {
      // Create a cloned selfie
      const customImg: PostImage = {
        id: `custom-${Date.now()}`,
        url: currentUser.avatar,
        name: `Networking_Selfie_${images.length + 1}.jpg`,
        size: '1.2 MB',
        tag: 'Networking',
        isPrimary: false
      };
      setImages([...images, customImg]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const objectUrl = URL.createObjectURL(file);
      const newImg: PostImage = {
        id: `upload-${Date.now()}`,
        url: objectUrl,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        tag: 'Uploaded Snap',
        isPrimary: images.length === 0
      };
      setImages([...images, newImg]);
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleCopyText = () => {
    let fullText = `${activePost.intro}\n\n${activePost.leadParagraph}\n\n`;
    if (activePost.takeawaysTitle && activePost.takeaways) {
      fullText += `${activePost.takeawaysTitle}\n`;
      activePost.takeaways.forEach((t, i) => {
        fullText += `${i + 1}. ${t}\n`;
      });
      fullText += '\n';
    }
    fullText += `${activePost.closing}\n\n${activePost.hashtags.join(' ')}`;

    navigator.clipboard.writeText(fullText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3500);
  };

  const handleInsertQuote = (speaker: string, quote: string) => {
    setHighlightsText((prev) => `${prev}\n\n"${quote}" — ${speaker}`);
  };

  const handleAddOfficialTags = () => {
    const missing = config.hashtags.filter((t) => !highlightsText.includes(t));
    if (missing.length > 0) {
      setHighlightsText((prev) => `${prev} ${missing.join(' ')}`);
    }
  };

  const handleToggleLike = () => {
    if (hasLiked) {
      setHasLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setHasLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentsList([...commentsList, newComment.trim()]);
    setNewComment('');
  };

  const handleToggleRepost = () => {
    if (reposted) {
      setReposted(false);
      setRepostCount((prev) => prev - 1);
    } else {
      setReposted(true);
      setRepostCount((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full">
      
      {/* Interactive Top Event Header Card */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="relative bg-white rounded-2xl shadow-sm border border-[#c1c6d4]/40 p-5 sm:p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4 overflow-hidden">
          {/* Top Brand Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0a66c2] via-[#93ccff] to-[#004e99]" />

          {/* Event Identity Block */}
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#004e99] shrink-0">
              <span className="material-symbols-outlined text-[28px]">campaign</span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-headline-sm text-[#0b1c30] truncate text-lg sm:text-xl font-bold">
                  {config.eventName}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] font-label-sm text-xs font-semibold">
                  Active Session
                </span>
              </div>
              <p className="font-body-md text-[#414752] flex items-center gap-1.5 mt-0.5 text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[16px] text-[#565e74]">location_on</span>
                Hosted by {config.companyName} • {config.location}
              </p>
            </div>
          </div>

          {/* Quick Social Meta & Tags Row */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`@${config.companyName.replace(/\s+Inc\.?|\s+LLC/gi, '').trim()}`);
                setCopiedToast(true);
                setTimeout(() => setCopiedToast(false), 2000);
              }}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e5eeff] text-[#004e99] hover:bg-[#dce9ff] transition-colors font-label-md text-xs cursor-pointer"
              title="Copy handle"
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-[#0a66c2] group-hover:scale-125 transition-transform"></span>
              <span>@{config.companyName.replace(/\s+Inc\.?|\s+LLC/gi, '').trim()}</span>
              <span className="material-symbols-outlined text-[14px] text-[#414752] group-hover:text-[#004e99]">
                content_copy
              </span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`@${config.twitterHandle}`);
                setCopiedToast(true);
                setTimeout(() => setCopiedToast(false), 2000);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e5eeff] text-[#565e74] hover:bg-[#dce9ff] transition-colors font-label-md text-xs cursor-pointer"
              type="button"
            >
              <span className="font-bold text-[12px]">𝕏</span>
              <span>@{config.twitterHandle}</span>
            </button>

            {config.hashtags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#dae2fd] text-[#5c647a] font-label-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}

            <a
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#dce9ff] text-[#004e99] hover:text-[#001b3d] transition-colors font-label-md text-xs font-semibold"
              href={`https://${config.websiteUrl}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>{config.websiteUrl}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Dual-Column Content Orchestrator */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Post Composer & Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Step 1: Upload Event Photos */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#c1c6d4]/40 p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0a66c2] text-white flex items-center justify-center font-label-sm text-xs font-bold">
                    1
                  </span>
                  <h2 className="font-title-md text-[#0b1c30] font-bold">Upload Event Photos</h2>
                </div>
                <span className="font-body-sm text-[#414752] text-xs">
                  Keynote, stage, or badge selfie
                </span>
              </div>

              {/* Drag and Drop Dropzone */}
              <label className="group relative flex flex-col items-center justify-center p-6 bg-[#eff4ff] hover:bg-[#e5eeff] rounded-xl border-2 border-dashed border-[#c1c6d4] cursor-pointer transition-all duration-200">
                <input
                  accept="image/*"
                  className="sr-only"
                  type="file"
                  onChange={handleFileUpload}
                />
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0a66c2] group-hover:scale-110 transition-transform mb-2">
                  <span className="material-symbols-outlined text-[26px]">cloud_upload</span>
                </div>
                <p className="font-title-md text-[#0b1c30] text-center text-sm">
                  <span className="text-[#0a66c2] font-semibold underline decoration-2 underline-offset-2">
                    Click to browse
                  </span>{' '}
                  or drag and drop keynote snaps
                </p>
                <p className="font-body-sm text-[#414752] mt-1 text-xs">
                  Supports JPG, PNG, WEBP up to 20MB
                </p>
              </label>

              {/* Uploaded Media Strip */}
              <div className="flex flex-col gap-2 pt-1">
                <p className="font-label-sm text-[11px] uppercase tracking-wider text-[#565e74] font-semibold">
                  Attached Post Media ({images.length}/4)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="flex items-center gap-3 p-2 rounded-xl bg-[#eff4ff] border border-[#c1c6d4]/30 hover:bg-[#e5eeff] transition-colors"
                    >
                      <img
                        alt={img.name}
                        className="w-16 h-12 object-cover rounded-lg shrink-0 shadow-sm"
                        src={img.url}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-label-md text-[#0b1c30] text-xs font-semibold truncate">
                          {img.name}
                        </p>
                        <p className="font-body-sm text-[#414752] text-[11px]">
                          {img.size} • {img.isPrimary ? 'Primary media' : img.tag}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveImage(img.id)}
                        aria-label="Remove image"
                        className="p-1.5 rounded-lg text-[#565e74] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}

                  {/* Add Another Slot Button */}
                  {images.length < 4 && (
                    <button
                      onClick={handleAddSamplePhoto}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-[#c1c6d4] bg-[#eff4ff]/60 hover:bg-[#e5eeff] transition-colors text-[#414752] hover:text-[#004e99] cursor-pointer min-h-[56px]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                      <span className="font-label-md text-xs font-semibold">Add Another Photo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Key Highlights & Takeaways Input */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#c1c6d4]/40 p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0a66c2] text-white flex items-center justify-center font-label-sm text-xs font-bold">
                    2
                  </span>
                  <h2 className="font-title-md text-[#0b1c30] font-bold">Key Highlights & Insights</h2>
                </div>
                <span className="inline-flex items-center gap-1 font-body-sm text-xs text-[#004e99] font-medium">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI Context Active
                </span>
              </div>

              <div className="relative">
                <textarea
                  className="w-full bg-[#eff4ff] text-[#0b1c30] rounded-xl p-4 font-body-md text-sm border border-[#c1c6d4]/40 focus:outline-none focus:border-[#0a66c2] focus:bg-white transition-all resize-y min-h-[120px]"
                  id="composer-takeaways"
                  placeholder="What did you learn or enjoy most? (e.g., Dr. Aris's keynote on autonomous agents was mindblowing! Loved connecting with fellow founders...)"
                  rows={4}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                />

                <div className="flex items-center justify-between px-1 pt-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInsertQuote(
                        'Dr. Aris Thorne (Chief AI Scientist)',
                        'Autonomy is not about removing human intelligence; it is about extending human leverage 100x.'
                      )}
                      className="text-[#565e74] hover:text-[#004e99] transition-colors text-xs font-label-sm flex items-center gap-1 cursor-pointer bg-[#eff4ff] px-2.5 py-1 rounded-md"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">format_quote</span>
                      Insert Speaker Quote
                    </button>
                    <button
                      onClick={handleAddOfficialTags}
                      className="text-[#565e74] hover:text-[#004e99] transition-colors text-xs font-label-sm flex items-center gap-1 cursor-pointer bg-[#eff4ff] px-2.5 py-1 rounded-md"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">tag</span>
                      Add Official Tags
                    </button>
                  </div>
                  <span className="font-label-sm text-[#414752] text-xs font-mono">
                    {highlightsText.length} / 3,000 chars
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: Choose Tone of Voice & Style */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#c1c6d4]/40 p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0a66c2] text-white flex items-center justify-center font-label-sm text-xs font-bold">
                    3
                  </span>
                  <h2 className="font-title-md text-[#0b1c30] font-bold">Select Voice & Narrative Tone</h2>
                </div>
                <span className="font-body-sm text-[#414752] text-xs">
                  Optimizes algorithm pacing
                </span>
              </div>

              {/* Interactive Tone Selector Badges */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { key: 'executive', label: 'Executive Brief' },
                  { key: 'grateful', label: 'Grateful Attendee' },
                  { key: 'takeaways', label: 'Key Takeaways (Numbered)' },
                  { key: 'visionary', label: 'Visionary & Bold', icon: 'psychology' },
                  { key: 'technical', label: 'Technical Breakdown' }
                ].map((item) => {
                  const isSelected = selectedTone === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setSelectedTone(item.key as ToneType)}
                      className={`px-4 py-2 rounded-full font-label-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0a66c2] text-white shadow-sm ring-2 ring-[#004e99] ring-offset-2 ring-offset-white'
                          : 'bg-[#dce9ff] text-[#0b1c30] hover:bg-[#d3e4fe]'
                      }`}
                      type="button"
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                      {item.icon && !isSelected && (
                        <span className="material-symbols-outlined text-[16px] text-[#006ca4]">
                          {item.icon}
                        </span>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Optimization Checkbox Toggles */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-[#0b1c30] font-body-sm text-xs select-none">
                  <input
                    checked={tagSpeakers}
                    onChange={(e) => setTagSpeakers(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0a66c2] accent-[#0a66c2] focus:ring-0 cursor-pointer"
                    type="checkbox"
                  />
                  <span>Tag official conference speakers</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#0b1c30] font-body-sm text-xs select-none">
                  <input
                    checked={hookPreview}
                    onChange={(e) => {
                      setHookPreview(e.target.checked);
                      if (!e.target.checked) setIsHookExpanded(true);
                    }}
                    className="w-4 h-4 rounded text-[#0a66c2] accent-[#0a66c2] focus:ring-0 cursor-pointer"
                    type="checkbox"
                  />
                  <span>Add high-converting hook preview ("...see more")</span>
                </label>
              </div>
            </div>

            {/* Master Generate Call To Action */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0a66c2] hover:bg-[#004e99] text-white font-headline-sm text-base sm:text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-75"
                type="button"
              >
                {isGenerating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[22px]">progress_activity</span>
                    <span>Generating Optimized Post...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                    <span>Generate Optimized LinkedIn Post</span>
                  </>
                )}
              </button>
              <p className="font-body-sm text-xs text-center text-[#414752] flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#565e74]">verified</span>
                Tuned to LinkedIn's current algorithm: maximum reach, conversational syntax, & clean readability.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Live LinkedIn Feed Simulation (5 cols on lg, sticky) */}
          <div className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-20">
            
            {/* Live Preview Status Bar */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#93ccff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0a66c2]"></span>
                </span>
                <span className="font-label-md text-xs font-semibold text-[#0b1c30]">
                  Live LinkedIn Preview
                </span>
              </div>
              <span className="font-label-sm text-[#414752] text-xs">
                Desktop Feed View (100%)
              </span>
            </div>

            {/* Realistic LinkedIn Card Canvas */}
            <div className="bg-white rounded-2xl shadow-md border border-[#c1c6d4]/50 p-5 sm:p-6 flex flex-col gap-3 text-left">
              
              {/* Post Header: Avatar, Name, Headline, Time */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      alt={currentUser.name}
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-[#c1c6d4]"
                      src={currentUser.avatar}
                    />
                    <span
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"
                      title="Online on LinkedIn"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-title-md text-[#0b1c30] font-bold text-sm truncate hover:underline hover:text-[#0a66c2] cursor-pointer">
                        {currentUser.name}
                      </h3>
                      <span className="font-body-sm text-[#565e74] text-xs">• 1st</span>
                    </div>
                    <p className="font-body-sm text-[#414752] text-xs truncate">
                      {currentUser.headline}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-[#565e74] mt-0.5">
                      <span>Just now</span>
                      <span>•</span>
                      <span className="material-symbols-outlined text-[12px]">public</span>
                    </div>
                  </div>
                </div>

                {/* Follow & More Options */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-[#0a66c2] hover:bg-[#eff4ff] transition-colors font-label-md text-xs cursor-pointer font-semibold"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span> Follow
                  </button>
                  <button
                    aria-label="Post menu"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#565e74] hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                  </button>
                </div>
              </div>

              {/* Post Copy / Content Body */}
              <div className="font-body-md text-sm text-[#0b1c30] flex flex-col gap-2.5 leading-relaxed pt-1">
                
                {/* Intro Line */}
                <p>
                  {activePost.intro}{' '}
                  {hookPreview && !isHookExpanded && (
                    <button
                      onClick={() => setIsHookExpanded(true)}
                      className="text-[#565e74] hover:text-[#0a66c2] font-semibold text-xs ml-1 cursor-pointer"
                    >
                      ...see more
                    </button>
                  )}
                </p>

                {/* Full Body (shown if hookPreview disabled OR expanded) */}
                {(!hookPreview || isHookExpanded) && (
                  <>
                    <p>{activePost.leadParagraph}</p>

                    {activePost.takeawaysTitle && activePost.takeaways && (
                      <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dae2fd] text-[#0b1c30] flex flex-col gap-1.5 my-1">
                        <p className="font-label-md text-xs font-semibold text-[#004e99]">
                          {activePost.takeawaysTitle}
                        </p>
                        {activePost.takeaways.map((point, idx) => (
                          <p key={idx} className="flex items-start gap-2 text-xs leading-normal">
                            <span className="text-[#0a66c2] font-bold">{idx + 1}.</span>
                            <span>{point}</span>
                          </p>
                        ))}
                      </div>
                    )}

                    <p>{activePost.closing}</p>

                    {/* Hashtags Strip */}
                    <p className="text-[#0a66c2] font-medium pt-1 text-xs flex flex-wrap gap-1.5">
                      {activePost.hashtags.map((tag) => (
                        <a key={tag} className="hover:underline cursor-pointer" href="#">
                          {tag}
                        </a>
                      ))}
                      {activePost.mentions.map((mention) => (
                        <a key={mention} className="hover:underline font-semibold text-[#004e99]" href="#">
                          {mention}
                        </a>
                      ))}
                    </p>
                  </>
                )}

              </div>

              {/* Attached Photo in Feed */}
              {images.length > 0 && (
                <div className="relative w-full rounded-xl overflow-hidden bg-black mt-1">
                  <img
                    alt={images[0].name}
                    className="w-full h-auto max-h-80 object-cover object-center transform hover:scale-[1.01] transition-transform duration-300"
                    src={images[0].url}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-0.5 rounded text-[11px] font-label-sm font-semibold flex items-center gap-1 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[13px]">photo_camera</span>
                    <span>{images[0].tag || 'Keynote Stage'}</span>
                  </div>
                </div>
              )}

              {/* LinkedIn Reactions Counter Strip */}
              <div className="flex items-center justify-between pt-2 pb-1 text-[#565e74] text-xs border-b border-[#eff4ff]">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] shadow-sm font-bold">
                      👍
                    </span>
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] shadow-sm font-bold">
                      👏
                    </span>
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[9px] shadow-sm font-bold">
                      ❤️
                    </span>
                  </div>
                  <span className="hover:text-[#0a66c2] cursor-pointer hover:underline text-[11px]">
                    {hasLiked ? `You and ${likeCount - 1} others` : `${likeCount} people`}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  <span
                    onClick={() => setShowCommentBox(!showCommentBox)}
                    className="hover:text-[#0a66c2] cursor-pointer hover:underline"
                  >
                    {12 + commentsList.length} comments
                  </span>
                  <span>•</span>
                  <span className="hover:text-[#0a66c2] cursor-pointer hover:underline">
                    {repostCount} reposts
                  </span>
                </div>
              </div>

              {/* LinkedIn Action Buttons Row (Like, Comment, Repost, Send) */}
              <div className="grid grid-cols-4 gap-1 pt-1 bg-white">
                <button
                  onClick={handleToggleLike}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg transition-colors font-label-md text-xs cursor-pointer ${
                    hasLiked
                      ? 'text-[#0a66c2] font-semibold bg-[#eff4ff]'
                      : 'text-[#565e74] hover:bg-[#eff4ff] hover:text-[#0a66c2]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {hasLiked ? 'thumb_up' : 'thumb_up'}
                  </span>
                  <span className="hidden sm:inline">{hasLiked ? 'Liked' : 'Like'}</span>
                </button>

                <button
                  onClick={() => setShowCommentBox(!showCommentBox)}
                  className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-[#565e74] hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors font-label-md text-xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">comment</span>
                  <span className="hidden sm:inline">Comment</span>
                </button>

                <button
                  onClick={handleToggleRepost}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg transition-colors font-label-md text-xs cursor-pointer ${
                    reposted
                      ? 'text-[#0a66c2] font-semibold bg-[#eff4ff]'
                      : 'text-[#565e74] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">repeat</span>
                  <span className="hidden sm:inline">{reposted ? 'Reposted' : 'Repost'}</span>
                </button>

                <button
                  onClick={handleCopyText}
                  className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-[#565e74] hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors font-label-md text-xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>

              {/* Comment Drawer if active */}
              {showCommentBox && (
                <div className="pt-2 border-t border-[#eff4ff] flex flex-col gap-2">
                  <form onSubmit={handleAddComment} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-full bg-[#eff4ff] text-xs text-[#0b1c30] outline-none focus:ring-1 focus:ring-[#0a66c2]"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-3 py-1.5 rounded-full bg-[#0a66c2] text-white text-xs font-semibold disabled:opacity-50 cursor-pointer"
                    >
                      Post
                    </button>
                  </form>
                  {commentsList.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {commentsList.map((c, i) => (
                        <div key={i} className="p-2 rounded-lg bg-[#eff4ff] text-xs text-[#0b1c30]">
                          <span className="font-semibold">{currentUser.name}: </span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Immediate Action Deck Under Preview Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <button
                onClick={handleCopyText}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#c1c6d4]/50 hover:bg-[#eff4ff] text-[#0b1c30] font-label-md text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                <span>Copy Text</span>
              </button>

              <button
                onClick={handleGenerate}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#c1c6d4]/50 hover:bg-[#eff4ff] text-[#0b1c30] font-label-md text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">cached</span>
                <span>Regenerate</span>
              </button>

              <a
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0a66c2] hover:bg-[#004e99] text-white font-label-md text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                href="https://www.linkedin.com/feed/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="font-bold text-[13px]">in</span>
                <span>Open LinkedIn</span>
                <span className="material-symbols-outlined text-[16px]">launch</span>
              </a>
            </div>

            {/* Toast Feedback */}
            {copiedToast && (
              <div className="transition-all duration-300 transform bg-[#213145] text-[#eaf1ff] px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs font-medium animate-in fade-in">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#93ccff] text-[18px]">check_circle</span>
                  Post copy copied to clipboard! Ready to paste into LinkedIn.
                </span>
                <button
                  className="text-white/70 hover:text-white cursor-pointer"
                  onClick={() => setCopiedToast(false)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
};
