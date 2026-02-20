import React, { useState, useEffect } from 'react';
import { Plane, Hotel, AlertCircle, Phone, CreditCard, RefreshCw, TrendingDown, Wallet, ExternalLink, ArrowRight, X, NotebookPen, CheckCircle2, User, Plus, Percent, CheckSquare, Square, Luggage, Info } from 'lucide-react';

// Mock rates for demo purposes
const PRESET_RATES = {
  VISA: { JPY: 0.2185, KRW: 0.0238 },
  MASTER: { JPY: 0.2190, KRW: 0.0239 },
  JCB: { JPY: 0.2180, KRW: 0.0237 } // JCB usually has competitive JPY rates
};

const PACKING_LIST = {
  "重要證件 & 錢財": [
    "護照 (檢查效期)",
    "VJW / Q-Code 截圖",
    "日幣 / 韓元現金",
    "信用卡 (JCB/Visa)",
    "Suica / T-Money 卡",
    "網卡 / eSim (已設定)",
    "原子筆 (填入境卡用)"
  ],
  "滑雪裝備 (自備)": [
    "速乾排汗衣 (Base Layer)",
    "滑雪長襪 (過小腿/厚底)",
    "雪鏡 (Goggles)",
    "護具 (護臀/護膝)",
    "脖圍 / 面罩 (防風)",
    "滑雪手套 (防水)",
    "⚠️ 雪衣/褲/板/帽 (租借)"
  ],
  "冬季保暖穿搭 (0°C~5°C)": [
    "極暖發熱衣 (Ultra Warm)",
    "發熱褲 / 刷毛內搭褲",
    "防風羽絨外套 / 大衣",
    "圍巾 (必備)",
    "毛帽 (遮耳款)",
    "手套 (一般外出用)",
    "羊毛襪 (厚底)",
    "好走的靴子 / 球鞋"
  ],
  "電器 & 3C": [
    "手機 & 充電線",
    "行動電源 (建議2顆)",
    "轉接頭 (韓國圓孔)",
    "離子夾/電捲棒 (國際電壓)",
    "Wifi 機 / 備用網卡"
  ],
  "保養 & 藥妝 (極乾對策)": [
    "超保濕乳霜 (臉/身體)",
    "護唇膏 (隨身)",
    "護手霜",
    "指緣油 (防倒刺)",
    "保濕面膜",
    "髮油 (防靜電)",
    "個人彩妝品",
    "卸妝/洗面乳"
  ],
  "隨身藥品 & 雜物": [
    "感冒藥 (綜合)",
    "止痛藥 (EVE)",
    "腸胃藥",
    "OK蹦 / 腳貼 (休足時間)",
    "暖暖包 (貼式/手握)",
    "環保購物袋 (日本不供袋)",
    "大塑膠袋 (裝髒衣/垃圾)"
  ]
};

