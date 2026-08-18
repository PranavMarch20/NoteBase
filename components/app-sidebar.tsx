import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { getNotebooks } from "@/server/notebooks";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  const data = {
    navMain: [
      ...(notebooks.notebooksByUser?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/${notebook.id}/notes/${note.id}`,
          isActive: false,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <div className="flex items-center mt-1 p-2 pb-0 gap-1">
                <Logo />
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton render={<CollapsibleTrigger />}>
                    {item.title}{" "}
                    {item.items.length > 0 && (
                      <PlusIcon className="ml-auto group-aria-expanded/menu-button:hidden" />
                    )}
                    {item.items.length > 0 && (
                      <MinusIcon className="ml-auto hidden group-aria-expanded/menu-button:block" />
                    )}
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              isActive={item.isActive}
                              render={<a href={item.url} />}
                            >
                              {item.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
