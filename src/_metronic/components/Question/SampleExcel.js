import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// import { Button } from "primereact/button";

export const ExportCSV = () => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = () => {
    let wb = XLSX.utils.book_new();
    let csvData = [
      {
        "id": "_id",
        "questiontype": "checkbox or mcq",
        "language": "hindi or english",
        "questionName": "question name",
        "option": "option",
        "correctanswer": "0 or 1",
        "QuestionCategory": "QuestionCategory id",
        "vehicleCategory": "vehicleCategory id",
        "vehicleSubCategory": "vehicleSubCategory id",
        // "Explaination": "Explaination",
        "image": "image url",


      },
    ];
    let ws = XLSX.utils.json_to_sheet(csvData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    let excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    let BlobUrl = new Blob([excelBuffer], { type: fileType });
    FileSaver(BlobUrl, "Sample Question Addition" + fileExtension);
  };

  return (
    <button className="btn btn-success"
      label="Sample Excel Download"
      onClick={(e) => exportToCSV()}
    >Sample Excel Download</button>
  );
};
