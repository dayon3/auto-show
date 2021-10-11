import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { getCarById } from '@/utils/fauna';
import CarForm from '@/components/CarForm';
import Container from '@/components/Container';
import styles from '@/styles/New.module.css';

export default function Home({ car }) {
  return (
    <Container title="Update car">
      <section className={styles.section}>
        <Typography
          align="center"
          gutterBottom
          variant="h1"
          component="h1"
          sx={{ fontWeight: 'bold', fontSize: '32px' }}
        >
          Update Car
        </Typography>
        <Box sx={{ margin: '0 auto', maxWidth: '768px', width: '100%' }}>
          <CarForm car={car} />
        </Box>
      </section>
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    try {
      const id = context.params.id;
      const car = await getCarById(id);

      return {
        props: {
          car
        }
      };
    } catch (error) {
      console.error(error);
      context.res.statusCode = 302;
      context.res.setHeader('Location', `/`);
      return { props: {} };
    }
  }
});
