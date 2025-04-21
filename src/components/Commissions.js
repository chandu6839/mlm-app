import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
} from '@mui/material';

const commissions = [
  {
    id: 1,
    date: '2024-03-20',
    type: 'Direct Sale',
    amount: 250.00,
    status: 'Paid',
    member: 'Jane Smith',
  },
  {
    id: 2,
    date: '2024-03-18',
    type: 'Level Bonus',
    amount: 120.00,
    status: 'Pending',
    member: 'Mike Johnson',
  },
  {
    id: 3,
    date: '2024-03-15',
    type: 'Direct Sale',
    amount: 180.00,
    status: 'Paid',
    member: 'Sarah Williams',
  },
  {
    id: 4,
    date: '2024-03-12',
    type: 'Leadership Bonus',
    amount: 500.00,
    status: 'Paid',
    member: 'Team Achievement',
  },
];

function Commissions() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Commission History
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Member</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commissions.map((commission) => (
              <TableRow key={commission.id}>
                <TableCell>{commission.date}</TableCell>
                <TableCell>{commission.type}</TableCell>
                <TableCell>{commission.member}</TableCell>
                <TableCell align="right">
                  ${commission.amount.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={commission.status}
                    color={commission.status === 'Paid' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Commissions; 