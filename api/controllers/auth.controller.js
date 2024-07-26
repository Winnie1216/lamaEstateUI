import bcrypt from 'bcrypt'
import prisma from '../library/prisma.js'
import jwt from 'jsonwebtoken'


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
    const age = 1000 * 60 * 60 * 24 * 7
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

        const token = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRETKEY, { expiresIn: age })
        const { password: userPassword, ...userInfo } = user


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age
        }).status(200).json(userInfo)


    } catch (err) {
        res.status(500).json({ message: 'Fail to login!' })
    }

}
export const logout = (req, res) => { res.clearCookie("token").status(200).json({ message: 'Logout Successfully' }) }

