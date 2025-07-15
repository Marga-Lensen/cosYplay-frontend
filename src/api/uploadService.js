// projects/_tools/fileUpload-fullstack-pirates-public/fileUpload-frontend/src/api/uploadService.js
// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYplay-aka-cosYspace-auth/_cosYplay-fullstack-SPA/auth-frontend/src/api/uploadService.js

import axiosInstance from "../axiosInstance.js"

 // 🟡 Upload- und Get-Funktion aus uploadService.js:
  export const uploadFile = async (formData) => {
    /*   const formData = new FormData();
  formData.append('file', file); */

/*     // const response = await fetch("http://localhost:4000/api/upload/upload", {
      method: "POST",
      body: formData,
    }); */
    // Upload-Datei mit FormData (Axios erwartet `data` statt `body`)

  try {
    const response = await axiosInstance.post("/upload/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload started:", formData);
    console.log("Upload response:", response.data);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Serverfehler beim Upload");
  }
};


// Dateien abrufen
export const getFiles = async () => {
  try {
    const response = await axiosInstance.get("/upload/files");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Fehler beim Abrufen der Dateien");
  }
};