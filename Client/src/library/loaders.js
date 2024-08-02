import axios from "axios"
export const singlePageLoader = async ({ params }) => {
    const { id } = params;  //  get id from params of router
    try {
        const res = await axios.get(`http://localhost:8800/api/posts/${id}`);
        return res.data;  // Returns the data retrieved from the server 
    } catch (err) {
        console.error(err);
        throw new Error("Failed to load post data.");
    }
};
