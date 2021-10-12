import Skeleton from '@mui/material/Skeleton';

const LocationSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        mx: 'auto',
        width: '100%',
        height: '336px',
        justifySelf: 'stretch'
      }}
    />
  );
};

export default LocationSkeleton;
