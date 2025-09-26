import QRCode from "react-qr-code";

export default function QRCard({ id }) {
  const url = `${window.location.origin}/qr/${id}`;

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-red-600">Your QR Code</h2>
      <div className="bg-white p-4 inline-block rounded-lg shadow">
        <QRCode value={url} size={200} />
      </div>
      <p className="text-sm text-gray-600">Scan this QR to view your info</p>
    </div>
  );
}
