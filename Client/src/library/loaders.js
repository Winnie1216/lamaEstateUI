import axios from "axios"

import { defer } from "react-router-dom";
export const singlePageLoader = async ({ request, params }) => {
    const { id } = params;  //  get id from params of router
    try {
        const res = await axios.get(`http://localhost:8800/api/posts/${id}`);
        return res.data;  // Returns the data retrieved from the server 
    } catch (err) {
        console.error(err);
        throw new Error("Failed to load post data.");
    }
};



export const listPageLoader = async ({ request }) => {
    const query = new URL(request.url).searchParams;
    const params = {
        city: query.get('city'),
        type: query.get('type'),
        property: query.get('property'),
        bedroom: query.get('bedroom'),
        minPrice: query.get('minPrice'),
        maxPrice: query.get('maxPrice')
    };

    try {
        const res = await axios.get(`http://localhost:8800/api/posts`, { params });
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to load posts.");
    }
}


export const profilePageLoader = async () => {
    try {
        // 请求用户数据
        const postResponse = await axios.get('http://localhost:8800/api/users/profilePosts', {
            withCredentials: true,
        });
        const chatResponse = await axios.get('http://localhost:8800/api/chats', {
            withCredentials: true,
        });

        // 返回数据
        return {
            userPosts: postResponse.data.userPosts,
            savedPosts: postResponse.data.savedPosts,
            chats: chatResponse.data,
        };
    } catch (err) {
        console.error(err.response?.data || err.message);
        throw new Error("Failed to load profile data.");
    }
};
