import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Trophy, ShieldCheck, ShieldAlert, Loader2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyCertificate } from "@/lib/certificates.functions";

export const Route = createFileRoute("/verify/$serial")({
  head: ({ params }) => ({
    meta: [
      { title: `Verify Certificate ${params.serial} · Vyombotics` },
      {
        name: "description",
        content: "Verify a Vyombotics Academy course completion certificate.",
      },
    ],
  }),
  component: Verify,
});

function Verify() {
  const { serial } = Route.useParams();
  const fn = useServerFn(verifyCertificate);
  const { data, isLoading } = useQuery({
    queryKey: ["verify", serial],
    queryFn: () => fn({ data: { serial_no: serial } }),
  });

  if (isLoading)
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );

  if (!data?.valid) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="card-3d rounded-2xl p-10 text-center max-w-md">
          <ShieldAlert className="mx-auto h-14 w-14 text-destructive" />
          <h1 className="mt-4 font-display text-2xl font-bold">Certificate not found</h1>
          <p className="mt-2 text-muted-foreground">
            Serial number <span className="font-mono">{serial}</span> is invalid or doesn't exist.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 print:py-0">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between print:hidden">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Home
          </Link>
          <Button onClick={() => window.print()} variant="outline" size="sm">
            <Printer className="h-4 w-4" /> Print / Save PDF
          </Button>
        </div>
        <div className="relative overflow-hidden rounded-3xl border-4 border-primary/30 bg-gradient-to-br from-card via-background to-card p-12 text-center shadow-2xl print:border-double">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl print:hidden" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-glow/10 blur-3xl print:hidden" />
          <div className="relative">
            <Trophy className="mx-auto h-16 w-16 text-primary-glow" />
            <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Certificate of Completion
            </div>
            <h1 className="mt-6 font-display text-2xl font-medium text-muted-foreground">
              This is to certify that
            </h1>
            <h2 className="mt-2 font-display text-5xl font-bold gradient-text">
              {data.student_name}
            </h2>
            <p className="mt-6 text-lg">has successfully completed</p>
            <h3 className="mt-2 font-display text-3xl font-semibold">{data.course_title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{data.batch_name}</p>
            <div className="mt-10 flex items-center justify-center gap-2 text-primary-glow">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-medium">Verified</span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 text-left text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Issued</div>
                <div>{new Date(data.issued_at!).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Serial</div>
                <div className="font-mono">{data.serial_no}</div>
              </div>
            </div>
            <div className="mt-10 border-t border-border/40 pt-4 text-xs text-muted-foreground">
              Vyombotics Academy · Verify at vyombotics/verify/{data.serial_no}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
