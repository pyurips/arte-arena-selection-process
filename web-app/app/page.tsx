"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Home() {
  return (
    <div className="flex flex-1 h-screen items-center justify-center">
      <Autocomplete
        disablePortal
        options={[]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </div>
  );
}
