import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const DEFAULT_FAQ = [
  {
    q: "Are the courses live or recorded?",
    a: "Both — every cohort has live mentorship plus recorded lectures you can revisit anytime.",
  },
  {
    q: "Do you offer a placement guarantee?",
    a: "We offer dedicated placement support, mock interviews and a referral network. Outcomes depend on effort and project quality.",
  },
  {
    q: "What is the refund policy?",
    a: "7-day no-questions-asked refund from your enrollment date.",
  },
  {
    q: "Can I switch batches?",
    a: "Yes — batch transfer is allowed once per enrollment, subject to seat availability.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes, every completed course awards a verified certificate you can share on LinkedIn.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Vyombotics Academy" },
      {
        name: "description",
        content: "Common questions about Vyombotics courses, batches, refunds and certificates.",
      },
      { property: "og:title", content: "FAQ — Vyombotics" },
      { property: "og:description", content: "Everything you wanted to know about Vyombotics." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { faqPage } = useSiteSettings();
  const items = faqPage.items && faqPage.items.length > 0 ? faqPage.items : DEFAULT_FAQ;
  const heading = faqPage.heading ?? "Frequently Asked Questions";
  const subheading = faqPage.subheading ?? "Quick answers about Vyombotics.";
  const badge = faqPage.badge ?? "Help Center";

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <HelpCircle className="h-3 w-3 text-primary-glow" /> {badge}
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">{heading}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subheading}</p>
          </div>

          <Accordion type="single" collapsible className="card-3d rounded-2xl px-6">
            {items.map((f, i) => (
              <AccordionItem key={i} value={`${i}`} className="border-border/40">
                <AccordionTrigger className="text-left font-display text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
