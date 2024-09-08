import React, { useState } from 'react';
import QRCode from 'qrcode';

const QrCodeCard = () => {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!url) {
      setError('Enter The Url');
      setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
      return;
    }

    setLoading(true);

    try {
      const qrCodeData = await QRCode.toDataURL(url);
      setQrCode(qrCodeData);
      setError('');
    } catch (error) {
      setQrCode(''); // Clear QR code if URL is invalid
      setError('Invalid URL');
      setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setQrCode('');
    setError('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className={`qr-code-card ${qrCode ? 'qr-generated' : ''}`}>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter URL"
        className="input-url"
      />
      <div className={`alert ${error ? 'mt-2 mb-1' : ''}`}>{error}</div>
      {!qrCode ? (
        <button onClick={handleGenerate} className="btn-generate" id="generate-btn">
          Generate
        </button>
      ) : (
        <button className="btn-clear" onClick={handleClear}>
          Clear
        </button>
      )}
      {qrCode && (
        <>
          <img src={qrCode} alt="qr-code" className="qr-code-img" />
          <button className="btn-download">
            <a download="qrCode.png" href={qrCode} className="w-full">
              Download
            </a>
          </button>
        </>
      )}
    </div>
  );
};

export default QrCodeCard;
