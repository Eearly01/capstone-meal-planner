import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import mongoose from 'mongoose';
import { signOut } from 'next-auth/react';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
	connectToMongoDB().catch((err) => res.json(err));
	console.log('hello')
	console.log(req.body)
	if (req.method === 'DELETE') {
		if (!req.body) return res.status(400).json({ error: 'Data is missing' });

		const { _id } = req.body;
		console.log(_id)
		try {
			console.log(_id)
			await User.findByIdAndDelete(_id);

			return res.status(200).json({
				success: true,
				message: 'User deleted successfully',
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
