import React, { useCallback, useEffect } from "react";
import { useUploadStyles } from "../hooks/styles/upload/useUploadpagestyles";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import { Button, Image, mergeClasses, Text, useId } from "@fluentui/react-components";
import { DndContext, MouseSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDropzone } from "react-dropzone";
import { CloudArrowUp32Regular } from "@fluentui/react-icons";
import { Colors, Dimensions } from "../utils/constants";
import { Toaster, useToastController, Spinner } from "@fluentui/react-components";
import { getFilesandFoldersApi, moveFileInOut, uploadPdf } from "../api/upload-pdf";
import { useAuthContext, useAuthDispatch } from "../context/Authcontext/selectors";
import FolderInput from "../components/Layout/Uploads/FolderInput";
import { failureToast } from "../utils/Helpers/toast";
import FileItem from "../components/Layout/Uploads/FileItem";
import { genUUID, getPlanNameFromUser } from "../utils/Helpers";
import LoginOverlay from "../components/Layout/Globals/LoginOverlay";
import { openLoginDialog } from "../utils/Events/Dialogevents";
import { useNavigate } from "react-router-dom";

export const DraggableItem = ({ id, children, folder_id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id: id, data: { folder_id } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width: "100%", position: "relative", cursor: "grab" }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export const DroppableItem = ({ id, children, name }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      folder_name: name,
    },
  });
  return (
    <div style={{ width: "100%", position: "relative" }} ref={setNodeRef}>
      {children}
    </div>
  );
};

