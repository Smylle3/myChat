import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import Header from "../components/header";

export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: "Smylle3",
      texto: novaMensagem,
    };

    setListaDeMensagens([mensagem, ...listaDeMensagens]);
    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        backgroundColor: appConfig.theme.colors.primary["800"],
        backgroundImage: "url(https://wallpapercave.com/wp/wp2666508.jpg)",
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",

          borderRadius: "20px",
          backgroundColor: appConfig.theme.colors.primary["900"],
          boxShadow: "5px 5px 5px 1px rgb(0 0 0 / 50%)",
          width: "100%",
          height: "93vh",

          padding: "20px",
          margin: "20px",
        }}
      >
        <Header />
        <MessageList mensagens={listaDeMensagens} />
        <Box
          as="form"
          styleSheet={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            value={mensagem}
            onChange={(event) => {
              const valor = event.target.value;
              setMensagem(valor);
            }}
            onKeyPress={(event) => {
              console.log(event);
              if (event.key === "Enter" && event.shiftKey === true) {
                console.log("Shift pressionado");
              } else if (event.key === "Enter") {
                event.preventDefault();
                if (event.target.value == "") {
                  console.log("Mensagem vazia");
                  alert("Mensagem vazia");
                } else {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }
            }}
            placeholder="Type your message..."
            type="textarea"
            styleSheet={{
              width: "100%",
              resize: "none",
              border: "0",
              borderRadius: "30px",
              padding: "6px 20px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              marginRight: "12px",
              color: appConfig.theme.colors.neutrals[200],
            }}
          />
          <Button
            buttonColors={{
              contrastColor: appConfig.theme.colors.primary[400],
              mainColor: appConfig.theme.colors.primary[800],
              mainColorLight: appConfig.theme.colors.primary[900],
              mainColorStrong: appConfig.theme.colors.primary[700],
            }}
            iconName="arrowRight"
            onClick={(event2) => {
              event2.preventDefault();
              handleNovaMensagem(mensagem);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function MessageList(props) {
  //console.log(props);
  const Data = new Date().toLocaleString();

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        maxHeight: "100vh",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        border: "2px solid",
        borderColor: appConfig.theme.colors.neutrals[600],
        borderRadius: "15px",
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <>
            <Box>
              <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                  borderRadius: "15px 15px 1px 15px",
                  border: "2px solid",
                  borderColor: appConfig.theme.colors.neutrals[400],

                  padding: "7px",
                  marginBottom: "12px",
                  marginRight: "10px",
                  float: "right",

                  width: "55%",

                  wordBreak: "break-all",
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    transition: "0.5s",
                  },
                }}
              >
                <Box
                  styleSheet={{
                    marginBottom: "8px",
                  }}
                >
                  <Image
                    styleSheet={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                    src={`https://github.com/smylle3.png`}
                  />
                  <Text tag="strong">{mensagem.de}</Text>
                  <Text
                    styleSheet={{
                      fontSize: "10px",
                      marginLeft: "8px",
                      color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                  >
                    {Data}
                  </Text>
                </Box>
                {mensagem.texto}
              </Text>
            </Box>
          </>
        );
      })}
    </Box>
  );
}
