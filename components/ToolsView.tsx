import React, { useState, useEffect } from 'react';
import { FLIGHT_INFO, ACCOMMODATION } from '../constants';
import { Plane, Hotel, AlertCircle, Phone, CreditCard, RefreshCw, TrendingDown, Wallet, ExternalLink, ArrowRight, X, NotebookPen, CheckCircle2, User, Plus, Coins } from 'lucide-react';

// Manual update of approximate Visa rates (Simulated "Real-time")
// Source reference: https://www.twrates.com/card/visa/jpy.html
const RATES = {
  JPY: 0.2185, // Approx recent Visa rate
  KRW: 0.0238  // Approx recent Visa rate
};

const TRANS_FEE = 1.015; // 1.5% International transaction fee

export const ToolsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fund' | 'accounting' | 'rate' | 'info'>('fund');

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
      // Removed confirm dialog for smoother mobile experience
      setFundExpenses(prev => prev.filter(e => e.id !== id));
  }

  // --- Accounting (External) State ---
  // No longer using external URL, strictly local storage
  const [accItem, setAccItem] = useState('');
  const [accCost, setAccCost] = useState('');
  const [payer, setPayer] = useState<'Ricky' | 'Serna'>('Ricky');
  const [accCurrency, setAccCurrency] = useState<'JPY' | 'KRW' | 'TWD'>('JPY');
  
  // Storing simple text for history to maintain compatibility with existing structure
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
      
      // Format: "Ricky 先付: 燒肉 5000 JPY"
      const textToSave = `${payer} 先付: ${accItem} ${accCost} ${accCurrency}`;
      
      // Save Local History
      const newEntry = {
          id: Date.now(),
          text: textToSave,
          time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute:'2-digit' })
      };
      setAccHistory(prev => [newEntry, ...prev]);

      // Reset Inputs
      setAccItem('');
      setAccCost('');
  };
  
  const removeAccHistory = (id: number) => {
      // Removed confirm dialog for smoother mobile experience
      setAccHistory(prev => prev.filter(e => e.id !== id));
  };

  // --- Rate State ---
  const [amount, setAmount] = useState<string>('1000');
  const [currencyMode, setCurrencyMode] = useState<'JPY' | 'KRW'>('JPY');

  const rawRate = currencyMode === 'JPY' ? RATES.JPY : RATES.KRW;
  const rawTwd = Math.round(parseFloat(amount || '0') * rawRate);
  const feeTwd = Math.round(parseFloat(amount || '0') * rawRate * TRANS_FEE);

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto">
      
      {/* Tab Switcher */}
      <div className="flex bg-stone-200 p-1 rounded-xl mb-6 shadow-inner">
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
          onClick={() => setActiveTab('rate')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'rate' ? 'bg-white shadow-sm text-sumi' : 'text-stone-500 hover:text-stone-700'}`}
        >
          匯率
        </button>
        <button 
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'info' ? 'bg-white shadow-sm text-sumi' : 'text-stone-500 hover:text-stone-700'}`}
        >
          資訊
        </button>
      </div>

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

      {activeTab === 'rate' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-sumi flex items-center gap-2">
                        <RefreshCw size={20} className="text-indigo-600" /> 
                        Visa 匯率試算
                    </h3>
                    <a 
                        href="https://www.twrates.com/card/visa/jpy.html" 
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] flex items-center gap-1 text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full hover:bg-indigo-100 transition-colors"
                    >
                        查看來源 <ExternalLink size={10} />
                    </a>
                </div>

                {/* Toggle */}
                <div className="flex bg-stone-100 p-1.5 rounded-xl mb-6">
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

                {/* Input Area */}
                <div className="space-y-4 relative">
                    {/* Input */}
                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                            {currencyMode === 'JPY' ? '日幣金額' : '韓幣金額'}
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-stone-300">{currencyMode === 'JPY' ? '¥' : '₩'}</span>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-transparent border-none text-3xl font-mono font-bold text-sumi focus:outline-none p-0"
                                placeholder="1000"
                            />
                        </div>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-[42%] z-10 bg-white rounded-full p-1.5 shadow-sm border border-stone-100">
                        <TrendingDown size={16} className="text-stone-300" />
                    </div>

                    {/* Output Cards */}
                    <div className="grid gap-3">
                        {/* With Fee (Primary) */}
                        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-1">
                                <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                                    <CreditCard size={10} />
                                    含 1.5% 手續費
                                </label>
                                <span className="text-[10px] bg-white text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100">推薦參考</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm font-bold text-indigo-300">$</span>
                                <span className="text-3xl font-mono font-bold text-indigo-700">{feeTwd.toLocaleString()}</span>
                                <span className="text-sm font-bold text-indigo-300">TWD</span>
                            </div>
                        </div>

                        {/* Raw Rate (Secondary) */}
                        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4">
                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">
                                Visa 原始匯率 (未稅)
                            </label>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm font-bold text-stone-300">$</span>
                                <span className="text-xl font-mono font-bold text-stone-600">{rawTwd.toLocaleString()}</span>
                                <span className="text-sm font-bold text-stone-300">TWD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rate Info Footer */}
                <div className="mt-6 text-center">
                    <p className="text-[10px] text-stone-400">
                        當前 Visa 參考匯率: 1 {currencyMode} ≈ {rawRate} TWD
                    </p>
                    <p className="text-[9px] text-stone-300 mt-1">
                        實際扣款金額以銀行帳單為準
                    </p>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          {/* Flights */}
          <section>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2 pl-2">
              <Plane size={14} /> 航班資訊
            </h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-stone-50 border border-stone-100">
              {FLIGHT_INFO.map((f, i) => (
                <div key={i} className="p-4 flex justify-between items-center hover:bg-stone-50 transition-colors">
                  <div>
                    <div className="font-bold text-sumi text-sm">{f.route}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{f.time}</div>
                  </div>
                  <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-md text-xs font-mono font-bold">{f.no}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Accommodation */}
          <section>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2 pl-2">
              <Hotel size={14} /> 住宿資訊
            </h3>
            <div className="space-y-3">
              {ACCOMMODATION.map((h, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sumi text-sm">{h.name}</h4>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-bold">{h.dates}</span>
                  </div>
                  <p className="text-xs text-stone-500 flex items-start gap-1.5">
                     <span className="min-w-fit mt-0.5 opacity-50"><Hotel size={12}/></span> 
                     {h.address}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency */}
          <section>
             <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2 pl-2">
              <AlertCircle size={14} /> 緊急聯絡
            </h3>
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                    <Phone size={18} />
                 </div>
                 <div>
                   <div className="text-sm font-bold text-rose-800">日本 JP</div>
                   <div className="text-xs text-rose-600/80 mt-0.5">救護車/火警 119 &bull; 警察局 110</div>
                 </div>
               </div>
               <div className="w-full h-px bg-rose-200/50"></div>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                    <Phone size={18} />
                 </div>
                 <div>
                   <div className="text-sm font-bold text-rose-800">韓國 KR</div>
                   <div className="text-xs text-rose-600/80 mt-0.5">緊急專線 119 &bull; 旅遊諮詢 1330</div>
                 </div>
               </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};