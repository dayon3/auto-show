import { buildUrl } from 'cloudinary-build-url';
import NextImage from 'next/image';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const CarCard = ({ car }) => {
  let url;
  let urlBlurred;

  if (car.data.images !== undefined) {
    url = buildUrl(`${car.data.images[1]}`, {
      cloud: {
        cloudName: 'davisgitonga'
      },
      transformations: {
        resize: {
          width: '336',
          height: '250',
          type: 'scale'
        }
      }
    });
    urlBlurred = buildUrl(`${car.data.images[1]}`, {
      cloud: {
        cloudName: 'davisgitonga'
      },
      transformations: {
        effect: 'blur:1000',
        quality: 1
      }
    });
  }

  return (
    <Link href={`/car/${car.id}`}>
      <a>
        <Grid item sx={{ width: '336px', color: 'black', mb: '26px' }}>
          <Card sx={{ width: '310px', position: 'relative' }}>
            <CardMedia>
              {car.data.images === undefined ? (
                ''
              ) : (
                <Box
                  sx={{
                    position: 'relative',
                    height: '0',
                    paddingTop: `${(960 / 1280) * 100}%`,
                    backgroundImage: `url(${urlBlurred})`,
                    backgroundPosition: 'center center',
                    backkgroundSize: '100%'
                  }}
                >
                  <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
                    <NextImage
                      src={url}
                      alt={`${car.data.make}-${car.data.model}`}
                      width="1280"
                      height="960"
                    />
                  </Box>
                </Box>
              )}
            </CardMedia>
            <CardContent
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(rgba(255, 255, 255, 0), #000)',
                '&:last-child': {
                  pb: '16px'
                }
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontWeight: 'bold', color: 'white' }}
              >
                {`${car.data.make} ${car.data.model}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </a>
    </Link>
  );
};
export default CarCard;
