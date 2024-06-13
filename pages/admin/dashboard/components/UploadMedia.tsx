// Essentials
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const UploadMedia: React.FC<{
  className?: string;
  id: string;
  label: string;
  updateLabel?: string;
  existingFiles?: string[];
  onExistingFileChange?: (files: string[]) => void;
  files: File[];
  onFileChange: (files: File[]) => void;
  multiple?: boolean;
  inline?: boolean;
  clearInput?: boolean;
}> = ({
  className,
  id,
  label,
  updateLabel,
  existingFiles,
  onExistingFileChange,
  files,
  onFileChange,
  multiple,
  inline,
  clearInput
}) => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileData, setFilePreviews] = useState<{ file: File; preview: string }[]>([]); 

  const handleFileChange = async (e: any) => {
    const inputFiles = e.target.files;
    onExistingFileChange && onExistingFileChange([])

    if (multiple) { // Multiple files
      const newFileData: { file: File; preview: string }[] = [];      

      for (let i = 0; i < inputFiles.length; i++) {
        const file = inputFiles[i];
        const reader = new FileReader();
        
        reader.onloadend = () => {
          const preview = reader.result as string;
          newFileData.push({ file, preview });

          if (newFileData.length === inputFiles.length) {
            setFilePreviews([...newFileData]);
            onFileChange([...inputFiles]);
          }
        };        

        reader.readAsDataURL(file);
      }

    } else { // One file
      const file = inputFiles[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const preview = reader.result as string;
          setFilePreviews([{ file, preview }]);
        };

        reader.readAsDataURL(file);

        onFileChange([file]);
      }
    }
  };


  const removeFile = (fileToRemove: File) => {
    if(multiple) {
      const newFiles = files.filter((file) => file !== fileToRemove);
      const newFileData = fileData.filter(({file}) => file !== fileToRemove);

      onFileChange(newFiles);
      setFilePreviews(newFileData);

    } else {
      onFileChange([]);
      setFilePreviews([]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const removeExistingFile = (fileToRemove: string) => {
    if(multiple) {
      const newFiles = existingFiles?.filter((file) => file !== fileToRemove);

      onExistingFileChange && newFiles && onExistingFileChange(newFiles);

    } else {
      onExistingFileChange && onExistingFileChange([]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  
  useEffect(() => {
    if (clearInput && fileInputRef.current) {
      fileInputRef.current.value = "";
    }    
  }, [clearInput]);

  return (
    <div className={
      inline
      ? `UploadMedia inline ${className}`
      : `UploadMedia ${className}`
    }>
      { 
        fileData.length > 0 ?
        !inline &&
        <div className="UploadMedia__previews">
          {
            fileData.map(({file, preview}, i: number) => (
              <div key={i} className="UploadMedia__preview" onClick={() => removeFile(file)}>
                <Image src={preview} fill alt="Image Preview" />
              </div>
            ))
          }
        </div>
        :
        <div className="UploadMedia__previews">
          {
            existingFiles?.map((preview, i: number) => (
              <div key={i} className="UploadMedia__preview" >
                <Image src={preview} fill alt="Image Preview" onClick={() => removeExistingFile(preview)}/>
              </div>
            ))
          }
        </div>
      }



      <label
        htmlFor={id}
        className={
          inline
          ? `priButton UploadMedia__addButton inline`
          : "priButton UploadMedia__addButton"
        }
      >
        {
          inline &&
          fileData.map(({preview}, i: number) => (
            <div key={i} className="UploadMedia__inlinePreview">
              <Image src={preview} fill alt="Image Preview" />
            </div>
          ))
        }
        { existingFiles ? updateLabel : label }
      </label>


      <input
        type="file"
        accept="image/*"
        id={id}
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
      />
    </div>
  );
};

export default UploadMedia;
