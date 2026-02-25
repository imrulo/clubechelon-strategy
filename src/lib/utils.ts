export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);
};

export const calculateProjections = (
    avgPeople: number,
    avgSpend: number,
    nightsPerWeek: number,
    staffCost: number,
    fixedFee: number,
    strategies: { [key: string]: boolean }
) => {
    const strategyBoost = {
        hotels: 5,
        tours: 8,
        dance: 6,
        ads: 10,
        influencers: 4,
    };

    let extraPeople = 0;
    if (strategies.hotels) extraPeople += strategyBoost.hotels;
    if (strategies.tours) extraPeople += strategyBoost.tours;
    if (strategies.dance) extraPeople += strategyBoost.dance;
    if (strategies.ads) extraPeople += strategyBoost.ads;
    if (strategies.influencers) extraPeople += strategyBoost.influencers;

    const totalPeople = avgPeople + extraPeople;
    const revenuePerNight = totalPeople * avgSpend;
    const revenuePerWeek = revenuePerNight * nightsPerWeek;
    const revenuePerMonth = revenuePerWeek * 4;

    const staffCostPerMonth = staffCost * nightsPerWeek * 4;
    const totalCostsPerMonth = staffCostPerMonth + fixedFee;
    const netProfit = revenuePerMonth - totalCostsPerMonth;
    const roi = fixedFee > 0 ? (netProfit / fixedFee) * 100 : 0;

    const breakEvenAttendance = totalCostsPerMonth / (avgSpend * nightsPerWeek * 4);

    return {
        totalPeople,
        revenuePerNight,
        revenuePerWeek,
        revenuePerMonth,
        staffCostPerMonth,
        netProfit,
        roi,
        breakEvenAttendance,
    };
};
