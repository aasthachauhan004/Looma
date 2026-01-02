import { useState, useRef } from "react";
import { colors } from "../../styles/colors";
import { FaUpload, FaTimes, FaSpinner } from "react-icons/fa";
import { useProjects } from "../../context/ProjectContext";

function UploadVideoModal({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const { addProject } = useProjects();
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's a video file
      if (!file.type.startsWith("video/")) {
        alert("Please select a valid video file");
        return;
      }
      // Check file size (max 500MB)
      if (file.size > 500 * 1024 * 1024) {
        alert("File size must be less than 500MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
    } else {
      alert("Please drop a valid video file");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0);
    setStatus("Uploading video...");

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("video", selectedFile);

      setProgress(30);
      setStatus("Processing video...");
      // Upload to backend
      const response = await fetch("http://localhost:3000/api/upload-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Upload response:", data);

      setProgress(80);
      setStatus("Finalizing...");

      addProject({
        id: Date.now().toString(),
        title: selectedFile.name.replace(/\.[^/.]+$/, ""),
        videoPath: data.videoPath,
        audioPath: data.audioPath,
        transcription: data.transcription,
        thumbnail: null,
        createdAt: new Date().toISOString(),
      });

      setStatus("Video uploaded successfully!");
      setProgress(100);

      // Close modal after success
      setTimeout(() => {
        onClose();
        setSelectedFile(null);
        setStatus("");
        setProgress(0);
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  };

  const modalStyle = {
    backgroundColor: colors.background,
    borderRadius: "16px",
    padding: "32px",
    width: "100%",
    maxWidth: "600px",
    border: `1px solid ${colors.border}`,
    position: "relative",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "700",
    color: colors.text,
  };

  const closeButtonStyle = {
    background: "none",
    border: "none",
    color: colors.textLight,
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const dropZoneStyle = {
    border: `2px dashed ${selectedFile ? colors.primary : colors.border}`,
    borderRadius: "12px",
    padding: "48px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    backgroundColor: selectedFile ? colors.primary + "10" : colors.bgLight,
  };

  const uploadButtonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: colors.primary,
    color: colors.text,
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: uploading ? "not-allowed" : "pointer",
    opacity: uploading || !selectedFile ? 0.6 : 1,
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>Upload Video</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            <FaTimes size={24} />
          </button>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: colors.textLight,
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          Upload a screen recording. Get a studio-style video and step-by-step
          article.
        </p>

        {/* Drop Zone */}
        <div
          style={dropZoneStyle}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type='file'
            accept='video/*'
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />

          {!selectedFile ? (
            <>
              <FaUpload
                size={48}
                color={colors.textLight}
                style={{ marginBottom: "16px" }}
              />
              <p
                style={{
                  color: colors.text,
                  fontSize: "16px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Drag and drop or click to upload
              </p>
              <p style={{ color: colors.textLight, fontSize: "14px" }}>
                Supported formats: MP4, MOV, AVI, WebM (Max 500MB)
              </p>
            </>
          ) : (
            <>
              <FaUpload
                size={48}
                color={colors.primary}
                style={{ marginBottom: "16px" }}
              />
              <p
                style={{
                  color: colors.text,
                  fontSize: "16px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                {selectedFile.name}
              </p>
              <p style={{ color: colors.textLight, fontSize: "14px" }}>
                {formatFileSize(selectedFile.size)}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                style={{
                  marginTop: "12px",
                  padding: "8px 16px",
                  backgroundColor: colors.bgLight,
                  color: colors.textLight,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </>
          )}
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div style={{ marginTop: "24px" }}>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: colors.bgLight,
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: colors.primary,
                  transition: "width 0.3s",
                }}
              />
            </div>
            <p
              style={{
                color: colors.textLight,
                fontSize: "14px",
                marginTop: "8px",
                textAlign: "center",
              }}
            >
              {status}
            </p>
          </div>
        )}

        {/* Status Message */}
        {status && !uploading && (
          <p
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: status.includes("failed")
                ? colors.error + "20"
                : colors.success + "20",
              border: `1px solid ${
                status.includes("failed") ? colors.error : colors.success
              }`,
              borderRadius: "8px",
              color: status.includes("failed") ? colors.error : colors.success,
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {status}
          </p>
        )}

        {/* Upload Button */}
        <button
          style={uploadButtonStyle}
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? (
            <>
              <FaSpinner className='spinner' size={16} />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FaUpload size={16} />
              <span>Upload and Process</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default UploadVideoModal;
