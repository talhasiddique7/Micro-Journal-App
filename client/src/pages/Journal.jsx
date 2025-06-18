import React, { useEffect, useState } from 'react';
import API from '../api/journalApi';
import {
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  Box,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';

function Journal() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);

  const formatMonth = (date) => new Date(date).getMonth(); // 0-indexed
  const formatYear = (date) => new Date(date).getFullYear();

  const fetchEntries = async () => {
    try {
      const res = await API.get('/journal');
      const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(sorted);
      setFiltered(sorted);
      updateFilters(sorted);
      checkToday(sorted);
    } catch (err) {
      alert('Error fetching journal entries');
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (data) => {
    const months = [...new Set(data.map((e) => formatMonth(e.date)))];
    const years = [...new Set(data.map((e) => formatYear(e.date)))];
    setUniqueMonths(months);
    setUniqueYears(years);
  };

  const checkToday = (data) => {
    const today = new Date().toDateString();
    const found = data.find((e) => new Date(e.date).toDateString() === today);
    setAlreadySubmitted(!!found);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    try {
      await API.post('/journal', { entry });
      setEntry('');
      fetchEntries();
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting entry');
    }
  };

  const applyFilters = () => {
    const filteredData = entries.filter((e) => {
      const d = new Date(e.date);
      const month = d.getMonth();
      const year = d.getFullYear();

      const monthMatch = monthFilter !== '' ? parseInt(monthFilter) === month : true;
      const yearMatch = yearFilter !== '' ? parseInt(yearFilter) === year : true;

      return monthMatch && yearMatch;
    });
    setFiltered(filteredData);
  };

  const clearFilters = () => {
    setMonthFilter('');
    setYearFilter('');
    setFiltered(entries);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          📝 Micro Journal
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="What did you learn today?"
            value={entry}
            onChange={(e) => {
              if (e.target.value.length <= 300) setEntry(e.target.value);
            }}
            disabled={alreadySubmitted}
            margin="normal"
            helperText={`${entry.length}/300`}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={alreadySubmitted || !entry.trim()}
          >
            {alreadySubmitted ? 'Already submitted today' : 'Submit Entry'}
          </Button>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h6" gutterBottom>
          📂 Filter Entries
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Month"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueMonths.map((m) => (
                <MenuItem key={m} value={m}>
                  {new Date(0, m).toLocaleString('default', { month: 'long' })}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Year"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueYears.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" gap={1} mb={2}>
          <Button variant="outlined" onClick={applyFilters} fullWidth>
            Apply Filter
          </Button>
          <Button variant="text" onClick={clearFilters} fullWidth>
            Clear
          </Button>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {loading ? (
          <Typography>Loading...</Typography>
        ) : filtered.length === 0 ? (
          <Typography>No entries found.</Typography>
        ) : (
          <List>
            {filtered.map((e) => (
              <React.Fragment key={e._id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
  primary={new Date(e.date).toDateString()}
  secondary={
    <Typography
      variant="body2"
      sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
    >
      {e.entry}
    </Typography>
  }
/>

                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default Journal;
