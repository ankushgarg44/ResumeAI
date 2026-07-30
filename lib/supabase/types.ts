export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          template_id: string;
          resume_data: Json;
          ats_score: number | null;
          status: string;
          is_profile: boolean;
          profile_type: string | null;
          assembled_from: string[] | null;
          job_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          template_id?: string;
          resume_data?: Json;
          ats_score?: number | null;
          status?: string;
          is_profile?: boolean;
          profile_type?: string | null;
          assembled_from?: string[] | null;
          job_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          template_id?: string;
          resume_data?: Json;
          ats_score?: number | null;
          status?: string;
          is_profile?: boolean;
          profile_type?: string | null;
          assembled_from?: string[] | null;
          job_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
