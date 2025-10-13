import { currentUser, auth } from "@clerk/nextjs/server";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";

export default function Home() {


  

  return (
    
      
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <CreatePost/>
        </div> 
      <div className="sticky top-20 hidden lg:block lg:col-span-4">
        who to follow
      </div>
    </div>

    
  );
}
