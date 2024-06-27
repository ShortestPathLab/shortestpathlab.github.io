import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://spaaaacccee.github.io/shortestpathlab.github.io/", // replace this with your deployed domain
  author: "Kevin Zheng",
  desc: "ShortestPathLab is a research group at Monash University led by A/Prof Daniel Harabor for AI planning and heuristic search.",
  title: "ShortestPathLab",
  ogImage: "shortestpathlab-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: [], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: false,
  width: 32,
  height: 32,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/shortestpathlab",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
];
