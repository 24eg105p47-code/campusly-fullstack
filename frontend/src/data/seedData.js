const now = new Date();
now.setHours(0, 0, 0, 0);

export const isoDay = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const plusDays = (n) => {
  const d = new Date(now);
  d.setDate(d.getDate() + n);
  return isoDay(d);
};

export const daysLeft = (date) =>
  Math.ceil((new Date(`${date}T00:00:00`) - now) / 86400000);

export const dateLabel = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

export const initials = (name) =>
  (name || 'A')
    .split(/\s+/)
    .slice(0, 2)
    .map((x) => x[0])
    .join('')
    .toUpperCase();

export const demoOpportunities = [
  {
    id: 'o1',
    title: 'Product Design Intern',
    organization: 'Figma',
    subtitle: 'Design & collaboration',
    mark: 'F',
    tone: 'purple',
    category: 'Internship',
    description:
      'Work alongside product designers to shape thoughtful, accessible experiences used by millions of people. You will contribute to research, prototyping, and design systems.',
    skills: ['Figma', 'UI Design', 'Prototyping'],
    eligibility: 'Design, HCI, or related students · 2027/2028 grads',
    deadline: plusDays(8),
    posted: plusDays(-1),
    type: 'Paid · Summer 2027',
    location: 'Remote · US'
  },
  {
    id: 'o2',
    title: 'Build for Good Hackathon',
    organization: 'Northstar Labs',
    subtitle: 'Technology & innovation',
    mark: 'NL',
    tone: 'green',
    category: 'Hackathon',
    description:
      'Join a weekend of creative problem-solving. Teams will build practical tools for a more sustainable campus, with mentors and prizes for standout ideas.',
    skills: ['React', 'Python', 'Teamwork'],
    eligibility: 'Open to all undergraduate students',
    deadline: plusDays(5),
    posted: plusDays(-2),
    type: '48 hours · Prizes',
    location: 'Innovation Hall'
  },
  {
    id: 'o3',
    title: 'Software Engineering Intern',
    organization: 'Stripe',
    subtitle: 'Payments & technology',
    mark: 'S',
    tone: 'blue',
    category: 'Internship',
    description:
      'Help build reliable financial infrastructure while learning from experienced engineers. You will own a project end to end and share your work with the team.',
    skills: ['Java', 'APIs', 'Problem solving'],
    eligibility: 'Computer Science students · 2027 grads',
    deadline: plusDays(16),
    posted: plusDays(-3),
    type: 'Paid · Summer 2027',
    location: 'Hybrid · San Francisco'
  },
  {
    id: 'o4',
    title: 'UX Research Essentials',
    organization: 'Northstar Career Center',
    subtitle: 'Career development',
    mark: 'CC',
    tone: 'orange',
    category: 'Workshop',
    description:
      'Learn to plan interviews, ask better questions, and turn observations into product insights. Bring a project idea; no prior research experience needed.',
    skills: ['Research', 'Communication', 'UI Design'],
    eligibility: 'Open to all students',
    deadline: plusDays(3),
    posted: plusDays(-1),
    type: '90 minutes · Free',
    location: 'Student Union · Room 204'
  },
  {
    id: 'o5',
    title: 'Women in Tech Challenge',
    organization: 'Adobe',
    subtitle: 'Creative technology',
    mark: 'A',
    tone: 'pink',
    category: 'Competition',
    description:
      'Design and pitch a digital experience that makes learning more inclusive. Meet a supportive community of makers and get feedback from Adobe mentors.',
    skills: ['UI Design', 'Figma', 'Storytelling'],
    eligibility: 'Open to all undergraduate students',
    deadline: plusDays(12),
    posted: plusDays(-5),
    type: 'Competition · Awards',
    location: 'Online'
  },
  {
    id: 'o6',
    title: 'Cloud Foundations Certificate',
    organization: 'Google Cloud',
    subtitle: 'Cloud & infrastructure',
    mark: 'G',
    tone: 'blue',
    category: 'Certification',
    description:
      'Build a practical understanding of cloud infrastructure, security, and deployment through guided modules and hands-on labs.',
    skills: ['Cloud', 'Python', 'Databases'],
    eligibility: 'Open to all students',
    deadline: plusDays(22),
    posted: plusDays(-4),
    type: 'Self-paced · Free',
    location: 'Online'
  },
  {
    id: 'o7',
    title: 'Campus Technology Analyst',
    organization: 'Deloitte',
    subtitle: 'Consulting & technology',
    mark: 'D',
    tone: 'green',
    category: 'Placement',
    description:
      'Explore how technology can solve complex client challenges. This early-career program pairs structured learning with meaningful team projects.',
    skills: ['Communication', 'Python', 'Problem solving'],
    eligibility: 'Computer Science or Business · 2027 grads',
    deadline: plusDays(6),
    posted: plusDays(-2),
    type: 'Full-time · Graduate',
    location: 'Hybrid · Multiple cities'
  },
  {
    id: 'o8',
    title: 'Open Source Sprint',
    organization: 'GitHub Campus',
    subtitle: 'Developer community',
    mark: 'GH',
    tone: 'purple',
    category: 'Hackathon',
    description:
      'Spend a day contributing to open source with maintainers and fellow students. Find a first issue, improve documentation, or ship a feature.',
    skills: ['Git', 'JavaScript', 'Teamwork'],
    eligibility: 'Open to all undergraduate students',
    deadline: plusDays(29),
    posted: plusDays(-6),
    type: '1 day · Community',
    location: 'Engineering Quad'
  }
];

export const seedProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@northstar.edu',
  program: 'Computer Science',
  year: '2027',
  bio: '',
  skills: 'React, Python, UI Design'
};

export const STORE_KEY = 'campusly-demo-v1';
export const TOKEN_KEY = 'campusly-access-token';
