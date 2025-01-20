import React from "react";
import { Toast, ToastTitle, ToastBody, Link, Image, ToastTrigger } from "@fluentui/react-components";

export const successToast = (message, dispatchToast) => {
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
        Success
      </ToastTitle>
      <ToastBody>{message}</ToastBody>
    </Toast>,
    { intent: "success" }
  );
};

export const failureToast = (message, dispatchToast) => {
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
