import { auth, currentUser } from "@clerk/nextjs/server"
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";

import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin } from 'lucide-react';
import { Link as LinkIcon } from 'lucide-react';
import Link from "next/link";
import { getUserByClerkId } from "@/actions/user.action"

async function SideBar() {

    const authUser = await currentUser();
    if (!authUser) {
        return <UnAuthenticatedSidebar />
    }

    const sideBarUser = await getUserByClerkId(authUser.id);
    if (!sideBarUser) return null;
    //console.log(sideBarUser)


    return (
        <div className="sticky top-20 bg-transparent border rounded-lg py-4 ">
            <div className="flex flex-col items-center space-y-2 w-full">
                
                <Link href={`/profile/${sideBarUser.username}`} className="flex flex-col items-center space-y-2">
                    <Avatar className="w-36 h-36 ">
                    <AvatarImage src={authUser.imageUrl} />
                    <AvatarFallback>Image</AvatarFallback>
                </Avatar>
                <h1 className="text-lg font-semibold ">{`${authUser.firstName} ${authUser.lastName}`}</h1>
                <h3 className="font-light">{sideBarUser.username ?? authUser.emailAddresses[0].emailAddress.split("@")[0]}</h3>
                </Link>
                <Separator />
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex flex-col text-center">
                        <p>{sideBarUser._count.following}</p>
                        <p>Following</p>
                    </div>
                    <div className="flex flex-col text-center">
                        <span>{sideBarUser._count.followers}</span>
                        <span>Followers</span>
                    </div>
                </div>
                <Separator className="mx-4"/>
                <div className="flex flex-col items-center w-full space-y-2">
                    <div className="flex items-center gap-1 font-light">
                        <MapPin className="w-4 h-4 " />
                        <p>{sideBarUser.location || "No location"}</p>
                    </div>
                    <Link href="websitelink" className="flex items-center gap-1 font-light" target="_blank">
                        <LinkIcon className="w-4 h-4" />
                        {sideBarUser.website || "No Website"}
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default SideBar