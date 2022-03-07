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
        "date": "start date ex:04/05/2022",
        "endDate": "end date ex:04/05/2022",
        "vcid": "Vechical Category id",
        "ctid": "course type id",
        "ccid": "course category id",
        "cnid": "course name id",
        "startTime": "12:00:00 ",
        "endTime": "24:00:00 ",
        "seat":"seat",
        
       
      },
    ];
    let ws = XLSX.utils.json_to_sheet(csvData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    let excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    let BlobUrl = new Blob([excelBuffer], { type: fileType });
    FileSaver(BlobUrl, "Sample Timeslot Addition"+ fileExtension);
  };

  return (
    <button className="btn btn-success "
      label="Sample Excel Download"
      onClick={(e) => exportToCSV()}
    >Sample Excel Download</button>
  );
};
