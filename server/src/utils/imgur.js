import axios from './axios.js';

export async function post(buffer) {
    const res = await axios.post('https://api.imgur.com/3/image', buffer, {
        headers: {
            'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    const { link, deletehash } = res.data.data;
    return { link, deletehash };
}

export async function del(hash) {
    await axios.delete(`https://api.imgur.com/3/image/${hash}`, {
        headers: {
            'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
    });
}