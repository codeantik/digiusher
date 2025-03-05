import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { useFilterStore } from '../stores/useFiltersStore';
import { useState } from 'react';

const Filters = () => {
  const { setFilters } = useFilterStore();
  const [localFilters, setLocalFilters] = useState({
    cloudType: '',
    region: '',
    minRam: '',
    maxRam: '',
    minCpu: '',
    maxCpu: '',
  });

  const handleReset = () => {
    setLocalFilters({
      cloudType: '',
      region: '',
      minRam: '',
      maxRam: '',
      minCpu: '',
      maxCpu: '',
    });
    setFilters({
      cloudType: '',
      region: '',
      minRam: '',
      maxRam: '',
      minCpu: '',
      maxCpu: '',
    });
  };

  const handleFilter = () => {
    setFilters(localFilters);
  };

  return (
    <div className="w-full">
      <Accordion defaultExpanded sx={{ borderRadius: 10, width: '100%' }}>
        <AccordionSummary expandIcon={<ChevronDown />}>
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={2}>
            {/* Cloud Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Cloud Type</InputLabel>
                <Select
                  value={localFilters.cloudType}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      cloudType: e.target.value,
                    })
                  }
                >
                  <MenuItem value="AWS">AWS</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Region */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                  value={localFilters.region}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, region: e.target.value })
                  }
                >
                  <MenuItem value="eu-west-1">eu-west-1</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Min RAM */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Min RAM (GB)"
                type="number"
                value={localFilters.minRam}
                inputProps={{ min: 0, max: localFilters.maxRam }}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    minRam: e.target.value,
                  })
                }
              />
            </Grid>

            {/* Max RAM */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max RAM (GB)"
                type="number"
                value={localFilters.maxRam}
                inputProps={{ min: localFilters.minRam, max: 128 }}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    maxRam: e.target.value,
                  })
                }
              />
            </Grid>

            {/* Min CPU */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Min CPU Cores"
                type="number"
                value={localFilters.minCpu}
                inputProps={{ min: 1, max: localFilters.maxCpu }}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    minCpu: e.target.value,
                  })
                }
              />
            </Grid>

            {/* Max CPU */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max CPU Cores"
                type="number"
                value={localFilters.maxCpu}
                inputProps={{ min: localFilters.minCpu, max: 64 }}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    maxCpu: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            gap={4}
            alignItems="flex-end"
          >
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Filter
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Filters;
