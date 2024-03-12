import React from "react";
import {
  Box,
  Avatar,
  IconButton,
  Button,
  Typography,
  MenuItem,
  Menu,
  Dropdown,
  MenuButton,
} from "@mui/joy";
import GroupsIcon from "@mui/icons-material/Groups";

type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
};

type HeaderProps = {
  isLoggedIn: boolean;
  userInfo?: UserProps;
  isShowMenu: boolean;
  onBtnSignInClick: React.MouseEventHandler<HTMLAnchorElement>;
} & React.HTMLAttributes<HTMLDivElement>;

function Header({ isLoggedIn, userInfo, onBtnSignInClick }: HeaderProps) {
  return (
    <Box
      mx="auto"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        top: 0,
        px: 1.5,
        py: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton size="sm" variant="soft">
          <GroupsIcon />
        </IconButton>
        <Typography component="h1" fontWeight="xl">
          TASK CAFE
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        {!isLoggedIn ? (
          <Button variant="outlined" onClick={onBtnSignInClick}>
            Sign In
          </Button>
        ) : (
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: "plain", color: "neutral" } }}
              sx={{
                borderRadius: 40,
                gap: 1,
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
              }}
            >
              <Avatar
                variant="outlined"
                size="sm"
                src={userInfo?.avatarUrl ?? ""}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography level="title-sm">
                  {`${userInfo?.firstName} ${userInfo?.lastName}`.trim()}
                </Typography>
                <Typography level="body-xs">{userInfo?.email}</Typography>
              </Box>
            </MenuButton>
            <Menu>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Dropdown>
        )}
      </Box>
    </Box>
  );
}

export default Header;
