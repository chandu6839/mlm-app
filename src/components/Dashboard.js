import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  Star,
} from '@mui/icons-material';

function Dashboard() {
  // Demo data
  const stats = {
    totalEarnings: 12500,
    monthlyEarnings: 2300,
    activeDownlines: 42,
    rank: 'Gold',
    nextRank: 'Diamond',
    rankProgress: 75,
    recentActivities: [
      { date: '2024-03-15', action: 'New member joined your downline', amount: '+$150' },
      { date: '2024-03-14', action: 'Commission earned from Level 2', amount: '+$300' },
      { date: '2024-03-13', action: 'Bonus achievement unlocked', amount: '+$500' },
      { date: '2024-03-12', action: 'Team sales bonus', amount: '+$250' },
    ],
    networkGrowth: {
      thisMonth: 8,
      lastMonth: 5,
      growth: '+60%',
    },
    teamPerformance: {
      leftTeam: {
        members: 24,
        sales: 15800,
      },
      rightTeam: {
        members: 18,
        sales: 12400,
      },
    },
  };

  const StatCard = ({ icon, title, value, subtitle }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Message */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome back, Demo User!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's your network overview for March 2024
            </Typography>
          </Paper>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AttachMoney sx={{ fontSize: 40, color: 'primary.main' }} />}
            title="Total Earnings"
            value={`$${stats.totalEarnings.toLocaleString()}`}
            subtitle={`$${stats.monthlyEarnings} this month`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<People sx={{ fontSize: 40, color: 'primary.main' }} />}
            title="Active Downlines"
            value={stats.activeDownlines}
            subtitle="Across all levels"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />}
            title="Network Growth"
            value={stats.networkGrowth.growth}
            subtitle={`${stats.networkGrowth.thisMonth} new members this month`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Star sx={{ fontSize: 40, color: 'primary.main' }} />}
            title="Current Rank"
            value={stats.rank}
            subtitle={`Next: ${stats.nextRank}`}
          />
        </Grid>

        {/* Rank Progress */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Rank Progress
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{stats.rank}</Typography>
                <Typography variant="body2">{stats.nextRank}</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={stats.rankProgress}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                {stats.rankProgress}% to next rank
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Team Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Team Performance
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Left Team</Typography>
                <Typography variant="h6">{stats.teamPerformance.leftTeam.members} Members</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${stats.teamPerformance.leftTeam.sales.toLocaleString()} Sales
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Right Team</Typography>
                <Typography variant="h6">{stats.teamPerformance.rightTeam.members} Members</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${stats.teamPerformance.rightTeam.sales.toLocaleString()} Sales
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {stats.recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.date}
                    />
                    <Typography variant="body2" color="success.main">
                      {activity.amount}
                    </Typography>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 