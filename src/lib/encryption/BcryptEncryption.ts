import { Encryption } from "./Encryption";
import bcrypt from "bcrypt";

export class BcryptEncryption implements Encryption {
  private saltRounds = 10;

  public encrypt = async (data: string): Promise<string> => {
    const hash = await bcrypt.hash(data, this.saltRounds);
    return hash;
  };

  public decrypt = async (data: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(data, hash);
  };
}
