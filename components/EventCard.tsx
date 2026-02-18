import React from 'react';
import { ItineraryItem, EventType, Tag } from '../types';
import { Plane, Train, MapPin, BedDouble, ShoppingBag, ChevronRight, Utensils, AlertTriangle, Receipt, ArrowRight } from 'lucide-react';

interface EventCardProps {
  item: ItineraryItem;
  onClick: () => void;
}

const TagBadge: React.FC<{ tag: Tag }> = ({ tag }) => {
  const styles = {
    food: "bg-orange-100 text-orange-700",
    shopping: "bg-rose-100 text-rose-700",
    reservation: "bg-blue-100 text-blue-700",
    alert: "bg-red-100 text-red-700",
    info: "bg-stone-100 text-stone-600",
  };
  
  // Only render icon for specific types to save space
  const icons = {
    food: <Utensils size={8} />,
    shopping: <ShoppingBag size={8} />,
    reservation: <Receipt size={8} />,
    alert: <AlertTriangle size={8} />,
    info: null
  };

  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${styles[tag.type] || styles.info}`}>
      {icons[tag.type]}
      {tag.label}
    </span>
  );
};

export const EventCard: React.FC<EventCardProps> = ({ item, onClick }) => {
  
  // Icon Selection
  const getIcon = () => {
    switch (item.type) {
        case EventType.FLIGHT: return <Plane size={16} className="text-sky-600" />;
        case EventType.TRAIN: return <Train size={16} className="text-emerald-600" />;
        case EventType.STAY: return <BedDouble size={16} className="text-indigo-600" />;
        case EventType.SHOPPING: return <ShoppingBag size={16} className="text-rose-600" />;
        default: return <MapPin size={16} className="text-stone-400" />;
    }
  };

  // Card Border Color logic
  const getBorderColor = () => {
     switch(item.type) {
         case EventType.FLIGHT: return 'border-l-sky-400';
         case EventType.TRAIN: return 'border-l-emerald-400';
         case EventType.STAY: return 'border-l-indigo-400';
         case EventType.SHOPPING: return 'border-l-rose-300';
         default: return 'border-l-stone-300';
     }
  };

  return (
    <div 
        onClick={onClick}
        className={`relative mb-3 bg-white rounded-xl shadow-sm border-l-[3px] ${getBorderColor()} p-3 cursor-pointer hover:bg-stone-50 active:scale-[0.98] transition-all`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-start flex-1 min-w-0">
            {/* Time Column */}
            <div className="flex flex-col items-center min-w-[40px] pt-0.5">
                <span className="text-xs font-bold text-sumi">{item.startTime || '--:--'}</span>
                {item.endTime && (
                    <span className="text-[9px] text-stone-400 mt-0.5">{item.endTime}</span>
                )}
            </div>

            {/* Content Column */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                   {getIcon()}
                   <h3 className="text-sm font-bold text-sumi truncate">{item.title}</h3>
                </div>
                
                <div className="text-[10px] text-stone-500 truncate mb-1.5 flex items-center gap-1">
                    {item.startLocation && item.endLocation ? (
                       <>
                         <span className="truncate">{item.startLocation}</span>
                         <ArrowRight size={10} className="text-stone-300 shrink-0" />
                         <span className="truncate font-medium text-stone-700">{item.endLocation}</span>
                       </>
                   ) : (
                       <span className="truncate">{item.startLocation || item.endLocation}</span>
                   )}
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag, i) => <TagBadge key={i} tag={tag} />)}
                    </div>
                )}
            </div>
        </div>

        {/* Action Icon */}
        <div className="pl-2 flex items-center h-full pt-2 opacity-30">
            <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};