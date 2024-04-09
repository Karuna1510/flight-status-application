import moment from 'moment';

export const formatDepartureTime = (timestamp) => {
  return moment(timestamp).format('DD-MM-YYYY HH:mm');
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'On Time':
      return '#28a745'; // green
    case 'Delayed':
      return '#dc3545'; // red
    case 'Boarding':
      return '#4f6ad5'; // blue
    default:
      return '#ffc107'; // yellow
  }
};