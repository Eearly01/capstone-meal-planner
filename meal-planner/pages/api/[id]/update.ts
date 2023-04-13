import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import mongoose from 'mongoose';
import { UserProfile } from '@/types';
import { useSession } from 'next-auth/react';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
	connectToMongoDB().catch((err) => res.json(err));
	//const { data: session, update }: any = useSession();

	if (req.method === 'PUT') {
		if (!req.body) return res.status(400).json({ error: 'Data is missing' });

		const { _id, fullname, username, email, password, savedRecipes } = req.body;

			try {
				const data = await User.findByIdAndUpdate(_id, {
					fullname,
					email,
					username,
					password,
                    savedRecipes
				});
				console.log('data:', data);

				const user: UserProfile = {
					_id: data._id,
					email: data.email,
					fullname: data.fullname,
					username: data.username,
					password: data.password,
					savedRecipes: data.savedRecipes,
				};

				return res.status(201).json({
					success: true,
					user,
				});
			} catch (error) {
				console.log('error:', error);
				if (error && error instanceof mongoose.Error.ValidationError) {
					//mongo db will return array
					// but we only want to show one error at a time

					for (let field in error.errors) {
						const msg = error.errors[field].message;
						return res.status(409).json({ error: msg });
					}
				}

				return res.status(500).json({ error: 'Server Error' });
			}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};

export default Handler;
