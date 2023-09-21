import FileStorage from "./FileStorage";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

class SupabaseFileStorage implements FileStorage {
  private supabase: SupabaseClient;

  constructor(storageUrl: string, serviceKey: string) {
    this.supabase = new SupabaseClient(storageUrl, serviceKey);
  }

  public upload = async (file: any, bucket: string) => {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(file.name, file);

    if (error) {
      throw new Error(error.message);
    }

    return data.path;
  };

  public delete = async (fileUrl: string, bucket: string) => {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([fileUrl]);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  };

  public checkIfExists = async (fileUrl: string, bucket: string) => {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .list(fileUrl);

    if (error) {
      throw new Error(error.message);
    }

    return data.length > 0;
  };
}

export default SupabaseFileStorage;
