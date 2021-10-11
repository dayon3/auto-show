const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
  domain: 'db.us.fauna.com',
  scheme: 'https'
});
const q = faunadb.query;

const getCars = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('cars'))),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  );

  const cars = data.map((car) => {
    car.id = car.ref.id;
    delete car.ref;
    return car;
  });

  return cars;
};

const getCarById = async (id) => {
  const car = await faunaClient.query(q.Get(q.Ref(q.Collection('cars'), id)));
  car.id = car.ref.id;
  delete car.ref;
  return car;
};

const createCar = async (
  make,
  model,
  year,
  description,
  latitude,
  longitude,
  images,
  userId
) => {
  return await faunaClient.query(
    q.Create(q.Collection('cars'), {
      data: {
        make,
        model,
        year,
        description,
        location: { latitude: latitude, longitude: longitude },
        images,
        userId
      }
    })
  );
};

const updateCar = async (
  id,
  make,
  model,
  year,
  description,
  latitude,
  longitude,
  images
) => {
  return await faunaClient.query(
    q.Update(q.Ref(q.Collection('cars'), id), {
      data: { make, model, year, description, latitude, longitude, images }
    })
  );
};

const deleteCar = async (id) => {
  return await faunaClient.query(q.Delete(q.Ref(q.Collection('cars'), id)));
};

export { createCar, getCars, getCarById, updateCar, deleteCar };
