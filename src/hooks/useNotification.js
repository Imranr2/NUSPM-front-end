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
      .then()
      .catch();
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
        setNotifications(response.data);
      })
      .catch();
  };

  return {
    createNotification,
    markNotificationAsRead,
    getAllNotifications,
    notifications,
  };
};
export default useNotification;
