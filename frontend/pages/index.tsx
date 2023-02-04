import CardComponent from "@/component/CardComponent";
import styles from "@/styles/Home.module.css";
import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const cardInfo = [
  {
    title: "user information",
    heading: "user",
    apiURL: (user: string) => `https://api.github.com/users/${user}`,
  },
  {
    title: "gist information",
    heading: "gist",
    apiURL: (user: string) => `https://api.github.com/users/${user}/gists`,
  },
  {
    title: "organization information",
    heading: "organization",
    apiURL: (user: string) => `https://api.github.com/user/orgs`,
  },
];

export default function Home() {
  const data = process.env.NEXT_PUBLIC_TOKEN;
  const [searchText, setSearchText] = useState<string | null>(`avimehenwal`);

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

      <Grid container spacing={2}>
        {cardInfo.map((cardInfo) => (
          <Grid item md={4} key={`key__${cardInfo.title}`}>
            <CardComponent
              title={cardInfo.title}
              heading={cardInfo.heading}
              apiURL={searchText ? cardInfo.apiURL(searchText) : null}
              user={cardInfo.heading.includes("user") ? true : false}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
