"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import placeholderImg from "../../public/placeholder-image.png";
import ComboBox from "./ComboBox";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Plus, SquarePen } from "lucide-react";

const items = [
  { label: "No Category", value: "" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Children", value: "children" },
];

type Props = {
  type: "edit" | "new";
  img?: string;
  name?: string;
  parent?: string;
};
export default function CategoryFormDialog({
  type,
  img = "",
  name = "",
  parent = "",
}: Props) {
  const [selectedImg, setSelectedImg] = useState<string>(img);
  const imgRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    defaultValues: {
      name: name,
      parent: parent,
      img: img,
    },
  });

  function onSubmit(data: any) {
    console.log(data);
    // console.log(data.img?.[0]);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={type === "edit" ? "outline" : "default"}>
          {type === "new" ? (
            <span className="flex justify-center items-center gap-2">
              <Plus />
              New
            </span>
          ) : (
            <SquarePen />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "new" ? "Create new Category" : "Edit Category"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="img"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="w-1/2 aspect-square relative m-auto group mt-5">
                    {
                      <Image
                        className="rounded-full object-center object-cover"
                        fill
                        src={selectedImg || placeholderImg}
                        alt=""
                      />
                    }
                    {selectedImg && (
                      <Button
                        className="absolute top-1/2 left-1/2 -translate-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto"
                        variant={"destructive"}
                        onClick={() => {
                          setSelectedImg("");
                          form.resetField("img");
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <FormControl className="mt-4">
                    <Button
                      onClick={() => {
                        if (imgRef.current) imgRef.current.click();
                      }}
                    >
                      Select Image{" "}
                      <Input
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setSelectedImg(URL.createObjectURL(file));
                          }
                        }}
                        ref={(node) => {
                          imgRef.current = node;
                          field.ref(node);
                        }}
                        className="opacity-0 w-0 h-0"
                        type="file"
                      />
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="parent"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <FormControl>
                    <ComboBox
                      items={items}
                      value={field.value}
                      onValueChange={field.onChange}
                      buttonText="Select a category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-5" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
