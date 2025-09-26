// src/pages/QRPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import QRCard from "../components/QRCard";
import UserCard from "../components/UserCard";

export default function QRPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", id));
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.warn("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <section className="py-12 text-center text-gray-500">
        Loading user...
      </section>
    );
  }

  return (
    <section className="py-12 space-y-8">
      {/* Pass user object (with base64 photo) to UserCard */}
      <UserCard user={user} />
      <QRCard id={id} />
    </section>
  );
}
