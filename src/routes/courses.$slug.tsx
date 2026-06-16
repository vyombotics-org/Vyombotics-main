import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Star,
  Users,
  Trophy,
  Sparkles,
  Loader2,
  PlayCircle,
  Radio,
  Calendar,
  Check,
  Tag,
  X,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { getCourseBySlug, listPreviewLecturesBySlug } from "@/lib/courses.functions";
import { listBatchesByCourseSlug, myActiveBatches } from "@/lib/learn.functions";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/razorpay.functions";
import { validateCoupon } from "@/lib/coupons.functions";

function CourseErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-6 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold">Course unavailable</h1>
        <p className="mt-3 text-muted-foreground">
          {error.message === "NOT_FOUND"
            ? "This course doesn't exist or isn't published yet."
            : error.message}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Retry
          </Button>
          <Button asChild>
            <Link to="/courses">All courses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Vyombotics` },
      {
        name: "description",
        content: "Premium course on Vyombotics Academy with live mentorship and certificate.",
      },
    ],
  }),
  component: CourseDetail,
  errorComponent: CourseErrorComponent,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-2xl px-6 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold">Course not found</h1>
        <Button asChild className="mt-6">
          <Link to="/courses">Browse courses</Link>
        </Button>
      </div>
    </div>
  ),
});

function CourseDetail() {
  const { slug } = Route.useParams();
  const fetcher = useServerFn(getCourseBySlug);
  const previewFn = useServerFn(listPreviewLecturesBySlug);
  const { data, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetcher({ data: { slug } }),
  });
  const previewsQ = useQuery({
    queryKey: ["course-previews", slug],
    queryFn: () => previewFn({ data: { slug } }),
  });
  const [activePreview, setActivePreview] = useState<any | null>(null);

  if (isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  const c: any = data?.course;
  if (!c) return null;
  const previews = previewsQ.data?.lectures ?? [];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All courses
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          <div className="order-2 lg:order-1 lg:col-span-2">
            <div className="card-3d gradient-border overflow-hidden rounded-3xl">
              <div className="aspect-video w-full bg-[image:var(--gradient-primary)]">
                {c.thumbnail_url && (
                  <img src={c.thumbnail_url} alt={c.title} className="h-full w-full object-cover" />
                )}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
              {c.category && (
                <span className="rounded-full bg-primary/15 px-3 py-1 text-primary-glow">
                  {c.category}
                </span>
              )}
              {c.level && (
                <span className="rounded-full bg-accent/15 px-3 py-1 text-accent-foreground capitalize">
                  {c.level}
                </span>
              )}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">{c.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {Number(c.students_count ?? 0).toLocaleString()}{" "}
                students
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-primary-glow" />{" "}
                {Number(c.rating ?? 0).toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {c.duration_hours ?? 0} hrs
              </span>
            </div>
            <div className="mt-8 card-3d rounded-2xl p-6">
              <h2 className="font-display text-2xl font-semibold">About this course</h2>
              <p className="mt-3 whitespace-pre-wrap text-muted-foreground">
                {c.description || "Detailed description coming soon."}
              </p>
            </div>

            {previews.length > 0 && (
              <div className="mt-6 card-3d gradient-border rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-semibold">
                    Free <span className="gradient-text">Demo Videos</span>
                  </h2>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary-glow">
                    {previews.length} free
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a sample lesson before you enroll.
                </p>

                {activePreview && (
                  <div className="mt-5 overflow-hidden rounded-xl bg-black">
                    {activePreview.kind === "recorded" && activePreview.video_url ? (
                      <video
                        key={activePreview.id}
                        src={activePreview.video_url}
                        controls
                        autoPlay
                        className="aspect-video w-full"
                      />
                    ) : (
                      <div className="grid aspect-video w-full place-items-center text-muted-foreground">
                        No preview available
                      </div>
                    )}
                    <div className="bg-card/60 px-4 py-3 text-sm">
                      <div className="font-medium">{activePreview.title}</div>
                      {activePreview.description && (
                        <div className="text-xs text-muted-foreground">
                          {activePreview.description}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-5 grid gap-2">
                  {previews.map((l: any) => {
                    const isActive = activePreview?.id === l.id;
                    return (
                      <button
                        key={l.id}
                        onClick={() => setActivePreview(l)}
                        className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all ${isActive ? "border-primary bg-primary/10" : "border-border/40 hover:border-border hover:bg-card/40"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`grid h-10 w-10 place-items-center rounded-lg ${l.kind === "live" ? "bg-red-500/15 text-red-400" : "bg-primary/15 text-primary-glow"}`}
                          >
                            {l.kind === "live" ? (
                              <Radio className="h-5 w-5" />
                            ) : (
                              <PlayCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{l.title}</div>
                            <div className="text-xs text-muted-foreground">
                              <Clock className="mr-1 inline h-3 w-3" />
                              {l.duration_min || 0} min · Free preview
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-primary-glow">
                          {isActive ? "Playing" : "Play ▶"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Sparkles, t: "Live Mentorship", d: "Weekly 1:1 with experts" },
                { icon: Trophy, t: "Certificate", d: "Verified on completion" },
                { icon: BookOpen, t: "Real Projects", d: "Portfolio-grade work" },
                { icon: Users, t: "Community", d: "Discord + peer learning" },
              ].map((p, i) => {
                const I = p.icon;
                return (
                  <div key={i} className="card-3d rounded-xl p-4">
                    <I className="h-6 w-6 text-primary-glow" />
                    <div className="mt-2 font-semibold">{p.t}</div>
                    <div className="text-xs text-muted-foreground">{p.d}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <BatchesPanel slug={slug} coursePrice={Number(c.price_inr ?? 0)} />
          </aside>
        </div>
      </div>
    </div>
  );
}

function BatchesPanel({ slug, coursePrice }: { slug: string; coursePrice: number }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const listFn = useServerFn(listBatchesByCourseSlug);
  const createOrderFn = useServerFn(createRazorpayOrder);
  const verifyFn = useServerFn(verifyRazorpayPayment);
  const myFn = useServerFn(myActiveBatches);
  const validateFn = useServerFn(validateCoupon);

  const batchesQ = useQuery({
    queryKey: ["batches", slug],
    queryFn: () => listFn({ data: { slug } }),
  });
  const myQ = useQuery({ queryKey: ["my-batches"], queryFn: () => myFn(), enabled: !!user });

  const enrolledMap: Record<string, { id: string; payment_status: string }> = {};
  (myQ.data?.enrollments ?? []).forEach((e: any) => {
    if (e.batches?.id) enrolledMap[e.batches.id] = { id: e.id, payment_status: e.payment_status };
  });

  // Coupon state per batch
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [applied, setApplied] = useState<Record<string, any>>({});
  const [validating, setValidating] = useState<string | null>(null);

  const apply = async (batch_id: string) => {
    const code = (codes[batch_id] || "").trim();
    if (!code) return;
    setValidating(batch_id);
    try {
      const res = await validateFn({ data: { code, batch_id } });
      setApplied((m) => ({ ...m, [batch_id]: res }));
      toast.success(`Coupon "${res.code}" applied — you save ₹${res.discount.toLocaleString()}`);
    } catch (e: any) {
      toast.error(e?.message || "Invalid coupon");
    } finally {
      setValidating(null);
    }
  };

  const [checkout, setCheckout] = useState<null | { batch_id: string; order: any }>(null);
  const [creatingOrder, setCreatingOrder] = useState<string | null>(null);

  const openCheckout = async (batch_id: string) => {
    setCreatingOrder(batch_id);
    try {
      const couponId = applied[batch_id]?.coupon_id ?? null;
      const order = await createOrderFn({ data: { batch_id, coupon_id: couponId } });
      setCheckout({ batch_id, order });
    } catch (e: any) {
      toast.error(e?.message || "Could not start checkout");
    } finally {
      setCreatingOrder(null);
    }
  };

  const pay = useMutation({
    mutationFn: async () => {
      if (!checkout) throw new Error("No order");
      const { order } = checkout;
      const payment_id = `pay_DUMMY_${Math.random().toString(36).slice(2, 14)}`;
      const signature = `sig_DUMMY_${Math.random().toString(36).slice(2, 20)}`;
      return verifyFn({
        data: {
          enrollment_id: order.enrollment_id,
          razorpay_order_id: order.order_id,
          razorpay_payment_id: payment_id,
          razorpay_signature: signature,
          applied_coupon_id: order.applied_coupon_id,
          amount_paid: order.amount / 100,
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-batches"] });
      setCheckout(null);
      toast.success("Payment successful — enrolled!");
    },
    onError: (e: any) => toast.error(e?.message || "Payment failed"),
  });

  const batches: any[] = batchesQ.data?.batches ?? [];

  return (
    <div className="card-3d gradient-border rounded-2xl p-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-semibold">
          Available <span className="gradient-text">Batches</span>
        </h3>
        <span className="text-xs text-muted-foreground">{batches.length} active</span>
      </div>

      {batchesQ.isLoading ? (
        <div className="grid place-items-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : batches.length === 0 ? (
        <div className="mt-4 rounded-xl border border-border/40 p-4 text-sm text-muted-foreground">
          No batches scheduled yet. Starting from ₹{coursePrice.toLocaleString()}.
        </div>
      ) : (
        <div className="mt-4 grid gap-3">
          {batches.map((b) => {
            const enrolled = enrolledMap[b.id];
            const isPending = enrolled?.payment_status === "pending";
            const isPaid = enrolled?.payment_status === "success";
            const ap = applied[b.id];
            const displayPrice = ap ? ap.final_price : Number(b.price_inr);
            return (
              <div key={b.id} className="rounded-xl border border-border/40 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{b.name}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(b.start_date).toLocaleDateString()}
                      </span>
                      <span>· {b.validity_days} days access</span>
                      <span>· {b.seats} seats</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {ap && (
                      <div className="text-xs text-muted-foreground line-through">
                        ₹{Number(b.price_inr).toLocaleString()}
                      </div>
                    )}
                    <div className="text-lg font-bold gradient-text">
                      ₹{displayPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                {!isPaid && user && (
                  <div className="mt-3">
                    {ap ? (
                      <div className="flex items-center justify-between gap-2 rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 text-xs">
                        <span className="flex items-center gap-1.5 text-primary-glow">
                          <Tag className="h-3 w-3" /> <strong>{ap.code}</strong> — saved ₹
                          {ap.discount.toLocaleString()}
                        </span>
                        <button
                          onClick={() =>
                            setApplied((m) => {
                              const n = { ...m };
                              delete n[b.id];
                              return n;
                            })
                          }
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          value={codes[b.id] || ""}
                          onChange={(e) =>
                            setCodes((m) => ({ ...m, [b.id]: e.target.value.toUpperCase() }))
                          }
                          placeholder="Promo code"
                          className="h-8 text-xs"
                          maxLength={40}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={validating === b.id || !codes[b.id]?.trim()}
                          onClick={() => apply(b.id)}
                        >
                          {validating === b.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-3 flex gap-2">
                  {!user ? (
                    <Button asChild className="btn-glow w-full text-primary-foreground">
                      <Link to="/auth" search={{ mode: "signup" } as any}>
                        Sign in to enroll
                      </Link>
                    </Button>
                  ) : isPaid ? (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate({ to: "/learn/$batchId", params: { batchId: b.id } })}
                    >
                      <Check className="h-4 w-4" /> Go to batch
                    </Button>
                  ) : b.buy_url ? (
                    <Button asChild className="btn-glow w-full text-primary-foreground">
                      <a href={b.buy_url} target="_blank" rel="noopener noreferrer">
                        <CreditCard className="h-4 w-4" /> Pay · ₹{displayPrice.toLocaleString()}
                      </a>
                    </Button>
                  ) : (
                    <Button
                      className="btn-glow w-full text-primary-foreground"
                      disabled={creatingOrder === b.id}
                      onClick={() => openCheckout(b.id)}
                    >
                      {creatingOrder === b.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CreditCard className="h-4 w-4" />
                      )}{" "}
                      {isPending ? "Resume payment" : `Pay · ₹${displayPrice.toLocaleString()}`}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 space-y-2 text-sm text-muted-foreground">
        <div>✓ Live + recorded classes</div>
        <div>✓ Batch validity tracked automatically</div>
        <div>✓ Attendance and progress dashboard</div>
        <div>✓ Certificate on completion</div>
      </div>

      <Dialog
        open={!!checkout}
        onOpenChange={(o) => {
          if (!o && !pay.isPending) setCheckout(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary-glow" /> Checkout
            </DialogTitle>
            <DialogDescription>
              Test mode — Razorpay live integration coming soon.
            </DialogDescription>
          </DialogHeader>
          {checkout && (
            <div className="space-y-3">
              <div className="rounded-xl border border-border/40 p-4">
                <div className="text-xs text-muted-foreground">{checkout.order.name}</div>
                <div className="font-medium">{checkout.order.description}</div>
                <div className="mt-3 flex items-end justify-between">
                  <span className="text-xs text-muted-foreground">Total payable</span>
                  <span className="text-2xl font-bold gradient-text">
                    ₹{(checkout.order.amount / 100).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-muted-foreground break-all">
                  Order: {checkout.order.order_id}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary-glow" /> Secure dummy gateway — no real
                charge.
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" disabled={pay.isPending} onClick={() => setCheckout(null)}>
              Cancel
            </Button>
            <Button
              className="btn-glow text-primary-foreground"
              disabled={pay.isPending}
              onClick={() => pay.mutate()}
            >
              {pay.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}{" "}
              Pay ₹{checkout ? (checkout.order.amount / 100).toLocaleString() : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
