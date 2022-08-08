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
        '/interviewer/feedback.md',
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
      collapsible: false,
      children: [
        '/coding/complexity.md',
        '/coding/queue-no-lock.md',
      ],
    },
    {
      "text": "堆与栈",
      collapsible: true,
      children: [
        '/coding/stack/README.md',
      ],
    },
    {
      "text": "数组",
      collapsible: true,
      children: [
        '/coding/stack/README.md',
      ],
    },
    {
      "text": "链表",
      collapsible: true,
      children: [
        '/coding/linked-list/README.md',
        '/coding/linked-list/lru.md',
      ],
    },
    {
      "text": "哈希表",
      collapsible: true,
      children: [
        '/coding/stack/README.md',
      ],
    },
    {
      "text": "二叉树",
      collapsible: false,
      children: [
        '/coding/tree/traverse-binary-tree.md',
        '/coding/tree/invert-binary-tree.md',
      ],
    },
    {
      "text": "动态规划",
      collapsible: false,
      children: [
    	'coding/dynamic-programming/README.md',
      ],
    }

  ],
}
