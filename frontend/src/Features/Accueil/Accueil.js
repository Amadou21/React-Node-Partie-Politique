import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppLayout from "../Layout/AppLayout";

const Accueil = () => {
  const images = [
    {
      libelle: "",
      srcImg: "../../../../public/Resources/image_1",
    },
    {
      libelle: "",
      srcImg: "../../../../public/Resources/image_2",
    },
    {
      libelle: "",
      srcImg: "../../../../public/Resources/image_3",
    },
  ];
  const grandlignes = [
    {
      titre: "vie du Loga",
      sousTitre: "Entreprise",
      contenuSousTitre: "Un nouveau pateriat avec Orange",
    },
    {
      titre: "international-Afrique",
      sousTitre: "Afrique",
      contenuSousTitre: "preogramme de reforme pour un Afrique uni",
    },
    {
      titre: "national-Mali",
      sousTitre: "Renforcement",
      contenuSousTitre: "Achat de nouveau equipement",
    },
    {
      titre: "vie du Loga",
      sousTitre: "Séminaire",
      contenuSousTitre:
        "une nouvelle rencontre pour un nouveau séminaire se tiendra bientôt",
    },
  ];
  return (
    <AppLayout>
      <div>
        <h1>Accueil</h1>
        <Card>
          <Grid>
            <Card>
              {images.map((image, i) => (
                <CardContent
                // sx={{
                //   backgroundImage: URL(image.srcImg),
                //   // <img src={image.srcImg}></img>
                // }}
                >
                  <Typography>
                    {image.libelle}frontend\public\Resources\image_1.jpg
                  </Typography>
                </CardContent>
              ))}
            </Card>
          </Grid>
          <CardContent>
            <Grid container>
              {grandlignes?.map((grandligne) => (
                <Grid
                  key={grandligne.contenuSousTitre}
                  item
                  xs={12}
                  md={4}
                  sm={6}
                  lg={4}
                  xl={3}
                >
                  <Card>
                    <CardHeader title={<Box>{grandligne.titre}</Box>} />
                    <CardContent>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {grandligne.sousTitre}:{grandligne.contenuSousTitre}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Accueil;
