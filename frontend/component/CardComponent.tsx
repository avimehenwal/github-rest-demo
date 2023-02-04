import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";
import useSWR from "swr";

interface Props {
  title: string;
  heading: string;
  apiURL: string | null;
  user: boolean;
}

const fetcher = (url: RequestInfo | URL) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  }).then((res) => res.json());

const CardComponent: FC<Props> = (props) => {
  const { data, error, isLoading } = useSWR(props.apiURL, fetcher);

  return (
    <Card sx={{ minWidth: `200px`, minHeight: `200px` }}>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="20vh"
        >
          <CircularProgress />
        </Box>
      )}
      {error ? (
        <>
          <Typography variant="h6" color="error">
            Error occoured
          </Typography>
          <Typography color="error">
            {JSON.stringify(error, null, 2)}
          </Typography>
        </>
      ) : (
        data && (
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {props.apiURL}
            </Typography>

            <Typography variant="h5" sx={{ marginTop: "1rem" }}>
              {props.heading}
              {props.user ? null : data.length ? ` - ${data?.length}` : ``}
            </Typography>

            <Typography variant="body2" sx={{ marginTop: "1rem" }}>
              <List>
                {props.user ? (
                  <ListItem>
                    {data && (
                      <>
                        <ListItemAvatar>
                          <Avatar alt="logo" src={data?.avatar_url} />
                        </ListItemAvatar>
                        <Link href={data.html_url} variant="body2">
                          <ListItemText
                            primary={data.name}
                            secondary={data.bio}
                          />
                        </Link>
                      </>
                    )}
                  </ListItem>
                ) : (
                  <>
                    {data.length > 0 &&
                      data?.map((item: any) => (
                        <ListItem key={item.id}>
                          <ListItemAvatar>
                            <Avatar
                              alt="logo"
                              src={
                                item?.avatar_url
                                  ? item.avatar_url
                                  : item.owner.avatar_url
                              }
                            />
                          </ListItemAvatar>
                          <Link href={item.url} variant="body2">
                            <ListItemText
                              primary={
                                item?.login
                                  ? item?.login
                                  : Object.keys(item.files)[0]
                              }
                              secondary={item.description}
                            />
                          </Link>
                        </ListItem>
                      ))}
                  </>
                )}
              </List>
            </Typography>
          </CardContent>
        )
      )}
    </Card>
  );
};

export default CardComponent;
