import { useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, LucideChevronsUpDown } from "lucide-react";

interface Item {
  label: string;
  value: string;
}

interface Props {
  items: Item[];
  value: string;
  onValueChange: (value: string) => void;
  buttonText?: string;
  noMatchMessage?: string;
  inputPlaceholder?: string;
}
export default function ComboBox({
  items,
  value,
  onValueChange,
  buttonText = "Select an item",
  noMatchMessage = "No items found.",
  inputPlaceholder = "Search an item...",
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="justify-between">
          {value
            ? items.find((item) => item.value === value)?.label
            : buttonText}
          <LucideChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command value={value}>
          <CommandInput placeholder={inputPlaceholder} />
          <CommandList>
            <CommandEmpty>{noMatchMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  className="flex justify-between items-center"
                  key={item.value}
                  value={item.value}
                  onSelect={(value) => {
                    setIsOpen(false);
                    onValueChange(value);
                  }}
                >
                  {item.label} {value === item.value && <Check />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
