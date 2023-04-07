import { LoginUserParams } from "@/types";
import { signIn } from 'next-auth/react'
import { InputErrors } from "@/types/error";

export const loginUser =async ({username, password}:LoginUserParams) => {
    const res = await signIn('credentials', {
        redirect: false,
        username,
        password
    })
    return res
}

export const getErrorMsg = (key: string, errors: InputErrors[]) => {
    if(errors.find(err => err.hasOwnProperty(key) !== undefined)) {
        const errorObj = errors.find(err => err.hasOwnProperty(key))
        return errorObj && errorObj[key]
    }
}