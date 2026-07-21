import { serverConfig } from '../config/server';

export type RuleCategory = 'Community' | 'Gameplay' | 'Fair Play';

export interface Rule {
  id: string;
  title: string;
  category: RuleCategory;
  description: string;
}

export interface Command {
  id: string;
  command: string;
  description: string;
  status: 'Season I' | 'Coming Soon';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const handbookData = {
  rules: [
    {
      id: 'r1',
      title: 'Respect Players',
      category: 'Community',
      description: 'Treat everyone with kindness. No harassment, hate speech, or toxicity will be tolerated.'
    },
    {
      id: 'r2',
      title: 'No Griefing',
      category: 'Gameplay',
      description: 'Do not destroy, modify, or steal from other players builds or chests without permission.'
    },
    {
      id: 'r3',
      title: 'No Cheating',
      category: 'Fair Play',
      description: 'The use of x-ray, hacked clients, or exploiting bugs to gain an unfair advantage is strictly prohibited.'
    },
    {
      id: 'r4',
      title: 'Keep Builds Fair',
      category: 'Gameplay',
      description: 'Do not build intentionally laggy machines or massive world-eaters that degrade server performance.'
    },
    {
      id: 'r5',
      title: 'Protect Community Experience',
      category: 'Community',
      description: 'Kingdom SMP is a collaborative world. Always consider how your actions affect the overall community.'
    }
  ] as Rule[],

  commands: [
    {
      id: 'c1',
      command: '/spawn',
      description: 'Travel safely to the server spawn.',
      status: 'Season I'
    },
    {
      id: 'c2',
      command: '/home',
      description: 'Manage and travel to your personal home locations.',
      status: 'Coming Soon'
    },
    {
      id: 'c3',
      command: '/msg',
      description: 'Send a private message to another player.',
      status: 'Season I'
    },
    {
      id: 'c4',
      command: '/tpa',
      description: 'Request to teleport to another player.',
      status: 'Coming Soon'
    }
  ] as Command[],

  faq: [
    {
      id: 'f1',
      question: 'When does Season I start?',
      answer: 'Season I launches very soon. Keep an eye on our Discord for the exact release date and time.'
    },
    {
      id: 'f2',
      question: 'Can I create a kingdom?',
      answer: 'Yes! Once you gather enough players and resources, you can officially establish your own kingdom.'
    },
    {
      id: 'f3',
      question: 'Is PvP allowed?',
      answer: 'PvP is enabled but must be consensual or take place in designated arenas. Random killing is not allowed.'
    },
    {
      id: 'f4',
      question: 'How do I join?',
      answer: `You can join our Discord community, review the rules, and connect using our server IP: ${serverConfig.serverIP}.`
    },
    {
      id: 'f5',
      question: 'Can I invite friends?',
      answer: 'Absolutely. We encourage bringing your friends to help build and grow the community together.'
    },
    {
      id: 'f6',
      question: 'How many players can join?',
      answer: 'Our server is optimized to hold up to 200 concurrent players smoothly.'
    },
    {
      id: 'f7',
      question: 'Will the world reset?',
      answer: 'No. Season I is a long-term world. Your builds and legacy will be preserved.'
    },
    {
      id: 'f8',
      question: 'Can I stream or record?',
      answer: 'Yes! Content creation is highly encouraged. Feel free to stream and share your Kingdom SMP journey.'
    },
    {
      id: 'f9',
      question: 'How are kingdoms created?',
      answer: 'Kingdoms are formed by gathering a group of players, finding a suitable location, and building a foundation together.'
    }
  ] as FAQItem[]
};
