import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Mail, Trash2, MailOpen, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { adminListContactMessages, adminUpdateContactMessage } from "@/lib/enrollments.functions";

export const Route = createFileRoute("/_authenticated/admin/contact")({
  head: () => ({ meta: [{ title: "Contact Messages · Admin" }] }),
  component: ContactMessagesPage,
});

function ContactMessagesPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListContactMessages);
  const updateFn = useServerFn(adminUpdateContactMessage);
  const { data, isLoading } = useQuery({ queryKey: ["admin-contact"], queryFn: () => listFn() });
  const inv = () => qc.invalidateQueries({ queryKey: ["admin-contact"] });
  const update = useMutation({
    mutationFn: (v: any) => updateFn({ data: v }),
    onSuccess: () => inv(),
    onError: (e: any) => toast.error(e.message || "Failed"),
  });

  if (isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  const items: any[] = data?.messages ?? [];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold flex items-center gap-2">
          <Mail className="h-7 w-7 text-primary-glow" />
          Contact <span className="gradient-text">Messages</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Messages submitted from the public contact form.
        </p>

        <div className="mt-6 space-y-3">
          {items.length === 0 ? (
            <div className="card-3d rounded-2xl p-10 text-center text-muted-foreground">
              No messages yet.
            </div>
          ) : (
            items.map((m) => (
              <div
                key={m.id}
                className={`card-3d rounded-2xl p-5 ${m.status === "new" ? "border-l-4 border-primary" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">
                      {m.name}{" "}
                      <span className="text-xs font-normal text-muted-foreground">· {m.email}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {new Date(m.created_at).toLocaleString()}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      m.status === "new"
                        ? "bg-primary/15 text-primary-glow"
                        : m.status === "read"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.status !== "read" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => update.mutate({ id: m.id, status: "read" })}
                    >
                      <MailOpen className="h-3 w-3" /> Mark read
                    </Button>
                  )}
                  {m.status !== "replied" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => update.mutate({ id: m.id, status: "replied" })}
                    >
                      <CheckCheck className="h-3 w-3" /> Mark replied
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" asChild>
                    <a href={`mailto:${m.email}?subject=Re: your message to Vyombotics`}>
                      <Mail className="h-3 w-3" /> Reply
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm("Delete this message?"))
                        update.mutate({ id: m.id, delete: true });
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
