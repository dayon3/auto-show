import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

import { getCarById, updateCar } from '@/utils/fauna';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;

  if (req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { id, make, model, year, description, latitude, longitude, images } =
    req.body;

  const existingDoc = await getCarById(id);

  if (!existingDoc || existingDoc.data.userId !== userId) {
    res.statusCode = 404;
    return res.json({ msg: 'Document not found.' });
  }

  try {
    const updatedCar = await updateCar(
      id,
      make,
      model,
      year,
      description,
      latitude,
      longitude,
      images
    );
    return res.status(200).json(updatedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
});
