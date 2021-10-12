import NextImage from 'next/image';
import Link from 'next/link';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Input = styled('input')({
  display: 'none'
});

const BootstrapTextField = ({ label, placeholder, register, children }) => (
  <Grid item sx={{ mb: '1.5rem' }}>
    <InputLabel sx={{ fontWeight: 'bold', mb: '.5rem' }}>{label}</InputLabel>
    <TextField
      label={placeholder}
      variant="filled"
      sx={{ width: '100%' }}
      {...register(`${label.toLowerCase()}`, { required: true })}
    />
    {children}
  </Grid>
);

const ValidationError = ({ text }) => {
  return (
    <Typography
      align="left"
      component="p"
      sx={{
        fontWeight: 'semi-bold',
        color: 'red',
        fontSize: '.8rem',
        pt: '.5rem'
      }}
    >
      {text}
    </Typography>
  );
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CarForm({ car }) {
  const [previewSources, setPreviewSources] = useState([]);
  const [openToast, setOpenToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      make: car ? car.data.make : '',
      model: car ? car.data.model : '',
      year: car ? car.data.year : '',
      description: car ? car.data.description : '',
      latitude: car ? car.data.location.latitude : '',
      longitude: car ? car.data.location.longitude : ''
    }
  });
  const router = useRouter();

  const createCar = async (data) => {
    const { make, model, year, description, latitude, longitude } = data;
    try {
      // upload images to cloudinary
      const publicIds = await handleSubmitFile();
      // show toast
      setOpenToast(true);
      // create doc in fauna
      await fetch('/api/createCar', {
        method: 'POST',
        body: JSON.stringify({
          make,
          model,
          year,
          description,
          latitude,
          longitude,
          images: publicIds
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const updateCar = async (data) => {
    const { make, model, year, description, latitude, longitude, images } =
      data;
    const id = car.id;
    try {
      await fetch('/api/updateCar', {
        method: 'PUT',
        body: JSON.stringify({
          make,
          model,
          year,
          description,
          latitude,
          longitude,
          images,
          id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCar = async () => {
    try {
      await fetch('api/deleteCar', {
        method: 'DELETE',
        body: JSON.stringify({ id: car.id }),
        headers: { 'Content-Type': 'application/json' }
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToastClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const handleFileInputChange = async (e) => {
    let files = [];

    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }

    // Convert files to base64EncodedImages
    const base64EncodedImages = files.map(async (file) => {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    const previews = await Promise.all(base64EncodedImages);

    setPreviewSources(previews);
  };

  const handleSubmitFile = async () => {
    if (!previewSources) return;
    const { publicIds } = await uploadImages(previewSources);
    return publicIds;
  };

  const uploadImages = async (base64EncodedImages) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImages }),
        headers: { 'Content-type': 'application/json' }
      });
      const publicIds = await response.json();
      return publicIds;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(car ? updateCar : createCar)}>
        <Grid
          container
          direction="column"
          sx={{ maxWidth: '768px', margin: '0 auto', p: '2rem' }}
        >
          <BootstrapTextField
            placeholder="Car Make"
            label="Make"
            register={register}
          >
            {errors.make && <ValidationError text="Make is required" />}
          </BootstrapTextField>
          <BootstrapTextField
            placeholder="Car Model"
            label="Model"
            register={register}
          >
            {errors.model && <ValidationError text="Model is required" />}
          </BootstrapTextField>
          <BootstrapTextField
            placeholder="Car Year"
            label="Year"
            register={register}
          >
            {errors.year && <ValidationError text="Year is required" />}
          </BootstrapTextField>
          <Grid item sx={{ mb: '1.5rem' }}>
            <InputLabel sx={{ fontWeight: 'bold', mb: '.5rem' }}>
              Description
            </InputLabel>
            <TextareaAutosize
              aria-label="Description"
              minRows={10}
              placeholder="BMW announced the newest additions to the BMW i brand, the i4 eDrive40 and i4 M50 models."
              style={{ width: '100%' }}
              {...register('description', { required: true })}
            />
            {errors.description && (
              <ValidationError text="Description is required" />
            )}
          </Grid>
          <Grid item sx={{ mb: '1.5rem' }}>
            <InputLabel sx={{ fontWeight: 'bold', mb: '.5rem' }}>
              Showroom location
            </InputLabel>
            <Stack direction="row" spacing={6}>
              <Stack sx={{ width: '100%' }}>
                <TextField
                  label="Latitude"
                  variant="filled"
                  {...register('latitude', { required: true })}
                />
                {errors.latitude && (
                  <ValidationError text="Latitude is required" />
                )}
              </Stack>

              <Stack sx={{ width: '100%' }}>
                <TextField
                  label="Longitude"
                  variant="filled"
                  {...register('longitude', { required: true })}
                />
                {errors.longitude && (
                  <ValidationError text="Longitude is required" />
                )}
              </Stack>
            </Stack>
          </Grid>
          {!car && (
            <>
              <Grid item sx={{ mb: '1.5rem' }}>
                <InputLabel sx={{ fontWeight: 'bold', mb: '.5rem' }}>
                  Upload Images
                </InputLabel>
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    // {...register('images', { required: true })}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Choose Files
                  </Button>
                </label>
              </Grid>
              <Grid item sx={{ mb: '1.5rem' }}>
                <Stack direction="row" spacing={2}>
                  {previewSources &&
                    previewSources.map((preview, index) => (
                      <Stack key={index}>
                        <NextImage
                          src={preview}
                          alt={`image-${index}-preview`}
                          width={200}
                          height={150}
                        />
                      </Stack>
                    ))}
                </Stack>
              </Grid>
            </>
          )}
          {car?.data.images && (
            <Grid item sx={{ mb: '1.5rem' }}>
              <InputLabel sx={{ fontWeight: 'bold', mb: '.5rem' }}>
                Uploaded Images
              </InputLabel>
              <CloudinaryContext cloudName="davisgitonga">
                <Grid container spacing={2}>
                  {car.data.images.map((image, index) => (
                    <Grid item key={index}>
                      <Image
                        key={index}
                        publicId={image}
                        alt={`${car.data.make}-${car.data.model}-${index}`}
                      >
                        <Transformation width="300" crop="scale" />
                      </Image>
                    </Grid>
                  ))}
                </Grid>
              </CloudinaryContext>
            </Grid>
          )}
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Save
            </Button>
            <Link href="/" passHref>
              <Button
                variant="contained"
                color="secondary"
                sx={{ textTransform: 'none', mx: '1rem' }}
              >
                Cancel
              </Button>
            </Link>
            <Button
              onClick={deleteCar}
              variant="contained"
              color="error"
              sx={{ textTransform: 'none' }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleToastClose}
      >
        <Alert
          onClose={handleToastClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          <AlertTitle>Success!</AlertTitle>
          We&apos;ve added your auto show.
        </Alert>
      </Snackbar>
    </>
  );
}

const PhotoCamera = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    fill="#fff"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="3.2" />
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);
