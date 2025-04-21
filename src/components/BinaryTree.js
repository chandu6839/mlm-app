import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Tooltip,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

// Sample tree data structure
const treeData = {
  id: 1,
  name: 'John Doe',
  rank: 'Diamond',
  left: {
    id: 2,
    name: 'Alice Smith',
    rank: 'Gold',
    left: {
      id: 4,
      name: 'Bob Wilson',
      rank: 'Silver',
    },
    right: {
      id: 5,
      name: 'Carol Brown',
      rank: 'Silver',
    },
  },
  right: {
    id: 3,
    name: 'Mike Johnson',
    rank: 'Gold',
    left: {
      id: 6,
      name: 'David Lee',
      rank: 'Silver',
    },
    right: {
      id: 7,
      name: 'Emma Davis',
      rank: 'Silver',
    },
  },
};

const TreeNode = ({ data, level = 0 }) => {
  if (!data) return null;

  const getRankColor = (rank) => {
    switch (rank.toLowerCase()) {
      case 'diamond':
        return '#B9F2FF';
      case 'gold':
        return '#FFD700';
      case 'silver':
        return '#C0C0C0';
      default:
        return '#E0E0E0';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '2px',
          height: '20px',
          backgroundColor: '#ccc',
          bottom: '100%',
          display: level > 0 ? 'block' : 'none',
        },
      }}
    >
      <Tooltip title={`Rank: ${data.rank}`} arrow>
        <Paper
          elevation={3}
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            backgroundColor: getRankColor(data.rank),
            minWidth: 120,
          }}
        >
          <Avatar sx={{ bgcolor: '#1976d2' }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="subtitle2" align="center">
            {data.name}
          </Typography>
        </Paper>
      </Tooltip>
      {(data.left || data.right) && (
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '2px',
              backgroundColor: '#ccc',
              top: '-10px',
            },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TreeNode data={data.left} level={level + 1} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TreeNode data={data.right} level={level + 1} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

function BinaryTree() {
  return (
    <Box
      sx={{
        p: 4,
        overflowX: 'auto',
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <TreeNode data={treeData} />
    </Box>
  );
}

export default BinaryTree; 