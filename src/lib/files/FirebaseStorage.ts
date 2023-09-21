import { randomUUID } from "crypto";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import FileStorage from "./FileStorage";

class FirebaseStorage implements FileStorage {
  private app: FirebaseApp;
  private storage: any;
  constructor(config: FirebaseOptions) {
    this.app = initializeApp(config);
    this.storage = getStorage(this.app);
  }

  public async uploadImage(file: any, path: string) {
    return new Promise<string>((resolve, reject) => {
      const storageRef = ref(
        this.storage,
        `${path}/${randomUUID()}+.${file.mimetype.split("/")[1]}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
        contentType: file.mimetype,
      });

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused 🟡");
              break;
            case "running":
              console.log("Upload is running 🟢");
              break;
          }
        },
        (error: any) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }

  public async deleteImage(imageUrl: string) {
    return new Promise<void>(async (resolve, reject) => {
      const storageRef = ref(this.storage, imageUrl);
      await deleteObject(storageRef)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async checkImageExists(imageUrl: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      const storageRef = ref(this.storage, imageUrl);

      getDownloadURL(storageRef)
        .then((url: string) => {
          resolve(true);
        })
        .catch((error) => {
          if (error.code === "storage/object-not-found") {
            resolve(false);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default FirebaseStorage;
