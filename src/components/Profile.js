import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

function Profile() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            alt="User Profile"
            src="/avatar.jpg"
          />
          <Box>
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              size="small"
            >
              Change Photo
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              defaultValue="John"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              defaultValue="Doe"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              defaultValue="john.doe@example.com"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              defaultValue="+1 234 567 8900"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              defaultValue="123 Main St, City, Country"
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Save Changes
            </Button>
            <Button variant="outlined">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Profile; 