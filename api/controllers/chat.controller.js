import prisma from "../library/prisma.js";


// export const getChats = async (req, res) => {
//     const tokenUserId = req.userId;

//     try {
//         const chats = await prisma.chat.findMany({
//             where: {
//                 userIDs: {
//                     hasSome: [tokenUserId],
//                 },
//             },
//         });

//         // 为每个聊天添加 receiver 信息
//         const chatsWithReceiver = await Promise.all(
//             chats.map(async (chat) => {
//                 const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

//                 if (!receiverId) {
//                     console.error('No receiver ID found for chat:', chat);
//                     return chat;
//                 }

//                 console.log('Fetching receiver with ID:', receiverId);
//                 const receiver = await prisma.user.findUnique({
//                     where: {
//                         id: receiverId,
//                     },
//                     select: {
//                         id: true,
//                         username: true,
//                         avatar: true,
//                     },
//                 });

//                 if (!receiver) {
//                     console.error('Receiver not found with ID:', receiverId);
//                 }

//                 return { ...chat, receiver }; // 创建一个新的聊天对象，包含 receiver 信息
//             })
//         );

//         res.status(200).json(chatsWithReceiver);
//     } catch (err) {
//         console.error('Error in getChats:', err.message);
//         res.status(500).json({ message: "Failed to get chats!" });
//     }
// };

// export const getChat = async (req, res) => {
//     const tokenUserId = req.userId;

//     try {
//         const chat = await prisma.chat.findUnique({
//             where: {
//                 id: req.params.id,
//                 userIDs: {
//                     hasSome: [tokenUserId],
//                 },
//             },
//             include: {
//                 messages: {
//                     orderBy: {
//                         createdAt: "asc",
//                     },
//                 },
//             },
//         });

//         await prisma.chat.update({
//             where: {
//                 id: req.params.id,
//             },
//             data: {
//                 seenBy: {
//                     push: [tokenUserId],
//                 },
//             },
//         });
//         res.status(200).json(chat);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to get chat!" });
//     }
// };




// export const addChat = async (req, res) => {
//     const tokenUserId = req.userId;
//     try {
//         const newChat = await prisma.chat.create({
//             data: {
//                 userIDs: [tokenUserId, req.body.receiverId],
//             },
//         });
//         res.status(200).json(newChat);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to add chat!" });
//     }
// };


// export const readChat = async (req, res) => {
//     const tokenUserId = req.userId;


//     try {
//         const chat = await prisma.chat.update({
//             where: {
//                 id: req.params.id,
//                 userIDs: {
//                     hasSome: [tokenUserId],
//                 },
//             },
//             data: {
//                 seenBy: {
//                     push: [tokenUserId],
//                 },
//             },
//         });
//         res.status(200).json(chat);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to read chat!" });
//     }
// };
// import prisma from "../library/prisma.js";

// // 获取所有聊天记录
// export const getChats = async (req, res) => {
//     const tokenUserId = req.userId;

//     try {
//         const chats = await prisma.chat.findMany({
//             where: {
//                 userIDs: {
//                     hasSome: [tokenUserId],
//                 },
//             },
//         });

//         // 为每个聊天添加 receiver 信息
//         const chatsWithReceiver = await Promise.all(
//             chats.map(async (chat) => {
//                 const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

//                 const receiver = await prisma.user.findUnique({
//                     where: {
//                         id: receiverId,
//                     },
//                     select: {
//                         id: true,
//                         username: true,
//                         avatar: true,
//                     },
//                 });

//                 return { ...chat, receiver }; // 创建一个新的聊天对象，包含 receiver 信息
//             })
//         );

//         res.status(200).json(chatsWithReceiver);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to get chats!" });
//     }
// };

// // 获取特定聊天记录
// export const getChat = async (req, res) => {
//     const tokenUserId = req.userId;

//     try {
//         const chat = await prisma.chat.findUnique({
//             where: {
//                 id: req.params.id,
//                 userIDs: {
//                     hasSome: [tokenUserId],
//                 },
//             },
//             include: {
//                 messages: {
//                     orderBy: {
//                         createdAt: "asc",
//                     },
//                 },
//             },
//         });

//         if (!chat) {
//             return res.status(404).json({ message: "Chat not found!" });
//         }

//         // 更新聊天记录的 seenBy 字段
//         await prisma.chat.update({
//             where: {
//                 id: req.params.id,
//             },
//             data: {
//                 seenBy: {
//                     push: tokenUserId, // 使用 push 而不是 set
//                 },
//             },
//         });

//         res.status(200).json(chat);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to get chat!" });
//     }
// };

// // 添加新的聊天记录
// export const addChat = async (req, res) => {
//     const tokenUserId = req.userId;

//     try {
//         const newChat = await prisma.chat.create({
//             data: {
//                 userIDs: [tokenUserId, req.body.receiverId],
//             },
//         });
//         res.status(200).json(newChat);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to add chat!" });
//     }
// };

// // 标记聊天记录为已读
// export const readChat = async (req, res) => {
//     const tokenUserId = req.userId;

//     try {
//         const chat = await prisma.chat.update({
//             where: {
//                 id: req.params.id,
//                 userIDs: {
//                     hasSome: [tokenUserId],
//                 },
//             },
//             data: {
//                 seenBy: {
//                     push: tokenUserId,
//                 },
//             },
//         });
//         res.status(200).json(chat);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Failed to read chat!" });
//     }
// };


export const getChats = async (req, res) => {
    const tokenUserId = req.userId;

    if (!tokenUserId) {
        return res.status(400).json({ message: "Invalid user ID!" });
    }

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
        });

        for (const chat of chats) {
            const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

            if (!receiverId) {
                continue; // Skip if receiverId is undefined
            }

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            });
            chat.receiver = receiver;
        }

        res.status(200).json(chats);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chats!" });
    }
};


export const getChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });

        await prisma.chat.update({
            where: {
                id: req.params.id,
            },
            data: {
                seenBy: {
                    push: [tokenUserId],
                },
            },
        });
        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chat!" });
    }
};

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.receiverId],
            },
        });
        res.status(200).json(newChat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add chat!" });
    }
};

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;


    try {
        const chat = await prisma.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
            data: {
                seenBy: {
                    set: [tokenUserId],
                },
            },
        });
        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to read chat!" });
    }
};