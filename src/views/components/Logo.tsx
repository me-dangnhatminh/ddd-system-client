import { Typography } from "@mui/joy";

type LogoProps = {
  logotTitle: string;
  logoElement: React.ReactElement;
  href: string;
};

export const Logo = ({ logotTitle, logoElement, href }: LogoProps) => (
  <>
    {logoElement}
    <Typography
      href={href}
      noWrap
      component="a"
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        flexDirection: "row",
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".1rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      {logotTitle}
    </Typography>
  </>
);

