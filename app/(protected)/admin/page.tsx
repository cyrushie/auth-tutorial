"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";
import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {admin} from '@/actions/admin'
import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardDescription
} from "@/components/ui/card";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then(data => {
      if (data?.success) {
        toast.success(data.success)
      }
      if (data?.error) {
        toast.error(data.error)
      }
    })
  }
  
    const onApiRouteClick = () => {
        fetch("/api/admin").then(response => {
            if (response.ok) {
                toast.success("Api has been reached");
            } else {
                toast.error("Forbidden access, (Only admin)");
            }
        });
    };

    return (
        <Card className="shadow-md w-[400px] text-primary-foreground bg-primary ">
            <CardHeader>
                <CardTitle>🗝️Admin</CardTitle>

                <CardDescription>This is an admin only page</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 ">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess
                        message="You have passed the gate, that means you are an admin.
                Congrats"
                    />
                </RoleGate>

                <div
                    className="flex flex-row justify-between items-center
                    rounded-lg p-3
                border shadow-md"
                >
                    <p className="text-sm font-semibold">
                        Admin-only Api route
                    </p>
                    <Button
                        onClick={() => onApiRouteClick()}
                        size="sm"
                        variant="secondary"
                    >
                        Click here
                    </Button>
                </div>
                <div
                    className="flex flex-row justify-between items-center
                    rounded-lg p-3
                border shadow-md"
                >
                    <p className="text-sm font-semibold">
                        Admin-only Server action
                    </p>
                    <Button 
                    onClick={() => onServerActionClick()}
                    size="sm" variant="secondary">
                        Click here
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
