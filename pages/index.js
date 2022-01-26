import appConfig from "../config.json";
import GlobalStyle from "../GlobalStyles";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useEffect, useState } from "react";
import axios from "axios";

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary["800"]};
          font-size: ;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(appConfig.defautUser);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        const data = response.data;
        if (data.login != null) {
          setUser(data);
        }
      })
      .catch((err) => {
        setUser(appConfig.defautUser);
        return;
      });
  }, [username]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  console.log(user.login);

  return (
    <>
      <GlobalStyle />
      <Box
        styleSheet={{
          display: "flex",
          backgroundColor: appConfig.theme.colors.primary["800"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",

            borderRadius: "20px",
            backgroundColor: appConfig.theme.colors.primary["500"],
            backgroundImage:"url(https://wallpapercave.com/wp/wp2666508.jpg)",
            boxShadow: "5px 5px 5px 1px rgb(0 0 0 / 50%)",
            width: "100%",

            padding: "20px",
            margin: "20px",
          }}
        >
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",

              height: "100%",
              padding: "50px",
              margin: "30px",

              border: "3px solid",
              borderColor: appConfig.theme.colors.primary["800"],
              backgroundColor: appConfig.theme.colors.primary["500"],
              borderRadius: "20px",
            }}
          >
            <Titulo tag="h2">Welcome to myChat</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[400],
              }}
            >
              {appConfig.name}
            </Text>
            {user.login != null ? (
              <>
                <Image
                  src={`https://github.com/${username}.png`}
                  styleSheet={{
                    borderRadius: "50%",
                    marginBottom: "14px",
                    width: "150px",
                    border: "3px solid",
                    borderColor: appConfig.theme.colors.primary["800"],
                    boxShadow: "3px 3px 10px 1px rgb(0 0 0 / 20%)",
                  }}
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    marginBottom: "22px",
                    color: appConfig.theme.colors.primary["500"],
                    backgroundColor: appConfig.theme.colors.primary["800"],
                    padding: "3px 10px",
                    borderRadius: "1000px",
                  }}
                >
                  <a href={`https://github.com/${username}`} target=".blank">
                    /{username}
                  </a>
                  <style jsx>{`
                    a {
                      color: ${appConfig.theme.colors.primary["500"]};
                      text-decoration: inherit;
                    }
                  `}</style>
                </Text>
              </>
            ) : (
              <>
                <Box
                  styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    marginBottom: "14px",
                    boxShadow: "3px 3px 10px 1px rgb(0 0 0 / 20%)",

                    borderRadius: "50%",
                    width: "150px",
                    height: "150px",
                    border: "3px solid",
                    backgroundColor: appConfig.theme.colors.primary["800"],
                    borderColor: appConfig.theme.colors.primary["800"],
                  }}
                >
                  <Text
                    styleSheet={{
                      textAlign: "center",
                      color: appConfig.theme.colors.primary["500"],
                    }}
                  >
                    Don't have a github account? Create now
                  </Text>
                </Box>
                <Text
                  variant="body4"
                  styleSheet={{
                    marginBottom: "22px",
                    color: appConfig.theme.colors.primary["500"],
                    backgroundColor: appConfig.theme.colors.primary["800"],
                    padding: "3px 10px",
                    borderRadius: "1000px",
                  }}
                >
                  <a href={`https://github.com/signup`} target=".blank">
                    github.com
                  </a>
                  <style jsx>{`
                    a {
                      color: ${appConfig.theme.colors.primary["500"]};
                      text-decoration: inherit;
                    }
                  `}</style>
                </Text>
              </>
            )}
            <TextField
              value={username}
              onChange={handleChange}
              label="Insert your github user"
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.primary[800],
                  mainColor: appConfig.theme.colors.primary[800],
                  mainColorHighlight: appConfig.theme.colors.primary[800],
                  backgroundColor: appConfig.theme.colors.primary[500],
                },
              }}
            />
            <Button
              type="submit"
              label="CONFIRM"
              buttonColors={{
                contrastColor: appConfig.theme.colors.primary[500],
                mainColor: appConfig.theme.colors.primary[800],
                mainColorLight: appConfig.theme.colors.primary[900],
                mainColorStrong: appConfig.theme.colors.primary[700],
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
