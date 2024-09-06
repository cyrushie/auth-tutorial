import { UserRole } from "@prima/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message={`Only ${allowedRole} can go pass this gate`} />
        );
    }

    return <>{children}</>;
};

export default RoleGate;
