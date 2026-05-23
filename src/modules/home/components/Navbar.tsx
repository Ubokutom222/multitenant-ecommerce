"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./NavbarSidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

function NavbarItem(props: NavbarItemProps) {
  return (
    <Button
      variant="outline"
      asChild
      className={cn(
        "bg:transparent hover:bg:transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        props.isActive &&
          "bg-foreground text-background hover:bg-background hover:text-foreground",
      )}
    >
      <Link href={props.href}>{props.children}</Link>
    </Button>
  );
}

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/products", children: "Products" },
  { href: "/about", children: "About" },
  { href: "/pricing", children: "Pricing" },
];
export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <nav className="flex h-20 border-b justify-between font-medium bg-background">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          LogoIpsum
        </span>
      </Link>

      <NavbarSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        items={navbarItems}
      />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item, index) => (
          <NavbarItem
            key={index}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          variant="secondary"
          className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-background hover:bg-muted transition-colors text-lg"
          asChild
        >
          <Link href="/sign-in">Log In</Link>
        </Button>
        <Button
          variant="secondary"
          className="border-l border-t-0 border-r-0 px-12 h-full rounded-none bg-foreground text-background hover:text-foreground hover:bg-muted transition-colors text-lg"
          asChild
        >
          <Link href="/sign-up">Start Selling</Link>
        </Button>
      </div>

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-background"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
}
