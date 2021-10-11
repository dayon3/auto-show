import useSWR from 'swr';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styles from '@/styles/Home.module.css';
import CarCard from '@/components/CarCard';
import Container from '@/components/Container';
import fetcher from '@/utils/fetcher';
import GridSkeleton from '@/components/GridSkeleton';
import { TextSlider } from '@/components/TextSlider';

export default function Home() {
  const { data: cars } = useSWR('/api/cars', fetcher);

  return (
    <Container>
      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.hero}>
            <TextSlider slides={['Auto', 'Show']} />
            <Typography
              align="center"
              variant="body1"
              color="text.secondary"
              sx={{
                // fontStyle: 'italic',
                fontSize: '1.4rem',
                mt: '1.5rem'
              }}
            >
              A platform to showcase your favourite cars.
            </Typography>
          </div>
        </section>

        <section className={styles.main}>
          <Grid container spacing={2} justifyContent="center">
            {!cars && <GridSkeleton />}
            {cars && cars.map((car) => <CarCard key={car.id} car={car} />)}
          </Grid>
        </section>
      </div>
    </Container>
  );
}
