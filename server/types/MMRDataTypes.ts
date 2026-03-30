export interface MMRResponse {
  status: number;
  data: MMRData;
}

export interface MMRData {
  account: MMRAccount;
  peak: MMRPeak;
  current: MMRCurrent;
  seasonal: MMRSeasonal[];
}

export interface MMRAccount {
  name: string;
  tag: string;
  puuid: string;
}

export interface MMRCurrent {
  tier: MMRTier;
  rr: number;
  last_change: number;
  elo: number;
  games_needed_for_rating: number;
  rank_protection_shields: number;
  leaderboard_placement: object | null;
}

export interface MMRTier {
  id: number;
  name: string;
}

export interface MMRPeak {
  season: MMRSeason;
  ranking_schema: string;
  tier: MMRTier;
  rr: number;
}

export interface MMRSeason {
  id: string;
  short: string;
}

export interface MMRSeasonal {
  season: MMRSeason;
  wins: number;
  games: number;
  end_tier: MMRTier;
  end_rr: number;
  ranking_schema: string;
  leaderboard_placement: object | null;
  act_wins: MMRTier[];
}
