import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-20 bg-red-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow">
          Digital Media Summit
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-100 drop-shadow">
          Join us for an immersive summit bringing together thought leaders,
          creators, and innovators in the digital media space.
        </p>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-20 bg-white text-red-900">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold">About the Summit</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Through the visionary leadership of the{" "}
            <span className="font-semibold text-red-600">
              Commissioner for Information and Communication
            </span>{" "}
            and the Governor’s Media Team (
            <span className="font-semibold">Ododo Media Center</span>), the{" "}
            <span className="font-semibold">Progressive Digital Media Summit</span>{" "}
            was conceived. This landmark event is dedicated to exploring the
            advancement and progress of digital media in{" "}
            <span className="font-semibold">Kogi State</span>.
          </p>
        </div>
      </section>

      {/* Digital Engagement Section */}
      <section className="py-16 px-6 md:px-20 bg-red-50 text-red-900">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold">Digital-First Experience</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            This summit was organized and coordinated fully through digital
            platforms. Invitees were reached seamlessly through{" "}
            <span className="font-semibold">personalized email invitations</span>,
            ensuring a modern and inclusive communication strategy.
          </p>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-16 px-6 md:px-20 bg-white text-red-900">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold">QR Code Verification</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            To streamline access and create a secure verification process, this
            platform powers a{" "}
            <span className="font-semibold text-red-600">QR Code generator</span>.
            Each invitee receives a unique QR code linked to their personal
            details, including their name, email, phone number, designation, and
            photo. At the event, scanning the QR code instantly verifies their
            identity and confirms their invitation.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-600 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Be Part of the Future</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Secure your place at the Progressive Digital Media Summit. Generate
          your invitation QR code now and be part of this historic event.
        </p>
        <Link
          to="/register"
          className="px-8 py-4 bg-white text-red-600 font-semibold rounded-full shadow hover:bg-red-100 transition"
        >
          Generate My QR Code
        </Link>
      </section>
    </main>
  );
}
