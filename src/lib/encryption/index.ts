import { BcryptEncryption } from "./BcryptEncryption";
import { Encryption } from "./Encryption";

export const encryption: Encryption = new BcryptEncryption();