const Upload = () => {
  const pageStyles = useUploadStyles();
  const [loading, setLoading] = React.useState("fetching");
  const authState = useAuthContext();
  const navigate = useNavigate();
  const [files, setFiles] = React.useState([]);

  const globalStyles = useGlobalstyles();
  const dispatch = useAuthDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      onActivation: (event) => console.log("onActivation", event), // Here!
      activationConstraint: { distance: 5 },
    })
  );

  const addingFolder = () => {
    const isAdding = files.find((file) => file.isAdding);
    if (isAdding) {
      failureToast("Only one folder can be added at a time", dispatchToast);
      return;
    }
    setFiles([{ folder_id: genUUID(), folder_name: "New Folder", isAdding: true }, ...files]);
  };

  const cancelCreate = (folder_id) => {
    setFiles((prev) => prev.filter((file) => file.folder_id !== folder_id));
  };

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading("uploading");
    const filesToset = acceptedFiles.map((file) => ({
      file_name: file.name,
      fileType: file.type,
      id: genUUID(),
      isLoading: true,
    }));
    setFiles((prev) => [...prev, ...filesToset]);
    if (!authState.user || !authState.token) {
      failureToast(`Upload Failed, please login to upload documents.`, dispatchToast);
      setLoading(false);
      return;
    }

    let promises = [];
    try {
      acceptedFiles.map(async (file) => {
        promises.push(uploadPdf(file, authState.user.id, authState.token));
      });

      const result = await Promise.all(promises);

      result.map((data) => {
        if (data.success) {
          getFilesandFolders();
        } else {
          failureToast(`${data.data.file_name} is not uploaded.`, dispatchToast);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getFilesandFolders = async () => {
    try {
      const resp = await getFilesandFoldersApi(authState.user.id, authState.token);

      if (!resp.success && resp.auth) {
        authState.refreshState();
      }

      if (!resp.success) {
        setLoading(false);
        failureToast("No files and folders found", dispatchToast);
        return;
      }
      const { data } = resp;
      let filesArr = [];
      data.map((file) => {
        if (file.folder_id) {
          const newFolderFiles = file?.files?.filter((file) => file.id);
          filesArr.push({ ...file, files: newFolderFiles });
        }
      });
      data.map((file) => {
        if (!file.folder_id) {
          file?.files?.map((file) => {
            if (file.id) filesArr.push(file);
          });
        }
      });

      setFiles(filesArr);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const moveFile = async (active, over) => {
    const previousFiles = JSON.parse(JSON.stringify(files));
    setFiles((prev) => {
      let temp = JSON.parse(JSON.stringify(prev));
      //remove the dragged file from the array
      let curr_file;
      if (!active.data.current.folder_id) {
        curr_file = temp.find((file) => file.id === active.id);
        temp = temp.filter((file) => file.id !== active.id);
      } else {
        const currentFolder = temp.find((file) => file.folder_id === active.data.current.folder_id);
        curr_file = currentFolder.files.find((file) => file.id === active.id);
        currentFolder.files = currentFolder.files.filter((file) => file.id !== active.id);
      }
      //add the dragged file to the target folder
      console.log(temp);
      const target_folder = temp.find((file) => file.folder_id === over.id);
      console.log(target_folder, 1);
      target_folder.files.push(curr_file);
      console.log(target_folder, 2);
      return temp;
    });
    console.log(over, active);
    const res = await moveFileInOut(over.id, active.id, over.data.current.folder_name, authState.token);
    if (!res.success) {
      setFiles(previousFiles);
      return;
    }
  };

  const moveFileOut = async (active) => {
    const previousFiles = JSON.parse(JSON.stringify(files));
    setFiles((prev) => {
      let temp = JSON.parse(JSON.stringify(prev));
      //remove file from folder
      const origin_folder = temp.find((file) => file.folder_id === active.data.current.folder_id);
      let targetFile;
      if (origin_folder) {
        targetFile = origin_folder.files.find((file) => file.id === active.id);
        origin_folder.files = origin_folder.files.filter((file) => file.id !== active.id);
      }
      temp.push(targetFile);
      return temp;
    });
    const response = await moveFileInOut(null, active.id, null, authState.token);
    if (!response.success) {
      //do reverse process
      setFiles(previousFiles);
      return;
    }
  };

  useEffect(() => {
    setLoading("fetching");
    getFilesandFolders();
  }, [authState.user]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: authState.user && authState.token ? false : true,
  });

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          console.log("drag start", active);
        }}
        onDragEnd={({ active, over }) => {
          console.log(over, active);

          if (over.id === active.data.current.folder_id) return;

          if (!over || !over.id) {
            if (active.data.current.folder_id) {
              moveFileOut(active);
              return;
            } else return;
          }
          moveFile(active, over);
        }}
        onDragCancel={() => {
          console.log("drag cancel");
        }}
      >
        <DroppableItem id={0}>
          <div
            style={{ background: "white" }}
            className={mergeClasses(
              globalStyles.container,
              globalStyles.paddingInlineExtraLarge,
              globalStyles.paddingTopExtraLarge
            )}
          >
            {!authState.user || !authState.token ? (
              <LoginOverlay>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: Dimensions.spacing.small,
                  }}
                >
                  <Text style={{ fontSize: Dimensions.fonts.large }}>Please login to upload files.</Text>
                  <Button
                    onClick={() => openLoginDialog(dispatch)}
                    size="small"
                    className={mergeClasses(globalStyles.accentBtn, pageStyles.browseBtn)}
                  >
                    Login
                  </Button>
                </div>
              </LoginOverlay>
            ) : (
              <></>
            )}
            {authState.user && getPlanNameFromUser(authState.user) !== "pro" ? (
              <LoginOverlay>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: Dimensions.spacing.small,
                  }}
                >
                  <Text style={{ fontSize: Dimensions.fonts.large }}>Please Upgrade to Pro Plan to upload files.</Text>
                  <Button
                    onClick={() => navigate("/pricing")}
                    size="small"
                    className={mergeClasses(globalStyles.accentBtn, pageStyles.browseBtn)}
                  >
                    Upgrade
                  </Button>
                </div>
              </LoginOverlay>
            ) : (
              <></>
            )}
            <Toaster toasterId={toasterId} />
            <div className={pageStyles.titleContainer}>
              <Text style={{ fontSize: "15px", color: "#344054" }} className={mergeClasses(globalStyles.h3)}>
                Upload Files
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "400", color: "gray" }}>
                Add your relevent documents here. You can add upto 10 files
              </Text>
            </div>
            <div
              className={mergeClasses(pageStyles.dropzone, loading === "uploading" && pageStyles.dropzoneDisabled)}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <CloudArrowUp32Regular color={Colors.accent} />
              <div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#344054",
                    fontWeight: "300",
                    lineHeight: "20px",
                    marginBlock: "0px",
                  }}
                >
                  Drag and drop here or Browse files
                </p>
                <p
                  style={{
                    textAlign: "center",
                    color: "#98A2B3",
                    fontSize: "10px",
                    fontWeight: "400",
                    marginBlock: "0px",
                  }}
                >
                  Supported format : pdf ot txt, Max 20 MB
                </p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button size="small" className={mergeClasses(globalStyles.accentBtn, pageStyles.browseBtn)}>
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
            <div className={mergeClasses(globalStyles.marginTopLarge)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "15px", color: "#344054" }} className={mergeClasses(globalStyles.h3)}>
                  Uploaded Files
                </Text>
                <Button
                  style={{
                    border: "1px solid #33C481",
                    color: "#33C481",
                    display: "flex",
                    gap: "8px",
                    paddingInline: "10px",
                  }}
                  className={mergeClasses(globalStyles.paddingBlockExtraSmall)}
                  disabled={authState.user && authState.token ? false : true}
                  onClick={addingFolder}
                  size="small"
                >
                  <Image src="../../../assets/Plus.svg" />
                  <span className={globalStyles.fontWeight500}>New Folder</span>
                </Button>
              </div>
              {authState.user && authState.token ? (
                <div className={pageStyles.fileContainer}>
                  {loading === "fetching" ? (
                    <Spinner style={{ color: Colors.accent }} className={pageStyles.spinner} />
                  ) : (
                    <>
                      {files.map((file, index) => (
                        <>
                          {file?.isAdding || file?.folder_id ? (
                            <DroppableItem key={index} name={file.folder_name} id={file.folder_id}>
                              <FolderInput
                                cb={getFilesandFolders}
                                cancelCreate={cancelCreate}
                                isAdding={file?.isAdding}
                                folder_id={file.folder_id}
                                key={index}
                                file={file}
                              />
                            </DroppableItem>
                          ) : (
                            <DraggableItem index={index} folder_id={null} key={index} id={file.id}>
                              <FileItem cb={getFilesandFolders} file={file} />
                            </DraggableItem>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </div>
              ) : (
                <div style={{ marginTop: "12px", textAlign: "center" }}>
                  <Text style={{ textAlign: "center" }} className={mergeClasses(globalStyles.h3)}>
                    Please login to view and upload your files.
                  </Text>
                </div>
              )}
            </div>
          </div>
        </DroppableItem>
      </DndContext>
    </>
  );
};

export default Upload;