export const ToolsView: React.FC = () => {
  // Rename 'info' to 'checklist' in logic
  const [activeTab, setActiveTab] = useState<'rate' | 'fund' | 'accounting' | 'checklist'>('rate');

  // --- Rate State ---
  const [amount, setAmount] = useState<string>('1000');
  const [currencyMode, setCurrencyMode] = useState<'JPY' | 'KRW'>('JPY');
  
  // New Rate Settings
  const [rateSource, setRateSource] = useState<'VISA' | 'MASTER' | 'JCB' | 'CUSTOM'>('VISA');
  const [customRate, setCustomRate] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('3'); // Default 3% rebate
  const [feePercent, setFeePercent] = useState<string>('1.5'); // Default 1.5% fee

  // --- Fund State ---
  const INITIAL_FUND = 40000;
  const [fundExpenses, setFundExpenses] = useState<{id: number, item: string, cost: number, time: string}[]>(() => {
    try {
        const saved = localStorage.getItem('zen_travel_fund_v1');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
  });
  
  const [newItem, setNewItem] = useState('');
  const [newCost, setNewCost] = useState('');

  useEffect(() => {
    localStorage.setItem('zen_travel_fund_v1', JSON.stringify(fundExpenses));
  }, [fundExpenses]);

  const totalSpent = fundExpenses.reduce((acc, curr) => acc + curr.cost, 0);
  const remaining = INITIAL_FUND - totalSpent;
  const percentLeft = Math.max(0, (remaining / INITIAL_FUND) * 100);

  const addExpense = () => {
    if (newItem && newCost) {
      setFundExpenses(prev => [{ 
        id: Date.now(), 
        item: newItem, 
        cost: parseInt(newCost),
        time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute:'2-digit' })
      }, ...prev]);
      setNewItem('');
      setNewCost('');
    }
  };
  
  const removeExpense = (id: number) => {
      setFundExpenses(prev => prev.filter(e => e.id !== id));
  }

  // --- Accounting State ---
  const [accItem, setAccItem] = useState('');
  const [accCost, setAccCost] = useState('');
  const [payer, setPayer] = useState<'Ricky' | 'Serna'>('Ricky');
  const [accCurrency, setAccCurrency] = useState<'JPY' | 'KRW' | 'TWD'>('JPY');
  
  const [accHistory, setAccHistory] = useState<{id: number, text: string, time: string}[]>(() => {
      try {
          const saved = localStorage.getItem('zen_travel_acc_v1');
          return saved ? JSON.parse(saved) : [];
      } catch {
          return [];
      }
  });

  useEffect(() => {
      localStorage.setItem('zen_travel_acc_v1', JSON.stringify(accHistory));
  }, [accHistory]);

  const handleAccountingSubmit = () => {
      if (!accItem || !accCost) return;
      const textToSave = `${payer} 先付: ${accItem} ${accCost} ${accCurrency}`;
      const newEntry = {
          id: Date.now(),
          text: textToSave,
          time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute:'2-digit' })
      };
      setAccHistory(prev => [newEntry, ...prev]);
      setAccItem('');
      setAccCost('');
  };
  
  const removeAccHistory = (id: number) => {
      setAccHistory(prev => prev.filter(e => e.id !== id));
  };

  // --- Checklist State ---
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('zen_travel_checklist_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('zen_travel_checklist_v1', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheckItem = (item: string) => {
    // If it's a rental reminder (starts with warning sign), don't toggle check
    if (item.startsWith("⚠️")) return;

    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const getChecklistProgress = () => {
      // Filter out rental reminders from progress calculation
      const items = Object.values(PACKING_LIST).flat().filter(i => !i.startsWith("⚠️"));
      const total = items.length;
      const checked = Object.keys(checkedItems).filter(k => checkedItems[k] && items.includes(k)).length;
      return { total, checked, percent: Math.round((checked / total) * 100) };
  };

  // --- Rate Calculation Logic ---
  const currentRate = rateSource === 'CUSTOM' 
    ? (parseFloat(customRate) || 0) 
    : PRESET_RATES[rateSource][currencyMode];

  const rawAmountTwd = Math.round(parseFloat(amount || '0') * currentRate);
  
  // Calculate Fee (based on raw amount converted)
  const feeAmountTwd = Math.round(rawAmountTwd * (parseFloat(feePercent || '0') / 100));
  
  // Calculate Rebate (based on raw amount converted)
  const rebateAmountTwd = Math.round(rawAmountTwd * (parseFloat(discountPercent || '0') / 100));

  // Net Rebate (Rebate - Fee)
  const netRebateTwd = rebateAmountTwd - feeAmountTwd;

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto">
      
      {/* Tab Switcher */}
      <div className="flex bg-stone-200 p-1 rounded-xl mb-6 shadow-inner">
        <button 
          onClick={() => setActiveTab('rate')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'rate' ? 'bg-white shadow-sm text-sumi' : 'text-stone-500 hover:text-stone-700'}`}
        >
          匯率
        </button>
        <button 
          onClick={() => setActiveTab('fund')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'fund' ? 'bg-white shadow-sm text-sumi' : 'text-stone-500 hover:text-stone-700'}`}
        >
          公費
        </button>
        <button 
          onClick={() => setActiveTab('accounting')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'accounting' ? 'bg-white shadow-sm text-sumi' : 'text-stone-500 hover:text-stone-700'}`}
        >
          記帳
        </button>
        <button 
          onClick={() => setActiveTab('checklist')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'checklist' ? 'bg-white shadow-sm text-sumi' : 'text-stone-500 hover:text-stone-700'}`}
        >
          必帶
        </button>
      </div>

      {activeTab === 'rate' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-sumi flex items-center gap-2">
                        <RefreshCw size={20} className="text-indigo-600" /> 
                        刷卡匯率試算
                    </h3>
                    <div className="text-[10px] text-stone-400 bg-stone-50 px-2 py-1 rounded-full font-mono">
                       {rateSource === 'CUSTOM' ? '自訂匯率' : `1 ${currencyMode} ≈ ${currentRate} TWD`}
                    </div>
                </div>

                {/* Currency Toggle */}
                <div className="flex bg-stone-100 p-1.5 rounded-xl mb-4">
                    <button 
                        onClick={() => setCurrencyMode('JPY')}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${currencyMode === 'JPY' ? 'bg-white shadow-sm text-indigo-600' : 'text-stone-400'}`}
                    >
                        <span>🇯🇵 JPY</span>
                        <ArrowRight size={12} className="opacity-50" />
                        <span>🇹🇼 TWD</span>
                    </button>
                    <button 
                        onClick={() => setCurrencyMode('KRW')}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${currencyMode === 'KRW' ? 'bg-white shadow-sm text-indigo-600' : 'text-stone-400'}`}
                    >
                        <span>🇰🇷 KRW</span>
                        <ArrowRight size={12} className="opacity-50" />
                        <span>🇹🇼 TWD</span>
                    </button>
                </div>

                {/* Amount Input */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 mb-6 focus-within:ring-2 focus-within:ring-indigo-100 transition-all relative">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                        消費金額 ({currencyMode})
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-stone-300">{currencyMode === 'JPY' ? '¥' : '₩'}</span>
                        <input 
                            type="number"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-transparent border-none text-3xl font-mono font-bold text-sumi focus:outline-none p-0"
                            placeholder="1000"
                        />
                    </div>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Source Selector */}
                    <div className="col-span-2 bg-stone-50 rounded-xl p-2 flex gap-1">
                         {(['VISA', 'MASTER', 'JCB', 'CUSTOM'] as const).map(src => (
                             <button
                                key={src}
                                onClick={() => setRateSource(src)}
                                className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${rateSource === src ? 'bg-white shadow-sm text-sumi' : 'text-stone-400'}`}
                             >
                                 {src}
                             </button>
                         ))}
                    </div>

                    {/* Custom Rate Input (Conditional) */}
                    {rateSource === 'CUSTOM' && (
                        <div className="col-span-2 bg-stone-50 rounded-xl px-3 py-2 flex items-center gap-2 border border-stone-200">
                             <span className="text-[10px] text-stone-500 whitespace-nowrap">自訂匯率:</span>
                             <input 
                                type="number" 
                                inputMode="decimal"
                                value={customRate}
                                onChange={(e) => setCustomRate(e.target.value)}
                                className="w-full bg-transparent text-sm font-bold text-sumi focus:outline-none"
                                placeholder="0.218"
                             />
                        </div>
                    )}

                    {/* Discount Input */}
                    <div className="bg-stone-50 rounded-xl px-3 py-2 border border-stone-100 flex items-center gap-2">
                         <div className="flex flex-col">
                             <span className="text-[9px] text-stone-400 font-bold uppercase">回饋 %</span>
                             <div className="flex items-center">
                                <input 
                                    type="number" 
                                    inputMode="decimal"
                                    value={discountPercent}
                                    onChange={(e) => setDiscountPercent(e.target.value)}
                                    className="w-10 bg-transparent text-sm font-bold text-emerald-600 focus:outline-none"
                                />
                                <Percent size={10} className="text-stone-400" />
                             </div>
                         </div>
                    </div>

                    {/* Fee Input */}
                    <div className="bg-stone-50 rounded-xl px-3 py-2 border border-stone-100 flex items-center gap-2">
                         <div className="flex flex-col">
                             <span className="text-[9px] text-stone-400 font-bold uppercase">手續費 %</span>
                             <div className="flex items-center">
                                <input 
                                    type="number" 
                                    inputMode="decimal"
                                    value={feePercent}
                                    onChange={(e) => setFeePercent(e.target.value)}
                                    className="w-10 bg-transparent text-sm font-bold text-rose-600 focus:outline-none"
                                />
                                <Percent size={10} className="text-stone-400" />
                             </div>
                         </div>
                    </div>
                </div>

                {/* Results Area */}
                <div className="space-y-3">
                     {/* Row 1: Original Amount (Smaller Compact Row) */}
                     <div className="bg-stone-800 text-white rounded-xl py-3 px-5 flex items-center justify-between shadow-sm">
                         <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">原始金額 (TWD)</span>
                         <div className="flex items-baseline gap-1">
                            <span className="text-xl font-mono font-bold tracking-tight">{rawAmountTwd.toLocaleString()}</span>
                         </div>
                     </div>

                     {/* Row 2: Grid for Breakdown */}
                     <div className="grid grid-cols-3 gap-2">
                         {/* Column 1: Rebate Amount (Green +) */}
                         <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2 flex flex-col items-center justify-center text-center">
                             <span className="text-[9px] font-bold text-emerald-600/70 uppercase mb-0.5">信用卡回饋</span>
                             <span className="text-sm font-mono font-bold text-emerald-600 leading-none">+{rebateAmountTwd.toLocaleString()}</span>
                         </div>

                         {/* Column 2: Fee Amount (Red -) */}
                         <div className="bg-rose-50 border border-rose-100 rounded-xl p-2 flex flex-col items-center justify-center text-center">
                             <span className="text-[9px] font-bold text-rose-600/70 uppercase mb-0.5">國外手續費</span>
                             <span className="text-sm font-mono font-bold text-rose-600 leading-none">-{feeAmountTwd.toLocaleString()}</span>
                         </div>

                         {/* Column 3: Net Rebate (Total) */}
                         <div className={`border rounded-xl p-2 flex flex-col items-center justify-center text-center ${netRebateTwd >= 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-stone-50 border-stone-200'}`}>
                             <span className={`text-[9px] font-bold uppercase mb-0.5 ${netRebateTwd >= 0 ? 'text-indigo-600/70' : 'text-stone-400'}`}>總回饋</span>
                             <span className={`text-sm font-mono font-bold leading-none ${netRebateTwd >= 0 ? 'text-indigo-600' : 'text-stone-500'}`}>
                                 {netRebateTwd > 0 ? '+' : ''}{netRebateTwd.toLocaleString()}
                             </span>
                         </div>
                     </div>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'fund' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
           {/* Fund Summary Card */}
           <div className="bg-sumi text-washi p-6 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-2">Common Fund Remaining</div>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-lg font-light text-stone-400">¥</span>
                    <span className={`text-5xl font-mono font-bold tracking-tighter ${remaining < 0 ? 'text-rose-400' : 'text-white'}`}>
                        {remaining.toLocaleString()}
                    </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-stone-800 rounded-full mt-2 overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${percentLeft < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                        style={{width: `${percentLeft}%`}}
                    ></div>
                </div>
                <div className="flex justify-between w-full mt-1.5">
                    <span className="text-[10px] text-stone-500">Spent: ¥{totalSpent.toLocaleString()}</span>
                    <span className="text-[10px] text-stone-500">Initial: ¥{INITIAL_FUND.toLocaleString()}</span>
                </div>
              </div>
              <Wallet className="absolute -left-6 -bottom-6 text-stone-800 w-32 h-32 opacity-30 rotate-12" />
           </div>

           {/* Add Expense Form */}
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
             <div className="flex gap-3 mb-3">
               <input 
                 type="text" 
                 placeholder="項目 (e.g. 章魚燒)" 
                 value={newItem}
                 onChange={(e) => setNewItem(e.target.value)}
                 className="flex-[2] bg-stone-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-stone-400"
               />
               <div className="flex-1 relative">
                   <span className="absolute left-3 top-3 text-stone-400 text-sm font-bold">¥</span>
                   <input 
                     type="number" 
                     inputMode="decimal"
                     placeholder="0" 
                     value={newCost}
                     onChange={(e) => setNewCost(e.target.value)}
                     className="w-full bg-stone-50 border-none rounded-xl p-3 pl-7 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-mono font-bold text-sumi"
                   />
               </div>
             </div>
             <button 
               onClick={addExpense}
               disabled={!newItem || !newCost}
               className="w-full bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 text-white py-3 rounded-xl text-sm font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
             >
               <TrendingDown size={16} />
               扣除支出
             </button>
           </div>

           {/* Expenses List */}
           <div className="space-y-2">
             <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pl-2">Transaction History</h3>
             <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-100 min-h-[100px]">
               {fundExpenses.length === 0 ? (
                   <div className="p-8 text-center flex flex-col items-center justify-center text-stone-300">
                       <Wallet size={24} className="mb-2 opacity-50" />
                       <span className="text-xs">尚未有支出紀錄</span>
                   </div>
               ) : (
                   <div className="divide-y divide-stone-50">
                   {fundExpenses.map((e) => (
                    <div key={e.id} className="flex justify-between items-center p-4 hover:bg-stone-50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-rose-100 group-hover:text-rose-500 transition-colors">
                                <CreditCard size={14} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-sumi">{e.item}</div>
                                <div className="text-[10px] text-stone-400">{e.time}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sumi font-bold group-hover:line-through decoration-rose-400 decoration-2 transition-all">
                                -¥{e.cost.toLocaleString()}
                            </span>
                            <button 
                                type="button"
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    removeExpense(e.id);
                                }}
                                className="p-3 rounded-full bg-stone-50 text-stone-400 active:bg-rose-100 active:text-rose-500 transition-colors shrink-0"
                                aria-label="刪除"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                    ))}
                    </div>
               )}
             </div>
           </div>
        </div>
      )}

      {activeTab === 'accounting' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
           {/* Intro Card */}
           <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-emerald-100 text-xs font-bold uppercase tracking-wider">
                    <NotebookPen size={14} /> Travel Ledger
                </div>
                <h3 className="text-2xl font-bold mb-2">代墊記帳</h3>
                <p className="text-sm text-emerald-100 leading-relaxed mb-0">
                    記錄先墊款的項目，資料僅儲存在此手機中，回國後方便結算。
                </p>
              </div>
              <NotebookPen className="absolute -right-4 -bottom-4 text-emerald-800 w-32 h-32 opacity-20 rotate-[-12deg]" />
           </div>

           {/* LINE Link Button */}
           <a 
             href="https://liff.line.me/1655320992-Y8GowEpw/g/bRhNnFFSVPfNApeqd4gDhA"
             target="_blank"
             rel="noreferrer" 
             className="flex items-center justify-center gap-2 w-full py-3 bg-[#06C755] text-white rounded-2xl shadow-sm font-bold text-sm active:scale-95 transition-transform"
           >
             <ExternalLink size={16} />
             開啟 Line 分帳群組
           </a>

           {/* Input Form */}
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
             {/* Payer Selector */}
             <div className="flex bg-stone-100 p-1 rounded-xl mb-2">
                <button 
                    onClick={() => setPayer('Ricky')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${payer === 'Ricky' ? 'bg-white shadow-sm text-sumi' : 'text-stone-400'}`}
                >
                    <User size={12} className={payer === 'Ricky' ? 'text-indigo-500' : ''} />
                    Ricky 先付
                </button>
                <button 
                    onClick={() => setPayer('Serna')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${payer === 'Serna' ? 'bg-white shadow-sm text-sumi' : 'text-stone-400'}`}
                >
                    <User size={12} className={payer === 'Serna' ? 'text-rose-500' : ''} />
                    Serna 先付
                </button>
             </div>

             {/* Currency Selector */}
             <div className="flex bg-stone-100 p-1 rounded-xl mb-3">
                {(['JPY', 'KRW', 'TWD'] as const).map((c) => (
                  <button 
                    key={c}
                    onClick={() => setAccCurrency(c)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${accCurrency === c ? 'bg-white shadow-sm text-sumi' : 'text-stone-400'}`}
                  >
                    {c}
                  </button>
                ))}
             </div>

             <div className="flex gap-3 mb-3">
               <input 
                 type="text" 
                 placeholder="項目 (e.g. 燒肉)" 
                 value={accItem}
                 onChange={(e) => setAccItem(e.target.value)}
                 className="flex-[2] bg-stone-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-stone-400"
               />
               <div className="relative flex-1">
                   <input 
                     type="number" 
                     inputMode="decimal"
                     placeholder="金額" 
                     value={accCost}
                     onChange={(e) => setAccCost(e.target.value)}
                     className="w-full bg-stone-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-mono font-bold text-sumi"
                   />
               </div>
             </div>
             <button 
               onClick={handleAccountingSubmit}
               disabled={!accItem || !accCost}
               className="w-full bg-emerald-600 disabled:bg-stone-200 disabled:text-stone-400 text-white py-3 rounded-xl text-sm font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald-100"
             >
               <Plus size={16} />
               新增紀錄
             </button>
           </div>

           {/* Local History */}
           <div className="space-y-2">
             <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pl-2 flex justify-between items-center">
                 <span>已儲存項目</span>
             </h3>
             <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-100 min-h-[100px]">
               {accHistory.length === 0 ? (
                   <div className="p-8 text-center flex flex-col items-center justify-center text-stone-300">
                       <NotebookPen size={24} className="mb-2 opacity-50" />
                       <span className="text-xs">尚無紀錄</span>
                   </div>
               ) : (
                   <div className="divide-y divide-stone-50">
                   {accHistory.map((e) => (
                    <div key={e.id} className="flex justify-between items-center p-4 hover:bg-stone-50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-100 text-stone-400">
                                <CheckCircle2 size={14} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-sumi">{e.text}</div>
                                <div className="text-[10px] text-stone-400">{e.time}</div>
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={(ev) => {
                                ev.stopPropagation();
                                removeAccHistory(e.id);
                            }}
                            className="p-3 rounded-full bg-stone-50 text-stone-400 active:bg-rose-100 active:text-rose-500 transition-colors shrink-0"
                            aria-label="刪除"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    ))}
                    </div>
               )}
             </div>
           </div>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
           
           {/* Progress Card */}
           <div className="bg-stone-800 text-white p-5 rounded-2xl shadow-md relative overflow-hidden">
               <div className="relative z-10 flex justify-between items-end mb-3">
                  <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <Luggage size={20} className="text-stone-300" />
                        必帶清單
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">
                        JP & KR 冬日旅・行前準備
                      </p>
                  </div>
                  <div className="text-right">
                      <span className="text-3xl font-mono font-bold">{getChecklistProgress().percent}%</span>
                  </div>
               </div>
               
               {/* Progress Bar */}
               <div className="w-full h-2 bg-stone-700 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                     style={{ width: `${getChecklistProgress().percent}%` }}
                   ></div>
               </div>
               <div className="flex justify-between mt-2 text-[10px] text-stone-400 font-mono">
                   <span>{getChecklistProgress().checked} COMPLETED</span>
                   <span>TOTAL {getChecklistProgress().total}</span>
               </div>
               
               <CheckCircle2 className="absolute -right-4 -bottom-4 w-28 h-28 text-white opacity-5 rotate-[-15deg]" />
           </div>

           {/* Checklist Categories */}
           <div className="space-y-6">
              {Object.entries(PACKING_LIST).map(([category, items]) => (
                 <div key={category}>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 pl-2">
                        {category}
                    </h4>
                    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm divide-y divide-stone-50">
                        {items.map((item) => (
                           <div 
                             key={item}
                             onClick={() => toggleCheckItem(item)}
                             className={`p-4 flex items-center gap-3 active:bg-stone-50 transition-colors group select-none ${item.startsWith("⚠️") ? 'cursor-default' : 'cursor-pointer'}`}
                           >
                             <div className={`transition-all duration-300 ${item.startsWith("⚠️") ? 'opacity-30' : checkedItems[item] ? 'text-emerald-500 scale-110' : 'text-stone-300 group-hover:text-stone-400'}`}>
                                {item.startsWith("⚠️") 
                                    ? <Info size={22} className="text-orange-400" /> 
                                    : checkedItems[item] 
                                        ? <CheckSquare size={22} fill="currentColor" className="text-white bg-emerald-500 rounded-md" /> 
                                        : <Square size={22} />
                                }
                             </div>
                             <span className={`text-sm font-bold flex-1 transition-all ${item.startsWith("⚠️") ? 'text-orange-800' : checkedItems[item] ? 'text-stone-300 line-through decoration-stone-300 decoration-2' : 'text-sumi'}`}>
                                {item}
                             </span>
                           </div>
                        ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};