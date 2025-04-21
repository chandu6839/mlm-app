import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Box,
  Tab,
  Tabs,
} from '@mui/material';
import { Person as PersonIcon, Add as AddIcon } from '@mui/icons-material';
import BinaryTree from './BinaryTree';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ width: '100%' }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const networkMembers = [
  {
    id: 1,
    name: 'John Doe',
    level: 'Level 1',
    joinDate: '2024-01-15',
    members: 12,
  },
  {
    id: 2,
    name: 'Jane Smith',
    level: 'Level 2',
    joinDate: '2024-02-01',
    members: 8,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    level: 'Level 1',
    joinDate: '2024-02-15',
    members: 5,
  },
];

function Network() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Network
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
        >
          Add Member
        </Button>
      </Box>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="List View" />
          <Tab label="Tree View" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <List>
            {networkMembers.map((member, index) => (
              <React.Fragment key={member.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {member.level}
                        </Typography>
                        {` — Joined ${member.joinDate} • ${member.members} team members`}
                      </>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <BinaryTree />
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default Network; 