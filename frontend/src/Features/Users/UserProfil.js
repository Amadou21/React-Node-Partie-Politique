import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Share } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserProfil = () => {
  const navigate = useNavigate();
  const users = ["Nom", "Prenom", "Adresse"];
  return (
    <Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Card display="flex">
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Avatar
                src={"https://i.pravatar.cc/300"}
                sx={{
                  height: "50%",
                  width: "50%",
                  alignSelf: "center",
                }}
              />

              {/* <CardHeader /> */}
            </Stack>
            <TableContainer sx={{ mt: 3 }}>
              <Table>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user}>
                      <TableCell>
                        <Typography variant="h6">{user}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box px={2} pb={2} mt={2} textAlign="end">
              <IconButton title="Partager">
                <Share />
              </IconButton>
              <IconButton
                title="Modifier"
                onClick={() => navigate("/userDetail/1")}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default UserProfil;
