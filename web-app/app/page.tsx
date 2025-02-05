"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import PostContainer from "./components/post_container";
import { useState } from "react";

export default function Home() {
  const [showPost, setShowPost] = useState(true);

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
      {!showPost && (
        <section className="flex flex-col lg:items-center lg:flex-row gap-10 p-3">
          <div className="flex flex-col gap-4">
            <p className="text-zinc-50 font-medium text-2xl sm:text-3xl tracking-tight">
              Encontre os posts mais relevantes
            </p>
            <p className="text-zinc-400 text-md sm:text-lg tracking-tight">
              Na <span className="font-bold">Postlee</span>, você tem acesso a
              uma variedade de posts excepcionais ou pode{" "}
              <span className="font-medium">contribuir com o seu próprio</span>!
            </p>
          </div>

          <div className="flex flex-col gap-5 w-full max-w-96">
            <Autocomplete
              disablePortal
              options={[]}
              sx={{ width: "100%" }}
              noOptionsText={
                <Button variant="text">Criar um novo com o título ...</Button>
              }
              renderInput={(params) => (
                <TextField {...params} label="Título do post" />
              )}
            />
          </div>
        </section>
      )}

      {showPost && <PostContainer backCallback={() => setShowPost(false)} />}
    </div>
  );
}
