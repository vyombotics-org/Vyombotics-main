import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, CheckCircle2, XCircle, Award, Users } from "lucide-react";
import { toast } from "sonner";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import {
  listBatchEnrollments,
  adminMarkEnrollmentPaid,
  adminRevokeEnrollment,
  adminIssueCertificate,
} from "@/lib/enrollments.functions";

export const Route = createFileRoute("/_authenticated/admin/batches/$id/students")({
  head: () => ({ meta: [{ title: "Students · Admin" }] }),
  component: StudentsPage,
});

function StudentsPage() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listBatchEnrollments);
  const payFn = useServerFn(adminMarkEnrollmentPaid);
  const revokeFn = useServerFn(adminRevokeEnrollment);
  const certFn = useServerFn(adminIssueCertificate);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-enrollments", id],
    queryFn: () => listFn({ data: { batch_id: id } }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-enrollments", id] });
  const pay = useMutation({
    mutationFn: (eid: string) => payFn({ data: { enrollment_id: eid } }),
    onSuccess: () => {
      toast.success("Marked paid");
      invalidate();
    },
    onError: (e: any) => toast.error(e.message || "Failed"),
  });
  const revoke = useMutation({
    mutationFn: (eid: string) => revokeFn({ data: { enrollment_id: eid } }),
    onSuccess: () => {
      toast.success("Enrollment removed");
      invalidate();
    },
    onError: (e: any) => toast.error(e.message || "Failed"),
  });
  const cert = useMutation({
    mutationFn: (uid: string) => certFn({ data: { batch_id: id, user_id: uid } }),
    onSuccess: (r: any) => {
      toast.success(
        r?.just_issued ? `Certificate issued (${r.certificate?.serial_no})` : "Already issued",
      );
      invalidate();
    },
    onError: (e: any) => toast.error(e.message || "Failed"),
  });

  if (isLoading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  const rows: any[] = data?.enrollments ?? [];
  const batch: any = data?.batch;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-muted-foreground">{batch?.courses?.title}</div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <Users className="h-7 w-7 text-primary-glow" />
              Students · <span className="gradient-text">{batch?.name}</span>
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">{rows.length} enrolled</div>
        </div>

        <div className="mt-6 card-3d rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-card/60">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Paid</th>
                <th className="px-3 py-3 font-medium">Expires</th>
                <th className="px-3 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                    No enrollments yet.
                  </td>
                </tr>
              ) : (
                rows.map((e) => {
                  const paid = e.payment_status === "success";
                  const expired = e.expires_at && new Date(e.expires_at) < new Date();
                  return (
                    <tr key={e.id} className="border-t border-border/40">
                      <td className="px-4 py-3">
                        {e.profiles?.full_name || e.user_id.slice(0, 8)}
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{e.email}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${paid ? (expired ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary-glow") : "bg-amber-500/15 text-amber-400"}`}
                        >
                          {paid ? (expired ? "Expired" : "Active") : e.payment_status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        ₹{Number(e.amount_paid || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-3 text-xs text-muted-foreground">
                        {e.expires_at ? new Date(e.expires_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex justify-end gap-1">
                          {!paid && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={pay.isPending}
                              onClick={() => pay.mutate(e.id)}
                            >
                              <CheckCircle2 className="h-3 w-3" /> Mark paid
                            </Button>
                          )}
                          {paid &&
                            (e.certificate_serial ? (
                              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs text-primary-glow">
                                <Award className="h-3 w-3" /> {e.certificate_serial}
                              </span>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={cert.isPending}
                                onClick={() => cert.mutate(e.user_id)}
                              >
                                <Award className="h-3 w-3" /> Issue cert
                              </Button>
                            ))}
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={revoke.isPending}
                            onClick={() => {
                              if (confirm("Remove this enrollment?")) revoke.mutate(e.id);
                            }}
                          >
                            <XCircle className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
