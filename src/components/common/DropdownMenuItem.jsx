"use client";

import { Button, Dropdown, Label } from "@heroui/react";
import { ChevronDown, ChevronRight } from "@gravity-ui/icons";
import { MenuLink } from "./MenuLink";
import { useState } from "react";

export function DropdownMenuItem({ item }) {
  // State to manually control open/close on hover
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="dropdown-wrapper"
      // Trigger open on mouse enter, close on mouse leave
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Dropdown open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger button for the dropdown */}
        <Button
          aria-label={`${item.label} menu`}
          variant="default"
          className="flex items-center gap-1"
        >
          {item.label}
          { isOpen ? <ChevronDown className="w-4 h-4 text-muted" /> : <ChevronRight className="w-4 h-4 text-muted" />}
        </Button>

        <Dropdown.Popover>
          {/* Map over the actual children array from your data */}
          <Dropdown.Menu>
            {item.children.map((child, childIndex) => (
              <Dropdown.Item
                key={childIndex}
                id={child.href}
                textValue={child.label}
              >
                <MenuLink
                  href={child.href}
                  className="flex items-center justify-between w-full"
                >
                  <div className="menu-item-content">
                    <Label className="font-bold">{child.label}</Label>
                    {child.description && (
                      <p className="text-sm text-muted">{child.description}</p>
                    )}
                  </div>
                </MenuLink>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}
