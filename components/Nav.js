import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import AccountMenu from './AccountMenu';
import styles from '@/styles/Nav.module.css';

const Nav = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <Image src="/logo.svg" width={40} height={40} alt="Auto Show logo" />

      <div className={styles.links}>
        <NextLink href="/">
          <a
            className={`${styles.link} ${
              router.pathname == '/' ? 'active' : ''
            }`}
          >
            Home
          </a>
        </NextLink>
        {!isLoading && user && (
          <NextLink href="/new">
            <a
              className={`${styles.link} ${
                router.pathname == '/new' ? 'active' : ''
              }`}
            >
              Add Car
            </a>
          </NextLink>
        )}
        <Divider
          orientation="vertical"
          flexItem={true}
          variant="middle"
          className={styles.divider}
        />
        {!isLoading && !user && (
          <>
            <NextLink href="/api/auth/login">
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  padding: '0.5rem',
                  marginRight: { sm: '0.5rem', md: '1rem' }
                }}
              >
                Login to Create Show
              </Button>
            </NextLink>
            <Divider
              orientation="vertical"
              flexItem={true}
              variant="middle"
              className={styles.divider}
            />
          </>
        )}

        <div className={styles.account}>
          {/* {user && <span className={styles.username}>Account</span>} */}
          {user ? <AccountMenu user={user} /> : <Avatar />}
          {/* <Avatar /> */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
