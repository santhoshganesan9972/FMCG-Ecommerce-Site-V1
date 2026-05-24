interface RoleGateProps {
  role: string;
  allowedRole: string;
  children: React.ReactNode;
}

export default function RoleGate({
  role,
  allowedRole,
  children,
}: RoleGateProps) {

  if (role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}