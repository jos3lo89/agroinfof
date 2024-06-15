import { toast } from "vue3-toastify";

export class Toast {
  static success(message: string) {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  }

  static error(message: string) {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  }

  static info(message: string) {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  }

  static warning(message: string) {
    toast.warning(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  }
}
