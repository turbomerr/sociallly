import { currentUser } from "@clerk/nextjs/server"
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";

import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

async function SideBar() {

    const authUser = await currentUser();
    if (!authUser) {
        return <UnAuthenticatedSidebar />
    }

    return (
        <div className="sticky top-20 bg-transparent border rounded-lg py-4 w-full">
            <div className="flex flex-col items-center space-y-2">
                {/* <img className="rounded-full w-36 h-36" src="https://a.storyblok.com/f/322327/2586x1449/52797ccfc3/taycan.jpg/m/865x486/smart/filters:format(webp)" alt="profile" />
                 */}
                <Avatar className="w-36 h-36">
                    <AvatarImage  src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-lg font-semibold ">Omer Gokbakar</h1>
                <h3 className="font-light">Username</h3>
                <div className="flex space-x-2 font-extralight ">
                    <span>Bio</span>
                    <span>@Website</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between w-full px-4">
                    <div className="flex flex-col text-center">
                        <p>1</p>
                        <p>Following</p>
                    </div>
                    <div className="flex flex-col text-center">
                        <span>1</span>
                        <span>Following</span>
                    </div>
                </div>
                <Separator className="mx-4"/>

            </div>
        </div>
    )
}

export default SideBar