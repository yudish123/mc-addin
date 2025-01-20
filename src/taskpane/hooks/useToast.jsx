import React from "react";
import { useId, useToastController } from "@fluentui/react-components";
import { Toast, ToastTitle, ToastBody, Link, Image, ToastTrigger } from "@fluentui/react-components";

export const useToast = () => {
  const toasterId = useId("toaster-global");
  const { dispatchToast } = useToastController(toasterId);

  const successToast = (message) => {
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>
                {" "}
                <Image src="../../../../assets/cross-circle.svg" />{" "}
              </Link>
            </ToastTrigger>
          }
        >
          Success
        </ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      { intent: "success" }
    );
  };

  const failureToast = (message) => {
    try {
      console.log(message, dispatchToast);
      dispatchToast(
        <Toast>
          <ToastTitle
            action={
              <ToastTrigger>
                <Link>
                  {" "}
                  <Image src="../../../../assets/cross-circle.svg" />{" "}
                </Link>
              </ToastTrigger>
            }
          >
            Failure
          </ToastTitle>
          <ToastBody>{message}</ToastBody>
        </Toast>,
        { intent: "error" }
      );
    } catch (error) {
      console.log(error, 48);
    }
  };
  return { successToast, failureToast, toasterId, dispatchToast };
};
