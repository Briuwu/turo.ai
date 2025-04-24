"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, X } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { toast } from "sonner";
import { History } from "./history";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  files: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  submit: (input: unknown) => void;
};

export function UploadForm({ submit }: Props) {
  const searchParams = useSearchParams();
  const flashcardId = searchParams.get("flashcardId");
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = React.useCallback(
    (data: FormValues) => {
      startTransition(async () => {
        try {
          const formData = new FormData();
          data.files.forEach((file) => {
            formData.append("files", file);
          });

          toast("Uploading flashcard...");
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const error = await response.json();
            toast.error(error.message || "Something went wrong");
            return;
          }

          const { text } = await response.json();

          toast("Generating flashcard...");
          submit(text);
        } catch (error) {
          console.error(error);
          toast.error("Failed to generate flashcards. Please try again.");
        }
      });
    },
    [submit]
  );

  return (
    <div className="order-2 md:order-1">
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-center w-16 h-16 border-4 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {!flashcardId && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto place-self-center"
          >
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      accept="application/pdf"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      onFileReject={(_, message) => {
                        form.setError("files", {
                          message,
                        });
                      }}
                      multiple
                      disabled={isPending}
                    >
                      <FileUploadDropzone className="flex-row border-dotted">
                        <CloudUpload className="size-4" />
                        Drag and drop or
                        <FileUploadTrigger asChild>
                          <Button variant="link" size="sm" className="p-0">
                            choose files
                          </Button>
                        </FileUploadTrigger>
                        to upload
                      </FileUploadDropzone>
                      <FileUploadList>
                        {field.value.map((file, index) => (
                          <FileUploadItem key={index} value={file}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                              >
                                <X />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        ))}
                      </FileUploadList>
                    </FileUpload>
                  </FormControl>
                  <FormDescription>Upload a pdf up to 5MB.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4" disabled={isPending}>
              Generate Flashcard!
            </Button>
          </form>
        </Form>
      )}
      {flashcardId && (
        <Button asChild>
          <Link href="/">
            <X />
            Clear Flashcard Filter
          </Link>
        </Button>
      )}
      <History />
    </div>
  );
}
