import Head from 'next/head';

import styles from '@/styles/Container.module.css';
import Nav from './Nav';
import Footer from './Footer';

const Container = (props) => {
  const { children, ...customMeta } = props;
  const meta = {
    title: 'Auto Show.',
    description: `A platform to showcase your favourite cars.`,
    ...customMeta
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
      </Head>
      <header className={styles.header}>
        <Nav />
      </header>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Container;
