import {
  Image,
  Text,
  mergeClasses,
  useToastController,
  Spinner,
  Button,
  Checkbox,
  Toaster,
} from "@fluentui/react-components";
import React, { useId } from "react";
import { useUploadStyles } from "../../../hooks/styles/upload/useUploadpagestyles";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";
import { createFolderApi, delete_folder } from "../../../api/upload-pdf";
import { failureToast } from "../../../utils/Helpers/toast";
import FileItem from "./FileItem";
import { DraggableItem } from "../../../page/Upload";
import { useAuthContext } from "../../../context/Authcontext/selectors";
import { Colors, Dimensions } from "../../../utils/constants";

const FolderInput = ({ file, isAdding, folder_id, cb, cancelCreate }) => {
  const pageStyles = useUploadStyles();
  const globalStyles = useGlobalstyles();
  const authState = useAuthContext();
  const [folderName, setFolderName] = React.useState("new folder");
  const [isFolderOpen, setIsFolderOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const handleClick = () => {
    setIsFolderOpen(!isFolderOpen);
  };

  const deleteFolder = async () => {
    setIsLoading(true);
    try {
      const res = await delete_folder(folder_id, authState.token);
      if (res.success) {
        // successToast("Asdasd", dispatchToast);
        await cb();
      } else failureToast("Asdasd", dispatchToast);
    } catch (error) {
      console.log(error);
      failureToast("Asdasd");
    } finally {
      setIsLoading(false);
    }
  };

  const createFolder = async () => {
    setIsLoading(true);
    try {
      const data = await createFolderApi(folderName, authState.user.id, authState.token);
      if (data.success) {
        // successToast("Folder created successfully", dispatchToast);
        await cb();
      } else {
        failureToast("Folder creation failed", dispatchToast);
      }
    } catch (error) {
      console.log(error);
      failureToast("Folder creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(file);

  return (
    <div style={{ background: "#F9FAFB", borderRadius: Dimensions.spacing.extraSmall }}>
      <Toaster toasterId={toasterId} />
      <div style={{ cursor: "pointer" }} onClick={!isAdding ? handleClick : null} className={pageStyles.fileBox}>
        <div id="file-checkbox" className={pageStyles.fileInfoContainer}>
          <Checkbox className={pageStyles.checkbox} size="medium" />
          <Image
            width={30}
            height={30}
            src={isFolderOpen ? `../../../../../assets/folder.svg` : `../../../../../assets/folder.svg`}
            alt={file.fileType}
          />
          <div className={pageStyles.fileInfo}>
            {isAdding ? (
              <>
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className={pageStyles.fileInput}
                />
                {!isLoading ? (
                  <>
                    <Image
                      onClick={createFolder}
                      className={globalStyles.marginLeftSmall}
                      src="../../../../../assets/circle-check.svg"
                    />
                    <Image
                      onClick={() => cancelCreate(folder_id)}
                      className={globalStyles.marginLeftExtraSmall}
                      src="../../../../../assets/cross-circle.svg"
                    />
                  </>
                ) : (
                  <Spinner size="tiny" />
                )}
              </>
            ) : (
              <Text className={mergeClasses(globalStyles.h4, globalStyles.fontWeight400)}>
                {file.folder_name}
                <Text className={globalStyles.h5} style={{ color: "gray", fontWeight: "700" }}>
                  &nbsp;{`(${file.files.length})`}
                </Text>
              </Text>
            )}
          </div>
        </div>
        {!isAdding ? (
          <>
            {isLoading ? (
              <Spinner
                size="extra-tiny"
                style={{ color: Colors.accent, zIndex: 10, position: "absolute", top: "30%", right: "10px" }}
                className={pageStyles.spinner}
              />
            ) : (
              <div
                data-no-dnd="true"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(e);
                }}
                style={
                  ({ display: "flex", gap: "10px", position: "absolute", zIndex: 10 },
                  isFolderOpen
                    ? { display: "flex", top: "25%", gap: "10px" }
                    : { display: "flex", top: "15%", gap: "10px" })
                }
              >
                <div
                  style={{ zIndex: 10 }}
                  data-no-dnd="true"
                  onClick={(e) => {
                    console.log(e);
                    e.stopPropagation();
                    deleteFolder();
                  }}
                  className={pageStyles.menuIconContainer}
                >
                  <Image width={16} height={16} src="../../../../../assets/bin.svg" alt="delete" />
                </div>
                <Button
                  style={{
                    height: "20px",
                    background: "transparent",
                    border: "none",
                    padding: "0px",
                    marginRight: "4px",
                  }}
                  icon={<Image width={16} height={16} src="../../../../../assets/copy.svg" alt="copy" />}
                  iconPosition="before"
                  onClick={() => navigator.clipboard.writeText(file?.folder_name)}
                  data-no-dnd="true"
                  size="small"
                ></Button>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      {file?.files && file.files.length > 0 && (
        <>
          <hr className={pageStyles.hr} />
          <div style={{ gap: "0px" }} className={mergeClasses(pageStyles.fileContainer, globalStyles.marginTopZero)}>
            {file?.files?.map((fileItem) => (
              <DraggableItem folder_id={folder_id} key={fileItem.id} id={fileItem.id}>
                <FileItem isFolder={true} cb={cb} file={fileItem} />
              </DraggableItem>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FolderInput;
