
import { getRandomUser } from '@/actions/user.action'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'


async function WhoToFollow() {

    const randomUsers = await getRandomUser()
    if (randomUsers?.length === 0) return null


    return (
        <div className='bg-transparent border rounded-lg p-6'>
            {randomUsers?.map((user, key) => (
                <div key={key} className="flex flex-col space-y-6">
                    <h1 className='text-xl font-bold'><span className='text-green-400'>Who</span> to Follow</h1>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Avatar className='w-14 h-14'>
                                <AvatarImage src={user.image ?? "/avatar.png"} />
                            </Avatar>
                            <div className='flex flex-col '>
                                <h1 className='font-medium'>{user.name}</h1>
                                <p className='text-gray-700 px-2'>@{user.username}</p>
                                <p className='text-gray-700 px-2'>{user._count.followers} followers</p>
                            </div>
                        </div>
                        <Button variant="outline">
                            Follow
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WhoToFollow


{/* <div className='bg-transparent border rounded-lg p-6'>
        <div className="flex flex-col space-y-6">
            <h1 className='text-xl font-bold'><span className='text-green-400'>Who</span> to Follow</h1>
            <div className='flex'>
                <img className='rounded-full w-16 h-16' src="https://images.squarespace-cdn.com/content/v1/672150b8d012d8532fdedf2c/9526d439-27dd-427e-8513-20099dd2e362/Porsche+911+GT3+mit+Turbo+9ff+GTURBO+1920.jpg" alt="profile" />
                <div className='flex flex-col'>
                    <h1></h1>
                </div>
            </div>
        </div>
    </div> */}