import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
// Kbd might be needed again if the original used it
// import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
// Input might be needed again if the original used it
// import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Icon } from "@iconify/react";

import { siteConfig } from "@/config/site";
// ThemeSwitch might be needed again
// import { ThemeSwitch } from "@/components/theme-switch";
// import { Logo } from "@/components/icons"; // No longer needed here

export const Navbar = () => {
  return (
    <HeroUINavbar
      position="sticky"
      className="h-16 border-b border-default-200 bg-background"
      maxWidth="full"
    >
      <div className="container mx-auto max-w-7xl h-full flex items-center justify-between px-2 lg:px-24">
        <div className="flex items-center gap-4">
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="p-0 m-0 flex-shrink-0">
              <NextLink className="flex justify-start items-center gap-2" href="/">
                <Icon icon="solar:home-smile-bold" width={32} height={32} className="text-primary" />
                <p className="font-logo font-bold text-inherit self-center text-lg tracking-tight">Ganhacasa.pt</p>
              </NextLink>
            </NavbarBrand>
            <ul className="hidden lg:flex gap-6 justify-start ml-6">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium",
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </NavbarContent>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <NavbarItem className="flex">
            <Button as={NextLink} href="/login" variant="bordered" color="primary">
              Iniciar Sessão
            </Button>
          </NavbarItem>
        </div>

        <div className="sm:hidden">
          <NavbarMenuToggle />
        </div>
      </div>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Button as={NextLink} href="/login" variant="flat" color="primary" fullWidth>
               Iniciar Sessão
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
