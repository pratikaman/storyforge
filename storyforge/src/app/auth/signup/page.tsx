import type { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Create Account",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupPage() {
  return <SignupClient />;
}
