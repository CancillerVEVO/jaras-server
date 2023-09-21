interface FileStorage {
  checkIfExists: (fileUrl: string, bucket: string) => Promise<boolean>;
  upload: (file: any, bucket: string) => Promise<string>;
  delete: (fileUrl: string, bucket: string) => Promise<boolean>;
}

export default FileStorage;
