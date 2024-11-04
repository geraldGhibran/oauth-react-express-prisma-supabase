import express from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  const follows = await prisma.follower.findMany({});
  res.status(200).json(follows);
});

router.post('/create', auth, async (req, res) => {
  const { followerId, followingId } = req.body;
  try {
    const result = await prisma.follower.create({
      data: {
        followerId: followerId,
        followingId: followingId,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
});

export default router;
