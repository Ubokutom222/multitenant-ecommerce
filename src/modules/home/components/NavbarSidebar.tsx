import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NavbarSidebar(props: Props) {
  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent side="left" className="p-0 transtion-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {props.items.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="w-full text-left p-4 hover:bg-foreground hover:text-background flex items-center"
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              href="/sign-in"
              className="w-full text-left p-4 hover:bg-foreground hover:text-background flex items-center"
              onClick={() => props.onOpenChange(false)}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="w-full text-left p-4 hover:bg-foreground hover:text-background flex items-center"
              onClick={() => props.onOpenChange(false)}
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
