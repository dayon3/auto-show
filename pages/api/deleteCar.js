import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

import { deleteCar, getCarById } from '@/utils/fauna';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { id } = req.body;
  const existingDoc = await getCarById(id);

  if (!existingDoc || existingDoc.data.userId !== userId) {
    res.statusCode = 404;
    return res.json({ msg: 'Document not found.' });
  }

  try {
    const deletedCar = await deleteCar(id);
    res.status(200).json(deletedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
});
