import { useState } from "react";
import authAxios from "../helpers/authAxios";
import { connect } from "react-redux";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const createNotification = (content, notifiableId, notifiableType) => {
    authAxios
      .post("api/v1/notification", {
        content: content,
        notifiable_id: notifiableId,
        notifiable_type: notifiableType,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response));
  };

  const markNotificationAsRead = () => {
    authAxios
      .patch("api/v1/notification/markAsRead")
      .then((response) => getAllNotifications());
  };

  const getAllNotifications = () => {
    authAxios
      .get("api/v1/notification")
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

// const mapStateToProps = (state) => {
//   userId: state.auth.user.id;
// };

// export default connect(mapStateToProps)(useNotification);
export default useNotification;
