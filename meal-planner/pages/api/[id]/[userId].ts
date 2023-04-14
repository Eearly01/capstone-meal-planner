import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import mongoose from 'mongoose';
import { UserProfile } from '@/types';
import { useSession } from 'next-auth/react';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
	connectToMongoDB().catch((err) => res.json(err));
	//const { data: session, update }: any = useSession();

	if (req.method === 'GET') {
		const { userId } = req.query;

		try {
			const data = await User.findById(userId);
			const user: UserProfile = {
				_id: data._id,
				email: data.email,
				fullname: data.fullname,
				username: data.username,
				password: data.password,
				savedRecipes: data.savedRecipes,
			};

			return res.status(200).json({
				success: true,
				user,
			});
		} catch (error) {
			console.log('error:', error);
			return res.status(500).json({ error: 'Server Error' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};

export default Handler;
