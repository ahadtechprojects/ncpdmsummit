// src/components/UserCard.jsx
export default function UserCard({ user }) {
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center space-y-4">
      {/* ✅ Render base64 photo */}
      {user.photo && (
        <img
          src={user.photo}
          alt={user.name}
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-red-500"
        />
      )}

      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.designation}</p>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">{user.phone}</p>
    </div>
  );
}
