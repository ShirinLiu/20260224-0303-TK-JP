
import { SkiResortInfo } from "../types";

// 使用 AllOrigins 作為 CORS Proxy 來繞過瀏覽器跨域限制
const PROXY_URL = 'https://api.allorigins.win/get?url=';

export const fetchRealTimeSkiData = async (resortUrl: string): Promise<Partial<SkiResortInfo>> => {
  try {
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(resortUrl)}`);
    const data = await response.json();
    const html = data.contents;

    // 簡單的 Regex 解析 (針對 Weathernews 的結構)
    // 1. 抓積雪 (通常在表格或特定 class 中，尋找 "積雪" 後面的數字)
    // Weathernews 結構通常是: <th>積雪</th><td>220cm</td>
    const snowMatch = html.match(/積雪.*?(\d{2,4})cm/s) || html.match(/(\d{2,4})cm.*?積雪/s);
    
    // 2. 抓氣溫 (尋找 "気温" 或類似結構，或者直接抓最近的溫度數字)
    // 這裡嘗試抓取現在氣溫，通常在 header 或 main section
    const tempMatch = html.match(/(-?\d{1,2}\.?\d?)℃/);

    // 3. 抓狀態 (滑走可/不可)
    const statusMatch = html.match(/(全面滑走可|一部滑走可|滑走不可)/);

    return {
      snowDepth: snowMatch ? snowMatch[1] : undefined,
      temperature: tempMatch ? `${tempMatch[1]}°C` : undefined,
      status: statusMatch ? statusMatch[1] : undefined
    };

  } catch (error) {
    console.warn("Failed to fetch real-time ski data", error);
    return {}; // 回傳空物件，UI 層會顯示預設值或載入失敗
  }
};
