import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req) {
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                };

                // Beginning login logic
                // Finds user from my db
                if  (email !== "elijah@gmail.com" || password !== "123") {
                    throw new Error('Invalid username or password');
                }

                return {id: '1234', name: 'Elijah Early', email: 'elijah@gmail.com'}
            }
        })
    ],
    pages: {
        signIn: '/auth/signIn',
        signOut: '/auth/signOut',
    },
}

export default NextAuth(authOptions);