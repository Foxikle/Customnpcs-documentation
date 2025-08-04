
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout title="CustomNPCs Documentation" description="Your complete guide to CustomNPCs">
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>CustomNPCs Documentation</h1>
          <p>Create, customize, and control NPCs with ease.</p>
        </section>

        <section className={styles.grid}>
          {sections.map(({ title, description, link }) => (
            <Link className={styles.card} to={link} key={title}>
              <div className={styles.cardContent}>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className={styles.explore}>Explore →</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}

const sections = [
  {
    title: 'Getting Started',
    description: 'Install & configure CustomNPCs in minutes.',
    link: '/docs/getting-started',
  },
  {
    title: 'API Reference',
    description: 'Details on API classes, methods, and events.',
    link: '/docs/api/Getting-Started-With-The-API',
  },
  {
    title: 'Commands & Conditions',
    description: 'Control NPC behavior using actions & commands.',
    link: '/docs/Commands',
  },
  {
    title: 'Support & Contribute',
    description: 'Report bugs, ask questions, or contribute.',
    link: '/docs/Support',
  },
];
