export interface Encryption {
  encrypt: (data: string) => Promise<string>;
  decrypt: (data: string, hash: string) => Promise<boolean>;
}
