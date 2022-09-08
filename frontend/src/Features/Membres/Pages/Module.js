export const optionsType = (param) =>
  param.map((option) => {
    const firstLetter = option.libelleType[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

export const optionsRegion = (param) =>
  param.map((option) => {
    const firstLetter = option.libelleRegion[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

export const optionsLocalite = (param) =>
  param.map((option) => {
    const firstLetter = option.libelleLocalite[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
