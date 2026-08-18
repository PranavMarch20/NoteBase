"use client";

import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Name must be between 1 and 50 characters").max(50, "Name must be between 1 and 50 characters"),
});

export const CreateNotebookBtn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const userId = (await authClient.getSession()).data?.user.id;
  
      if(!userId) {
        toast.error("You must be logged in to create a notebook");
        return;
      }
      
      const response = await createNotebook({ name: values.name, userId })
      if (response.success) {
        form.reset();
        toast.success("Notebook created successfully");
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(response.message);
      }      
    } catch {
      toast.error("Failed to create notebook");
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button />}>
        Create Notebook
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Notebook</DialogTitle>
          <DialogDescription>Create a new notebook to store your notes.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    className="text-md"
                    {...field}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={isLoading}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            
            <Field>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  "Create"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};
