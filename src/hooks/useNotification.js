import { useState } from "react";
import authAxios from "../helpers/authAxios";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const createNotification = (
    content,
    notifiableId,
    notifiableType,
    userId
  ) => {
    authAxios
      .post("api/v1/notifications", {
        content: content,
        notifiable_id: notifiableId,
        notifiable_type: notifiableType,
        user_id: userId,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response));
  };

  const markNotificationAsRead = () => {
    authAxios
      .patch("api/v1/notifications/markAsRead")
      .then((response) => getAllNotifications());
  };

  const getAllNotifications = () => {
    authAxios
      .get("api/v1/notifications")
      .then((response) => {
        console.log(response.data);
        setNotifications(response.data);
      })
      .catch((error) => console.log(error));
  };

  return {
    createNotification,
    markNotificationAsRead,
    getAllNotifications,
    notifications,
  };
};
export default useNotification;
