import { useMemo, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CountrySelector from "./CountrySelector";
import { Grid } from "@mui/joy";

export interface IUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface ISubmitData {
  email?: string;
  firstName?: string;
  lastName?: string;
  rawAvatar?: File;
}

export interface IProfileFormProps {
  userInfo: IUserInfo;
  isSaving?: boolean;
  onSaveSubmit?: (data: ISubmitData) => void;
}

function ProfileForm({ userInfo, onSaveSubmit, isSaving }: IProfileFormProps) {
  const [email] = useState<string>(userInfo.email);
  const [firstName, setFirstName] = useState<string>(userInfo.firstName);
  const [lastName, setLastName] = useState<string>(userInfo.lastName);
  const [avatarUrl, setAvatarUrl] = useState<string>(userInfo.avatarUrl);

  const [rawAvatar, setRawAvatar] = useState<File>();

  const canSave = useMemo(() => {
    return (
      email !== userInfo?.email ||
      firstName !== userInfo?.firstName ||
      lastName !== userInfo?.lastName ||
      rawAvatar !== undefined
    );
  }, [userInfo, email, firstName, lastName, rawAvatar]);
  const canCancel = useMemo(() => canSave, [canSave]);

  const handleOnBtnSaveClick = () => {
    if (!canSave || !onSaveSubmit) return;

    const data: ISubmitData = {};
    if (email !== userInfo?.email) data.email = email;
    if (firstName !== userInfo?.firstName) data.firstName = firstName;
    if (lastName !== userInfo?.lastName) data.lastName = lastName;
    if (rawAvatar) data.rawAvatar = rawAvatar;

    onSaveSubmit(data);
  };

  const handleOnBtnCancelClick = () => {
    if (!canCancel) return;
    setFirstName(userInfo?.firstName);
    setLastName(userInfo?.lastName);
    setAvatarUrl(userInfo?.avatarUrl);
    setRawAvatar(undefined);
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     setFirstName(userInfo.firstName);
  //     setLastName(userInfo.lastName);
  //     setAvatarUrl(userInfo.avatarUrl);
  //     setRawAvatar(undefined);
  //   }
  // }, [userInfo]);

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />

          <Grid container spacing={2}>
            <Grid xs={12}>
              <Grid container xs={12} spacing={2}>
                <Grid position="relative">
                  <AspectRatio
                    ratio="1"
                    maxHeight={200}
                    sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
                  >
                    <img src={avatarUrl} loading="lazy" alt={email} />
                  </AspectRatio>
                  <IconButton
                    aria-label="upload new picture"
                    disabled={false}
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    sx={{
                      bgcolor: "background.body",
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: 10,
                      bottom: 10,
                      boxShadow: "sm",
                    }}
                    onClick={() => {
                      const fileInput = document.createElement("input");
                      fileInput.type = "file";
                      fileInput.onchange = () => {
                        const file = fileInput.files
                          ? fileInput?.files[0]
                          : null;
                        if (file) {
                          setRawAvatar(file);
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            setAvatarUrl(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      };
                      fileInput.click();
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Grid>
                <Grid>
                  <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input
                      size="sm"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      size="sm"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12}>
              <Stack
                sx={{ flexDirection: { sm: "column", md: "row" }, gap: 2 }}
              >
                <FormControl sx={{ width: 1 }}>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" defaultValue="UI Developer" />
                </FormControl>
                <FormControl sx={{ width: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    value={email}
                    disabled={true}
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                  />
                </FormControl>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <CountrySelector />
            </Grid>
            <Grid xs={12}>
              <Stack>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    size="sm"
                    startDecorator={<AccessTimeFilledRoundedIcon />}
                    defaultValue="1"
                  >
                    <Option value="1">
                      Indochina Time (Bangkok){" "}
                      <Typography textColor="text.tertiary" ml={0.5}>
                        — GMT+07:00
                      </Typography>
                    </Option>
                    <Option value="2">
                      Indochina Time (Ho Chi Minh City){" "}
                      <Typography textColor="text.tertiary" ml={0.5}>
                        — GMT+07:00
                      </Typography>
                    </Option>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                disabled={!canCancel}
                loading={isSaving}
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={handleOnBtnCancelClick}
              >
                Cancel
              </Button>
              <Button
                disabled={!canSave}
                loading={isSaving}
                size="sm"
                variant="solid"
                onClick={handleOnBtnSaveClick}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}

export default ProfileForm;
