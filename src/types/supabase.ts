export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      ts_asset: {
        Row: {
          id: number;
          key: string;
          text: string | null;
          tournament_id: number;
          url: string;
        };
        Insert: {
          id?: number;
          key: string;
          text?: string | null;
          tournament_id: number;
          url: string;
        };
        Update: {
          id?: number;
          key?: string;
          text?: string | null;
          tournament_id?: number;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ts_asset_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "ts_tournament";
            referencedColumns: ["id"];
          }
        ];
      };
      ts_game: {
        Row: {
          creation_date: string;
          description: string | null;
          id: number;
          name: string;
          slug: string;
          updated_date: string;
        };
        Insert: {
          creation_date?: string;
          description?: string | null;
          id?: number;
          name: string;
          slug: string;
          updated_date?: string;
        };
        Update: {
          creation_date?: string;
          description?: string | null;
          id?: number;
          name?: string;
          slug?: string;
          updated_date?: string;
        };
        Relationships: [];
      };
      ts_game_asset: {
        Row: {
          game_id: number;
          id: number;
          key: string;
          text: string | null;
          url: string;
        };
        Insert: {
          game_id: number;
          id?: number;
          key: string;
          text?: string | null;
          url: string;
        };
        Update: {
          game_id?: number;
          id?: number;
          key?: string;
          text?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ts_game_asset_game_id_fkey";
            columns: ["game_id"];
            isOneToOne: false;
            referencedRelation: "ts_game";
            referencedColumns: ["id"];
          }
        ];
      };
      ts_match: {
        Row: {
          created_at: string;
          end_time: string | null;
          id: number;
          match_number: number;
          round: number;
          start_time: string | null;
          state: Database["public"]["Enums"]["ts_match_state_enum"];
          tournament_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          end_time?: string | null;
          id?: number;
          match_number: number;
          round: number;
          start_time?: string | null;
          state?: Database["public"]["Enums"]["ts_match_state_enum"];
          tournament_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          end_time?: string | null;
          id?: number;
          match_number?: number;
          round?: number;
          start_time?: string | null;
          state?: Database["public"]["Enums"]["ts_match_state_enum"];
          tournament_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ts_match_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "ts_tournament";
            referencedColumns: ["id"];
          }
        ];
      };
      ts_match_participant: {
        Row: {
          id: number;
          match_id: number;
          participant_id: number;
          placement: number | null;
          score: number | null;
        };
        Insert: {
          id?: number;
          match_id: number;
          participant_id: number;
          placement?: number | null;
          score?: number | null;
        };
        Update: {
          id?: number;
          match_id?: number;
          participant_id?: number;
          placement?: number | null;
          score?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ts_match_participant_match_id_fkey";
            columns: ["match_id"];
            isOneToOne: false;
            referencedRelation: "ts_match";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ts_match_participant_participant_id_fkey";
            columns: ["participant_id"];
            isOneToOne: false;
            referencedRelation: "ts_tournament_participant";
            referencedColumns: ["id"];
          }
        ];
      };
      ts_organizer: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      ts_platform: {
        Row: {
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          id?: number;
          name: string;
          slug: string;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      ts_player: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          updated_at: string;
          username: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          updated_at?: string;
          username: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
      ts_team: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ts_team_player: {
        Row: {
          joined_at: string;
          player_id: number;
          team_id: number;
        };
        Insert: {
          joined_at?: string;
          player_id: number;
          team_id: number;
        };
        Update: {
          joined_at?: string;
          player_id?: number;
          team_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ts_team_player_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "ts_player";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ts_team_player_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "ts_team";
            referencedColumns: ["id"];
          }
        ];
      };
      ts_tournament: {
        Row: {
          check_in_lead_time: number;
          creation_date: string;
          description: string | null;
          discord_invite: string | null;
          discord_validate: boolean;
          end_date: string;
          featured: boolean;
          game_id: number;
          id: number;
          inscription_date: string;
          name: string;
          players_max: number;
          players_min: number;
          playing_type: Database["public"]["Enums"]["ts_playing_type_enum"];
          prize_pool: number;
          requires_game_alias: boolean;
          restriction_rule: Database["public"]["Enums"]["ts_restriction_rule_enum"];
          slug: string;
          start_date: string;
          teams_players_max: number;
          teams_players_min: number;
          total_rounds: number;
          tournament_state: Database["public"]["Enums"]["ts_tournament_state_enum"];
          tournament_type: Database["public"]["Enums"]["ts_tournament_type_enum"];
          updated_date: string;
        };
        Insert: {
          check_in_lead_time: number;
          creation_date: string;
          description?: string | null;
          discord_invite?: string | null;
          discord_validate?: boolean;
          end_date: string;
          featured?: boolean;
          game_id: number;
          id?: number;
          inscription_date: string;
          name: string;
          players_max: number;
          players_min: number;
          playing_type: Database["public"]["Enums"]["ts_playing_type_enum"];
          prize_pool?: number;
          requires_game_alias?: boolean;
          restriction_rule?: Database["public"]["Enums"]["ts_restriction_rule_enum"];
          slug: string;
          start_date: string;
          teams_players_max: number;
          teams_players_min: number;
          total_rounds: number;
          tournament_state: Database["public"]["Enums"]["ts_tournament_state_enum"];
          tournament_type: Database["public"]["Enums"]["ts_tournament_type_enum"];
          updated_date: string;
        };
        Update: {
          check_in_lead_time?: number;
          creation_date?: string;
          description?: string | null;
          discord_invite?: string | null;
          discord_validate?: boolean;
          end_date?: string;
          featured?: boolean;
          game_id?: number;
          id?: number;
          inscription_date?: string;
          name?: string;
          players_max?: number;
          players_min?: number;
          playing_type?: Database["public"]["Enums"]["ts_playing_type_enum"];
          prize_pool?: number;
          requires_game_alias?: boolean;
          restriction_rule?: Database["public"]["Enums"]["ts_restriction_rule_enum"];
          slug?: string;
          start_date?: string;
          teams_players_max?: number;
          teams_players_min?: number;
          total_rounds?: number;
          tournament_state?: Database["public"]["Enums"]["ts_tournament_state_enum"];
          tournament_type?: Database["public"]["Enums"]["ts_tournament_type_enum"];
          updated_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ts_tournament_game_id_fkey";
            columns: ["game_id"];
            isOneToOne: false;
            referencedRelation: "ts_game";
            referencedColumns: ["id"];
          }
        ];
      };
      ts_tournament_organizer: {
        Row: {
          organizer_id: number;
          tournament_id: number;
        };
        Insert: {
          organizer_id: number;
          tournament_id: number;
        };
        Update: {
          organizer_id?: number;
          tournament_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ts_tournament_organizer_organizer_id_fkey";
            columns: ["organizer_id"];
            isOneToOne: false;
            referencedRelation: "ts_organizer";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ts_tournament_organizer_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "ts_tournament";
            referencedColumns: ["id"];
          }
        ];
      };
      ts_tournament_participant: {
        Row: {
          checked_in_at: string | null;
          id: number;
          player_id: number | null;
          registered_at: string;
          team_id: number | null;
          tournament_id: number;
        };
        Insert: {
          checked_in_at?: string | null;
          id?: number;
          player_id?: number | null;
          registered_at?: string;
          team_id?: number | null;
          tournament_id: number;
        };
        Update: {
          checked_in_at?: string | null;
          id?: number;
          player_id?: number | null;
          registered_at?: string;
          team_id?: number | null;
          tournament_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ts_tournament_participant_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "ts_player";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ts_tournament_participant_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "ts_team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ts_tournament_participant_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "ts_tournament";
            referencedColumns: ["id"];
          }
        ];
      };
      ts_tournament_platform: {
        Row: {
          platform_id: number;
          tournament_id: number;
        };
        Insert: {
          platform_id: number;
          tournament_id: number;
        };
        Update: {
          platform_id?: number;
          tournament_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "ts_tournament_platform_platform_id_fkey";
            columns: ["platform_id"];
            isOneToOne: false;
            referencedRelation: "ts_platform";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ts_tournament_platform_tournament_id_fkey";
            columns: ["tournament_id"];
            isOneToOne: false;
            referencedRelation: "ts_tournament";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      ts_match_state_enum: "PENDING" | "IN_PROGRESS" | "FINISHED" | "CANCELLED";
      ts_playing_type_enum: "TEAMS" | "INDIVIDUAL";
      ts_restriction_rule_enum: "NONE" | "INVITE_ONLY" | "APPROVAL_REQUIRED";
      ts_tournament_state_enum:
        | "DRAFT"
        | "PUBLISHED"
        | "STARTED"
        | "FINISHED"
        | "CANCELLED";
      ts_tournament_type_enum:
        | "SINGLE_ELIMINATION"
        | "DOUBLE_ELIMINATION"
        | "ROUND_ROBIN"
        | "SWISS";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
