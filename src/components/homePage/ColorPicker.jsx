"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { HexColorPicker, HexColorInput } from "react-colorful";

const ColorPicker = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm">{label}</span>}
      <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom">
        <PopoverTrigger>
          <Button
            className="min-w-0 w-full h-10 p-0 justify-start overflow-hidden"
            variant="bordered"
          >
            <div className="flex items-center gap-2 w-full px-3">
              <div
                className="w-6 h-6 rounded-md border border-neutral-200 dark:border-neutral-700"
                style={{ backgroundColor: value }}
              />
              <span className="text-sm">{value}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent ref={popoverRef}>
          <div className="p-2 w-64">
            <HexColorPicker color={value} onChange={onChange} className="w-full mb-3" />
            <div className="flex items-center gap-2">
              <span className="text-sm">#</span>
              <HexColorInput
                color={value}
                onChange={onChange}
                prefixed={false}
                className="w-full p-2 text-sm border rounded-md border-neutral-200 dark:border-neutral-700 bg-content1"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;