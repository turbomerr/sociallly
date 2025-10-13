"use server"
import { prisma } from "@/lib/prisma";
import {auth, currentUser} from "@clerk/nextjs/server"

export async function syncUser (){
    try {
        const {userId : clerkId} = await auth()
        const user = await currentUser();

        if(!user || !clerkId) return;
        //check the user exist in db
        const existUser = await prisma.user.findUnique({
            where : {
                clerkId : clerkId
            }
        })
        if(existUser) return existUser;

        const dbUser = await prisma.user.create({
            data:{
                clerkId : clerkId,
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

export async function getUserByClerkId(clerkId : string) {
    try {
        //clerkId ye gore user i db de bulur 
        const sideBarUser = await prisma.user.findUnique({
            where : {clerkId : clerkId},
            include : {
                _count : {
                    select : {
                        followers : true,
                        following : true,
                        posts : true
                    }
                }
            },
            
        })
        return sideBarUser
        
    } catch (error) {
        console.log("Error in getUserByClerkId", error)
    }
}

export async function getDbUserId() {
    try {
        const {userId : clerkId} = await auth()// auth() fonksiyonundan userId icerisinde clerkId doner aslinda bu userId nin ismini clerkId olarak degistiriyoruz, bizim asil aradigimiz id user in prismadaki id si
        if(!clerkId) return null;
        const userInDb = await getUserByClerkId(clerkId); // burada clerkId ile eslesen user i buluyoruz

        if(!userInDb) throw new Error("User not found!")
            return userInDb.id; //main user in id sini dondururyoruz

    } catch (error) {
        console.log("Error in get UserId", error)
    }
    
}
