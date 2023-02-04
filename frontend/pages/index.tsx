import styles from "@/styles/Home.module.css";
import { Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const data = process.env.NEXT_PUBLIC_TOKEN;
  const [searchText, setSearchText] = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <Typography variant="h2" component="h1">
        Github REST API demo
      </Typography>

      <TextField
        id="outlined-basic"
        label="github username"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Container>results {searchText}</Container>
    </main>
  );
}
