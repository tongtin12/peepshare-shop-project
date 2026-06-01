import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

export function AppShell({
  children,
  title,
  showBack = true,
  hideTopBar = false,
  hideBottomNav = false,
  bgWhite = false,
}: {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  hideTopBar?: boolean;
  hideBottomNav?: boolean;
  /** Opt out of the default gray content background (use white instead). */
  bgWhite?: boolean;
}) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#f2f2f2]">
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.06)]">
        {!hideTopBar && <TopBar title={title} showBack={showBack} />}
        <main className={`flex-1 flex flex-col ${bgWhite ? "bg-white" : "bg-[#F7F7F7]"}`}>{children}</main>
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
