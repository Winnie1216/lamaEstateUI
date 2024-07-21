import bcrypt from 'bcrypt'
import prisma from '../library/prisma.js'

export const register = async (req, res) => {
    const { username, email, password } = req.body
    try {

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },
        })
        console.log(newUser);
        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user!" })
    }

}
export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { username: username }
        })
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid Credentials' })
        // res.setHeader("Set-Cookie", "test=" + "myValue").json('successful')
        res.cookie("test2", "myValue", {
            httpOnly: true
        }).status(200).json({ message: "Login Successfully" })


    } catch (err) {
        res.status(500).json({ message: 'Failer to login!' })
    }

}
export const logout = (req, res) => { }

