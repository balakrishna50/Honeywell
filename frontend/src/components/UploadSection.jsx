import { useState } from "react";
import API from "../services/api";

export default function UploadSection({ onUploadSuccess }) {

  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setStatus("Calculating SHA-256 hash...");

    try {

      const buffer = await file.arrayBuffer();

      const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        buffer
      );

      const hashArray = Array.from(new Uint8Array(hashBuffer));

      const sha = hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

      const formData = new FormData();

      formData.append("file", file);
      formData.append("sha", sha);

      await API.post("/verify-file", formData);

      setStatus("SHA validation successful. File uploaded.");

      onUploadSuccess();

    } catch (err) {

      setStatus("SHA validation failed or invalid JSON file.", err);

    } finally {

      setUploading(false);
    }
  };

  return (
    <div style={{
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      marginTop: "20px"
    }}>

      <h2>Upload JSON File</h2>

      <input
        type="file"
        accept=".json,application/json"
        onChange={handleUpload}
        disabled={uploading}
      />

      {status && <p>{status}</p>}

    </div>
  );
}