import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, MessageSquare, Send, Trash2, CheckCircle2, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  listLectureDiscussions,
  postDiscussion,
  deleteDiscussion,
  toggleResolved,
} from "@/lib/discussions.functions";

type Post = {
  id: string;
  user_id: string;
  parent_id: string | null;
  body: string;
  is_resolved: boolean;
  created_at: string;
  profiles: { full_name: string | null; avatar_url: string | null } | null;
};

export function LectureDiscussions({
  lectureId,
  currentUserId,
}: {
  lectureId: string;
  currentUserId: string;
}) {
  const qc = useQueryClient();
  const listFn = useServerFn(listLectureDiscussions);
  const postFn = useServerFn(postDiscussion);
  const delFn = useServerFn(deleteDiscussion);
  const resolveFn = useServerFn(toggleResolved);

  const { data, isLoading } = useQuery({
    queryKey: ["discussions", lectureId],
    queryFn: () => listFn({ data: { lecture_id: lectureId } }),
  });

  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");

  const post = useMutation({
    mutationFn: (v: { body: string; parent_id?: string | null }) =>
      postFn({ data: { lecture_id: lectureId, body: v.body, parent_id: v.parent_id ?? null } }),
    onSuccess: () => {
      setBody("");
      setReplyBody("");
      setReplyTo(null);
      qc.invalidateQueries({ queryKey: ["discussions", lectureId] });
    },
    onError: (e: any) => toast.error(e?.message || "Could not post"),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["discussions", lectureId] }),
  });
  const resolve = useMutation({
    mutationFn: (v: { id: string; resolved: boolean }) => resolveFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["discussions", lectureId] }),
  });

  const posts = (data?.posts ?? []) as unknown as Post[];
  const roots = posts.filter((p) => !p.parent_id);
  const repliesOf = (id: string) => posts.filter((p) => p.parent_id === id);

  return (
    <section id="discussions" className="mt-8 card-3d rounded-2xl p-5">
      <h3 className="font-display text-lg font-semibold flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary-glow" /> Discussion · Q&amp;A
      </h3>

      <div className="mt-4 flex items-start gap-3">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Ask a question about this lecture…"
          rows={2}
          className="flex-1"
          maxLength={5000}
        />
        <Button
          className="btn-glow text-primary-foreground"
          disabled={post.isPending || !body.trim()}
          onClick={() => post.mutate({ body })}
        >
          {post.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}{" "}
          Post
        </Button>
      </div>

      <div className="mt-6 grid gap-4">
        {isLoading ? (
          <div className="grid place-items-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : roots.length === 0 ? (
          <p className="text-sm text-muted-foreground">No questions yet. Be the first to ask.</p>
        ) : (
          roots.map((p) => (
            <div key={p.id} className="rounded-xl border border-border/40 bg-card/40 p-4">
              <PostHeader p={p} />
              <p className="mt-2 whitespace-pre-wrap text-sm">{p.body}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setReplyTo(replyTo === p.id ? null : p.id)}
                >
                  <CornerDownRight className="inline h-3 w-3" /> Reply
                </button>
                <button
                  className={`${p.is_resolved ? "text-primary-glow" : "text-muted-foreground"} hover:text-foreground`}
                  onClick={() => resolve.mutate({ id: p.id, resolved: !p.is_resolved })}
                >
                  <CheckCircle2 className="inline h-3 w-3" />{" "}
                  {p.is_resolved ? "Resolved" : "Mark resolved"}
                </button>
                {p.user_id === currentUserId && (
                  <button
                    className="text-destructive/80 hover:text-destructive"
                    onClick={() => del.mutate(p.id)}
                  >
                    <Trash2 className="inline h-3 w-3" /> Delete
                  </button>
                )}
              </div>

              {replyTo === p.id && (
                <div className="mt-3 flex items-start gap-2">
                  <Textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    rows={2}
                    placeholder="Write a reply…"
                    className="flex-1"
                    maxLength={5000}
                  />
                  <Button
                    size="sm"
                    disabled={post.isPending || !replyBody.trim()}
                    onClick={() => post.mutate({ body: replyBody, parent_id: p.id })}
                  >
                    {post.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}

              {repliesOf(p.id).length > 0 && (
                <div className="mt-4 grid gap-3 border-l border-border/40 pl-4">
                  {repliesOf(p.id).map((r) => (
                    <div key={r.id}>
                      <PostHeader p={r} />
                      <p className="mt-1 whitespace-pre-wrap text-sm">{r.body}</p>
                      {r.user_id === currentUserId && (
                        <button
                          className="mt-1 text-xs text-destructive/80 hover:text-destructive"
                          onClick={() => del.mutate(r.id)}
                        >
                          <Trash2 className="inline h-3 w-3" /> Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function PostHeader({ p }: { p: Post }) {
  const name = p.profiles?.full_name || "User";
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <div className="grid h-6 w-6 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-[10px] font-bold text-background">
        {name.slice(0, 1).toUpperCase()}
      </div>
      <span className="font-medium text-foreground">{name}</span>
      <span>·</span>
      <span>{new Date(p.created_at).toLocaleString()}</span>
      {p.is_resolved && (
        <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary-glow">
          Resolved
        </span>
      )}
    </div>
  );
}
