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
import LocationSkeleton from '@/components/LocationSkeleton';

const Map = dynamic(() => import('@/components/Map'), {
  loading: () => <LocationSkeleton />,
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
          <CloudinaryContext cloudName="davisgitonga" secure>
            <Grid container spacing={2} justifyContent="center">
              {user &&
                car.data.images.map((image, index) => (
                  <Grid item key={index}>
                    <Image
                      publicId={image}
                      alt={`${car.data.make}-${car.data.model}-${index}`}
                    >
                      <Transformation width="300" crop="scale" />
                    </Image>
                  </Grid>
                ))}
              {!user &&
                car.data.images.slice(0, 2).map((image, index) => (
                  <Grid item key={index}>
                    <Image
                      publicId={image}
                      alt={`${car.data.make}-${car.data.model}-${index}`}
                    >
                      <Transformation width="300" crop="scale" />
                    </Image>
                  </Grid>
                ))}
              {!user && (
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '300px'
                  }}
                >
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                      color: '#1976d2'
                    }}
                  >
                    Login to load more images.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CloudinaryContext>
          <Box sx={{ py: '2rem', width: '100%' }}>
            <Typography
              align="left"
              gutterBottom
              variant="h6"
              component="h6"
              sx={{ fontWeight: 'bold', pb: '1rem' }}
            >
              Description
            </Typography>
            <Typography
              align="left"
              gutterBottom
              variant="p"
              component="p"
              sx={{ pb: '1rem' }}
            >
              {car.data.description}
            </Typography>
          </Box>
          {!user && (
            <>
              <Box
                sx={{
                  position: 'relative',
                  height: '100px',
                  width: '100%',
                  mt: '-150px',
                  background: 'linear-gradient(rgba(255, 255, 255, 0), #f2f5fa)'
                }}
              ></Box>
              <Box sx={{ py: '3rem' }}>
                <Typography
                  align="left"
                  variant="p"
                  component="p"
                  sx={{
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    color: '#1976d2'
                  }}
                >
                  Login to show more details.
                </Typography>
              </Box>
            </>
          )}
          {user && (
            <Box sx={{ pb: '2rem', width: '100%' }}>
              <Typography
                align="left"
                gutterBottom
                variant="h6"
                component="h6"
                sx={{ fontWeight: 'bold', pb: '1rem' }}
              >
                Showroom Location
              </Typography>
              <Map
                lat={parseFloat(car.data.location.latitude)}
                long={parseFloat(car.data.location.longitude)}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
