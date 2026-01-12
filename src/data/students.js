import { FaPython, FaJs, FaReact, FaCrown, FaFighterJet } from 'react-icons/fa';

export const students = [
    {
        id: "alex-123",
        name: "Alex Johnson",
        role: "Frontend Student",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        badges: [
            { type: 'gold', title: 'React Master', xp: 500, top: '5%', icon: FaReact, tier: 'Gold Tier' },
            { type: 'silver', title: 'JS Intermediate', xp: 300, top: '10%', icon: FaJs, tier: 'Silver Tier' },
            { type: 'bronze', title: 'Python Basic', xp: 100, top: '25%', icon: FaPython, tier: 'Bronze Tier' },
            { type: 'gold', title: 'System Architect', xp: 1000, top: '1%', icon: FaCrown, tier: 'Elite Tier' }
        ]
    },
    {
        id: "sarah-456",
        name: "Sarah Connors",
        role: "Full Stack Student",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        badges: [
            { type: 'gold', title: 'Java Expert', xp: 600, top: '3%', icon: FaFighterJet, tier: 'Gold Tier' },
            { type: 'bronze', title: 'Python Basic', xp: 100, top: '25%', icon: FaPython, tier: 'Bronze Tier' }
        ]
    }
];
