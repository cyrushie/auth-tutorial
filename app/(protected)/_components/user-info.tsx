import { ExtendedUser } from "@/next-auth.d.ts";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
    return (
        <Card className="w-[400px] border-primary-foreground text-primary-foreground bg-primary shadow-md overflow-hidden">
            <CardHeader className="  ">
                <CardTitle>{label}</CardTitle>
                <CardDescription>
                    this is a <span className="lowercase">{label}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-primary-forground ">
                <div
                    className="bg-primary border rounded-lg  w-full flex
                justify-between items-center p-2 font-mono "
                >
                    <p className="text-sm font-medium">ID</p>
                    <p className="p-1 truncate max-w-[150px] text-xs">
                        {user?.id}
                    </p>
                </div>
                <div
                    className="bg-accent-foreground border rounded-lg  w-full flex
                justify-between items-center p-2 font-mono "
                >
                    <p className="text-sm font-medium">username</p>
                    <p className="truncate p-1 max-w-[150px] text-xs">
                        {user?.name}
                    </p>
                </div>
                <div
                    className="bg-accent-foreground border rounded-lg  w-full
                    flex 
                justify-between items-center p-2 font-mono "
                >
                    <p className="text-sm font-medium">email</p>
                    <p className="truncate p-1 max-w-[150px] text-xs">
                        {user?.email}
                    </p>
                </div>
                <div
                    className="bg-accent-foreground border rounded-lg  w-full flex
                justify-between items-center p-2 font-mono "
                >
                    <p className="text-sm font-medium">role</p>
                    <p className="truncate p-1 max-w-[150px] text-xs">
                        {user?.role}
                    </p>
                </div>
                <div
                    className="bg-accent-foreground border bg-primary rounded-lg  w-full flex
                justify-between items-center p-2 font-mono "
                >
                    <p className="text-sm font-medium">isTwoFactorEnabled</p>

                    <Badge
                        variant={
                            user?.isTwoFactorEnabled ? "success" : "destructive"
                        }
                    >
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
                <div
                    className="bg-accent-foreground border bg-primary rounded-lg  w-full flex
                justify-between items-center p-2 font-mono "
                >
                    <p className="text-sm font-medium">isOAuth</p>

                    <Badge variant={user?.isOAuth ? "success" : "destructive"}>
                        {user?.isOAuth ? "ON" : "OFF"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserInfo;
