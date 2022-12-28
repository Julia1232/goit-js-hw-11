import axios from "axios";

export async function getImage(query,page,limit) {
    const response = await axios.get(`https://pixabay.com/api/?q=${query}&image_type=photo&orientation=horizontal&safesearch=true&key=32421967-eb2d2235d3afe06fa165bc348&page=${page}&per_page=${limit}`)
    return response.data
}
