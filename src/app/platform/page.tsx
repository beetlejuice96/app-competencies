import SignOut from "@/auth/sign-out/sign-out";
import CardTournament from "@/platform/components/card-tournament/card-tournament";
import {
  TsAsset,
  TsPlayingType,
  TsRestrictionRule,
  TsTournament,
  TsTournamentState,
  TsTournamentType,
} from "@/types/tournament";

const mockTsTournamentsWithAssets: TsTournament[] = [
  {
    id: 1,
    name: "Summer Showdown 2024",
    slug: "summer-showdown-2024",
    description: "The ultimate gaming event of the summer!",
    playingType: TsPlayingType.TEAMS,
    tournamentType: TsTournamentType.DOUBLE_ELIMINATION,
    tournamentState: TsTournamentState.PUBLISHED,
    startDate: new Date("2024-07-15T10:00:00Z"),
    endDate: new Date("2024-07-17T18:00:00Z"),
    inscriptionDate: new Date("2024-06-15T00:00:00Z"),
    prizePool: 10000,
    creationDate: new Date("2024-05-01T09:00:00Z"),
    updatedDate: new Date("2024-05-01T09:00:00Z"),
    checkInLeadTime: 3600, // 1 hour in seconds
    featured: true,
    inscribedPlayers: 64,
    checkedInPlayers: 0,
    playersMin: 32,
    playersMax: 128,
    totalRounds: 7,
    discordValidate: true,
    teamsPlayersMin: 4,
    teamsPlayersMax: 6,
    discordInvite: "https://discord.gg/summershowdown2024",
    requiresGameAlias: true,
    restrictionRule: TsRestrictionRule.NONE,
    gameId: 1,
    assets: [
      {
        id: 1,
        tournamentId: 1,
        key: "banner",
        url: "https://example.com/assets/summer-showdown-2024-banner.jpg",
        text: "Summer Showdown 2024 Banner",
      },
      {
        id: 2,
        tournamentId: 1,
        key: "avatar",
        url: "https://example.com/assets/summer-showdown-2024-avatar.png",
        text: "Summer Showdown 2024 Avatar",
      },
      {
        id: 3,
        tournamentId: 1,
        key: "cover",
        url: "https://example.com/assets/summer-showdown-2024-cover.jpg",
        text: "Summer Showdown 2024 Cover Image",
      },
    ],
  },
  {
    id: 2,
    name: "Indie Game Jam 2024",
    slug: "indie-game-jam-2024",
    description: "Showcase your indie game development skills!",
    playingType: TsPlayingType.INDIVIDUAL,
    tournamentType: TsTournamentType.SINGLE_ELIMINATION,
    tournamentState: TsTournamentState.DRAFT,
    startDate: new Date("2024-09-01T09:00:00Z"),
    endDate: new Date("2024-09-03T18:00:00Z"),
    inscriptionDate: new Date("2024-08-01T00:00:00Z"),
    prizePool: 5000,
    creationDate: new Date("2024-06-15T14:30:00Z"),
    updatedDate: new Date("2024-06-15T14:30:00Z"),
    checkInLeadTime: 1800, // 30 minutes in seconds
    featured: false,
    inscribedPlayers: 0,
    checkedInPlayers: 0,
    playersMin: 16,
    playersMax: 64,
    totalRounds: 6,
    discordValidate: false,
    teamsPlayersMin: 1,
    teamsPlayersMax: 1,
    requiresGameAlias: false,
    restrictionRule: TsRestrictionRule.APPROVAL_REQUIRED,
    gameId: 2,
    assets: [
      {
        id: 4,
        tournamentId: 2,
        key: "banner",
        url: "https://example.com/assets/indie-game-jam-2024-banner.jpg",
        text: "Indie Game Jam 2024 Banner",
      },
      {
        id: 5,
        tournamentId: 2,
        key: "avatar",
        url: "https://example.com/assets/indie-game-jam-2024-avatar.png",
        text: "Indie Game Jam 2024 Avatar",
      },
    ],
  },
  {
    id: 3,
    name: "Global Esports League 2024",
    slug: "global-esports-league-2024",
    description: "The world's premier esports competition",
    playingType: TsPlayingType.TEAMS,
    tournamentType: TsTournamentType.ROUND_ROBIN,
    tournamentState: TsTournamentState.STARTED,
    startDate: new Date("2024-03-01T12:00:00Z"),
    endDate: new Date("2024-11-30T23:59:59Z"),
    inscriptionDate: new Date("2024-01-15T00:00:00Z"),
    prizePool: 1000000,
    creationDate: new Date("2023-12-01T10:00:00Z"),
    updatedDate: new Date("2024-03-01T12:00:00Z"),
    checkInLeadTime: 7200, // 2 hours in seconds
    featured: true,
    inscribedPlayers: 16,
    checkedInPlayers: 16,
    playersMin: 16,
    playersMax: 16,
    totalRounds: 30,
    discordValidate: true,
    teamsPlayersMin: 5,
    teamsPlayersMax: 7,
    discordInvite: "https://discord.gg/globalesportsleague",
    requiresGameAlias: true,
    restrictionRule: TsRestrictionRule.INVITE_ONLY,
    gameId: 3,
    assets: [
      {
        id: 6,
        tournamentId: 3,
        key: "banner",
        url: "https://example.com/assets/global-esports-league-2024-banner.jpg",
        text: "Global Esports League 2024 Banner",
      },
      {
        id: 7,
        tournamentId: 3,
        key: "avatar",
        url: "https://example.com/assets/global-esports-league-2024-avatar.png",
        text: "Global Esports League 2024 Avatar",
      },
      {
        id: 8,
        tournamentId: 3,
        key: "cover",
        url: "https://example.com/assets/global-esports-league-2024-cover.jpg",
        text: "Global Esports League 2024 Cover Image",
      },
    ],
  },
];
export default function Page(): React.JSX.Element {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-2">
      {mockTsTournamentsWithAssets.map((tournament) => (
        <CardTournament
          key={tournament.id}
          bannerAsset={
            tournament.assets?.find(
              (asset) => asset.key === "banner"
            ) as TsAsset
          }
          tournament={tournament}
        />
      ))}
      <SignOut />
    </div>
  );
}
