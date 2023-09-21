interface FileStorage {
  uploadImage: (file: any, path: string) => Promise<string>;
  deleteImage: (imageUrl: string) => Promise<void>;
  checkImageExists: (imageUrl: string) => Promise<boolean>;
}

export default FileStorage;
