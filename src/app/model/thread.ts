import * as internal from "stream";

export interface Thread {
    uid: string,
    title: string,
    content: string,
    author_id: string,
    rating: string,

    // the following can be omiited or optional
    tags?: string,
    votes?: number,
    replies?: Array<Object>, // Object lang sa kay wala pa man hahaha
    views?: number

}