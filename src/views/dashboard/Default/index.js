import { useEffect, useState, useContext } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { gridSpacing } from 'store/constant';
import UserContext from 'UserContext';
import axios from 'axios';
import ChartDataMonth from './chart-data/total-order-month-line-chart';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [liabilitiesBalance, setLiabilitiesBalance] = useState(null);
    const [prevLiabilitiesBalance, setPrevLiabilitiesBalance] = useState(null);
    const [recentPayments, setRecentPayments] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [cashAssets, setCashAssets] = useState(null);
    const [prev_cashAssets, setPrevCashAssets] = useState(null);
    const [prevRecentPayments, setPrevRecentPayments] = useState(null);
    const [data, setData] = useState(null);
    const { openSnackBar } = useContext(UserContext);

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };
    useEffect(() => {
        async function fetchData() {
            axios
                .get('https://logic-theorist.com/finance/report?item_type=finance_report&token=' + token, {}, config)
                .then((result) => {
                    if (result.data.message) {
                        openSnackBar({ children: result.data.message, severity: 'error' });
                    }
                    if (result.data.response.length > 0) {
                        setLastUpdated(result.data.response[0].lastUpdate);
                        setLiabilitiesBalance(result.data.response[0].liabilities.liabilities_balance);
                        setPrevLiabilitiesBalance(result.data.response[0].liabilities.prev_liabilities_balance);
                        setRecentPayments(result.data.response[0].liabilities.last_payment);
                        setCashAssets(result.data.response[0].assets.total_assets);
                        setPrevCashAssets(result.data.response[0].assets.prev_total_assets);
                        setPrevRecentPayments(result.data.response[0].liabilities.prev_last_payment);
                        setData(result.data.response[0]);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    // openSnackBar({ children: error.response.data.message, severity: 'error' });
                });
        }
        if (isLoading === true) {
            fetchData();
        }
    });

    const liabilitiesMonthData = () => {
        if (data) {
            let liabilities_data = [];
            data.records.forEach((record) => {
                liabilities_data.push(record.liabilities.liabilities_balance);
            });
            let months = ChartDataMonth;
            months.series = [
                {
                    name: 'Total Liabilities',
                    data: liabilities_data
                }
            ];
            return months;
        }
        return null;
    };

    const liabilitiesPaymentsData = () => {
        if (data) {
            let liabilities_data = [];
            data.records.forEach((record) => {
                liabilities_data.push(record.liabilities.last_payment);
            });
            let months = ChartDataMonth;
            months.series = [
                {
                    name: 'Liabilities Payments',
                    data: liabilities_data
                }
            ];
            return months;
        }
        return null;
    };

    const assetsMonthData = () => {
        if (data) {
            let assets_data = [];
            data.records.forEach((record) => {
                assets_data.push(record.assets.total_assets);
            });
            let months = ChartDataMonth;
            months.series = [
                {
                    name: 'Total Cash',
                    data: assets_data
                }
            ];
            return months;
        }
        return null;
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} xs={12}>
                        <Typography variant="subtitle1" style={{ marginLeft: 10 + 'px', color: '#6e6e6e' }}>
                            Last Updated: {lastUpdated}
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard
                            isLoading={isLoading}
                            value={cashAssets}
                            prev_val={prev_cashAssets}
                            dataA={assetsMonthData}
                            dataB={assetsMonthData}
                            data={{
                                title: 'Total Assets',
                                labelA: 'Assets',
                                labelB: 'Liquid Cash',
                                stat_type: 'positive'
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        {/* <EarningCard isLoading={isLoading} title="Total Cash Assets" value={cashAssets} /> */}
                        <TotalOrderLineChartCard
                            isLoading={isLoading}
                            value={liabilitiesBalance}
                            prev_val={prevLiabilitiesBalance}
                            dataA={liabilitiesMonthData}
                            dataB={liabilitiesPaymentsData}
                            data={{
                                title: 'Total Debt',
                                labelA: 'Liabilities',
                                labelB: 'Payments',
                                stat_type: 'negative'
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <Grid container spacing={gridSpacing - 2}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TotalIncomeDarkCard
                                    isLoading={isLoading}
                                    title="Liabilities Change"
                                    value={liabilitiesBalance - prevLiabilitiesBalance}
                                    prev_val={prevLiabilitiesBalance}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <TotalIncomeDarkCard
                                    isLoading={isLoading}
                                    title="Change in Liabilities Payments"
                                    value={recentPayments - prevRecentPayments}
                                    prev_val={prevRecentPayments}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={12} md={6} lg={3}>
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            title="Total Cash Assets"
                            prev_val={prev_cashAssets}
                            value={cashAssets}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
