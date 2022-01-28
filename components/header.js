import { Box, Button } from "@skynexui/components";
import appConfig from "../config.json";

export default function Header(props) {
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: "10px",

          width: "100%",
        }}
      >
        <Button
          href="/"
          iconName="arrowLeft"
          buttonColors={{
            contrastColor: appConfig.theme.colors.primary[400],
            mainColor: appConfig.theme.colors.primary[800],
            mainColorLight: appConfig.theme.colors.primary[900],
            mainColorStrong: appConfig.theme.colors.primary[700],
          }}
        />
        <Button
          href="https://github.com/Smylle3/myChat"
          label="myChat"
          iconName="github"
          buttonColors={{
            contrastColor: appConfig.theme.colors.primary[500],
            mainColor: appConfig.theme.colors.primary[800],
            mainColorLight: appConfig.theme.colors.primary[900],
            mainColorStrong: appConfig.theme.colors.primary[700],
          }}
        />
      </Box>
    </>
  );
}
