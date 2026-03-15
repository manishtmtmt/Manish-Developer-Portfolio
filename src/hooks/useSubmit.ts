import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

export type FormStatus = "idle" | "sending" | "success" | "error";

export function useSubmit() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || formStatus === "sending") return;
    setFormStatus("sending");
    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setFormStatus("success");
        formRef.current?.reset();
        setTimeout(() => setFormStatus("idle"), 4000);
      })
      .catch(() => {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
      });
  };

  return { formRef, formStatus, handleSubmit };
}
