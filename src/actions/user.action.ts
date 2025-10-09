"use server"
import { prisma } from "@/lib/prisma";
import {auth, currentUser} from "@clerk/nextjs/server"

export default async function syncUser (){
    try {
        const {userId} = await auth()
        const user = await currentUser();

        if(!user || !userId) return;

        const existUser = await prisma.user.findUnique({
            where : {
                clerkId : userId
            }
        })
        if(existUser) return existUser;

        const dbUser = await prisma.user.create({
            data:{
                clerkId : userId,
                name : `${user.firstName || ""} ${user.lastName || ""}`,
                email : user.emailAddresses[0].emailAddress,
                username : user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                image : user.imageUrl
            }
        })
        return dbUser;
    } catch (error) {
        console.log("Error in syncUser", error)

    }
}
