import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

import { createCar } from '@/utils/fauna';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;
  const { make, model, year, description, latitude, longitude, images } =
    req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  try {
    const createdCar = await createCar(
      make,
      model,
      year,
      description,
      latitude,
      longitude,
      images,
      userId
    );
    return res.status(200).json(createdCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
});
