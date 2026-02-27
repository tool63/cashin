// components/SEO/RouteMetadata.ts

export interface RouteMeta {
  title: string;
  description: string;
  noIndex?: boolean;
  canonical?: string;
}

export const routeMetadata: Record<string, RouteMeta> = {
  "/": {
    title: "Home | Cashooz",
    description: "Earn rewards and grow with Cashooz",
  },
  "/about": {
    title: "About Us | Cashooz",
    description: "Learn more about our platform and mission",
  },
  "/admin": {
    title: "Admin Area",
    description: "Restricted area",
    noIndex: true,
  },
};
