import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [liabilitiesBalance, setLiabilitiesBalance] = useState(null);
    const [prevLiabilitiesBalance, setPrevLiabilitiesBalance] = useState(null);
    const [recentPayments, setRecentPayments] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [cashAssets, setCashAssets] = useState(null);
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            token: token
        }
    };
    useEffect(() => {
        async function fetchData() {
            axios
                .get('https://jarvis-backend-test.herokuapp.com/finance/report?item_type=finance_report&token=' + token, {}, config)
                .then((result) => {
                    console.log('results', result.data.response[0]);
                    setLastUpdated(result.data.response[0].lastUpdate);
                    setLiabilitiesBalance(result.data.response[0].liabilities.liabilities_balance);
                    setPrevLiabilitiesBalance(result.data.response[0].liabilities.prev_liabilities_balance);
                    setRecentPayments(result.data.response[0].liabilities.last_payment);
                    setCashAssets(result.data.response[0].assets.total_assets);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    // openSnackBar({ children: error.response.data.message, severity: 'error' });
                });
        }
        fetchData();
    });

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
                        {/* <EarningCard isLoading={isLoading} title="Total Cash Assets" value={cashAssets} /> */}
                        <TotalOrderLineChartCard isLoading={isLoading} title="Total Cash Assets" value={cashAssets} />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <Grid container spacing={gridSpacing - 2}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TotalIncomeDarkCard
                                    isLoading={isLoading}
                                    title="Total Liabilities"
                                    value={liabilitiesBalance}
                                    prev_val={prevLiabilitiesBalance}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} title="Recent Liabilities Payment" value={recentPayments} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={12} md={6} lg={3}>
                        <TotalIncomeLightCard isLoading={isLoading} title="Total Cash Assets" value={cashAssets} />
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
