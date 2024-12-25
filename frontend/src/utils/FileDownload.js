import Axios from "axios";
import { ACCESS_TOKEN } from "./constant";
import FileDownload from "js-file-download";
import { getMimeTypeFromUrl } from "./commonFunctions";

export default async function DownloadFile(fileUrl, fileName) {
  let fileType = await getMimeTypeFromUrl(fileUrl);
  let finalName = fileName + "." + fileType;
  Axios({
    url: fileUrl,
    method: "GET",
    responseType: "blob",
    // headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  }).then((res) => {
    FileDownload(res.data, finalName);
  });
  // let element = document.createElement("a");
  // element.setAttribute("download", fileName);
  // element.href = fileUrl;
  // element.style.display = "none";
  // document.body.appendChild(element);
  // element.click();
  // element.remove();
}
