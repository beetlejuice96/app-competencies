//TODO: separate file for typescript types

// Enum types
export enum TsPlayingType {
  TEAMS = "TEAMS",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum TsTournamentType {
  SINGLE_ELIMINATION = "SINGLE_ELIMINATION",
  DOUBLE_ELIMINATION = "DOUBLE_ELIMINATION",
  ROUND_ROBIN = "ROUND_ROBIN",
  SWISS = "SWISS",
}

export enum TsTournamentState {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
}

export enum TsRestrictionRule {
  NONE = "NONE",
  INVITE_ONLY = "INVITE_ONLY",
  APPROVAL_REQUIRED = "APPROVAL_REQUIRED",
}

// Interface types
interface TsGame {
  id: number;
  name: string;
  slug: string;
  description?: string;
  creationDate: Date;
  updatedDate: Date;
}

interface TsGameAsset {
  id: number;
  gameId: number;
  key: string;
  url: string;
  text?: string;
}

interface TsPlatform {
  id: number;
  name: string;
  slug: string;
}

interface TsOrganizer {
  id: number;
  name: string;
}

export interface TsTournament {
  id: number;
  name: string;
  slug: string;
  description?: string;
  playingType: TsPlayingType;
  tournamentType: TsTournamentType;
  tournamentState: TsTournamentState;
  startDate: Date;
  endDate: Date;
  inscriptionDate: Date;
  prizePool: number;
  creationDate: Date;
  updatedDate: Date;
  checkInLeadTime: number;
  featured: boolean;
  inscribedPlayers: number;
  checkedInPlayers: number;
  playersMin: number;
  playersMax: number;
  totalRounds: number;
  discordValidate: boolean;
  teamsPlayersMin: number;
  teamsPlayersMax: number;
  discordInvite?: string;
  requiresGameAlias: boolean;
  restrictionRule: TsRestrictionRule;
  gameId: number;
  assets?: TsAsset[];
}

export interface TsAsset {
  id: number;
  tournamentId: number;
  key: "avatar" | "banner" | "cover";
  url: string;
  text?: string;
}

interface TsTournamentPlatform {
  tournamentId: number;
  platformId: number;
}

interface TsTournamentOrganizer {
  tournamentId: number;
  organizerId: number;
}
