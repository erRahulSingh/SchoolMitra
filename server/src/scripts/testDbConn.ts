import mongoose from "mongoose";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {}

const testConnection = async (uri: string, label: string) => {
  try {
    console.log(`\nTesting connection for ${label}...`);
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ Success for ${label}! Host: ${conn.connection.host}, DB: ${conn.connection.name}`);
    await mongoose.disconnect();
  } catch (err: any) {
    console.log(`❌ Failed for ${label}: ${err.message}`);
  }
};

const run = async () => {
  const uri1 = "mongodb+srv://rahulkahin_db_user:Schoolmitra_db@cluster0.mxb46ol.mongodb.net/schoolmitra?retryWrites=true&w=majority";
  const uri2 = "mongodb+srv://rahulengineer492_db_user:mrx3zFPgAttlcFrk@schoolmitra.qztpv50.mongodb.net/schoolmitra?retryWrites=true&w=majority";

  await testConnection(uri1, "URI 1 (rahulkahin_db_user)");
  await testConnection(uri2, "URI 2 (rahulengineer492_db_user)");
  process.exit(0);
};

run();
