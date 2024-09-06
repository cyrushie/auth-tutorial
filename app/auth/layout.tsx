const AuthLayout = ({ children }: { children: React.ReactNodr }) => {
  return (
    <div
      className="h-full flex items-center justify-center
  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-700
  to-stone-900  "
    >
      {children}
    </div>
  );
};

export default AuthLayout;
