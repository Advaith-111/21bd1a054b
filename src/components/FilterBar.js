import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Slider,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const FilterBar = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
      <FormControl variant="outlined">
        <TextField
          label="Category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel>Company</InputLabel>
        <Select
          name="company"
          value={filters.company}
          onChange={handleFilterChange}
          label="Company"
        >
          <MenuItem value="AMZ">AMZ</MenuItem>
          <MenuItem value="FLP">FLP</MenuItem>
          <MenuItem value="SNP">SNP</MenuItem>
          <MenuItem value="HYN">HYN</MenuItem>
          <MenuItem value="AZO">AZO</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel shrink>Price Range</InputLabel>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          max={10000}
          marks
          min={0}
          step={10}
        />
      </FormControl>
      <FormControl variant="outlined">
        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={filters.rating}
          onChange={handleFilterChange}
          InputProps={{ inputProps: { min: 0, max: 5 } }}
        />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel>Availability</InputLabel>
        <Select
          name="availability"
          value={filters.availability}
          onChange={handleFilterChange}
          label="Availability"
        >
          <MenuItem value="in_stock">In Stock</MenuItem>
          <MenuItem value="out_of_stock">Out of Stock</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
