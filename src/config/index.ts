import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 1337;

const config = {
  server: {
    port: PORT,
  },

  supabase: {
    storageUrl: process.env.SUPABASE_STORAGE_URL || "",
    serviceKey: process.env.SUPABASE_SERVICE_KEY || "",
  },
};

export default config;
