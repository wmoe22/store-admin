import { cn } from "@/lib/utils";
import { Trash, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "./ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  className?: string;
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
  className,
}: ImageUploadProps) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className={cn("relative rounded-lg overflow-hidden", className)}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"sm"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              className="aspect-square w-full rounded-md object-cover"
              alt="Image"
              fill
            />
          </div>
        ))}
      </div>
      <div className={cn("", value.length === 0 ? "flex" : "hidden")}>
        <CldUploadWidget onUpload={onUpload} uploadPreset="mws5fhom">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={onClick}
                  className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </button>
              </>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ImageUpload;
