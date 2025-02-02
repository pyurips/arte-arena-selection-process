"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <div className="flex flex-row gap-10 flex-1 h-screen items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
      <div className="flex flex-col gap-4">
        <p className="text-zinc-50 font-medium text-4xl tracking-tight">
          Encontre os posts mais relevantes
        </p>
        <p className="text-zinc-400 text-lg tracking-tight max-w-xl">
          Na <span className="font-bold">Postlee</span>, você tem acesso a uma
          variedade de posts excepcionais ou pode <span className="font-medium">contribuir com o seu próprio</span>!
        </p>
      </div>

      <div className="flex flex-col gap-5 w-96">
        <Autocomplete
          disablePortal
          options={[]}
          sx={{ width: "100%" }}
          noOptionsText={<Button variant="text">Criar um novo com o título ...</Button>}
          renderInput={(params) => (
            <TextField {...params} label="Título do post" />
          )}
        />
      </div>
    </div>
  );
}
