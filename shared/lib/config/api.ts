export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

export const API_ENDPOINTS = {
  categories: {
    base: '/categories',
    list: (qs: string) => `/categories${qs}`,
    create: '/categories',
    detail: (slug: string) => `/categories/${slug}`,
    update: (slug: string) => `/categories/${slug}`,
    delete: (slug: string) => `/categories/${slug}`,
  },
  courses: {
    base: '/courses',
    list: (qs: string) => `/courses${qs}`,
    create: '/courses',
    detail: (slug: string) => `/courses/${slug}`,
    update: (slug: string) => `/courses/${slug}`,
    delete: (slug: string) => `/courses/${slug}`,
  }
,
  units: {
    base: '/units',
    list: (qs: string) => `/units${qs}`,
    create: '/units',
    detail: (slug: string) => `/units/${slug}`,
    update: (slug: string) => `/units/${slug}`,
    delete: (slug: string) => `/units/${slug}`,
  },
  lessons: {
    base: '/lessons',
    list: (qs: string) => `/lessons${qs}`,
    create: '/lessons',
    detail: (slug: string) => `/lessons/${slug}`,
    update: (slug: string) => `/lessons/${slug}`,
    delete: (slug: string) => `/lessons/${slug}`,
  },
  challenges: {
    base: '/challenges',
    list: (qs: string) => `/challenges${qs}`,
    create: '/challenges',
    detail: (slug: string) => `/challenges/${slug}`,
    update: (slug: string) => `/challenges/${slug}`,
    delete: (slug: string) => `/challenges/${slug}`,
  },
} as const;
