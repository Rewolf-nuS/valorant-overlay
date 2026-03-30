const PARAMS = new URLSearchParams(location.search);
const PLATFORM = PARAMS.get("platform") ?? "pc";
const REGION = PARAMS.get("region");
const RAW_NAME = PARAMS.get("name");
const RAW_TAG = PARAMS.get("tag");

// 一時間ごとにAPIを叩く(おおよそ1マッチ)
const POLL_MS = 3600000;

const NAME = encodeURIComponent(RAW_NAME ?? "");
const TAG = encodeURIComponent(RAW_TAG ?? "");

/**
 * ランク情報の更新
 * @param rank - ランク名
 * @param rr - RR値
 * @param imageUrl - ランク画像URL
 */
function updateRankUI(rank: string, rr: number, imageUrl: string) {
  const rankEl = document.getElementById("rank");
  const rrEl = document.getElementById("rr");
  const rankImageEl = document.getElementById("rankImage") as HTMLImageElement;

  if (rankEl) rankEl.textContent = rank;
  if (rrEl) rrEl.textContent = rr + " RR";
  if (imageUrl && rankImageEl) {
    rankImageEl.src = imageUrl;
  }
}

interface Match {
  date: string;
  isWin: boolean;
}

/**
 * マッチ情報の更新
 * @param matches - マッチの配列
 */
function updateMatchUI(matches: Match[]) {
  const now = new Date();
  const todayMatches = matches.filter(
    (match) => match.date === now.toDateString(),
  );

  // console.log("Today Matches:", todayMatches);

  const winCount = todayMatches.filter((match) => match.isWin).length;
  const loseCount = todayMatches.filter((match) => !match.isWin).length;

  const winEl = document.getElementById("win");
  const loseEl = document.getElementById("lose");
  if (winEl) winEl.textContent = winCount + "勝";
  if (loseEl) loseEl.textContent = loseCount + "敗";
}

/**
 * オーバーレイ表示
 */
async function displayOverlay() {
  // パラメータ不足時はスキップ
  if (!REGION || !RAW_NAME || !RAW_TAG) return;

  try {
    // APIからユーザのVALORANTの情報を取得する
    const response = await fetch(
      `/api/overlay/${PLATFORM}/${REGION}/${NAME}/${TAG}`,
    );
    const data = (await response.json()) as any;
    // console.log("Overlay Data:", data);

    if (!response.ok) {
      throw new Error(data.error || "データ取得に失敗しました");
    }

    const statePanel = document.querySelector(".state_panel");
    if (statePanel) {
      statePanel.classList.remove("visible");
    }

    // ランク情報の更新
    const rank = data.currentRank.tier.toUpperCase();
    const rr = data.currentRank.rr;
    const rankImageUrl = data.currentRank.imageUrl;
    updateRankUI(rank, rr, rankImageUrl);

    // マッチ情報の更新
    updateMatchUI(data.allMatches);
  } catch (err) {
    console.error("Failed to fetch or update VALORANT info:", err);
    const statePanel = document.querySelector(".state_panel");
    const stateText = document.querySelector(".state_text");
    if (statePanel && stateText) {
      statePanel.classList.add("visible");
      stateText.textContent = err instanceof Error ? err.message : String(err);
    }
  }
}

// パラメータ不足時はAPIリクエストを行わない
if (!REGION || !RAW_NAME || !RAW_TAG) {
  document.addEventListener("DOMContentLoaded", () => {
    const statePanel = document.querySelector(".state_panel");
    if (statePanel) {
      statePanel.classList.add("visible");
    }
  });
} else {
  // 初回表示
  displayOverlay();
  // 1時間ごとに表示更新
  setInterval(() => displayOverlay(), POLL_MS);
}
