import { randomUUID } from "crypto";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
class FirebaseStorage {
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
}
