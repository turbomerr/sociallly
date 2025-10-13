"use client"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Image } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner"
import { Send } from 'lucide-react';

function CreatePost() {

    const { user } = useUser()
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isPosting, setIsPosting] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);

    const handleSubmit = async () => { }
    return (
        <div className="border bg-transparent rounded-lg px-4 py-6">
            <div className="flex space-x-4">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={user?.imageUrl} />
                </Avatar>
                <Textarea className="min-h-[100px]"
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isPosting} />
            </div>
            {/* To Do Handle image upload */}
            <Separator className="mt-6" />
            <div className="flex items-center justify-between mt-4" >
                <div className="flex space-x-2">
                    <Button type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => setShowImageUpload(!showImageUpload)}
                        disabled={isPosting}>
                        <Image className="size-4 mr-2" />
                        Photo
                    </Button>
                </div>
                <Button className="flex items-center "
                    variant="outline"
                    onClick={handleSubmit}
                    disabled={!content.trim() && !imageUrl || isPosting}>
                    {isPosting ? (<>
                        <Spinner className="size-4 mr-2" />
                    </>) : (<>
                        <Send className="size-4 mr-2" />
                        Post
                    </>)}
                </Button>

            </div>
        </div>
    )
}

export default CreatePost