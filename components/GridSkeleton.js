import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const CarSkeleton = () => (
  <Grid item justifyContent="center" sx={{ width: '336px', color: 'black' }}>
    <Skeleton
      variant="rectangular"
      width={310}
      sx={{
        mx: 'auto',
        height: '336px',
        justifySelf: 'stretch',
        borderRadius: '0.375rem'
      }}
    />
  </Grid>
);

const GridSkeleton = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
      <CarSkeleton />
    </Grid>
  );
};

export default GridSkeleton;
