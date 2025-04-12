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
    title: 'Category',
    url: '/d/master/category',
    icon: 'post',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  }
,
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
];

const MAX_HEARTS = 5;
const DAY_IN_MS = 86_400_000;

export { kAppName, kAppAbbr, kAppTagline, kAppDescription, MAX_HEARTS, DAY_IN_MS };
