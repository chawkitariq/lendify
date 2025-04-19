export type File = {
  id: string;
  storage: string;
  filename_disk: string;
  filename_download: string;
  title: string;
  type: string;
  folder: string | null;
  uploaded_by: string;
  created_on: string;
  charset: string;
  filesize: number;
  width: number;
  height: number;
  duration: number;
  embed: string | null;
  tags: string[];
  metadata: Record<string, any>;
  uploaded_on: string;
};

export type FileUploadPayload = Partial<File> & {
  file: Blob;
};