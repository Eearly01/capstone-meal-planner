import { connectToMongoDB } from '@/lib/mongodb'
import { compare } from 'bcryptjs'
import User from '@/models/user'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { IUser } from '@/types'

const options : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'text'}
            },
            async authorize(credentials) {
                await connectToMongoDB().catch(err => {throw new Error(err)})

                const user = await User.findOne({
                    username: credentials?.username
                }).select('+password')

                if(!user) {
                    throw new Error('Invalid credentials')
                }
                const isPasswordCorrect = await compare(credentials!.password, user.password)

                if(!isPasswordCorrect) {
                    throw new Error('Invalid credentials')
                }

                return user
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        jwt: async ({token, user}) => {
            user && (token.user = user)
            return token
        },
        session: async({session, token}) => {
            const user = token.IUser as IUser
            session.user = user
            return session
        }
    }
}
export default NextAuth(options)