import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

const ImageUpload = ({ onImageUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your actual Cloudinary credentials
  const CLOUDINARY_CLOUD_NAME = 'dqf8h1a0o';
  const CLOUDINARY_UPLOAD_PRESET = 'scribbles_upload';

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      const data = await response.json();

      if (data.secure_url && data.public_id) {
        onImageUploaded({
          url: data.secure_url,
          publicId: data.public_id
        });
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err) {
      setError('Upload failed. Please check your connection.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setError(null);
    onImageUploaded(null);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#F39EB6', marginBottom: '8px' }}>
        Upload Image *
      </label>

      {!preview ? (
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            border: '2px dashed #FFE4EF',
            borderRadius: '12px',
            backgroundColor: '#FAFAFA',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#F39EB6'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = '#FFE4EF'}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            disabled={uploading}
          />

          {uploading ? (
            <>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #FFE4EF',
                  borderTopColor: '#F39EB6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '12px'
                }}
              ></div>
              <p style={{ color: '#F39EB6', fontSize: '14px', fontWeight: '600' }}>Uploading...</p>
            </>
          ) : (
            <>
              <Upload size={40} color="#F39EB6" style={{ marginBottom: '12px' }} />
              <p style={{ color: '#F39EB6', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                Click to upload image
              </p>
              <p style={{ color: '#999', fontSize: '12px' }}>
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          )}
        </label>
      ) : (
        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '2px solid #B8DB80' }}>
          <img src={preview} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <button
            type="button"
            onClick={removeImage}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <X size={20} color="#F39EB6" />
          </button>
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              padding: '6px 12px',
              backgroundColor: '#B8DB80',
              color: 'white',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle size={14} />
            Uploaded
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            backgroundColor: '#fee',
            color: '#c00',
            borderRadius: '8px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ImageUpload;
