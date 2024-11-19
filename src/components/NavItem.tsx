function NavItem({
  children,
  onAction,
}: {
  children: React.ReactNode;
  onAction?: () => void;
}) {
  return (
    <div onClick={onAction} className="flex flex-col items-center">
      <div className="flex cursor-pointer text-slate-400 font-light mt-1 text-sm gap-1 items-center">
        {children}
      </div>
    </div>
  );
}

export default NavItem;
