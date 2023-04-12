import { ObjectId } from "mongoose";
import { ShortRecipe } from "./recipeTypes";

export interface WindowSize {
	width: number;
	height: number;
}

export interface IUser {
	_id?: string;
	email: string;
	fullname: string;
}

export type UserProfile = {
	_id: ObjectId;
	email: string;
	username: string;
	fullname: string;
	password: string;
	savedRecipes: ShortRecipe[];
}

export interface LoginUserParams {
	email: string;
	password: string;
}

export interface ResponseFuncs {
	GET?: Function;
	POST?: Function;
	PUT?: Function;
	DELETE?: Function;
}
