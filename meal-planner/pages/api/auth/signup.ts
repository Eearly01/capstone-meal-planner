import { connectToMongoDB } from '@/lib/mongodb';
import { hash } from 'bcryptjs';
import User from '@/models/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '@/types';
import mongoose from 'mongoose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	connectToMongoDB().catch((error) => res.json(error));

	if (req.method === 'POST') {
		if (!req.body) return res.status(400).json({ error: 'Data is Missing' });

		const { username, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(409).json({ error: 'User Already Exists' });
		} else {
			if (password.length < 6)
				return res
					.status(409)
					.json({ error: 'Password should be 6 characters long' });

			const hashedPassword = await hash(password, 12);

			try {
				const createdUser = await User.create({
					username,
					email,
					password: hashedPassword,
				});

				const user = {
					email: createdUser.email,
					username: createdUser.username,
					_id: createdUser._id,
				};

				return res.status(201).json({
					success: true,
					user,
				});
			} catch (error) {
				if (error instanceof mongoose.Error.ValidationError) {
					// Only return one error in the mongo array
					for (let field in error.errors) {
						const msg = error.errors[field].message;
						return res.status(409).json({ error: msg });
					}
				}

				return res.status(500).json({ error: 'Internal Server Error' });
			}
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
};

export default handler;
