else {
                    // const { type } = useTypeById(valueType.idType);//valueType.idType ===1 <=>'National'
                    setValueBureau(
                      bureaux.find(
                        (bureau) => bureau.idType == valueType.idType
                      )
                    );
                    console.log("bureaux id", bureaux[0].idType);
                    console.log("valueType id", valueType.idType);
                    // setValueBureau(
                    //   bureaux.find(
                    //     (bureau) => bureau.idType === valueType.idType
                    //   )
                    // );

                    setValueLocalite(
                      localites.find(
                        (localite) =>
                          localite.idLocalite === valueBureau.idLocalite
                      )
                    );

                    setValueRegion(
                      regions.find(
                        (region) => region.idRegion === valueLocalite.idRegion
                      )
                    );
                  }