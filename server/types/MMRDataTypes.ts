export interface MMRResponse {
  status?: number;
  data?: MMRData;
}

export interface MMRData {
  account?: MMRAccount;
  peak?: MMRPeak | null;
  current?: MMRCurrent;
  seasonal?: MMRSeasonal[];
}

export interface MMRAccount {
  name?: string;
  tag?: string;
  puuid?: string;
}

export interface MMRCurrent {
  tier?: MMRTier;
  rr?: number;
  last_change?: number;
  elo?: number;
  games_needed_for_rating?: number;
  rank_protection_shields?: number;
  leaderboard_placement?: object | null;
}

export interface MMRTier {
  id?: number;
  name?: ValorantRank;
}

export interface MMRPeak {
  season?: MMRSeason;
  ranking_schema?: "ascendant" | "base";
  tier?: MMRTier;
  rr?: number;
}

export interface MMRSeason {
  id?: string;
  short?: string;
}

export interface MMRSeasonal {
  season?: MMRSeason;
  wins?: number;
  games?: number;
  end_tier?: MMRTier;
  end_rr?: number;
  ranking_schema?: string;
  leaderboard_placement?: object | null;
  act_wins?: MMRTier[];
}

enum ValorantRank {
  UNRATED = "Unrated",
  UNKNOWN1 = "Unknown 1",
  UNKNOWN2 = "Unknown 2",
  IRON1 = "Iron 1",
  IRON2 = "Iron 2",
  IRON3 = "Iron 3",
  BRONZE1 = "Bronze 1",
  BRONZE2 = "Bronze 2",
  BRONZE3 = "Bronze 3",
  SILVER1 = "Silver 1",
  SILVER2 = "Silver 2",
  SILVER3 = "Silver 3",
  GOLD1 = "Gold 1",
  GOLD2 = "Gold 2",
  GOLD3 = "Gold 3",
  PLATINUM1 = "Platinum 1",
  PLATINUM2 = "Platinum 2",
  PLATINUM3 = "Platinum 3",
  DIAMOND1 = "Diamond 1",
  DIAMOND2 = "Diamond 2",
  DIAMOND3 = "Diamond 3",
  ASCENDANT1 = "Ascendant 1",
  ASCENDANT2 = "Ascendant 2",
  ASCENDANT3 = "Ascendant 3",
  IMMORTAL1 = "Immortal 1",
  IMMORTAL2 = "Immortal 2",
  IMMORTAL3 = "Immortal 3",
  RADIANT = "Radiant",
}
