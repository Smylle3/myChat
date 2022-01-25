import appConfig from "../config.json";
import GlobalStyle from "../GlobalStyles";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useState } from "react";

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

  const handleChange = (event)=>{
    setUsername(event.target.value);
  };

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
            //backgroundImage:"url(https://wallpaper.dog/large/10765266.jpg)",
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
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              <a href={`https://github.com/${username}`} target=".blank">/{username}</a>
              <style jsx>{`
                a{
                  color: #aaa;
                  text-decoration: inherit;
                }
              `}</style>
            </Text>
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
