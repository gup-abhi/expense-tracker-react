import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const notify = (message, type) => {
  type = type || "info";
  if (type === "success") toast.success(message);
  if (type === "error") toast.error(message);
  if (type === "info") toast.info(message);
  if (type === "warning") toast.warning(message);
};
