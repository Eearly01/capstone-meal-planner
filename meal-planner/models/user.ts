import { Schema, model, models } from 'mongoose';
import { UserProfile } from '@/types';

const UserSchema = new Schema<UserProfile>({
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required'],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Invalid email address',
		],
	},
	fullname: {
		type: String,
		required: [true, 'Full name is required'],
		minLength: [4, 'Full name should be atleast 4 characters long'],
		maxLength: [30, 'Full name should be less than 30 characters'],
	},
	username: {
		type: String,
		unique: true,
		required: [true, 'Full name is required'],
		minLength: [4, 'Full name should be atleast 4 characters long'],
		maxLength: [30, 'Full name should be less than 30 characters'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		select: false,
	},
	savedRecipes: []
});

const User = models.User || model('User', UserSchema);

export default User;
