
import { SkiResortInfo } from "../types";

// Iwappara Ski Resort Coordinates
const LAT = 36.9246;
const LON = 138.8234;

export const fetchRealTimeSkiData = async (resortUrl: string): Promise<Partial<SkiResortInfo>> => {
  try {
    // 1. Fetch Temperature from Open-Meteo (Reliable)
    const tempResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m&timezone=auto`
    );
    const tempData = await tempResponse.json();
    const temp = tempData.current?.temperature_2m ? `${tempData.current.temperature_2m}°C` : "-2°C";

    // 2. Fetch Snow Depth from Surf & Snow via Proxy
    // We use AllOrigins to bypass CORS and fetch the HTML content of the Surf & Snow page for Iwappara (r0298s)
    const snowResponse = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent('https://surfsnow.jp/guide/htm/r0298s.htm')}`
    );
    const snowJson = await snowResponse.json();
    const htmlContent = snowJson.contents;

    // Parse HTML to find snow depth
    // Look for "積雪(前日比)" and extract the number
    // The structure is usually <h3>積雪(前日比)</h3> ... <span class="num">150</span>cm ...
    // or simply searching for the pattern in the text
    
    let snowDepth = "150"; // Default fallback
    let status = "全面滑走可";

    // Simple regex to find snow depth: "150cm" or similar pattern near "積雪"
    // The HTML usually contains: <dl><dt>積雪(前日比)</dt><dd><strong>150</strong>cm</dd></dl>
    const snowMatch = htmlContent.match(/積雪\(前日比\).*?(\d+)\s*cm/s) || htmlContent.match(/積雪.*?(\d+)\s*cm/s);
    if (snowMatch && snowMatch[1]) {
      snowDepth = snowMatch[1];
    }

    // Determine status based on snow depth if not explicitly found
    // Or try to find "全面滑走可" or "一部滑走可" in the text
    if (htmlContent.includes("全面滑走可")) {
      status = "全面滑走可";
    } else if (htmlContent.includes("一部滑走可")) {
      status = "一部滑走可";
    } else if (htmlContent.includes("滑走不可") || htmlContent.includes("クローズ")) {
        // Only set to closed if explicitly stated and snow depth is low
        if (parseInt(snowDepth) < 30) {
            status = "滑走不可";
        }
    }

    return {
      snowDepth: snowDepth,
      status: status,
      temperature: temp
    };

  } catch (error) {
    console.warn("Failed to fetch ski data", error);
    // Fallback
    return {
        snowDepth: "150",
        temperature: "-2°C",
        status: "全面滑走可"
    }; 
  }
};
