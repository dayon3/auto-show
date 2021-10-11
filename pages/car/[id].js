import { getCarById, getCars } from '@/utils/fauna';
import CarLayout from '@/layouts/car';

export default function Car({ car }) {
  return <CarLayout car={car} />;
}

export async function getStaticPaths() {
  const cars = await getCars();

  return {
    paths: cars.map((car) => ({
      params: {
        id: car.id
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const car = await getCarById(params.id);

  return { props: { car } };
}
