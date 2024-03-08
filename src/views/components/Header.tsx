import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import {
  Container,
  Box,
  Avatar,
  IconButton,
  Button,
  Typography,
  Tooltip,
} from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";

type UserProps = {
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

type HeaderProps = {
  isLoggedIn: boolean;
  userInfo?: UserProps;
  isShowMenu: boolean;
  onBtnLoginClick: React.MouseEventHandler<HTMLAnchorElement>;
} & React.HTMLAttributes<HTMLDivElement>;

function Header({ isLoggedIn, userInfo, onBtnLoginClick }: HeaderProps) {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Box>
          <GroupsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="soft"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GDSC MEET
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            {(isLoggedIn && userInfo && (
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={userInfo.firstName} src={userInfo.avatarUrl} />
                </IconButton>
              </Tooltip>
            )) || (
              <Button variant="outlined" onClick={onBtnLoginClick}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
