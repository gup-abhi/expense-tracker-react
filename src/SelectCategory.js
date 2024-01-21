import { useContext } from "react";
import { FormLabel, Select, MenuItem } from "@mui/material"; // adjust the import as needed
import { CategoryContext } from "./CategoryContext";

const SelectCategory = () => {
  const { categories, category, setCategory } = useContext(CategoryContext);

  return (
    <div className="col-6 col-lg-2">
      <FormLabel id="category-select-label">Category</FormLabel>
      <Select
        sx={{ width: 1 }}
        id="category-select"
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((category, index) => {
          return (
            <MenuItem key={index} value={category.id}>
              {category.category_name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectCategory;
