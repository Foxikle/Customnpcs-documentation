import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CustomNPCs Documentation',
  tagline: 'The documentation for the CustomNPCs paper plugin',
  favicon: 'img/customnpcslogo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  // 
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.foxikle.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Foxikle', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/customnpcslogo.png',
    navbar: {
      title: 'CustomNPCS Documentation',
      logo: {
        alt: 'CustomNPCs logo',
        src: 'img/customnpcslogo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/Foxikle/CustomNPCs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Quick Access',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Commands',
              to: '/docs/Commands',
            },
            {
              label: 'Actions',
              to: 'docs/Using-the-Action-System'
            },
          ],
        },
        {
          title: 'API Docs',
          items: [
            {
              label: 'Creating an NPC',
              to: '/docs/api/Creating-an-NPC-with-the-API'
            },
            {
              label: 'Events',
              to: '/docs/api/Using-Events',
            },
            {
              label: 'Creating an Action',
              to: '/docs/api/Writing-Custom-Actions'
            },
            {
              label: 'Roadmap',
              to: '/docs/api/API-Roadmap'
            }
          ]
        },
        {
          title: 'Connections',
          items: [
            {
              label: 'Modrinth',
              href: 'https://modrinth.com/plugin/customnpcs',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/Arp6A6ue3u',
            },
            {
              label: 'Github',
              href: 'https://github.com/foxikle/CustomNPCs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Foxikle. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
