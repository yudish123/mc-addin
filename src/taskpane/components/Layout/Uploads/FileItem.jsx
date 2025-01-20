import React, { useId } from "react";
import { deleteFileApi } from "../../../api/upload-pdf";
import { Image, Text, Spinner, useToastController, Button, Checkbox, mergeClasses } from "@fluentui/react-components";

import { useUploadStyles } from "../../../hooks/styles/upload/useUploadpagestyles";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";
import { Colors } from "../../../utils/constants";
import { useAuthContext } from "../../../context/Authcontext/selectors";
import { failureToast } from "../../../utils/Helpers/toast";

const FileItem = ({ file, isFolder, cb }) => {
  console.log(file);
  const pageStyles = useUploadStyles();
  const globalStyles = useGlobalstyles();
  const userState = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const deleteFile = async (e) => {
    console.log(e);
    setLoading(true);
    try {
      const res = await deleteFileApi(file?.file_name, file?.id, userState.user.user_id, userState.token);
      if (res.success) {
        await cb();
        setLoading(false);
        return;
      }
      failureToast("File deletion failed", dispatchToast);
    } catch (error) {
      console.log(error);
      failureToast("File deletion failed");
    }
    setLoading(false);
  };

  return (
    <>
      <div className={mergeClasses(pageStyles.fileBox)}>
        <div id="file-checkbox" className={pageStyles.fileInfoContainer}>
          <Checkbox style={isFolder ? { visibility: "hidden" } : {}} className={pageStyles.checkbox} size="medium" />
          <Image
            // className={mergeClasses(isFolder && globalStyles.marginLeftSmall)}
            width={18}
            height={18}
            src={`../../../assets/pdf.svg`}
            alt={file?.fileType}
          />
          <div className={pageStyles.fileInfo}>
            <Text
              style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "120px" }}
              className={mergeClasses(globalStyles.h4, globalStyles.fontWeight400)}
            >
              {file.file_name}
            </Text>
          </div>
        </div>
      </div>
      {loading || file.isLoading ? (
        <Spinner
          size="extra-tiny"
          style={{ color: Colors.accent, zIndex: 10, position: "absolute", top: "25%", right: "10px" }}
          className={pageStyles.spinner}
        />
      ) : (
        <div
          data-no-dnd="true"
          onClick={(e) => {
            e.stopPropagation();
            console.log(e);
          }}
          style={{ display: "flex", gap: "10px", position: "absolute", zIndex: 10, top: "20%", right: "13px" }}
        >
          <div
            style={{ zIndex: 10 }}
            data-no-dnd="true"
            onClick={(e) => {
              console.log(e);
              e.stopPropagation();
              deleteFile(e);
            }}
            className={pageStyles.menuIconContainer}
          >
            <Image width={16} height={16} src="../../../../../assets/bin.svg" alt="delete" />
          </div>

          <Button
            style={{ height: "20px", background: "transparent", border: "none", padding: "0px" }}
            icon={<Image width={16} height={16} src="../../../../../assets/copy.svg" alt="copy" />}
            iconPosition="before"
            onClick={() => navigator.clipboard.writeText(file?.file_name)}
            data-no-dnd="true"
            size="small"
          ></Button>
        </div>
      )}
    </>
  );
};

export default FileItem;
