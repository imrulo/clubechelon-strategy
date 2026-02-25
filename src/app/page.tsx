"use client";

import { useState, useMemo } from "react";
import {
    Users,
    Euro,
    Calendar,
    ShieldCheck,
    TrendingUp,
    Target,
    Hotel,
    Map,
    Dribbble,
    Instagram,
    UserPlus
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";
import { formatCurrency, calculateProjections } from "@/lib/utils";

export default function Home() {
    // Core Variables
    const [avgPeople, setAvgPeople] = useState(20);
    const [avgSpend, setAvgSpend] = useState(20);
    const [nightsPerWeek, setNightsPerWeek] = useState(4);
    const [staffCost, setStaffCost] = useState(150);
    const [fixedFee, setFixedFee] = useState(800);

    // Strategy States
    const [strategies, setStrategies] = useState({
        hotels: false,
        tours: false,
        dance: false,
        ads: false,
        influencers: false,
    });

    const toggleStrategy = (key: keyof typeof strategies) => {
        setStrategies(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Projections
    const data = useMemo(() =>
        calculateProjections(avgPeople, avgSpend, nightsPerWeek, staffCost, fixedFee, strategies),
        [avgPeople, avgSpend, nightsPerWeek, staffCost, fixedFee, strategies]
    );

    // Growth Chart Data
    const growthData = useMemo(() => [
        { name: "Month 1", revenue: data.revenuePerMonth },
        { name: "Month 2", revenue: data.revenuePerMonth * 1.10 },
        { name: "Month 3", revenue: data.revenuePerMonth * 1.15 },
        { name: "Month 4", revenue: data.revenuePerMonth * 1.20 },
        { name: "Month 5", revenue: data.revenuePerMonth * 1.22 },
        { name: "Month 6", revenue: data.revenuePerMonth * 1.25 },
    ], [data.revenuePerMonth]);

    return (
        <main className="min-h-screen bg-[#020617] text-slate-50 selection:bg-accent/30 selection:text-white">
            {/* Header */}
            <header className="border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl lg:text-3xl font-bold tracking-tight"
                    >
                        After Concept <span className="text-accent underline decoration-accent/30 underline-offset-4">Revenue Model</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 mt-1"
                    >
                        Interactive business projection tool for nightlife venues.
                    </motion.p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Control Panel (Left) */}
                <section className="lg:col-span-5 space-y-8">
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl space-y-8">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Users className="w-5 h-5 text-accent" />
                            Core Variables
                        </h2>

                        {/* Sliders */}
                        <div className="space-y-6">
                            <Slider
                                label="Average people per night"
                                value={avgPeople}
                                min={5} max={100}
                                onChange={setAvgPeople}
                                unit="people"
                            />
                            <Slider
                                label="Average spend per person"
                                value={avgSpend}
                                min={10} max={40}
                                onChange={setAvgSpend}
                                unit="€"
                            />
                            <Slider
                                label="Nights per week"
                                value={nightsPerWeek}
                                min={3} max={5}
                                onChange={setNightsPerWeek}
                                unit="nights"
                            />
                            <Slider
                                label="Staff & security cost per night"
                                value={staffCost}
                                min={100} max={250}
                                onChange={setStaffCost}
                                unit="€"
                            />
                            <Slider
                                label="Fixed monthly concept fee"
                                value={fixedFee}
                                min={0} max={2000}
                                onChange={setFixedFee}
                                unit="€"
                            />
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-accent" />
                                Strategy Activation
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <StrategyButton
                                    label="Hotel partnerships"
                                    boost="+5"
                                    active={strategies.hotels}
                                    icon={Hotel}
                                    onClick={() => toggleStrategy('hotels')}
                                />
                                <StrategyButton
                                    label="Tour operators"
                                    boost="+8"
                                    active={strategies.tours}
                                    icon={Map}
                                    onClick={() => toggleStrategy('tours')}
                                />
                                <StrategyButton
                                    label="Dance schools"
                                    boost="+6"
                                    active={strategies.dance}
                                    icon={Dribbble}
                                    onClick={() => toggleStrategy('dance')}
                                />
                                <StrategyButton
                                    label="Paid Social Ads"
                                    boost="+10"
                                    active={strategies.ads}
                                    icon={Instagram}
                                    onClick={() => toggleStrategy('ads')}
                                />
                                <StrategyButton
                                    label="Influencers"
                                    boost="+4"
                                    active={strategies.influencers}
                                    icon={UserPlus}
                                    onClick={() => toggleStrategy('influencers')}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Panel (Right) */}
                <section className="lg:col-span-7 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <KPICard label="Revenue per night" value={formatCurrency(data.revenuePerNight)} />
                        <KPICard label="Revenue per week" value={formatCurrency(data.revenuePerWeek)} />
                        <KPICard label="Revenue per month" value={formatCurrency(data.revenuePerMonth)} highlight />
                        <KPICard label="Monthly staff costs" value={formatCurrency(data.staffCostPerMonth)} />
                        <KPICard label="Net monthly profit" value={formatCurrency(data.netProfit)} highlight />
                        <KPICard label="ROI percentage" value={`${data.roi.toFixed(0)}%`} />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-accent" />
                                Growth Projection (6 Months)
                            </h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={growthData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                        <XAxis dataKey="name" stroke="#94a3b8" />
                                        <YAxis stroke="#94a3b8" tickFormatter={(v) => `€${v / 1000}k`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                            formatter={(v: number) => [formatCurrency(v), "Revenue"]}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#f97373"
                                            strokeWidth={3}
                                            dot={{ fill: '#f97373', r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-accent" />
                                    Break-Even Analysis
                                </h3>
                                <p className="text-slate-400">Minimum attendance needed to cover fixed costs.</p>
                            </div>
                            <div className="text-center md:text-right">
                                <div className="text-4xl font-bold text-money transition-all duration-300">
                                    {Math.ceil(data.breakEvenAttendance)} <span className="text-sm font-normal text-slate-500 uppercase">People/Night</span>
                                </div>
                                <div className="mt-2 text-xs text-slate-500 italic">
                                    Formula: (Staff + Fixed Fee) / (Spend × Nights × 4)
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Section (Full Width) */}
                <section className="lg:col-span-12 pt-8">
                    <h2 className="text-2xl font-bold mb-8 text-center">Current Model vs Structured After Concept</h2>
                    <div className="overflow-hidden bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="px-8 py-6 font-semibold">Factor</th>
                                    <th className="px-8 py-6 font-semibold">Current Model</th>
                                    <th className="px-8 py-6 font-semibold text-accent">Structured Concept</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <TableRow label="Average Attendance" left="Inconsistent / Random" right="Predictable / Growing" />
                                <TableRow label="Revenue Consistency" left="Unpredictable" right="High (Recurring)" />
                                <TableRow label="Brand Identity" left="Weak (Just a club)" right="Strong (Concept anchor)" />
                                <TableRow label="Habit Formation" left="Passive" right="Active (Anchor point)" />
                                <TableRow label="Growth Scalability" left="Limited" right="Performance-based Scaling" />
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center text-slate-500 text-sm">
                &copy; 2024 After Concept. Professional Revenue & Growth Simulator.
            </footer>
        </main>
    );
}

function Slider({ label, value, min, max, unit, onChange }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
                <label className="text-sm text-slate-400 font-medium">{label}</label>
                <span className="text-sm font-bold text-accent tabular-nums bg-accent/10 px-2 py-0.5 rounded-full ring-1 ring-accent/20">
                    {unit === '€' ? formatCurrency(value) : `${value} ${unit}`}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent"
            />
        </div>
    );
}

function StrategyButton({ label, boost, active, icon: Icon, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 text-left ${active
                    ? 'bg-accent/10 border-accent/50 text-accent shadow-lg shadow-accent/5'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                }`}
        >
            <div className={`p-2 rounded-xl transition-colors ${active ? 'bg-accent text-white' : 'bg-slate-800'}`}>
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <div className="text-xs font-bold uppercase tracking-wider">{boost} People</div>
                <div className="text-sm font-semibold truncate">{label}</div>
            </div>
        </button>
    );
}

function KPICard({ label, value, highlight }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-6 rounded-3xl border ${highlight
                    ? 'bg-accent/5 border-accent/20 ring-1 ring-accent/10'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                } transition-colors duration-300`}
        >
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{label}</div>
            <div className={`text-2xl font-bold tabular-nums ${highlight ? 'text-accent' : 'text-slate-50'}`}>
                {value}
            </div>
        </motion.div>
    );
}

function TableRow({ label, left, right }: any) {
    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="px-8 py-5 text-sm font-medium text-slate-400">{label}</td>
            <td className="px-8 py-5 text-sm">{left}</td>
            <td className="px-8 py-5 text-sm font-semibold text-accent">{right}</td>
        </tr>
    );
}
