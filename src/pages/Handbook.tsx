import { useState } from 'react';
import { HandbookHero } from '../components/handbook/HandbookHero';
import { HandbookSearch } from '../components/handbook/HandbookSearch';
import { HandbookNav } from '../components/handbook/HandbookNav';
import { GettingStarted } from '../components/handbook/GettingStarted';
import { ServerRules } from '../components/handbook/ServerRules';
import { KingdomGuide } from '../components/handbook/KingdomGuide';
import { EconomyGuide } from '../components/handbook/EconomyGuide';
import { CommandsSection } from '../components/handbook/CommandsSection';
import { FAQ } from '../components/handbook/FAQ';
import { HandbookCTA } from '../components/handbook/HandbookCTA';
import { handbookData } from '../data/handbook';

export const Handbook = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase();

  // Filter data based on search query
  const filteredRules = handbookData.rules.filter(
    (rule) => rule.title.toLowerCase().includes(query) || rule.description.toLowerCase().includes(query)
  );
  
  const filteredCommands = handbookData.commands.filter(
    (cmd) => cmd.command.toLowerCase().includes(query) || cmd.description.toLowerCase().includes(query)
  );

  const filteredFaqs = handbookData.faq.filter(
    (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
  );

  return (
    <main className="bg-[#030303] min-h-screen">
      <HandbookHero />
      <HandbookSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="container mx-auto px-0 lg:px-6 relative z-20">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 mt-12 lg:mt-24">
          
          {/* Navigation Sidebar / Topbar */}
          <HandbookNav />

          {/* Main Content Area */}
          <div className="flex-1 px-6 lg:px-0">
            <GettingStarted />
            <ServerRules rules={filteredRules} />
            <KingdomGuide />
            <EconomyGuide />
            <CommandsSection commands={filteredCommands} />
            <FAQ faqs={filteredFaqs} />
          </div>

        </div>
      </div>

      <HandbookCTA />
    </main>
  );
};
