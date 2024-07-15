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
export const login = (req, res) => {
    console.log('111');
}
export const logout = (req, res) => { }

