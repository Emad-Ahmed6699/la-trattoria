import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | La Trattoria",
  description: "Get in touch with La Trattoria for reservations, private events, or general inquiries. We're here to assist you.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
