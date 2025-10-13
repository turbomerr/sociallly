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