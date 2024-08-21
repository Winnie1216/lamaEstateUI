import prisma from "../library/prisma.js"




export const getPosts = async (req, res) => {
    const query = req.query
    console.log(query);
    try {
        const posts = await prisma.post.findMany({
            where: {

                city: query.city || undefined,
                type: query.type ? query.type.toLowerCase() : undefined, // 转为小写
                property: query.property ? query.property.toLowerCase() : undefined, // 转为小写
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.minPrice) || 1000000
                }

            }
        })
        res.status(200).json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get post" })
    }
}


export const getPost = async (req, res) => {
    const id = req.params.id
    let userId = null
    try {
        const post = await prisma.post.findUnique({
            where: { id: id },
            include: {
                postDetail: true,
                user: true
            }
        })

        const token = req.cookies.token
        // if (!token) {
        //     userId = null
        // } else {
        //     jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        //         if (err) {
        //             userId = null
        //         } else {
        //             userId = payload.id
        //         }
        //     })
        // }
        if (token) {
            // 等待 JWT 验证完成
            try {
                const payload = await new Promise((resolve, reject) => {
                    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                        if (err) reject(err);
                        else resolve(decoded);
                    });
                });
                userId = payload.id;
            } catch (err) {
                // Token 验证失败，userId 保持为 null
                console.log("Token verification failed:", err);
            }
        }

        //         const saved = await prisma.savedPost.findUnique({
        //             where: {
        //                 userId_postId: {
        //                     postId: id,
        //                     userId,
        //                 }
        //             }
        //         })
        //         res.status(200).json({ ...post, isSaved: saved ? true : false })



        //         res.status(200).json(post)
        //     } catch (err) {
        //         console.log(err);
        //         res.status(500).json({ message: "Failed to get post" })
        //     }
        // }
        let isSaved = false;
        if (userId) {
            const saved = await prisma.savedPost.findUnique({
                where: {
                    userId_postId: {
                        postId: id,
                        userId,
                    }
                }
            });
            isSaved = !!saved;
        }

        res.status(200).json({ ...post, isSaved });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get post" });
    }
};

export const addPost = async (req, res) => {
    const body = req.body
    const tokenUserId = req.userId
    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail
                }
            }
        })
        res.status(200).json(newPost)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get post" })
    }
}

export const updatePost = async (req, res) => {
    try {
        res.status(200).json({ message: "success" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get post" })
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId

    try {
        const post = await prisma.post.findUnique({
            where: { id: id }
        })
        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized" })
        }

        await prisma.post.delete({
            where: { id: id }
        })
        res.status(200).json({ message: "Post delete successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get post" })
    }
}
