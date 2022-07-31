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
        '/interviewer/evaluation.md',
      ],
    },
  ],
  '/candidate/': [
    {
      text: 'candidate',
      collapsible: true,
      children: [
        '/candidate/README.md',
        '/candidate/mistake.md',
        '/candidate/introduction.md',
        '/candidate/job.md',
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
        '/qa/tech/db.md',
        '/qa/tech/session.md',
        '/qa/tech/tcp.md',
        '/qa/tech/tcp-state.md',
        '/qa/tech/1-cartesian-product.md',
      ],
    },
  ],
  '/coding/': [
    {
      text: 'Coding',
      collapsible: true,
      children: [
        '/coding/lru.md',
        '/coding/binary-tree.md',
        '/coding/complexity.md',
        '/coding/queue-no-lock.md',
      ],
    },
  ],
}
