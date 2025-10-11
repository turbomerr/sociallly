import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

const UnAuthenticatedSidebar = () => {
    return (
        <div className="sticky top-20">
            <Card className="text-center">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Welcome Back!</CardTitle>
                <CardDescription>Login to access your profile and connect with others.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
                <SignInButton mode="modal">
                    <Button variant="default">Login</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button variant="outline">SignUp</Button>
                </SignUpButton>
            </CardContent>
            
        </Card>

        </div>
    )
}

export default UnAuthenticatedSidebar