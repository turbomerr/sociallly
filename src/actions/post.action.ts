"use server"

import {prisma} from "@/lib/prisma"
import { getDbUserId } from "./user.action"
import { revalidatePath } from "next/cache";

type CreatePostResponse =
   { success: true; post: any } | { success: false; error: string } | null;

export async function createPost(content : string, image : string): Promise<CreatePostResponse> {
    try {
        const mainUserId = await getDbUserId();
        if(!mainUserId) return null

        const post = await prisma.post.create({
            data : {
                content,
                image,
                authorId : mainUserId
            }
        })
        revalidatePath("/")
        return {success : true, post}

    } catch (error) {
        console.log("Error in create a Post", error)
        return {success : false, error : "Failed to create a post"}
    }
}

export async function getPost() {
    try {
        const posts = await prisma.post.findMany({
            orderBy : {
                createdAt : "desc"
            },
            include : { //postu paylasan user 
                author : {
                    select : {
                        id : true,
                        name : true,
                        image : true,
                        username : true
                    }
                },
                comments : { // postun icindeki yorumlari yapan user 
                    include : {
                        author : {
                            select : {
                                id : true,
                                username : true,
                                image : true,
                                name : true
                            }
                        }
                    },
                    orderBy : { // yorumlari eskiden yeni gore siralar
                        createdAt : "asc"
                    }
                },
                likes : { //post taki like lari alir
                    select : {
                        userId : true
                    }
                },
                _count : { //postun like ve comment lerinin sayisini hesaplar
                    select : {
                        likes : true,
                        comments : true
                    }
                }
            }
        })
        return posts;
        
    } catch (error) {
        console.log(error)
        return {success : false, error: "Error in getPost"}
    }
}