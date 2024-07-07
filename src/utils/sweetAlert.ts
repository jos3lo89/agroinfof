import Swal from "sweetalert2";

export class Alert {
  public static confirmar(
    title: string,
    text: string,
    icon: "warning" | "success" | "question" | "info" | "error",
    confirmButtonText: string,
    isConfirmedTxt: string
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        return Swal.fire(isConfirmedTxt).then(() => true);
      } else {
        return false;
      }
    });
  }
}
