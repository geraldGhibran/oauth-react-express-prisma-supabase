import express from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/pictureByProfileId/:profileId', async (req, res) => {
  const { profileId } = req.params;

  try {
    const post = await prisma.postPicture.findFirst({
      where: { profileId: Number(profileId) },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: `Picture with profileId ${profileId} does not exist in the database` });
  }
});

router.post('/create', auth, async (req, res) => {
  const { profileId, url, postId } = req.body;
  try {
    const result = await prisma.postPicture.create({
      data: {
        postId: postId,
        url: url,
        profileId: profileId,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Unauthorized' });
  }
});

export default router;
