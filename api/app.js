import express from 'express';
import postRouter from './routes/post.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js'
import messageRoute from './routes/message.route.js'
import dotenv from 'dotenv';

dotenv.config();



const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: true }))



app.use(express.json())
app.use(cookieParser())
app.use("/api/posts", postRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)



app.listen(8800, () => {
    console.log('Server is running!');
})