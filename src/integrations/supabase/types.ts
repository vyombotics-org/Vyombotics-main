export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      assignment_submissions: {
        Row: {
          assignment_id: string;
          feedback: string | null;
          file_url: string | null;
          graded_at: string | null;
          graded_by: string | null;
          id: string;
          marks_awarded: number | null;
          submitted_at: string;
          text_content: string | null;
          user_id: string;
        };
        Insert: {
          assignment_id: string;
          feedback?: string | null;
          file_url?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
          id?: string;
          marks_awarded?: number | null;
          submitted_at?: string;
          text_content?: string | null;
          user_id: string;
        };
        Update: {
          assignment_id?: string;
          feedback?: string | null;
          file_url?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
          id?: string;
          marks_awarded?: number | null;
          submitted_at?: string;
          text_content?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey";
            columns: ["assignment_id"];
            isOneToOne: false;
            referencedRelation: "assignments";
            referencedColumns: ["id"];
          },
        ];
      };
      assignments: {
        Row: {
          batch_id: string;
          created_at: string;
          description: string | null;
          due_at: string | null;
          id: string;
          is_published: boolean;
          max_marks: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          batch_id: string;
          created_at?: string;
          description?: string | null;
          due_at?: string | null;
          id?: string;
          is_published?: boolean;
          max_marks?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          batch_id?: string;
          created_at?: string;
          description?: string | null;
          due_at?: string | null;
          id?: string;
          is_published?: boolean;
          max_marks?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "assignments_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "batches";
            referencedColumns: ["id"];
          },
        ];
      };
      attendance: {
        Row: {
          batch_id: string;
          id: string;
          joined_at: string;
          lecture_id: string;
          status: Database["public"]["Enums"]["attendance_status"];
          updated_at: string;
          user_id: string;
          watched_seconds: number;
        };
        Insert: {
          batch_id: string;
          id?: string;
          joined_at?: string;
          lecture_id: string;
          status?: Database["public"]["Enums"]["attendance_status"];
          updated_at?: string;
          user_id: string;
          watched_seconds?: number;
        };
        Update: {
          batch_id?: string;
          id?: string;
          joined_at?: string;
          lecture_id?: string;
          status?: Database["public"]["Enums"]["attendance_status"];
          updated_at?: string;
          user_id?: string;
          watched_seconds?: number;
        };
        Relationships: [
          {
            foreignKeyName: "attendance_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "batches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attendance_lecture_id_fkey";
            columns: ["lecture_id"];
            isOneToOne: false;
            referencedRelation: "lectures";
            referencedColumns: ["id"];
          },
        ];
      };
      batches: {
        Row: {
          buy_url: string | null;
          course_id: string;
          created_at: string;
          end_date: string;
          id: string;
          is_active: boolean;
          name: string;
          price_inr: number;
          seats: number | null;
          start_date: string;
          validity_days: number;
        };
        Insert: {
          buy_url?: string | null;
          course_id: string;
          created_at?: string;
          end_date: string;
          id?: string;
          is_active?: boolean;
          name: string;
          price_inr?: number;
          seats?: number | null;
          start_date: string;
          validity_days?: number;
        };
        Update: {
          buy_url?: string | null;
          course_id?: string;
          created_at?: string;
          end_date?: string;
          id?: string;
          is_active?: boolean;
          name?: string;
          price_inr?: number;
          seats?: number | null;
          start_date?: string;
          validity_days?: number;
        };
        Relationships: [
          {
            foreignKeyName: "batches_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      certificates: {
        Row: {
          batch_id: string;
          course_id: string;
          id: string;
          issued_at: string;
          serial_no: string;
          user_id: string;
        };
        Insert: {
          batch_id: string;
          course_id: string;
          id?: string;
          issued_at?: string;
          serial_no: string;
          user_id: string;
        };
        Update: {
          batch_id?: string;
          course_id?: string;
          id?: string;
          issued_at?: string;
          serial_no?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certificates_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "batches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "certificates_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_messages: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      coupon_redemptions: {
        Row: {
          coupon_id: string;
          created_at: string;
          discount_amount: number;
          enrollment_id: string | null;
          id: string;
          user_id: string;
        };
        Insert: {
          coupon_id: string;
          created_at?: string;
          discount_amount?: number;
          enrollment_id?: string | null;
          id?: string;
          user_id: string;
        };
        Update: {
          coupon_id?: string;
          created_at?: string;
          discount_amount?: number;
          enrollment_id?: string | null;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "coupon_redemptions_coupon_id_fkey";
            columns: ["coupon_id"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coupon_redemptions_enrollment_id_fkey";
            columns: ["enrollment_id"];
            isOneToOne: false;
            referencedRelation: "enrollments";
            referencedColumns: ["id"];
          },
        ];
      };
      coupons: {
        Row: {
          batch_id: string | null;
          code: string;
          course_id: string | null;
          created_at: string;
          created_by: string | null;
          description: string | null;
          discount_type: string;
          discount_value: number;
          id: string;
          is_active: boolean;
          max_uses: number | null;
          updated_at: string;
          used_count: number;
          valid_from: string | null;
          valid_until: string | null;
        };
        Insert: {
          batch_id?: string | null;
          code: string;
          course_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          discount_type: string;
          discount_value: number;
          id?: string;
          is_active?: boolean;
          max_uses?: number | null;
          updated_at?: string;
          used_count?: number;
          valid_from?: string | null;
          valid_until?: string | null;
        };
        Update: {
          batch_id?: string | null;
          code?: string;
          course_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          discount_type?: string;
          discount_value?: number;
          id?: string;
          is_active?: boolean;
          max_uses?: number | null;
          updated_at?: string;
          used_count?: number;
          valid_from?: string | null;
          valid_until?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coupons_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "batches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coupons_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      courses: {
        Row: {
          category: string | null;
          created_at: string;
          description: string | null;
          duration_hours: number | null;
          id: string;
          instructor_id: string;
          is_published: boolean;
          level: string | null;
          price_inr: number;
          rating: number | null;
          short_tagline: string | null;
          slug: string;
          students_count: number | null;
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          description?: string | null;
          duration_hours?: number | null;
          id?: string;
          instructor_id: string;
          is_published?: boolean;
          level?: string | null;
          price_inr?: number;
          rating?: number | null;
          short_tagline?: string | null;
          slug: string;
          students_count?: number | null;
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          description?: string | null;
          duration_hours?: number | null;
          id?: string;
          instructor_id?: string;
          is_published?: boolean;
          level?: string | null;
          price_inr?: number;
          rating?: number | null;
          short_tagline?: string | null;
          slug?: string;
          students_count?: number | null;
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      discussions: {
        Row: {
          batch_id: string;
          body: string;
          created_at: string;
          id: string;
          is_resolved: boolean;
          lecture_id: string;
          parent_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          batch_id: string;
          body: string;
          created_at?: string;
          id?: string;
          is_resolved?: boolean;
          lecture_id: string;
          parent_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          batch_id?: string;
          body?: string;
          created_at?: string;
          id?: string;
          is_resolved?: boolean;
          lecture_id?: string;
          parent_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "discussions_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "batches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "discussions_lecture_id_fkey";
            columns: ["lecture_id"];
            isOneToOne: false;
            referencedRelation: "lectures";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "discussions_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "discussions";
            referencedColumns: ["id"];
          },
        ];
      };
      enrollments: {
        Row: {
          amount_paid: number | null;
          batch_id: string;
          expires_at: string;
          id: string;
          payment_status: string;
          purchased_at: string;
          user_id: string;
        };
        Insert: {
          amount_paid?: number | null;
          batch_id: string;
          expires_at: string;
          id?: string;
          payment_status?: string;
          purchased_at?: string;
          user_id: string;
        };
        Update: {
          amount_paid?: number | null;
          batch_id?: string;
          expires_at?: string;
          id?: string;
          payment_status?: string;
          purchased_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "enrollments_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "batches";
            referencedColumns: ["id"];
          },
        ];
      };
      lecture_progress: {
        Row: {
          completed: boolean;
          id: string;
          lecture_id: string;
          updated_at: string;
          user_id: string;
          watched_seconds: number;
        };
        Insert: {
          completed?: boolean;
          id?: string;
          lecture_id: string;
          updated_at?: string;
          user_id: string;
          watched_seconds?: number;
        };
        Update: {
          completed?: boolean;
          id?: string;
          lecture_id?: string;
          updated_at?: string;
          user_id?: string;
          watched_seconds?: number;
        };
        Relationships: [
          {
            foreignKeyName: "lecture_progress_lecture_id_fkey";
            columns: ["lecture_id"];
            isOneToOne: false;
            referencedRelation: "lectures";
            referencedColumns: ["id"];
          },
        ];
      };
      lectures: {
        Row: {
          batch_id: string | null;
          created_at: string;
          description: string | null;
          duration_min: number | null;
          duration_seconds: number | null;
          id: string;
          is_preview: boolean;
          kind: Database["public"]["Enums"]["lecture_kind"];
          meeting_url: string | null;
          module_id: string | null;
          order_index: number;
          scheduled_at: string | null;
          title: string;
          video_url: string | null;
        };
        Insert: {
          batch_id?: string | null;
          created_at?: string;
          description?: string | null;
          duration_min?: number | null;
          duration_seconds?: number | null;
          id?: string;
          is_preview?: boolean;
          kind?: Database["public"]["Enums"]["lecture_kind"];
          meeting_url?: string | null;
          module_id?: string | null;
          order_index?: number;
          scheduled_at?: string | null;
          title: string;
          video_url?: string | null;
        };
        Update: {
          batch_id?: string | null;
          created_at?: string;
          description?: string | null;
          duration_min?: number | null;
          duration_seconds?: number | null;
          id?: string;
          is_preview?: boolean;
          kind?: Database["public"]["Enums"]["lecture_kind"];
          meeting_url?: string | null;
          module_id?: string | null;
          order_index?: number;
          scheduled_at?: string | null;
          title?: string;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lectures_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "batches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lectures_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
      modules: {
        Row: {
          course_id: string;
          created_at: string;
          id: string;
          order_index: number;
          title: string;
        };
        Insert: {
          course_id: string;
          created_at?: string;
          id?: string;
          order_index?: number;
          title: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          id?: string;
          order_index?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          body: string | null;
          created_at: string;
          email_sent: boolean;
          id: string;
          is_read: boolean;
          link: string | null;
          title: string;
          type: string;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          email_sent?: boolean;
          id?: string;
          is_read?: boolean;
          link?: string | null;
          title: string;
          type: string;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          email_sent?: boolean;
          id?: string;
          is_read?: boolean;
          link?: string | null;
          title?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      quiz_attempts: {
        Row: {
          answers: Json;
          id: string;
          max_score: number;
          passed: boolean;
          quiz_id: string;
          score: number;
          started_at: string;
          submitted_at: string | null;
          user_id: string;
        };
        Insert: {
          answers?: Json;
          id?: string;
          max_score?: number;
          passed?: boolean;
          quiz_id: string;
          score?: number;
          started_at?: string;
          submitted_at?: string | null;
          user_id: string;
        };
        Update: {
          answers?: Json;
          id?: string;
          max_score?: number;
          passed?: boolean;
          quiz_id?: string;
          score?: number;
          started_at?: string;
          submitted_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quizzes";
            referencedColumns: ["id"];
          },
        ];
      };
      quiz_questions: {
        Row: {
          correct_option: string;
          created_at: string;
          id: string;
          marks: number;
          options: Json;
          order_index: number;
          prompt: string;
          quiz_id: string;
        };
        Insert: {
          correct_option: string;
          created_at?: string;
          id?: string;
          marks?: number;
          options: Json;
          order_index?: number;
          prompt: string;
          quiz_id: string;
        };
        Update: {
          correct_option?: string;
          created_at?: string;
          id?: string;
          marks?: number;
          options?: Json;
          order_index?: number;
          prompt?: string;
          quiz_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quizzes";
            referencedColumns: ["id"];
          },
        ];
      };
      quizzes: {
        Row: {
          batch_id: string;
          created_at: string;
          description: string | null;
          id: string;
          is_published: boolean;
          lecture_id: string | null;
          pass_percent: number;
          time_limit_min: number | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          batch_id: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_published?: boolean;
          lecture_id?: string | null;
          pass_percent?: number;
          time_limit_min?: number | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          batch_id?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_published?: boolean;
          lecture_id?: string | null;
          pass_percent?: number;
          time_limit_min?: number | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quizzes_batch_id_fkey";
            columns: ["batch_id"];
            isOneToOne: false;
            referencedRelation: "batches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quizzes_lecture_id_fkey";
            columns: ["lecture_id"];
            isOneToOne: false;
            referencedRelation: "lectures";
            referencedColumns: ["id"];
          },
        ];
      };
      shop_products: {
        Row: {
          badge: string | null;
          buy_url: string | null;
          category: string;
          compare_at_price: number | null;
          created_at: string;
          currency: string;
          description: string | null;
          id: string;
          image_url: string | null;
          is_active: boolean;
          name: string;
          price: number;
          slug: string;
          sort_order: number;
          stock: number;
          updated_at: string;
        };
        Insert: {
          badge?: string | null;
          buy_url?: string | null;
          category?: string;
          compare_at_price?: number | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean;
          name: string;
          price?: number;
          slug: string;
          sort_order?: number;
          stock?: number;
          updated_at?: string;
        };
        Update: {
          badge?: string | null;
          buy_url?: string | null;
          category?: string;
          compare_at_price?: number | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean;
          name?: string;
          price?: number;
          slug?: string;
          sort_order?: number;
          stock?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      is_active_batch_member: {
        Args: { _batch_id: string; _user_id: string };
        Returns: boolean;
      };
      is_batch_owner: {
        Args: { _batch_id: string; _user_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "instructor" | "student";
      attendance_status: "present" | "partial" | "absent";
      lecture_kind: "live" | "recorded";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "instructor", "student"],
      attendance_status: ["present", "partial", "absent"],
      lecture_kind: ["live", "recorded"],
    },
  },
} as const;
