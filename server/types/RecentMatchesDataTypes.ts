export interface RecentMatchesResponse {
  status?: number;
  data?: MatchData[];
}

export interface MatchData {
  metadata?: MatchMetadata;
  players?: MatchPlayer[];
  observers?: any[];
  coaches?: any[];
  teams?: MatchTeam[];
  rounds?: MatchRound[];
  kills?: MatchKill[];
}

export interface MatchMetadata {
  match_id?: string;
  map?: MatchMap;
  game_version?: string;
  game_length_in_ms?: number;
  started_at?: string;
  is_completed?: boolean;
  queue?: MatchQueue;
  season?: MatchSeason;
  platform?: string;
  premier?: any | null;
  party_rr_penaltys?: MatchPartyRrPenalty[];
  region?: string;
  cluster?: string;
}

export interface MatchMap {
  id?: string;
  name?: string;
}

export interface MatchQueue {
  id?: string;
  name?: string;
  mode_type?: string;
}

export interface MatchSeason {
  id?: string;
  short?: string;
}

export interface MatchPartyRrPenalty {
  party_id?: string;
  penalty?: number;
}

export interface MatchParticipantReference {
  puuid?: string;
  name?: string;
  tag?: string;
  team?: string;
}

export interface MatchPlayer {
  puuid?: string;
  name?: string;
  tag?: string;
  team_id?: string;
  platform?: string;
  party_id?: string;
  agent?: MatchAgent;
  stats?: MatchPlayerStats;
  ability_casts?: MatchAbilityCasts;
  tier?: MatchTier;
  customization?: MatchCustomization;
  account_level?: number;
  session_playtime_in_ms?: number;
  behavior?: MatchBehavior;
  economy?: MatchPlayerEconomy;
}

export interface MatchAgent {
  id?: string;
  name?: string;
}

export interface MatchPlayerStats {
  score?: number;
  kills?: number;
  deaths?: number;
  assists?: number;
  headshots?: number;
  bodyshots?: number;
  legshots?: number;
  damage?: MatchDamage;
}

export interface MatchDamage {
  dealt?: number;
  received?: number;
}

export interface MatchAbilityCasts {
  grenade?: number;
  ability1?: number;
  ability2?: number;
  ultimate?: number;
}

export interface MatchTier {
  id?: number;
  name?: string;
}

export interface MatchCustomization {
  card?: string;
  title?: string;
  preferred_level_border?: string | null;
}

export interface MatchBehavior {
  afk_rounds?: number;
  friendly_fire?: MatchFriendlyFire;
  rounds_in_spawn?: number;
}

export interface MatchFriendlyFire {
  incoming?: number;
  outgoing?: number;
}

export interface MatchPlayerEconomy {
  spent?: MatchLoadoutValue;
  loadout_value?: MatchLoadoutValue;
}

export interface MatchLoadoutValue {
  overall?: number;
  average?: number;
}

export interface MatchTeam {
  team_id?: string;
  rounds?: MatchTeamRounds;
  won?: boolean;
  premier_roster?: any | null;
}

export interface MatchTeamRounds {
  won?: number;
  lost?: number;
}

export interface MatchRound {
  id?: number;
  result?: string;
  ceremony?: string;
  winning_team?: string;
  plant?: MatchDefuse | null;
  defuse?: MatchDefuse | null;
  stats?: MatchRoundStat[];
}

export interface MatchDefuse {
  round_time_in_ms?: number;
  location?: MatchLocation;
  player?: MatchParticipantReference;
  player_locations?: MatchPlayerLocation[];
  site?: string;
}

export interface MatchRoundStat {
  player?: MatchParticipantReference;
  ability_casts?: MatchRoundAbilityCasts;
  damage_events?: MatchDamageEvent[];
  stats?: MatchRoundPlayerStats;
  economy?: MatchRoundPlayerEconomy;
  was_afk?: boolean;
  received_penalty?: boolean;
  stayed_in_spawn?: boolean;
}

export interface MatchRoundAbilityCasts {
  grenade?: number | null;
  ability_1?: number | null;
  ability_2?: number | null;
  ultimate?: number | null;
}

export interface MatchDamageEvent {
  player?: MatchParticipantReference;
  bodyshots?: number;
  headshots?: number;
  legshots?: number;
  damage?: number;
}

export interface MatchRoundPlayerStats {
  score?: number;
  kills?: number;
  headshots?: number;
  bodyshots?: number;
  legshots?: number;
}

export interface MatchRoundPlayerEconomy {
  loadout_value?: number;
  remaining?: number;
  weapon?: MatchWeapon | null;
  armor?: MatchArmor | null;
}

export interface MatchArmor {
  id?: string;
  name?: string;
}

export interface MatchKill {
  time_in_round_in_ms?: number;
  time_in_match_in_ms?: number;
  round?: number;
  killer?: MatchParticipantReference;
  victim?: MatchParticipantReference;
  assistants?: MatchParticipantReference[];
  location?: MatchLocation;
  weapon?: MatchWeapon;
  secondary_fire_mode?: boolean;
  player_locations?: MatchPlayerLocation[];
}

export interface MatchLocation {
  x?: number;
  y?: number;
}

export interface MatchPlayerLocation {
  player?: MatchParticipantReference;
  view_radians?: number;
  location?: MatchLocation;
}

export interface MatchWeapon {
  id?: string;
  name?: string | null;
  type?: string;
}
