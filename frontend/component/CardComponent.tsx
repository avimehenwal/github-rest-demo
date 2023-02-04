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
      {data && (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.apiURL}
          </Typography>

          <Typography variant="h5" component="div">
            {props.heading}
            {(props.user || ` - ${data.length}`) ?? 0}
          </Typography>

          <Typography variant="body2" sx={{ marginTop: "1rem" }}>
            <List>
              {data && props.user ? (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="logo" src={data?.avatar_url} />
                  </ListItemAvatar>
                  <Link href={data.html_url} variant="body2">
                    <ListItemText primary={data.name} secondary={data.bio} />
                  </Link>
                </ListItem>
              ) : (
                <>
                  {data.length > 0 &&
                    data?.map((item) => (
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

            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default CardComponent;
