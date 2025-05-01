export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Como Funciona",
      href: "/como-funciona",
    },
    {
      label: "Vencedores",
      href: "/vencedores",
    },
    {
      label: "Perguntas Frequentes",
      href: "/faq",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    twitter: "https://twitter.com/yourhandle",
    youtube: "https://youtube.com/yourchannel",
    instagram: "https://instagram.com/yourhandle",
    facebook: "https://facebook.com/yourpage",
  },
};
