import React, { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useEffect } from "react";
import { ApiGet } from "../../../helpers/API/ApiData";
import { array } from "prop-types";
import moment from 'moment';
// import { Button } from "primereact/button";

export const ReportExcel = (props) => {
    const [type, setType] = useState(props?.type);
    const [date, setDate] = useState(props?.date);
    useEffect(() => {
        setType(props?.type);
    }, [props?.type])

    useEffect(() => {
        setDate(props?.date);
    }, [props?.date])

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const onQuestionModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                courseName: registerUser?.courseName[0]?.courseName,
                courseType: registerUser?.courseType[0]?.courseType,
                vehicleCategory: registerUser?.vehicleCategory[0]?.vehicleCategory,
                createdBy: registerUser?.cnid?.createdBy,
                seat: registerUser?.seat,
                startTime: moment(registerUser?.startTime).format("LT"),
                endTime: moment(registerUser?.endTime).format("LT"),
                createdAt: moment(registerUser?.date).format("ll"),
            };
            modifyData.push(data);
        });
        return modifyData;
    }
    const onUserModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                UserID: registerUser?._id,
                RegistrationTypes: registerUser?.Registrationtype,
                FirstName: registerUser?.fname,
                MiddleName: registerUser?.mname ? registerUser?.mname : "-",
                LastName: registerUser?.lname ? registerUser?.lname : "-",
                EmailAddress: registerUser?.email ? registerUser?.email : "-",
                MobileNumber: registerUser?.phone,
               
                FatherName: registerUser?.fatherName ? registerUser?.fatherName : "-",
                DateOfBirth: moment(registerUser?.DoB).format("ll"),
                Qualification: registerUser?.qualification,
                Gender: registerUser?.gender,
                AddressLine: registerUser?.address,
                State: registerUser?.state,
                District: registerUser?.district,
                TownORCity: registerUser?.city,
                PIN: registerUser?.pincode,
                SelectIDTRCentre: registerUser?.IDTRcenter
                  ? registerUser?.IDTRcenter
                  : "-",
                CourseType: registerUser?.ctid?.courseType,
                VehicleCategory: registerUser?.vcid?.vehicleCategory,
                CourseName: registerUser?.cnid?.courseName,
                DateOfCourse: moment(registerUser?.dateofCourse).format("ll"),
                LicenseCategory: registerUser?.lcid,
                DrivingLicence: registerUser?.drivingLicense,
                IssueDate: registerUser?.issueDate
                  ? moment(registerUser?.issueDate).format("ll")
                  : "-",
                ValidTill: registerUser?.validTill
                  ? moment(registerUser?.validTill).format("ll")
                  : "-",
                LicenseAuthorityState: registerUser?.Authority,
                LicenseAuthorityCity: registerUser?.authoritycity,
                LicenseAuthorityDistrict: registerUser?.authoritydistrict,
                PassportPhoto: registerUser?.passportPhoto,
                DrivingLicenseImage: registerUser?.drivingLicense,
                OtherIDProofDownload:
                  registerUser?.IDproof === null ? "-" : registerUser?.IDproof,
                VisionInformation:
                  registerUser?.medicalCertificate === null
                    ? "-"
                    : registerUser?.medicalCertificate,
                ColorBlindness:
                  registerUser?.medicalCertificate === null
                    ? "-"
                    : registerUser?.medicalCertificate,
                BloodGroup:
                  registerUser?.bloodGroup === "" || registerUser?.bloodGroup === null
                    ? "-"
                    : registerUser?.bloodGroup,
                IsPaymentDone:
                  registerUser?.isPaymentDone === null ||
                    registerUser?.isPaymentDone === false
                    ? "Payment Panding"
                    : registerUser?.isPaymentDone,
                PaymentMode: registerUser?.type,
                TransactionID:
                  registerUser?.paymentId === null
                    ? "Payment Panding"
                    : registerUser?.paymentId,
                RegisterationDate: registerUser?.createdAt,
              };
            modifyData.push(data);
        });
        return modifyData;
    }

    const exportToCSV = async () => {
        if (type?.endPoint) {
            let API = type?.endPoint;
           
            if (date && date?.length && date?.length === 2 && date[0] && date[1]) {
               
                let startDate = moment(date[0]).format("YYYY-MM-DD");
                let endDate = moment(date[1]).format("YYYY-MM-DD");
                API = `${type?.endPoint}?sd=${startDate}&ed=${endDate}`
            }
            let data = await ApiGet(API)
            if (data?.data?.result === 0) {
                let wb = XLSX.utils.book_new();
                let csvData = [];
                if (type?.name === 'Timeslot') {
                    csvData = await onQuestionModifyData(data?.data?.payload?.Question);
                }
                if (type?.name === 'User') {
                    csvData = await onUserModifyData(data?.data?.payload?.Question);
                }

                let ws = XLSX.utils.json_to_sheet(csvData);
                XLSX.utils.book_append_sheet(wb, ws, "Data");
                let excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                let BlobUrl = new Blob([excelBuffer], { type: fileType });
                FileSaver(BlobUrl, Date.now() + fileExtension);
            } else {
                alert(data?.data?.message)
            }
        }
    };

    return (
        <button className="btn btn-success"
            label="Sample Excel Download"
            onClick={(e) => exportToCSV()}
        >Export to Excel</button>
    );
};

