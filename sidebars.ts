import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
docs: [
    'getting-started',
    'Creating-Your-First-NPC',
    'configuring-customnpcs',
    'Commands',
    {
      type: 'category',
      label: 'API',
      items: [
        'api/Getting-Started-With-The-API',
        'api/Creating-an-NPC-with-the-API',
        'api/Using-Events',
        'api/Writing-Custom-Actions',
        'api/Gimmicks',
        'api/API-Roadmap',
      ],
    },
    'Using-the-Action-System',
    'Using-Conditions-Within-Actions',
    'Contributing',
    'Support',
    'Acknowledgments',
  ],
};

export default sidebars;
