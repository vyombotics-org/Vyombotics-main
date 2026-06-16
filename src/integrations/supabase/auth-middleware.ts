// Compatibility layer redirecting requireSupabaseAuth to requireFirebaseAuth
export { requireFirebaseAuth as requireSupabaseAuth } from "@/integrations/firebase/auth-middleware";
