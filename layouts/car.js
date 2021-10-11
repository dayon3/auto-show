import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Container from '@/components/Container';

const Map = dynamic(() => import('@/components/Map'), {
  loading: () => 'Loading...',
  ssr: false
});

export default function CarLayout({ car }) {
  const { user } = useUser();

  return (
    <Container title={`${car.data.make} - Auto Show`}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          component="article"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            maxWidth: '64rem',
            width: '100%',
            padding: '1rem 2rem',
            mx: 'auto'
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Typography
              align="left"
              gutterBottom
              variant="h5"
              component="h5"
              sx={{ fontWeight: 'bold', my: '2rem' }}
            >
              {car.data.make}
            </Typography>
            {user && user.sub === car.data.userId && (
              <Link href={`/edit/${car.id}`} passHref>
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ textTransform: 'none' }}
                >
                  Edit Auto Show
                </Button>
              </Link>
            )}
          </Stack>
          <CloudinaryContext cloudName="davisgitonga">
            <Grid container spacing={2} justifyContent="center">
              {car.data.images.map((image, index) => (
                <Grid item key={index}>
                  <Image
                    publicId={image}
                    alt={`${car.data.make}-${car.data.model}-${index}`}
                  >
                    <Transformation width="300" crop="scale" />
                  </Image>
                </Grid>
              ))}
            </Grid>
          </CloudinaryContext>
          <Box sx={{ py: '2rem' }}>
            <Map />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
