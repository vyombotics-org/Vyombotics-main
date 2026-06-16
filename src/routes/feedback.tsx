import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { useSiteSettings, type FeedbackItem } from "@/hooks/useSiteSettings";

const DEFAULT_FEEDBACK: FeedbackItem[] = [
  {
    name: "Ananya R.",
    role: "Software Engineer at Razorpay",
    text: "Went from college to ₹18 LPA in 9 months. The DSA + projects combo was unbeatable.",
    rating: 5,
  },
  {
    name: "Karan M.",
    role: "ML Engineer at Swiggy",
    text: "Best decision of my career. The mentors actually code with you, not just lecture.",
    rating: 5,
  },
  {
    name: "Sneha P.",
    role: "Full-Stack Dev at Zomato",
    text: "The 3D learning interface and instant doubts on Discord made it feel like a real college.",
    rating: 5,
  },
];

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Student Feedback — Vyombotics Academy" },
      {
        name: "description",
        content: "Hear what Vyombotics learners say about the courses, mentors and outcomes.",
      },
      { property: "og:title", content: "Student Feedback — Vyombotics" },
      { property: "og:description", content: "Real reviews from Vyombotics learners." },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const { feedbackPage } = useSiteSettings();
  const items =
    feedbackPage.items && feedbackPage.items.length > 0 ? feedbackPage.items : DEFAULT_FEEDBACK;
  const heading = feedbackPage.heading ?? "What Our Students Say";
  const subheading = feedbackPage.subheading ?? "Real outcomes from real learners.";
  const badge = feedbackPage.badge ?? "Student Stories";

  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <div className="glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <Quote className="h-3 w-3 text-primary-glow" /> {badge}
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">{heading}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subheading}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((tm, i) => {
              const stars = Math.max(0, Math.min(5, tm.rating ?? 5));
              return (
                <div key={i} className="card-3d gradient-border rounded-2xl p-6">
                  <div className="mb-3 flex text-primary-glow">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground/90">"{tm.text}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    {tm.image ? (
                      <img
                        src={tm.image}
                        alt={tm.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-[image:var(--gradient-primary)]" />
                    )}
                    <div>
                      <div className="font-semibold">{tm.name}</div>
                      {tm.role && <div className="text-xs text-muted-foreground">{tm.role}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
