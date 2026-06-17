import logo from "@/assets/logo.png";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { submitContactMessage } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vyombotics Academy" },
      {
        name: "description",
        content:
          "Get in touch with Vyombotics Academy. Reach our admissions, support, or partnerships team.",
      },
      { property: "og:title", content: "Contact Vyombotics" },
      {
        property: "og:description",
        content: "Talk to our admissions, support and partnerships teams.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const submitFn = useServerFn(submitContactMessage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2" aria-label="Vyombotics">
            <img src={logo} alt="Vyombotics Academy of Future Education" className="h-10 w-auto" />
          </Link>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <Link to="/careers" className="hover:text-foreground">
              Careers
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm uppercase tracking-widest text-primary">Contact</p>
        <h1 className="mt-3 font-display text-5xl font-bold leading-tight">
          Let's <span className="gradient-text">talk</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Whether you have a question about a course, want to partner with us, or just want to say
          hi — we'd love to hear from you. We typically respond within one business day.
        </p>
      </section>

      <section className="border-t border-border/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                t: "Email us",
                d: "info@vyombotics.in",
                sub: "Admissions, support, and general queries",
              },
              {
                icon: Phone,
                t: "Call us",
                d: "+91 8052977697, +91 8303576190",
                sub: "Mon–Sat, 10am–7pm IST",
              },
              {
                icon: MessageCircle,
                t: "WhatsApp",
                d: "+91 8981414833",
                sub: "Fastest way to reach admissions",
              },
              {
                icon: MapPin,
                t: "Visit us",
                d: "79E/8 Dabauli 2, Neemeshwar MahaMandir Society, Gujaini, Near Anubhav Electronics Dabouli, Kanpur, Uttar Pradesh — 208022",
                sub: "By appointment only",
              },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 rounded-2xl border border-border/40 p-5">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-[image:var(--gradient-primary)]">
                  <c.icon className="h-5 w-5 text-background" />
                </div>
                <div>
                  <p className="font-semibold">{c.t}</p>
                  <p className="text-sm text-foreground">{c.d}</p>
                  <p className="text-xs text-muted-foreground">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="rounded-2xl border border-border/40 p-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const fd = new FormData(form);
              setSending(true);
              try {
                await submitFn({
                  data: {
                    name: String(fd.get("name") || ""),
                    email: String(fd.get("email") || ""),
                    message: String(fd.get("message") || ""),
                  },
                });
                toast.success("Message received! We'll get back within 24 hours.");
                form.reset();
              } catch (err: any) {
                toast.error(err?.message || "Could not send. Please try again.");
              } finally {
                setSending(false);
              }
            }}
          >
            <h3 className="font-display text-xl font-semibold">Send a message</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill the form and we'll route it to the right team.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Name</label>
                <Input
                  name="name"
                  required
                  maxLength={120}
                  placeholder="Your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <Input
                  name="email"
                  required
                  type="email"
                  maxLength={255}
                  placeholder="you@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Message</label>
                <Textarea
                  name="message"
                  required
                  maxLength={4000}
                  rows={5}
                  placeholder="How can we help?"
                  className="mt-1"
                />
              </div>

              <Button type="submit" disabled={sending} className="w-full">
                {sending ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
