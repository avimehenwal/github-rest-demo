import CardComponent from "@/component/CardComponent";
import styles from "@/styles/Home.module.css";
import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

const cardInfo = [
  {
    title: "user information",
    heading: "User Information",
    apiURL: (user: string) => `https://api.github.com/users/${user}`,
  },
  {
    title: "gist information",
    heading: "Gists",
    apiURL: (user: string) => `https://api.github.com/users/${user}/gists`,
  },
  {
    title: "organization information",
    heading: "Organizations",
    apiURL: (user: string) => `https://api.github.com/user/orgs`,
  },
];

export default function Home() {
  const [searchText, setSearchText] = useState<string | null>(`avimehenwal`);
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");

  const validateGithubUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userName = e.target.value;
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(userName)) {
      setError(true);
      setHelperText(`github username cannot contain special characters`);
    } else {
      setError(false);
      setHelperText(``);
    }
    setSearchText(userName.trim());
  };

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
        onChange={(e) => validateGithubUserName(e)}
        error={error}
        helperText={helperText}
        sx={{ margin: "2rem 1rem", width: "40%" }}
      />

      <Grid container spacing={2}>
        {cardInfo.map((cardInfo) => (
          <Grid item md={4} key={`key__${cardInfo.title}`}>
            <CardComponent
              title={cardInfo.title}
              heading={cardInfo.heading}
              apiURL={searchText ? cardInfo.apiURL(searchText) : null}
              user={cardInfo.heading.includes("User") ? true : false}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
