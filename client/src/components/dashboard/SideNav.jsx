import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/Sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Dashboard", href: "#", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Profile", href: "#", icon: <UserCog className="h-5 w-5" /> },
    { label: "Settings", href: "#", icon: <Settings className="h-5 w-5" /> },
    { label: "Logout", href: "#", icon: <LogOut className="h-5 w-5" /> },
  ];

  return (
    <div className="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen overflow-hidden">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <SidebarLink
            link={{
              label: "Demo User",
              href: "#",
              icon: (
                <img
                  src="https://images.unsplash.com/photo-1502764613149-7f1d229e2300"
                  className="h-7 w-7 rounded-full"
                  alt="User"
                />
              ),
            }}
          />
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

const Logo = () => (
  <a href="#" className="flex items-center space-x-2 text-black py-1 z-20">
    <div className="h-5 w-6 bg-black dark:bg-white rounded" />
    <span className="font-medium text-black dark:text-white">Acet Labs</span>
  </a>
);

const LogoIcon = () => (
  <a href="#" className="flex items-center text-black py-1 z-20">
    <div className="h-5 w-6 bg-black dark:bg-white rounded" />
  </a>
);

const Dashboard = () => (
  <div className="flex flex-1 p-4 md:p-10 bg-white dark:bg-neutral-900">
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 w-full bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="flex gap-2 flex-1">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-64 w-full bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);
