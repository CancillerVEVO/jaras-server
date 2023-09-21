import config from "../../config";
import FileStorage from "./FileStorage";
import FirebaseStorage from "./FirebaseStorage";

const fileStorage: FileStorage = new FirebaseStorage(config.firebase);
