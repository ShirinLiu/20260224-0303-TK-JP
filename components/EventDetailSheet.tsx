
import React, { useRef, useState } from 'react';
import { ItineraryItem, Tag, EventType } from '../types';
import { 
  X, MapPin, Navigation, Clock, Image as ImageIcon, 
  Trash2, Camera, Sparkles, ChefHat, Info, Plus, Footprints, ArrowRight, CornerDownRight, ExternalLink, Route, QrCode
} from 'lucide-react';

interface EventDetailSheetProps {
  item: ItineraryItem;
  onClose: () => void;
  onUpdate: (updatedItem: ItineraryItem) => void;
}

// Reuse image compression util
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const TagBadge: React.FC<{ tag: Tag }> = ({ tag }) => {
    const styles = {
      food: "bg-orange-100 text-orange-700 border-orange-200",
      shopping: "bg-rose-100 text-rose-700 border-rose-200",
      reservation: "bg-blue-100 text-blue-700 border-blue-200 font-mono font-bold",
      alert: "bg-red-100 text-red-700 border-red-200 font-bold",
      info: "bg-stone-100 text-stone-600 border-stone-200",
    };
    return (
      <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${styles[tag.type] || styles.info}`}>
        {tag.label}
      </span>
    );
};

export const EventDetailSheet: React.FC<EventDetailSheetProps> = ({ item, onClose, onUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasSubItems = item.subItems && item.subItems.length > 0;

  // Logic: 
  // 1. If explicit mapType is set, use it.
  // 2. If Flight, navigate to Start Location (Airport).
  // 3. Else navigate to End Location (Destination).
  const getNavTarget = (i: ItineraryItem) => i.type === EventType.FLIGHT 
    ? (i.startLocation || '')
    : (i.endLocation || i.startLocation || '');

  const isKoreaLocation = (loc: string) => {
    const koreaKeywords = ['Seoul', 'Incheon', '首爾', '仁川', 'Wecostay', 'Ggupdang', 'Egg Clinic', '忠武路', 'Myeongdong', 'Korea', 'Dongdaemun', '東大門', '金豬', 'Geumdaeji', 'Sindang', '新堂', 'Dosan', '島山', 'Bagel', 'Seongsu', '聖水'];
    return koreaKeywords.some(k => loc.toLowerCase().includes(k.toLowerCase())) || /[\u3131-\uD79D]/.test(loc);
  };

  const shouldUseNaver = (i: ItineraryItem) => {
    if (i.mapType === 'naver') return true;
    if (i.mapType === 'google') return false;
    
    // Strict check: February dates are definitely Japan -> Google Maps
    if (i.date && i.date.includes('2/')) return false;

    // Strict check: 3/1 items before arrival in Korea are Japan
    if (i.date && i.date.includes('3/1') && (
        i.title.includes('Skyliner') || 
        i.title.includes('退房') || 
        i.title.includes('成田') || 
        (i.startLocation && i.startLocation.includes('成田'))
    )) {
        return false;
    }

    return isKoreaLocation(getNavTarget(i)) || isKoreaLocation(i.title);
  };

  const openMap = (i: ItineraryItem) => {
    if (i.navLink) {
        window.open(i.navLink, '_blank');
        return;
    }
    const loc = getNavTarget(i);
    if (!loc) return;
    
    if (shouldUseNaver(i)) {
       // Using Naver Map Search URL for single location
       window.open(`https://map.naver.com/p/search/${encodeURIComponent(loc)}`, '_blank');
    } else {
       window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc)}&travelmode=driving`, '_blank');
    }
  };

  const openMultiStopRoute = () => {
      if (!item.subItems || item.subItems.length === 0) return;
      
      // Origin: Main item start location (e.g. Jojo Kalguksu)
      const origin = item.startLocation || item.subItems[0].startLocation || '';
      
      // Destination: Last sub-item end location (e.g. Gentle Monster)
      const lastItem = item.subItems[item.subItems.length - 1];
      const destination = lastItem.endLocation || '';

      if (shouldUseNaver(item)) {
          // Naver Map Strategy:
          // Web doesn't support waypoints easily.
          // App (nmap://) supports 'v1name', 'v2name' etc. to pre-fill names.
          // Note: Naver Map limits waypoints (usually max 5).
          
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          
          if (isMobile) {
              // Construct nmap:// URL scheme
              let nmapUrl = `nmap://route/walk?sname=${encodeURIComponent(origin)}&dname=${encodeURIComponent(destination)}`;
              
              // Add up to 5 waypoints from subItems (excluding the last one which is destination)
              const waypoints = item.subItems.slice(0, item.subItems.length - 1);
              
              waypoints.slice(0, 5).forEach((sub, idx) => {
                  const wpName = sub.endLocation || sub.title;
                  if (wpName) {
                    nmapUrl += `&v${idx + 1}name=${encodeURIComponent(wpName)}`;
                  }
              });
              
              nmapUrl += "&appname=com.shirin.travel"; // Good practice

              // Attempt to open App
              window.location.href = nmapUrl;

              // Fallback to web (Start -> End only) if app not installed or fails
              setTimeout(() => {
                 if (document.hidden) return;
                 // Use mobile web route for fallback
                 window.open(`https://m.map.naver.com/route/walk/search.naver?sname=${encodeURIComponent(origin)}&dname=${encodeURIComponent(destination)}`, '_blank');
              }, 2500);
          } else {
              // Desktop Web Fallback (Start -> End)
              const webUrl = `https://map.naver.com/p/directions/-/-/-/transit?sname=${encodeURIComponent(origin)}&eName=${encodeURIComponent(destination)}`;
              window.open(webUrl, '_blank');
          }
          return;
      }

      // Google Maps logic (Robust multi-point support)
      const waypoints = item.subItems
          .slice(0, item.subItems.length - 1)
          .map(sub => sub.endLocation)
          .filter(Boolean)
          .join('|');
      
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(waypoints)}&travelmode=walking`;
      window.open(url, '_blank');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const base64 = await compressImage(file);
        const updatedAttachments = [...(item.attachments || []), base64];
        onUpdate({ ...item, attachments: updatedAttachments });
      } catch (err) {
        console.error("Image upload error", err);
        alert("圖片處理失敗");
      } finally {
        setIsUploading(false);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveAttachment = (indexToRemove: number) => {
    if(!window.confirm("確定刪除這張照片嗎？")) return;
    const updatedAttachments = item.attachments?.filter((_, index) => index !== indexToRemove);
    onUpdate({ ...item, attachments: updatedAttachments });
  };

  const renderSubItems = () => {
    if (!item.subItems) return null;

    return (
        <div className="space-y-6">
            <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider border-b border-stone-200 pb-2">
                詳細攻略站點 ({item.subItems.length})
            </h3>
            {item.subItems.map((sub, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-stone-200 pb-2">
                    {/* Bullet */}
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white shadow-sm"></div>
                    
                    {/* Header */}
                    <div className="mb-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
                            <Clock size={12} /> {sub.startTime} - {sub.endTime}
                        </div>
                        <h4 className="text-lg font-bold text-sumi leading-tight">{sub.title}</h4>
                    </div>

                    {/* Tags */}
                    {sub.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {sub.tags.map((tag, tIdx) => <TagBadge key={tIdx} tag={tag} />)}
                        </div>
                    )}

                    {/* Guide Info */}
                    {sub.guideRecommendation && (
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-orange-100 shadow-sm mb-3">
                            <div className="flex gap-2 mb-1">
                                <Sparkles size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                <div className="text-sm font-bold text-stone-800">{sub.guideRecommendation.mustOrder}</div>
                            </div>
                            <p className="text-xs text-stone-600 pl-6 leading-relaxed opacity-80">{sub.guideRecommendation.tips}</p>
                        </div>
                    )}

                    {/* Reference Link Button (Xiaohongshu etc) */}
                    {sub.referenceLink && (
                        <button 
                            onClick={() => window.open(sub.referenceLink!.url, '_blank')}
                            className="w-full mb-3 py-2 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-rose-100 active:scale-95 transition-all"
                        >
                            <ExternalLink size={14} />
                            {sub.referenceLink.label}
                        </button>
                    )}

                    {/* Notes */}
                    <p className="text-sm text-stone-600 mb-3 whitespace-pre-wrap">{sub.notes}</p>

                     {/* Image Preview (Small) */}
                    {sub.attachments && sub.attachments.length > 0 && (
                        <div className="mb-3 rounded-lg overflow-hidden border border-stone-100 h-32">
                             <img src={sub.attachments[0]} alt={sub.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Nav Button */}
                    <button 
                        onClick={() => openMap(sub)}
                        className="w-full py-2 bg-white border border-stone-200 text-stone-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-stone-50 active:scale-95 transition-all"
                    >
                        <Navigation size={14} className={shouldUseNaver(sub) ? "text-[#03C75A]" : "text-blue-500"} />
                        前往 {sub.endLocation || sub.title}
                    </button>
                </div>
            ))}
        </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-[70] bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto transform transition-transform animate-in slide-in-from-bottom duration-300">
        
        {/* Drag Handle & Close */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 pt-3 pb-2 px-4 flex items-center justify-between border-b border-stone-100">
             <div className="w-10"></div> {/* Spacer */}
             <div className="w-12 h-1.5 bg-stone-200 rounded-full"></div>
             <button onClick={onClose} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200">
                 <X size={16} className="text-stone-500" />
             </button>
        </div>

        <div className="p-6 pb-12 space-y-6">
            {/* Header Info (Main Item) */}
            <div>
                <div className="flex items-center gap-2 text-stone-400 text-sm font-bold mb-2">
                    <Clock size={14} />
                    {item.startTime} {item.endTime ? `- ${item.endTime}` : ''}
                </div>
                <h2 className="text-2xl font-bold text-sumi mb-2 leading-tight">{item.title}</h2>
                {item.code && <div className="inline-block bg-stone-100 px-2 py-1 rounded text-xs font-mono font-bold text-stone-600 mb-2">{item.code}</div>}
                
                <div className="flex items-center gap-1 text-stone-500 text-sm">
                    <MapPin size={14} className="shrink-0" />
                    {item.startLocation && item.endLocation ? (
                        <div className="flex items-center gap-1 flex-wrap">
                            <span>{item.startLocation}</span>
                            <ArrowRight size={12} className="text-stone-300" />
                            <span>{item.endLocation}</span>
                        </div>
                    ) : (
                        <span>{item.startLocation || item.endLocation}</span>
                    )}
                </div>
            </div>

            {/* Main Navigation Button (Only for single items) */}
            {!hasSubItems && (
                <>
                    {/* Navigation Button - Hidden for Flights */}
                    {item.type !== EventType.FLIGHT && (
                        <button 
                            onClick={() => openMap(item)}
                            className={`w-full py-3 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${shouldUseNaver(item) ? 'bg-[#03C75A] shadow-green-100' : 'bg-ai shadow-indigo-200'}`}
                        >
                            <Navigation size={18} />
                            {shouldUseNaver(item) ? '開始導航 (Naver Map)' : '開始導航 (Google Maps)'}
                        </button>
                    )}

                    {/* Reference Link Button (CatchTable etc) */}
                    {item.referenceLink && (
                        <button 
                            onClick={() => window.open(item.referenceLink!.url, '_blank')}
                            className="w-full py-3 mt-3 bg-white border border-stone-200 text-stone-700 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-stone-50 active:scale-95 transition-transform"
                        >
                            <ExternalLink size={18} />
                            {item.referenceLink.label}
                        </button>
                    )}

                    {/* VJW Buttons for 2/24 Flight */}
                    {item.date.includes('2/24') && item.type === EventType.FLIGHT && (
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <button 
                                onClick={() => window.open('https://raw.githubusercontent.com/ShirinLiu/20260224-0303-Tokyo-Korea/main/20260224-0303-japan-%26-korea/assets/VJW_Ricky.JPG', '_blank')}
                                className="py-3 bg-stone-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-stone-700 active:scale-95 transition-transform text-sm"
                            >
                                <QrCode size={16} /> VJW Ricky
                            </button>
                            <button 
                                onClick={() => window.open('https://raw.githubusercontent.com/ShirinLiu/20260224-0303-Tokyo-Korea/main/20260224-0303-japan-%26-korea/assets/VJW_Serna.JPG', '_blank')}
                                className="py-3 bg-stone-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-stone-700 active:scale-95 transition-transform text-sm"
                            >
                                <QrCode size={16} /> VJW Serna
                            </button>
                        </div>
                    )}

                    {/* Navigation Target Text */}
                    {item.type !== EventType.FLIGHT && (
                        <div className="text-[10px] text-stone-400 text-center mt-2">
                            導航目的地: {getNavTarget(item)}
                        </div>
                    )}
                </>
            )}

            {/* Multi-stop Route Button (New) - Only for Shopping/Complex items */}
            {hasSubItems && (
                 <button 
                    onClick={openMultiStopRoute}
                    className={`w-full py-3 mt-2 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${
                        shouldUseNaver(item) 
                            ? 'bg-[#03C75A] shadow-green-100' 
                            : 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-pink-100'
                    }`}
                >
                    <Route size={18} />
                    {shouldUseNaver(item) ? '開啟路線 App (嘗試帶入中途點)' : '開啟購物路線地圖 (全站點順序)'}
                </button>
            )}

            {/* Tags (Main) */}
            {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => <TagBadge key={i} tag={tag} />)}
                </div>
            )}

            {/* AI Recommendation Box (Main) */}
            {item.guideRecommendation && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-orange-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 border-b border-orange-200/50 pb-2">
                        <Sparkles size={16} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">AI Guide Insight</span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="flex items-center gap-1 text-[10px] text-orange-400 font-bold uppercase mb-1">
                                <ChefHat size={12} /> Must Order
                            </div>
                            <div className="text-sm font-bold text-stone-800 whitespace-pre-wrap">
                                {item.guideRecommendation.mustOrder}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 text-[10px] text-orange-400 font-bold uppercase mb-1">
                                <Info size={12} /> Insider Tips
                            </div>
                            <div className="text-sm text-stone-600 leading-relaxed">
                                {item.guideRecommendation.tips}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sub Items (Grouped Strategy) */}
            {renderSubItems()}

            {/* Notes Section (Main) */}
            {(item.notes || item.walkingRoute || item.detailedWalkingGuide) && (
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    {item.notes && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Notes</h4>
                        <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{item.notes}</p>
                      </div>
                    )}

                    {/* Walking Guide / Detailed Route */}
                    {(item.walkingRoute || item.detailedWalkingGuide) && (
                        <div className="pt-2 border-t border-stone-200">
                            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Footprints size={12} /> Route Info
                            </h4>
                            {item.detailedWalkingGuide ? (
                                <div className="space-y-3 mt-2">
                                    {item.detailedWalkingGuide.steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-3 text-sm text-stone-600">
                                            <span className="font-bold text-stone-400 min-w-[1.2em]">{idx + 1}.</span>
                                            <span>{step}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-stone-600 text-sm flex gap-2">
                                    {item.walkingRoute}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Photos & Attachments (Main) */}
            <div>
                <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Photos & Docs</span>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1 bg-stone-100 rounded-full hover:bg-stone-200 text-stone-600"
                    >
                        <Plus size={16} />
                    </button>
                </h4>
                
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                />

                <div className="space-y-4">
                    {item.attachments?.map((url, i) => (
                        <div key={i} className="relative group rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                            <img 
                                src={url} 
                                alt="Attachment" 
                                className="w-full h-auto"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <button 
                                onClick={() => handleRemoveAttachment(i)}
                                className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    
                    {(!item.attachments || item.attachments.length === 0) && (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-stone-400 cursor-pointer hover:bg-stone-50 hover:border-stone-300 transition-colors"
                        >
                            <Camera size={24} className="mb-2" />
                            <span className="text-xs font-bold">Tap to add photos</span>
                        </div>
                    )}
                    
                    {isUploading && <div className="text-center text-xs text-stone-500 animate-pulse">上傳處理中...</div>}
                </div>
            </div>

            <div className="h-6"></div> {/* Bottom Padding */}
        </div>
      </div>
    </>
  );
}
