"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import PostContainer from "./components/post_container";
import { useEffect, useState } from "react";
import { ApiItem, RenderItem } from "./types";

export default function Home() {
  const [showPost, setShowPost] = useState(false);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<RenderItem[]>([]);
  const [selected, setSelected] = useState<{ label: string; body: string }>({
    label: "",
    body: "",
  });
  const [getItemsLoading, setGetItemsLoading] = useState(false);
  const [createItemLoading, setCreateGetItemLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({
    message: "",
    error: false,
  });

  async function createItem() {
    try {
      setCreateGetItemLoading(true);
      await fetch("http://localhost/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: input }),
      });
      setCreateGetItemLoading(false);
      setInput("");
      setFeedbackMessage({
        message: `Novo post com título ${input} criado com sucesso`,
        error: false,
      });
    } catch (_) {
      setFeedbackMessage({
        message: `Não foi possível criar o post ${input}`,
        error: true,
      });
      return setCreateGetItemLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (!input) return setOptions([]);
        setGetItemsLoading(true);
        const response = await fetch(
          `http://localhost/api/items/${encodeURIComponent(input)}`,
        );
        if (!response.ok) return setGetItemsLoading(false);
        const data: ApiItem[] = await response.json();
        const transformed = data.map((item: ApiItem) => ({
          label: item.title,
          id: item.id,
          body: item.body,
        }));
        setOptions(transformed);
        setGetItemsLoading(false);
        setFeedbackMessage({
          message: "",
          error: false,
        });
      } catch (_) {
        setFeedbackMessage({
          message: `Houve um erro ao procurar por posts.`,
          error: true,
        });
        return setGetItemsLoading(false);
      }
    })();
  }, [input]);

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
      {!showPost ? (
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
            {feedbackMessage.message && feedbackMessage.error && (
              <p className="text-sm text-red-600 font-medium">
                {feedbackMessage.message}
              </p>
            )}

            {feedbackMessage.message && !feedbackMessage.error && (
              <p className="text-sm text-green-600 font-medium">
                {feedbackMessage.message}
              </p>
            )}

            <Autocomplete
              loading={getItemsLoading}
              loadingText={"Carregando as opções"}
              disablePortal
              options={options}
              getOptionLabel={(option) => option.label}
              sx={{ width: "100%" }}
              onInputChange={(_, value) => setInput(value)}
              onChange={(_, value) => {
                if (value) {
                  setSelected({ label: value.label, body: value.body });
                  setShowPost(true);
                }
              }}
              noOptionsText={
                <Button
                  loading={createItemLoading}
                  onClick={createItem}
                  disabled={!input}
                  variant="text"
                >
                  Criar um novo com o título {input}
                </Button>
              }
              renderInput={(params) => (
                <TextField {...params} label="Título do post" />
              )}
              renderOption={(props, option, { index }) => (
                <li {...props} key={`${option.id}-${index}`}>
                  {option.label}
                </li>
              )}
            />
          </div>
        </section>
      ) : (
        <PostContainer
          backCallback={() => setShowPost(false)}
          title={selected.label}
          body={selected.body}
        />
      )}
    </div>
  );
}
