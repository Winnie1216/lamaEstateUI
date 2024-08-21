import prisma from "../library/prisma.js";
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get users!" })
    }
}
export const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        })
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get user!" })
    }
}
export const updateUser = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId
    const { password, avatar, ...inputs } = req.body
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" })
    }
    let updatedPassword = null
    try {

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10)
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar })
            }
        })
        const { password: userPassword, ...rest } = updatedUser
        res.status(200).json(rest)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update users!" })
    }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" })
    }
    try {
        await prisma.user.delete({
            where: { id: id }
        })
        res.status(200).json({ message: "User deleted" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete users!" })
    }
}
// export const savePost = async (req, res) => {
//     const postId = req.body.postId
//     const tokenUserId = req.userId
//     try {
//         const savedPost = await prisma.savedPost.findUnique({
//             where: {
//                 userId_postId: {
//                     userId: tokenUserId,
//                     postId,
//                 }
//             }
//         })
//         if (savedPost) {
//             await prisma.savedPost.delete({
//                 where: {
//                     id: savedPost.id
//                 }
//             })
//             res.status(200).json({ message: "Post removed from saved list" })
//         }
//         else {
//             await prisma.savedPost.create({
//                 data: {
//                     userId: tokenUserId,
//                     postId,
//                 }
//             })
// res.status(200).json({ message: "Post saved " })
//         }

//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to delete users!" })
//     }
// }
export const savePost = async (req, res) => {
    const { postId } = req.body;
    const tokenUserId = req.userId;

    if (!postId || !tokenUserId) {
        return res.status(400).json({ message: "Post ID or User ID missing" });
    }

    try {
        // 检查是否已保存
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId,
                }
            }
        });

        if (savedPost) {
            // 如果记录已存在，则删除
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id
                }
            });
            res.status(200).json({ message: "Post removed from saved list" });
        } else {
            // 如果记录不存在，则创建
            await prisma.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId,
                }
            });
            res.status(200).json({ message: "Post saved" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to save post!" });
    }
};
export const getPostWithSaveStatus = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId; // 从用户上下文中获取当前用户 ID

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { savedPosts: { where: { userId } } }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const isSaved = post.savedPosts.length > 0;

        res.json({ ...post, isSaved });
    } catch (error) {
        console.error("Error getting post with save status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};