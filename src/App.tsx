import { useState } from 'react';
import { Header } from './components/Header';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { AttendeeGenerator } from './components/AttendeeGenerator';
import { QRStandeeModal } from './components/QRStandeeModal';
import { ActivityFeedModal } from './components/ActivityFeedModal';
import { HelpModal } from './components/HelpModal';
import { Footer } from './components/Footer';
import { EventConfig, UserProfile, ActivityItem } from './types';

const INITIAL_EVENT_CONFIG: EventConfig = {
  eventName: 'TechUnbound Global Summit 2025',
  companyName: 'Nexus Dynamics Inc.',
  location: 'Moscone Center, SF & Global Livestream',
  dates: 'Oct 24-26, 2025',
  stageName: 'Stage A Live',
  currentSession: 'The Age of AI: Accelerating Next',
  hashtags: ['#TechUnbound2025', '#AIInnovation', '#FutureOfTech'],
  linkedinHandle: 'nexus-dynamics',
  twitterHandle: 'NexusDynamicsHQ',
  websiteUrl: 'techunbound.io/2025',
  portalUrl: 'https://eventpulse.ai/post/techunbound-2025',
  activePresets: {
    keynote: true,
    speakerQuote: true,
    networking: true,
    productLaunch: false
  }
};

const AVAILABLE_PROFILES: UserProfile[] = [
  {
    name: 'Elena Rostova',
    headline: 'Product Lead at CloudScale • AI & UX Enthusiast',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZJnuO8Mt0cygT7XJk86kCiZsVYxECByN86AfX2HrLDkFYV_QSIRQ63fbNM8ufEu_3ihGHRl0oid3STVBo8yzR_SXOnTkA_XzRrAy58HrpVbCHFu5FbSLQMVomgzlVaTq8gjMVhT5nXrDTQS-FJu5BXwIr2Z6ou2Jj8QTZDvg1sVCnlbCRB_4qWLso0Er_iL14Ns5jNqx2eSKcO4v8VaU_-JkAdfvcdoVe0MrzSG20SUAA-5qRI3OFYA',
    connectionDegree: '1st'
  },
  {
    name: 'Sarah Martinez',
    headline: 'VP of Engineering at NextGen Robotics',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4C04wa2jhRSGeBZ146syamswcExGWdP1CuitT0vRcVsoh3uqu_IOfMuTGztoDQGlrcrUeRkNBh29rgGlsRfiglWKs6lCToWo3P4LtDz-JDiGApuxp8ChnSqCkx_QJ3azHYIkQdKIzv9RYS8GtY-b_gzN62YncM75epagtFvP8hE_PY1sHiATWahWqcWuEoFMbRjQXse5iyQRMaOOYGB9KxGNKKG0j6n7oPqtlq-ignAc8rce5zk7ZvA',
    connectionDegree: '1st'
  },
  {
    name: 'David K. Chen',
    headline: 'Chief AI Architect at Enterprise Solutions',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3v1pr3zv284zlbQMIhMzoPFQqNMDDKG0h7_1UKmb8ULtR9C6v3hSwRKmKf3yqR9HXSwVMA1EKu67NVEt6lqOac4IPj7p5DrpCuOGeYKPmncGJeleVchxqLHm1hLgi2hiCdMW5_KYAhMBSmAv999DS8yuF2d2tZ-DIo54YICQjeMJZepFPKldG6VdHOMISqQuiP3v2o-qm0zTsvlKYNvGRwp4S4rDf4yufaClW6DdseJjA-vvdVu4jJA',
    connectionDegree: '2nd'
  }
];

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    authorName: 'Sarah Martinez',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4C04wa2jhRSGeBZ146syamswcExGWdP1CuitT0vRcVsoh3uqu_IOfMuTGztoDQGlrcrUeRkNBh29rgGlsRfiglWKs6lCToWo3P4LtDz-JDiGApuxp8ChnSqCkx_QJ3azHYIkQdKIzv9RYS8GtY-b_gzN62YncM75epagtFvP8hE_PY1sHiATWahWqcWuEoFMbRjQXse5iyQRMaOOYGB9KxGNKKG0j6n7oPqtlq-ignAc8rce5zk7ZvA',
    timeAgo: '2m ago',
    snippet: 'Published: "3 key takeaways on autonomous enterprise models from today\'s keynote session..."',
    mediaNote: '4 Stage Photos',
    platform: 'LinkedIn'
  },
  {
    id: 'act-2',
    authorName: 'David K. Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3v1pr3zv284zlbQMIhMzoPFQqNMDDKG0h7_1UKmb8ULtR9C6v3hSwRKmKf3yqR9HXSwVMA1EKu67NVEt6lqOac4IPj7p5DrpCuOGeYKPmncGJeleVchxqLHm1hLgi2hiCdMW5_KYAhMBSmAv999DS8yuF2d2tZ-DIo54YICQjeMJZepFPKldG6VdHOMISqQuiP3v2o-qm0zTsvlKYNvGRwp4S4rDf4yufaClW6DdseJjA-vvdVu4jJA',
    timeAgo: '14m ago',
    snippet: 'Published using VIP Keynote Quote preset template',
    presetTemplate: 'VIP Keynote Quote',
    mediaNote: 'Quote Graphic Attached',
    platform: 'LinkedIn'
  },
  {
    id: 'act-3',
    authorName: 'Elena Rostova',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-z3wpzV8-Z1uHDqMGJC134lJwVr6jMMNuVDPZqE8Id3uDpJFJxrc4sXXZ592KCM74CPqBx7V5M--nEXs5CHUGujybqmQfIqfcXD_hOFz9ZK4yOekEcTg74ya_wm3ffHcxm1JK4EvkVThc8m79ypLSF37dQOTNGkH-o7Fzuq0MKkPnGnrK-VCxDflwbDiVG89-7OXbRaGdSEJnFrEeQw1rHCGy2MeppBKZqZzejDSpEmtnFNiQZmgMog',
    timeAgo: '27m ago',
    snippet: 'Generated draft with custom hashtags: #TechUnbound2025 #AIInnovation',
    tone: 'Networking Tone',
    platform: 'LinkedIn'
  },
  {
    id: 'act-4',
    authorName: 'Marcus Vance',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZJnuO8Mt0cygT7XJk86kCiZsVYxECByN86AfX2HrLDkFYV_QSIRQ63fbNM8ufEu_3ihGHRl0oid3STVBo8yzR_SXOnTkA_XzRrAy58HrpVbCHFu5FbSLQMVomgzlVaTq8gjMVhT5nXrDTQS-FJu5BXwIr2Z6ou2Jj8QTZDvg1sVCnlbCRB_4qWLso0Er_iL14Ns5jNqx2eSKcO4v8VaU_-JkAdfvcdoVe0MrzSG20SUAA-5qRI3OFYA',
    timeAgo: '35m ago',
    snippet: 'Shared: "Incredible demonstration of speculative reasoning and edge latency at Moscone Center!"',
    tone: 'Technical Breakdown',
    mediaNote: 'Live Demo Video',
    platform: 'LinkedIn'
  },
  {
    id: 'act-5',
    authorName: 'Aria Thorne',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4C04wa2jhRSGeBZ146syamswcExGWdP1CuitT0vRcVsoh3uqu_IOfMuTGztoDQGlrcrUeRkNBh29rgGlsRfiglWKs6lCToWo3P4LtDz-JDiGApuxp8ChnSqCkx_QJ3azHYIkQdKIzv9RYS8GtY-b_gzN62YncM75epagtFvP8hE_PY1sHiATWahWqcWuEoFMbRjQXse5iyQRMaOOYGB9KxGNKKG0j6n7oPqtlq-ignAc8rce5zk7ZvA',
    timeAgo: '42m ago',
    snippet: 'Published: "Why multi-agent systems are outperforming monolithic architectures."',
    tone: 'Executive Brief',
    platform: 'LinkedIn'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'organizer' | 'attendee'>('organizer');
  const [config, setConfig] = useState<EventConfig>(INITIAL_EVENT_CONFIG);
  const [currentUser, setCurrentUser] = useState<UserProfile>(AVAILABLE_PROFILES[0]);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const handleUpdateConfig = (updated: Partial<EventConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...updated
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        eventName={config.eventName}
        onOpenHelp={() => setHelpModalOpen(true)}
        currentUser={currentUser}
        availableUsers={AVAILABLE_PROFILES}
        onSelectUser={setCurrentUser}
      />

      {/* Main View Router */}
      <div className="pt-16 flex-1 flex flex-col">
        {activeTab === 'organizer' ? (
          <OrganizerDashboard
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onPreviewAttendeeFlow={() => setActiveTab('attendee')}
            onOpenQRStandee={() => setQrModalOpen(true)}
            onOpenActivityFeed={() => setActivityModalOpen(true)}
            recentActivities={INITIAL_ACTIVITIES}
          />
        ) : (
          <AttendeeGenerator
            config={config}
            currentUser={currentUser}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <QRStandeeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        config={config}
      />

      <ActivityFeedModal
        isOpen={activityModalOpen}
        onClose={() => setActivityModalOpen(false)}
        activities={INITIAL_ACTIVITIES}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </div>
  );
}
