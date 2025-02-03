import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/ArrowBack";

export default function PostContainer(props: { backCallback: () => void }) {
  return (
    <section className="flex flex-col items-start gap-4 w-[800px]">
      <Button
        onClick={() => props.backCallback()}
        variant="text"
        startIcon={<DeleteIcon />}
      >
        Voltar
      </Button>
      <p className="text-2xl font-bold text-zinc-50">Post Title</p>
      <p className="text-zinc-300">Post Content</p>
    </section>
  );
}
