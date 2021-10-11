import { cloudinary } from '@/utils/cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const { data } = req.body;
    let multiplePicturePromise = data.map((picture) =>
      cloudinary.uploader.upload(picture, {
        upload_preset: 'auto_show'
      })
    );

    let imageResponses = await Promise.all(multiplePicturePromise);
    const publicIds = imageResponses.map((res) => res.public_id);
    return res.status(200).json({
      msg: 'upload successful',
      publicIds
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
}
