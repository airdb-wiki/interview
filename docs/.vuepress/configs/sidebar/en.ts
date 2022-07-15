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
}
