import axios from "axios"
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
    const query = new URL(request.url).searchParams; // 使用 URLSearchParams 获取查询参数
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
