import * as React from "react";
import { toast as sonnerToast } from "sonner";

function toast(props: Parameters<typeof sonnerToast>[0]) {
  return sonnerToast(props);
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  };
}

export { useToast, toast };
