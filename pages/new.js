import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CarForm from '@/components/CarForm';
import Container from '@/components/Container';
import styles from '@/styles/New.module.css';

export default function New() {
  return (
    <Container>
      <section className={styles.section}>
        <Typography
          align="center"
          gutterBottom
          variant="h1"
          component="h1"
          sx={{ fontWeight: 'bold', fontSize: '32px' }}
        >
          Add New Car
        </Typography>
        <Box sx={{ margin: '0 auto', maxWidth: '768px', width: '100%' }}>
          <CarForm />
        </Box>
      </section>
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired();
