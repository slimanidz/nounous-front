export const formatLongDateTime = new Intl.DateTimeFormat(
  typeof navigator !== "undefined" ? navigator.languages : "en",
  {
    dateStyle: "medium", // full : pour afficher je jour
    timeStyle: "medium",
  }
).format
