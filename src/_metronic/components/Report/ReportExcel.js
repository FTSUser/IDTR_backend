import React, { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useEffect } from "react";
import { ApiGet } from "../../../helpers/API/ApiData";
import { array } from "prop-types";
import moment from 'moment';
import { toast } from "react-toastify";
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
    const onVehicleCategoryModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                CreatedAt: moment(registerUser?.createdAt).format("ll"),
                CreatedBy: registerUser?.createdBy,
                VehicleCategory: registerUser?.vehicleCategory,
                VehicleCategoryID: registerUser?._id,
                Description: registerUser?.description,
                IsActive: registerUser?.isActive,
                UpdatedAt: moment(registerUser?.updatedAt).format("ll"),
                UpdatedBy: registerUser?.updatedBy,
            };
            modifyData.push(data);
        });
        return modifyData;
    }
    const onCourseTypeModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                CreatedAt: moment(registerUser?.createdAt).format("ll"),
                CreatedBy: registerUser?.createdBy,
                CourseType: registerUser?.courseType,
                CourseTypeId: registerUser?._id,
                Description: registerUser?.description,
                IsActive: registerUser?.isActive,
                UpdatedAt: moment(registerUser?.updatedAt).format("ll"),
                UpdatedBy: registerUser?.updatedBy,
                CreatedAtVC: moment(registerUser?.vcid?.createdAt).format("ll"),
                CreatedByVC: registerUser?.vcid?.createdBy,
                VehicleCategory: registerUser?.vcid?.vehicleCategory,
                VehicleCategoryId: registerUser?.vcid?._id,
                DescriptionVC: registerUser?.vcid?.description,
                IsActiveVC: registerUser?.vcid?.isActive,
                UpdatedAtVC: moment(registerUser?.vcid?.updatedAt).format("ll"),
                UpdatedByVC: registerUser?.vcid?.updatedBy,
            };
            modifyData.push(data);
        });
        return modifyData;
    }
    const onCourseCategoryModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                CourseCategory: registerUser?.courseCategory,
                CourseCategoryId: registerUser?._id,
                CourseType: registerUser?.ctid?.courseType,
                CourseTypeId: registerUser?.ctid?._id,
                VehicleCategory: registerUser?.vcid?.vehicleCategory,
                VehicleCategoryId: registerUser?.vcid?._id,
                Description: registerUser?.description,
                CreatedAt: moment(registerUser?.createdAt).format("ll"),
                CreatedBy: registerUser?.createdBy,
                UpdatedAt: moment(registerUser?.updatedAt).format("ll"),
                UpdatedBy: registerUser?.updatedBy,
            };
            modifyData.push(data);
        });
        return modifyData;
    }
    const onCourseNameModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                CreatedAt: moment(registerUser?.createdAt).format("ll"),
                CreatedBy: registerUser?.createdBy,
                SystemRequirement: registerUser?.systemRequirement,
                Price: registerUser?.price,
                Mode: registerUser?.mode,
                Duration: registerUser?.duration,
                Timing: registerUser?.timing,
                Certificate: registerUser?.certificate,
                Validity: registerUser?.validity,
                DocumentRequired: registerUser?.documentRequired,
                CourseName: registerUser?.courseName,
                CourseNameId: registerUser?._id,
                Description: registerUser?.description,
                IsActive: registerUser?.isActive,
                UpdatedAt: moment(registerUser?.updatedAt).format("ll"),
                UpdatedBy: registerUser?.updatedBy,
                CreatedAtVC: moment(registerUser?.vcid?.createdAt).format("ll"),
                CreatedByVC: registerUser?.vcid?.createdBy,
                VehicleCategory: registerUser?.vcid?.vehicleCategory,
                VehicleCategoryId: registerUser?.vcid?._id,
                DescriptionVC: registerUser?.vcid?.description,
                IsActiveVC: registerUser?.vcid?.isActive,
                UpdatedAtVC: moment(registerUser?.vcid?.updatedAt).format("ll"),
                UpdatedByVC: registerUser?.vcid?.updatedBy,
                CreatedAtCT: moment(registerUser?.ctid?.createdAt).format("ll"),
                CreatedByCT: registerUser?.ctid?.createdBy,
                CourseType: registerUser?.ctid?.courseType,
                CourseTypeId: registerUser?.ctid?._id,
                DescriptionCT: registerUser?.ctid?.description,
                IsActiveCT: registerUser?.ctid?.isActive,
                UpdatedAtCT: moment(registerUser?.ctid?.updatedAt).format("ll"),
            };
            modifyData.push(data);
        });
        return modifyData;
    }
    const onPaymentModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                certificate: registerUser?.cnid?.certificate,
                courseName: registerUser?.cnid?.courseName,
                createdAt: moment(registerUser?.cnid?.createdAt).format("ll"),
                createdBy: registerUser?.cnid?.createdBy,
                description: registerUser?.cnid?.description,
                documentRequired: registerUser?.cnid?.documentRequired,
                duration: registerUser?.cnid?.duration,
                isActive: registerUser?.cnid?.isActive,
                mode: registerUser?.cnid?.mode,
                price: registerUser?.cnid?.price,
                systemRequirement: registerUser?.cnid?.systemRequirement,
                timing: registerUser?.cnid?.timing,
                updatedBy: registerUser?.cnid?.updatedBy,
                validity: registerUser?.cnid?.validity,
                created: moment(registerUser?.cnid?.created).format("ll"),
                courseType: registerUser?.ctid?.courseType,
                createdAtCT: moment(registerUser?.ctid?.createdAtCT).format("ll"),
                createdByCT: registerUser?.ctid?.createdBy,
                descriptionCT: registerUser?.ctid?.description,
                isActiveCT: registerUser?.ctid?.isActive,
                updatedAtCT: moment(registerUser?.ctid?.updatedAt).format("ll"),
                updatedByCT: registerUser?.ctid?.updatedBy,
                priceCT: registerUser?.ctid?.price,
                createdAtTD: moment(registerUser?.tdid?.createdAt).format("ll"),
                createdByTD: registerUser?.tdid?.createdBy,
                dateTD: registerUser?.tdid?.date,
                endTimeTD: moment(registerUser?.tdid?.endTime).format("LT"),
                seat: registerUser?.tdid?.seat,
                startTimeTD: moment(registerUser?.tdid?.startTime).format("LT"),
                updatedAtTD: moment(registerUser?.tdid?.updatedAt).format("ll"),
                updatedByTD: registerUser?.tdid?.updatedBy,
                IDTRcenter: registerUser?.uid?.IDTRcenter,
                email: registerUser?.uid?.email,
                modificationData: moment(registerUser?.uid?.modificationData).format(
                  "ll"
                ),
                phone: registerUser?.uid?.phone,
                registrationDate: moment(registerUser?.tdid?.registrationDate).format(
                  "ll"
                ),
                state: registerUser?.uid?.state,
                modificationDate: moment(
                  registerUser?.tdid?.status?.modificationDate
                ).format("ll"),
                name: registerUser?.tdid?.status?.name,
                createdAtVC: moment(registerUser?.vcid?.createdAt).format("ll"),
                createdByVC: registerUser?.vcid?.createdBy,
                descriptionVC: registerUser?.vcid?.description,
                isActiveVC: registerUser?.vcid?.isActive,
                vehicleCategory: registerUser?.vcid?.vehicleCategory,
            };
            modifyData.push(data);
        });
        return modifyData;
    }
    const onQuestionCategoryModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                QuestionCategoryName: registerUser?.name,
                QuestionCategoryNameId: registerUser?._id,
                CreatedAt: moment(registerUser?.createdAt).format("ll"),
            };
            modifyData.push(data);
        });
        return modifyData;
    }
    const onQuestionsModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                CreatedAt: moment(registerUser?.createdAt).format("ll"),
                QuestionName: registerUser?.Qname,
                language: registerUser?.language,
                type: registerUser?.type,
                weight: registerUser?.weight,
                Category: registerUser?.Category,
                image: registerUser?.image,
            };
            modifyData.push(data);
        });
        return modifyData;
    }
    const onFeedbackModifyData = async (array) => {
        let modifyData = [];
        array.map((registerUser, key) => {
            let data = {
                Number: key + 1,
                createdAt: moment(registerUser?.createdAt).format("ll"),
                createdBy: registerUser?.createdBy,
                description:
                  registerUser?.description === ""
                    ? "No data"
                    : registerUser?.description,
                email: registerUser?.email === "" ? "No data" : registerUser?.email,
                feedbackCategory: registerUser?.feedbackCategory,
                name: registerUser?.name,
                phone: registerUser?.phone,
                rating: registerUser?.rating,
                updatedAt: moment(registerUser?.updatedAt).format("ll"),
                updatedBy: registerUser?.updatedBy,
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
                if (type?.name === 'Vehicle Category') {
                    csvData = await onVehicleCategoryModifyData(data?.data?.payload?.Question);
                }
                if (type?.name === 'Course Type') {
                    csvData = await onCourseTypeModifyData(data?.data?.payload?.Question);
                }
                if (type?.name === 'Course Category') {
                    csvData = await onCourseCategoryModifyData(data?.data?.payload?.Question);
                }
                if (type?.name === 'Course Name') {
                    csvData = await onCourseNameModifyData(data?.data?.payload?.Question);
                }
                if (type?.name === 'Payment') {
                    csvData = await onPaymentModifyData(data?.data?.payload?.Question);
                }
                if (type?.name === 'Question Category') {
                    csvData = await onQuestionCategoryModifyData(data?.data?.payload?.Menu);
                }
                if (type?.name === 'Question') {
                    csvData = await onQuestionsModifyData(data?.data?.payload?.Question);
                }
                if (type?.name === 'Feedback') {
                    csvData = await onFeedbackModifyData(data?.data?.payload?.Question);
                }

                let ws = XLSX.utils.json_to_sheet(csvData);
                XLSX.utils.book_append_sheet(wb, ws, "Data");
                let excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
                let BlobUrl = new Blob([excelBuffer], { type: fileType });
                FileSaver(BlobUrl, Date.now() + fileExtension);
            } else {
                toast(data?.data?.message)
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

