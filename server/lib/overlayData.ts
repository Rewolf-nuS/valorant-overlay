/**
 * HenrikDev VALORANT API v4 — データ取得ヘルパー
 *
 * 使用エンドポイント:
 *   GET /valorant/v2/mmr/{region}/{platform}/{name}/{tag}   → ランク・RR
 *   GET /valorant/v4/matches/{region}/{platform}/{name}/{tag}?size=N → 直近N戦
 */

import type {
  ValorantPlatform,
  ValorantRegion,
} from "../types/overlayDataTypes";
import {
  type MatchData,
  type RecentMatchesResponse,
} from "../types/RecentMatchesDataTypes";
import { type MMRResponse } from "../types/MMRDataTypes";

const HENRIKDEV_API_BASE_URL: string = "https://api.henrikdev.xyz";
const MATCH_SIZE: number = 10;
const ERROR_MESSAGE_LENGTH: number = 300;

// ----------------------------------------------------------------
// MMR 取得
// ----------------------------------------------------------------
async function getCurrentRank(
  region: ValorantRegion | string,
  name: string,
  tag: string,
  apiKey: string,
  platform: ValorantPlatform | string,
) {
  const path = `/valorant/v3/mmr/${region}/${platform}/${name}/${tag}`;

  const res = await fetch(`${HENRIKDEV_API_BASE_URL}${path}`, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("アカウントまたはランクデータが見つかりませんでした");
    }
    const body = await res.text();
    throw new Error(
      `Fetching MMR data failed ${res.status} - ${body.slice(0, ERROR_MESSAGE_LENGTH)}`,
    );
  }

  const data: MMRResponse = await res.json();
  if (!data.data) {
    throw new Error("MMRデータが見つかりませんでした");
  }
  const currentRank = data.data.current;
  const currentTier = currentRank?.tier;
  if (!currentRank || !currentTier) {
    throw new Error("MMRデータが見つかりませんでした");
  }
  return { tier: currentTier.name, rr: currentRank.rr };
}

// ----------------------------------------------------------------
// 直近マッチ取得（エージェント + 勝敗）
// ----------------------------------------------------------------
async function getRecentMatches(
  region: ValorantRegion | string,
  name: string,
  tag: string,
  apiKey: string,
  platform: ValorantPlatform | string,
) {
  const path = `/valorant/v4/matches/${region}/${platform}/${name}/${tag}?mode=competitive&size=${MATCH_SIZE}`;

  const response = await fetch(`${HENRIKDEV_API_BASE_URL}${path}`, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("アカウントまたはマッチデータが見つかりませんでした");
    }
    const body = await response.text();
    throw new Error(
      `Fetching recent matches data failed ${response.status} - ${body.slice(0, ERROR_MESSAGE_LENGTH)}`,
    );
  }

  const parsed: RecentMatchesResponse = await response.json();
  if (!parsed.data) {
    throw new Error("マッチデータが見つかりませんでした");
  }
  const matches: MatchData[] = parsed.data;
  const myMatchesInfo = matches.map((match) => {
    const me = match.players?.find(
      (player) => player.name === name && player.tag === tag,
    );

    if (!me) {
      throw new Error(
        `プレイヤー ${name}#${tag} がマッチデータに見つかりません`,
      );
    }
    const myTeam = me.team_id;
    const isWin = match.teams?.find((team) => team.team_id === myTeam)?.won;

    if (isWin === undefined) {
      throw new Error("勝敗データが見つかりません");
    }

    return {
      agent: me.agent,
      date: match.metadata?.started_at
        ? new Date(match.metadata.started_at).toDateString()
        : "Unknown Date",
      isWin,
    };
  });

  return myMatchesInfo;
}

// ----------------------------------------------------------------
// ランク画像取得
// ----------------------------------------------------------------
const IMAGE_API_BASE_URL = "https://valorant-api.com";
const DEFAULT_RANK_IMAGE_URL =
  "https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/smallicon.png";

async function getRankImageUrl(rankName: string): Promise<string> {
  const path = "/v1/competitivetiers";
  try {
    const response = await fetch(`${IMAGE_API_BASE_URL}${path}`);
    if (!response.ok) return DEFAULT_RANK_IMAGE_URL;
    const responseData = (await response.json()) as any;
    const currentEpisodeIndex = responseData.data.length - 1;
    const tier = responseData.data[currentEpisodeIndex].tiers.find(
      (item: any) => item.tierName === rankName,
    );
    return tier ? tier.smallIcon : DEFAULT_RANK_IMAGE_URL;
  } catch (err) {
    return DEFAULT_RANK_IMAGE_URL;
  }
}

// ----------------------------------------------------------------
// 呼び出しメソッド（全データ取得）
// ----------------------------------------------------------------
export async function fetchOverlayData(
  region: ValorantRegion | string,
  name: string,
  tag: string,
  apiKey: string,
  platform: ValorantPlatform | string,
) {
  const [currentRank, allMatches] = await Promise.all([
    getCurrentRank(region, name, tag, apiKey, platform),
    getRecentMatches(region, name, tag, apiKey, platform),
  ]);

  let imageUrl = "";
  if (currentRank.tier) {
    imageUrl = await getRankImageUrl(currentRank.tier.toUpperCase());
  }

  return {
    region,
    name,
    tag,
    platform,
    currentRank: { ...currentRank, imageUrl },
    allMatches,
  };
}
