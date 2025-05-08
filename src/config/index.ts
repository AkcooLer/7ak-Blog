import { Github, Twitter } from "lucide-react"

export const defaultLanguage: string = "en"

export const common = {
  domain: "https://www.memme.cn",
  meta: {
    favicon: "/avatar.png",
    url: "https://www.memme.cn",
  },
  googleAnalyticsId: "",
  social: [
    {
      icon: Twitter,
      label: "X",
      link: "https://x.com/akcooler",
    },
    {
      icon: Github,
      label: "GitHub",
      link: "https://github.com/AkcooLer",
    },
  ],
  rss: true,
  navigation: {
    home: true,
    archive: true,
    custom: [
      {
        label: "Email",
        link: "mailto:2813955543@qq.com",
      },
    ],
    links: true,
    about: true,
  },
  latestPosts: 8,
  comments: {
    enabled: true,
    twikoo: {
      enabled: true,
      // replace with your own envId
      envId: import.meta.env.PUBLIC_TWIKOO_ENV_ID ?? "",
    },
  },
}

export const zh = {
  ...common,
  siteName: "7aK's Blog 温故而知新",
  meta: {
    ...common.meta,
    title: "7aK'Blog",
    slogan: "温故而知新",
    description: "运维、安全、渗透、CTF",
  },
  navigation: {
    ...common.navigation,
    custom: [
      {
        label: "项目",
        link: "/",
      },
    ],
  },
  pageMeta: {
    archive: {
      title: "All Posts",
      description: "7ak同学的所有文章",
      ogImage: "/images/page-meta/zh/archive.png",
    },
    links: {
      title: "My Friends",
      description: "7ak同学的和他朋友们",
      ogImage: "/images/page-meta/zh/links.png",
    },
    about: {
      title: "About Me",
      description: "7ak同学的自我介绍",
      ogImage: "/images/page-meta/zh/about.png",
    },
    Tags: {
      title: "Tags",
      description: "Here is 7aK's Tags",
      ogImage: "/images/page-meta/en/tags.png",
    },
  },
}

export const en = {
  ...common,
  siteName: "7aK's Blog 温故而知新",
  meta: {
    ...common.meta,
    title: "7aK'Blog",
    slogan: "温故而知新",
    description: "Reading, Photography, Programming, Traveling",
  },
  navigation: {
    ...common.navigation,
    custom: [
      {
        label: "Project",
        link: "/",
      },
    ],
  },
  pageMeta: {
    archive: {
      title: "All Posts",
      description: "Here are 7aK's all posts",
      ogImage: "/images/page-meta/en/archive.png",
    },
    links: {
      title: "My Friends",
      description: "Here are 7aK's friends",
      ogImage: "/images/page-meta/en/links.png",
    },
    about: {
      title: "About Me",
      description: "Here is 7aK's self-introduction",
      ogImage: "/images/page-meta/en/about.png",
    },
     Tags: {
      title: "Tags",
      description: "Here is 7aK's Tags",
      ogImage: "/images/page-meta/en/tags.png",
    },
  },
}
