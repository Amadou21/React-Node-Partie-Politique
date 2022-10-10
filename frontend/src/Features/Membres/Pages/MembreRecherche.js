import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Autocomplete,
  TextField,
  Stack,
  Grid,
  CardHeader,
  Collapse,
} from "@mui/material";
import { Avatar, Chip } from "@mui/material";
import { usePays } from "../Services/PaysServices/pays.store";
import { useType } from "../Services/TypeServices/type.store";
import { useRegion } from "../Services/RegionServices/region.store";
import { useLocalite } from "../Services/LocaliteServices/localite.store";
import { optionsLocalite, optionsType, optionsRegion } from "./Module";
import { useBureaux } from "../Services/BureauServices/bureau.store";
import { useMembres } from "../Services/MembreServices/membre.store";

const Emplacement = ({ valueLocalite }) => {
  if (valueLocalite == null) {
    valueLocalite = {
      longitude: -8.031512796878815,
      latitude: 0,
    };
  }
  const api2 = `https://maps.google.com/maps?q=${valueLocalite.latitude},${valueLocalite.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  return (
    <Box display={"flex"} justifyContent="center" margin={5}>
      <iframe
        width="100%"
        height="500"
        id="gmap_canvas"
        src={api2}
        frameborder="0"
        zoom="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
    </Box>
  );
};

const MembreRecherche = () => {
  const { pays } = usePays();
  const { types } = useType();
  const { regions } = useRegion();
  const { localites, isLoading } = useLocalite();
  const { bureaux } = useBureaux();
  const { membres } = useMembres();

  const [valuePays, setValuePays] = React.useState(null); //pays
  const [valueType, setValueType] = React.useState(null); //types
  const [valueRegion, setValueRegion] = React.useState(regions); //null
  const [valueLocalite, setValueLocalite] = React.useState(localites); //null
  const [valueBureau, setValueBureau] = React.useState(null);
  const [valueMembre, setValueMembre] = React.useState(null);

  const [openCollapse, setOpenCollapse] = React.useState(false);
  //------------------------------------------------------------
  const [bureauEmplacement, setBureauEmplacement] = React.useState(null);
  // ----------------------------------------------------------------
  // les useEffects
  useEffect(() => {
    if (valuePays != null && valueType != null) {
      if (valueType?.libelleType === "Regional") {
        const regionTrouver = regions.filter(
          (region) => region.idPays === valuePays.idPays
        );
        setValueRegion(regionTrouver);
      } else {
        setValueBureau(
          bureaux.find((bureau) => bureau.idPays === valuePays.idPays)
        );
        if (valueBureau == null) {
          alert("aucun bureau existant");
          alert("Modifier vos parametre de recherche");
          return;
        }
        const bureauSelect = bureaux.find(
          (bureau) => bureau.idPays === valuePays.idPays
        );
        const localiteSelect = localites.find(
          (localite) => localite.idLocalite === bureauSelect.idLocalite
        );
        const regionSelect = regions.find(
          (region) => region.idRegion === localiteSelect.idRegion
        );

        setValueLocalite([localiteSelect]);
        setValueRegion([regionSelect]);
      }
    }
  }, [valuePays, valueType]);
  //----------------------------------------------------------------
  useEffect(() => {
    if (valueBureau != null) {
      setValueMembre(
        membres.filter((membre) => membre.idBureau === valueBureau.idBureau)
      );
      // console.log("value membre " + valueMembre);
    }
  }, [valueBureau]);

  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\
  const handleValuePays = (event, newValue) => {
    setValuePays(pays.find(({ idPays }) => idPays === newValue.idPays));
    // console.log(valuePays);
  };
  //----------------------------------------------------------------
  const handleAutoCompleteLocalite = (event, newValue) => {
    const localiteTrouver = localites.filter(
      (localite) => localite.idRegion === newValue.idRegion
    );
    setValueLocalite(
      localites.filter((localite) => localite.idRegion === newValue.idRegion)
    );
    if (valueType != null && valueType.libelleType === "National") {
      // setValueLocalite(valueLocalite);
      return valueLocalite;
    }
    return localiteTrouver;
  };
  //----------------------------------------------------------------
  const handleBureau = (event, newValue) => {
    setOpenCollapse(true);
    const bureauSelect = bureaux.find(
      (bureau) => bureau.idLocalite === newValue.idLocalite
    );
    setBureauEmplacement(newValue);
    return bureauSelect;
  };
  //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\

  const toBase64 = (arr) => {
    arr = new Uint8Array(arr); // if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  //----------------------------------------------------------------
  const options = (param) =>
    param.map((option) => {
      const firstLetter = option.libellePays[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    });
  //------------------------------  ------------------------------

  return (
    // <AppLayout>
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-pays"
                options={options(pays).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libellePays}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ minWidth: 300 }}
                onChange={(event, newValue) => handleValuePays(event, newValue)}
                renderInput={(params) => <TextField {...params} label="Pays" />}
              />
            </Grid>

            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-types"
                options={optionsType(types).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libelleType}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ minWidth: 300 }}
                onChange={(event, newValue) => {
                  //----------------------------------------------------------------
                  setValueType(newValue);
                  //----------------------------------------------------------------
                }}
                renderInput={(params) => (
                  <TextField {...params} label="types de Bureau" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-regions"
                options={optionsRegion(valueRegion).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libelleRegion}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ minWidth: 300 }}
                //----------------------------------------------------------------
                onChange={(event, newValue) => {
                  setValueLocalite(handleAutoCompleteLocalite(event, newValue));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Region du bureau" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              {!isLoading && (
                <Autocomplete
                  id="grouped-localites"
                  //je veux une valeur par default
                  // value={valueLocalite[0]?.libelleLocalite}
                  options={optionsLocalite(valueLocalite).sort(
                    (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                  )}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.libelleLocalite}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ minWidth: 300 }}
                  //----------------------------------------------------------------
                  onChange={(event, newValue) => {
                    setValueBureau(handleBureau(event, newValue));
                  }}
                  //----------------------------------------------------------------
                  renderInput={(params) => (
                    <TextField {...params} label="Les differentes localitée" />
                  )}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Collapse in={openCollapse}>
        <Card sx={{ minWidth: 345, mt: 3 }}>
          <CardContent sx={{ dispay: "flex" }}>
            <Box>
              <CardMedia
                component="img"
                alt="Photo du bureau"
                // src={`data:image/png;base64,${toBase64(
                //   valueBureau?.photoBureau.data
                // )}`} //url
                image={`data:image/png;base64,${toBase64(
                  valueBureau?.photoBureau.data
                )}`}
                // j'ai beau cherché j'ai pas trouvé de difference entre src et image
                // ça marche avec image et src même si tu mets les 2 ça marche
              />
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  {valueBureau?.libelleBureau} : Bureau de Bougounie
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {valueBureau?.description} : Lizards are a widespread group of
                  squamate reptiles, with over 6,000 species, ranging across all
                  continents except Antarctica
                </Typography>
              </Box>
            </Box>
            <Card elevation={4} sx={{ padding: 3, marginTop: 5 }}>
              <Stack>
                <Typography gutterBottom variant="h5" component="div">
                  Liste des membres
                </Typography>
                <TextField
                  label="Rechercher"
                  sx={{ minWidth: 300, maxWidth: 500, alignSelf: "center" }}
                />
              </Stack>
              <CardContent>
                <Grid container spacing={3}>
                  {valueMembre?.map((membre) => (
                    <Grid
                      key={membre.idMembre}
                      item
                      xs={12}
                      md={4}
                      sm={6}
                      lg={4}
                      xl={3}
                    >
                      <Card>
                        <CardHeader
                          title={membre.prenom + " " + membre.nom}
                          // subheader="amadou@gmail.com"
                          avatar={
                            <Avatar>
                              <img
                                style={{
                                  width: "auto",
                                  height: "auto",
                                  minHeight: "85%",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                }}
                                src={`data:image/png;base64,${toBase64(
                                  membre?.photoMembre.data
                                )}`}
                              />
                            </Avatar>
                          }
                        />
                        <CardContent>
                          <Box sx={{ display: "flex" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                              Poste:{" " + membre.libellePoste}
                            </Typography>
                          </Box>
                          <Stack
                            sx={{
                              alignItems: "end",
                            }}
                          >
                            <Chip
                              sx={{
                                mt: 2,
                              }}
                              label="voir plus"
                            />
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </CardContent>
          {/* ---------------------------------------------------------------- */}
          {bureauEmplacement && (
            <Emplacement valueLocalite={bureauEmplacement} />
          )}
          {/* ---------------------------------------------------------------- */}
        </Card>
      </Collapse>
    </Box>
    // </AppLayout>
  );
};

export default MembreRecherche;
