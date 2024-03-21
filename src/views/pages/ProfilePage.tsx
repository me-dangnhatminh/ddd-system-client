import {
  Box,
  Stack,
  Card,
  Typography,
  Divider,
  Grid,
  AspectRatio,
  IconButton,
  FormLabel,
  FormControl,
  Input,
  Select,
  CardOverflow,
  CardActions,
  Button,
  Option,
} from "@mui/joy";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CountrySelector from "../components/CountrySelector";

function ProfilePage() {
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
                    <img src={""} loading="lazy" alt="" />
                  </AspectRatio>
                  <IconButton
                    aria-label="upload new picture"
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
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Grid>
                <Grid flexGrow={1}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{ flexDirection: { sm: "column", md: "row" }, gap: 2 }}
                  >
                    <Input
                      size="sm"
                      placeholder="First name"
                      sx={{ flexGrow: 1 }}
                    />
                    <Input size="sm" placeholder="Last name" />
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
                    disabled={true}
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    defaultValue="gdscmeet@email.com"
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
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button loading={false} size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}

export default ProfilePage;
