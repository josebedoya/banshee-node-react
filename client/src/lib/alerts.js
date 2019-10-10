import { message, notification } from 'antd';

export const showMessage = data => {
  const { alertType } = data;
  return message[alertType](data.title);
};

export const showAlert = data => {
  const { alertType, title, message } = data;
  if (alertType) {
    notification.config({
      placement: 'bottomRight',
      bottom: 2,
      duration: 6
    });
    return notification[alertType]({
      message: title,
      description: message
    });
  } else {
    return false;
  }
};
