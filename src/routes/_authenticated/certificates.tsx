import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Loader2, ExternalLink, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { myCertificates } from "@/lib/certificates.functions";

export const Route = createFileRoute("/_authenticated/certificates")({
  head: () => ({ meta: [{ title: "My Certificates · Vyombotics" }] }),
  component: MyCerts,
});

function MyCerts() {
  const fn = useServerFn(myCertificates);
  const { data, isLoading } = useQuery({ queryKey: ["my-certs"], queryFn: () => fn() });

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-5xl px-6 pt-28 pb-20">
        <h1 className="font-display text-4xl font-bold flex items-center gap-3">
          <Trophy className="h-8 w-8 text-primary-glow" /> My{" "}
          <span className="gradient-text">Certificates</span>
        </h1>
        {isLoading ? (
          <div className="mt-10 grid place-items-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (data?.certificates ?? []).length === 0 ? (
          <div className="mt-10 card-3d rounded-2xl p-10 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-primary-glow" />
            <p className="mt-3 text-muted-foreground">
              No certificates yet. Complete a course to earn one.
            </p>
            <Button asChild className="btn-glow mt-6 text-primary-foreground">
              <Link to="/courses">Browse courses</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {(data?.certificates ?? []).map((c: any) => (
              <li key={c.id} className="card-3d gradient-border rounded-2xl p-6">
                <Trophy className="h-8 w-8 text-primary-glow" />
                <h3 className="mt-3 font-display text-lg font-semibold">{c.courses?.title}</h3>
                <p className="text-sm text-muted-foreground">{c.batches?.name}</p>
                <div className="mt-3 rounded-lg bg-card/40 p-3 text-xs font-mono">
                  {c.serial_no}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Issued {new Date(c.issued_at).toLocaleDateString()}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/verify/$serial" params={{ serial: c.serial_no }} target="_blank">
                      <ExternalLink className="h-3 w-3" /> View / Print
                    </Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
