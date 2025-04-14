import { Icons } from "@/components/ui/icons";

const kAppName = "Kursu";
const kAppAbbr = "K";
const kAppTagline = "Kursu - Your Course Companion";
const kAppDescription = ``;

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;


export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/d',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Course',
    url: '/d/master/course',
    icon: 'post',
    shortcut: ['c', 'c'],
    isActive: false,
    items: []
  },
,
  {
    title: 'Unit',
    url: '/d/master/unit',
    icon: 'post',
    shortcut: ['u', 'u'],
    isActive: false,
    items: []
  },
,
  {
    title: 'Lesson',
    url: '/d/master/lesson',
    icon: 'post',
    shortcut: ['l', 'l'],
    isActive: false,
    items: []
  },
,
  {
    title: 'Challenge',
    url: '/d/master/challenge',
    icon: 'post',
    shortcut: ['c', 'c'],
    isActive: false,
    items: []
  },
,
  {
    title: 'ChallengeOption',
    url: '/d/master/challenge-option',
    icon: 'post',
    shortcut: ['c', 'c'],
    isActive: false,
    items: []
  },
,
  {
    title: 'Chapter',
    url: '/d/master/chapter',
    icon: 'post',
    shortcut: ['c', 'c'],
    isActive: false,
    items: []
  },
];
export const POINTS_TO_REFILL = 10;
const MAX_HEARTS = 5;
const DAY_IN_MS = 86_400_000;
export const QUESTS = [
  {
    title: "Earn 20 XP",
    value: 20,
  },
  {
    title: "Earn 50 XP",
    value: 50,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
  {
    title: "Earn 250 XP",
    value: 250,
  },
  {
    title: "Earn 500 XP",
    value: 500,
  },
  {
    title: "Earn 1000 XP",
    value: 1000,
  },
];

export { kAppName, kAppAbbr, kAppTagline, kAppDescription, MAX_HEARTS, DAY_IN_MS };
