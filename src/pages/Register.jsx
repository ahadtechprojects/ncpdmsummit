import ContactForm from "../components/ContactForm";

export default function Register() {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Register
      </h1>
      <ContactForm />
    </section>
  );
}