"use client"
import { UploadDropzone } from "@/lib/uploadthing"
import { X } from 'lucide-react';

interface uploadPromps {
    onChange: (url: string) => void
    value: string
    endpoint: "postImage"
}


function ImageUpload({ onChange, value, endpoint }: uploadPromps) {
     if (value) {
    return (
      <div className="relative size-40">
        <img src={value} alt="Upload" className="rounded-md size-40 object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-gray-500 rounded-full shadow-sm"
          type="button"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    );
}
    return (
        <UploadDropzone endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}

export default ImageUpload