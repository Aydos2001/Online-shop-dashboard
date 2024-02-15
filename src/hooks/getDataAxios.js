import axios from "axios";

export async function getCategories(url, dispatch) {
    try {
        dispatch({type : "FETCHING_CAT_DATA"})
        const res = await axios.get(url)
        dispatch({type : "FETCHED_CAT_DATA", payload : res.data})
    }
    catch (err) {
        dispatch({type : "FETCHED_ERROR_CAT_DATA"})
    }
}

export async function getProducts(url, dispatch) {
    try {
        dispatch({type : "FETCHING_PRO_DATA"})
        const res = await axios.get(url)
        dispatch({type : "FETCHED_PRO_DATA", payload : res.data})
    }
    catch (err) {
        dispatch({type : "FETCHED_ERROR_PRO_DATA"})
    }
}