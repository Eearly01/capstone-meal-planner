import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import { connectToMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import mongoose from "mongoose"

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))
    

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ error: "Data is missing" })

        const { fullname, username, email, password, savedRecipes } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(409).json({ error: "User Already exists" })
        }
        else {
            if (password.length < 6)
                return res.status(409).json({ error: "Password should be 6 characters long" })

            const hashedPassword = await hash(password, 12)

            try {
                const data = await User.create({
                    fullname,
                    email,
					username,
                    password: hashedPassword,
                    savedRecipes
                })

                console.log("data:", data)

                const user = {
                    email: data.email,
                    fullname: data.fullname,
					username: data.username,
                    _id: data._id,
                    savedRecipes: data.savedRecipes
                }

                return res.status(201).json({
                    success: true,
                    user
                })
            } catch (error) {
                console.log("error:", error)
                if (error && error instanceof mongoose.Error.ValidationError) {
                    //mongo db will return array
                    // but we only want to show one error at a time

                    for (let field in error.errors) {
                        const msg = error.errors[field].message
                        return res.status(409).json({ error: msg })
                    }
                }

                return res.status(500).json({ error: "Server Error" })
            }
        }
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default Handler