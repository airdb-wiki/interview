import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      children: [
        '/README.md',
        '/guide/getting-started.md',
        '/guide/configuration.md',
        '/guide/page.md',
        '/guide/markdown.md',
        '/guide/assets.md',
        '/guide/i18n.md',
        '/guide/deployment.md',
        '/guide/theme.md',
        '/guide/plugin.md',
        '/guide/bundler.md',
        '/guide/migration.md',
      ],
    },
  ],
  '/interviewer/': [
    {
      text: 'Interview',
      children: [
        '/interviewer/README.md',
        '/interviewer/open.md',
        '/interviewer/ask.md',
        '/interviewer/close.md',
      ],
    },
  ],
  '/candidate/': [
    {
      text: 'candidate',
      collapsible: true,
      children: [
        '/candidate/README.md',
        '/reference/node-api.md',
      ],
    },
  ],
  '/qa/': [
    {
      text: 'General Question',
      children: [
        '/qa/general/README.md',
        '/qa/general/salary.md',
      ],
    },
    {
      text: 'Tech Question',
      collapsible: false,
      children: [
        '/qa/tech/os.md',
        '/qa/tech/session.md',
        '/qa/tech/tcp.md',
        '/qa/tech/tcp-state.md',
        '/qa/tech/2-lru.md',
        '/qa/tech/1-cartesian-product.md',
      ],
    },
  ],
}
