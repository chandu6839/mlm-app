import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Card,
  CardContent,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ width: '100%' }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [commissionSettings, setCommissionSettings] = useState({
    directReferral: 10,
    levelCommissions: [
      { level: 1, percentage: 8 },
      { level: 2, percentage: 5 },
      { level: 3, percentage: 3 },
      { level: 4, percentage: 2 },
      { level: 5, percentage: 1 },
    ],
    rankBonuses: [
      { rank: 'Silver', bonus: 100 },
      { rank: 'Gold', bonus: 500 },
      { rank: 'Diamond', bonus: 2000 },
    ],
    minimumPayout: 50,
    payoutFrequency: 'monthly',
  });

  // System stats for admin
  const systemStats = {
    totalUsers: 43,
    totalEarnings: 156700,
    activeNetworks: 12,
    growthRate: '45%',
  };

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Add demo user to the list
    const allUsers = [
      {
        username: 'demo',
        email: 'demo@example.com',
        role: 'demo',
        status: 'active',
        joinDate: '2024-01-01',
        earnings: 12500,
      },
      ...storedUsers.map(user => ({
        ...user,
        role: 'member',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        earnings: 0,
      }))
    ];
    setUsers(allUsers);

    // Load commission settings from localStorage
    const storedSettings = localStorage.getItem('commissionSettings');
    if (storedSettings) {
      setCommissionSettings(JSON.parse(storedSettings));
    }
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteUser = (username) => {
    if (username === 'demo') {
      setError('Cannot delete demo account');
      return;
    }
    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(
      updatedUsers.filter(user => user.username !== 'demo')
    ));
  };

  const handleSaveUser = () => {
    if (editMode && selectedUser) {
      const updatedUsers = users.map(user =>
        user.username === selectedUser.username ? selectedUser : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(
        updatedUsers.filter(user => user.username !== 'demo')
      ));
    }
    setOpenDialog(false);
    setSelectedUser(null);
    setEditMode(false);
  };

  const handleCommissionChange = (field, value, index = null) => {
    const newSettings = { ...commissionSettings };
    if (index !== null) {
      newSettings[field][index].percentage = Number(value);
    } else {
      newSettings[field] = value;
    }
    setCommissionSettings(newSettings);
  };

  const handleRankBonusChange = (index, value) => {
    const newSettings = { ...commissionSettings };
    newSettings.rankBonuses[index].bonus = Number(value);
    setCommissionSettings(newSettings);
  };

  const saveCommissionSettings = () => {
    localStorage.setItem('commissionSettings', JSON.stringify(commissionSettings));
    setError('Commission settings saved successfully!');
  };

  const StatCard = ({ icon, title, value, color = 'primary.main' }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {React.cloneElement(icon, { sx: { color, fontSize: 40 } })}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert 
          severity={error.includes('success') ? 'success' : 'error'} 
          sx={{ mb: 2 }} 
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Overview" />
            <Tab label="User Management" />
            <Tab label="Commission Settings" />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<PersonIcon />}
                  title="Total Users"
                  value={systemStats.totalUsers}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<MoneyIcon />}
                  title="Total Earnings"
                  value={`$${systemStats.totalEarnings.toLocaleString()}`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<GroupIcon />}
                  title="Active Networks"
                  value={systemStats.activeNetworks}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<TrendingUpIcon />}
                  title="Growth Rate"
                  value={systemStats.growthRate}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User Management
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Earnings</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.username}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>${user.earnings.toLocaleString()}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleEditUser(user)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteUser(user.username)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Commission Settings
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={saveCommissionSettings}
                >
                  Save Changes
                </Button>
              </Box>

              <Grid container spacing={3}>
                {/* Direct Referral Commission */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Direct Referral Commission"
                    type="number"
                    value={commissionSettings.directReferral}
                    onChange={(e) => handleCommissionChange('directReferral', Number(e.target.value))}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>

                {/* Minimum Payout */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Minimum Payout Amount"
                    type="number"
                    value={commissionSettings.minimumPayout}
                    onChange={(e) => handleCommissionChange('minimumPayout', Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>

                {/* Payout Frequency */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Payout Frequency</InputLabel>
                    <Select
                      value={commissionSettings.payoutFrequency}
                      onChange={(e) => handleCommissionChange('payoutFrequency', e.target.value)}
                      label="Payout Frequency"
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="biweekly">Bi-weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Level Commissions */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Level Commissions
                  </Typography>
                  <Grid container spacing={2}>
                    {commissionSettings.levelCommissions.map((level, index) => (
                      <Grid item xs={12} sm={6} md={4} key={level.level}>
                        <TextField
                          fullWidth
                          label={`Level ${level.level} Commission`}
                          type="number"
                          value={level.percentage}
                          onChange={(e) => handleCommissionChange('levelCommissions', e.target.value, index)}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* Rank Bonuses */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Rank Achievement Bonuses
                  </Typography>
                  <Grid container spacing={2}>
                    {commissionSettings.rankBonuses.map((rank, index) => (
                      <Grid item xs={12} sm={6} md={4} key={rank.rank}>
                        <TextField
                          fullWidth
                          label={`${rank.rank} Rank Bonus`}
                          type="number"
                          value={rank.bonus}
                          onChange={(e) => handleRankBonusChange(index, e.target.value)}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
        </Grid>
      </Grid>

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editMode ? 'Edit User' : 'User Details'}
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Username"
                value={selectedUser.username}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({
                  ...selectedUser,
                  email: e.target.value,
                })}
                disabled={!editMode}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Status"
                value={selectedUser.status}
                onChange={(e) => setSelectedUser({
                  ...selectedUser,
                  status: e.target.value,
                })}
                disabled={!editMode}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          {editMode && (
            <Button onClick={handleSaveUser} variant="contained">
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard; 