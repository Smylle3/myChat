import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import Header from "../components/header";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

const ANON_SUPABASE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5MzA1OCwiZXhwIjoxOTU4OTY5MDU4fQ.x6GhderacXKdaVQbVCsTltqs_w841gzhAgUEgu4xDtU";
const URL_SUPABASE = "https://pdyiniuqaxuezebmjini.supabase.co";
const supabaseClient = createClient(URL_SUPABASE, ANON_SUPABASE);

export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        console.log("dados da consuta: ", data);
        console.log("mensagens: ", data.at(0).created_at);
        setListaDeMensagens(data);
      });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      //created_at: ,
      remetente: "Smylle3",
      mensagens: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([mensagem])
      .then(({ data }) => {
        console.log("Mensagem enciada: ", data);
        setListaDeMensagens([data[0], ...listaDeMensagens]);
      });
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
          <Box
            styleSheet={{
              display: "flex",
              alignItems: "space-between",
              justifyContent: "center ",
              height: "47px",

              width: "100%",
              borderRadius: "30px",
              padding: "6px 6px 6px 6px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              color: appConfig.theme.colors.neutrals[200],
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
                width: "90%",
                height: "34px",
                resize: "none",
                border: "0",
                borderRadius: "30px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              buttonColors={{
                contrastColor: appConfig.theme.colors.primary[400],
                mainColor: appConfig.theme.colors.primary[800],
                mainColorLight: appConfig.theme.colors.primary[800],
                mainColorStrong: appConfig.theme.colors.primary[800],
              }}
              styleSheet={{
                borderRadius: "25px ",
              }}
              iconName="FaLevelUpAlt"
              label="Send"
              onClick={(event2) => {
                event2.preventDefault();
                handleNovaMensagem(mensagem);
              }}
            />
          </Box>
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
                    src={`https://github.com/${mensagem.remetente}.png`}
                  />
                  <Text tag="strong">{mensagem.remetente}</Text>
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
                {mensagem.mensagens}
              </Text>
            </Box>
          </>
        );
      })}
    </Box>
  );
}
