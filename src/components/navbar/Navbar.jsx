// "use client";
import React from "react";
import { Button, Dropdown, Label, Link } from "@heroui/react";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { MenuLink } from "../common/MenuLink";
import { DropdownMenuItem } from "../common/DropdownMenuItem";

// Multi-tier navigation array entirely computed on the server
const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    children: [
      { label: "Web Development", href: "/services/web" },
      { label: "UI/UX Design", href: "/services/design" },
      {
        label: "SEO Optimization",
        href: "/services/seo",
        description: "Rank first on search engines.",
      },
    ],
  },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const Navbar = () => {

  // 1. Build Desktop Links (Injects Server Data into dynamic components)
    const desktopLinks = navItems.map((item, index) => {
      
    // 1. Handle items WITH a dropdown menu (e.g., Services)
    if (item.children) {
      return (
        <div key={index} className="dropdown-wrapper">
          <DropdownMenuItem item={item} />
        </div>
      );
    }

    // 2. Handle standard flat links (e.g., Features, Pricing)
    return (
      <li key={index}>
        <MenuLink href={item.href}>{item.label}</MenuLink>
      </li>
    );
  });

  // 2. Build Mobile Drawer Links (Lists items out vertically with subheadings)
  const mobileLinks = navItems.map((item, index) => {
    if (item.children) {
      return (
        <li key={index} className="flex flex-col gap-1 py-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-default-400 px-2">
            {item.label}
          </span>
          <ul className="pl-4 flex flex-col gap-1 border-l-2 border-default-100 ml-2">
            {item.children.map((subItem, index) => (
              <li key={index}>
                <MenuLink
                  href={subItem.href}
                  className="block w-full py-1.5 text-base"
                >
                  {subItem.label}
                </MenuLink>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    return (
      <li key={index}>
        <MenuLink href={item.href} className="block w-full py-2 text-lg">
          {item.label}
        </MenuLink>
      </li>
    );
  });

  return (
    <NavbarSkeleton
      maxWidth="lg"
      position="sticky"
      brand={
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-inherit"
        >
          {/* Professional Minimalist Logo Asset */}
          <svg
            className="h-6 w-6 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 22h20L12 2zm0 4.8l6.2 12.4H5.8L12 6.8z" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight">WeCare</span>
        </Link>
      }
      links={desktopLinks}
      mobileLinks={mobileLinks}
      rightContent={
        <>
          <Link
            href="/#"
            size="sm"
            className="font-medium text-default-600 hover:text-default-900"
          >
            Login
          </Link>
          <Button
            as={Link}
            href="/#"
            color="primary"
            size="sm"
            variant="solid"
            className="font-medium shadow-sm"
          >
            Sign Up
          </Button>
        </>
      }
    />
  );
};

export default Navbar;
