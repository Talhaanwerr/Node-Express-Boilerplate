function calculateAttendance(attendance) {
  const checkIn = attendance?.checkIn
    ? new Date(`1970-01-01T${attendance?.checkIn}`)
    : null;
  const checkOut = attendance?.checkOut
    ? new Date(`1970-01-01T${attendance?.checkOut}`)
    : null;

  let hours = 0;
  if (checkIn && checkOut) {
    const timeDifference = checkOut - checkIn;
    hours = timeDifference / 1000 / 60 / 60;
    hours = parseFloat(hours.toFixed(2));
  }

  attendance.workingHours = hours;

  if (hours < 8) {
    attendance.underTime = parseFloat((8 - hours).toFixed(2));
    attendance.status = "undertime";
  } else if (hours > 8) {
    attendance.overTime = parseFloat((hours - 8).toFixed(2));
    attendance.status = "overtime";
  } else {
    attendance.status = "regular";
  }

  return attendance;
}

function formatAttendanceResponse(attendance) {
  if (Array.isArray(attendance)) {
    return attendance?.map(formatSingleAttendanceResponse);
  } else {
    return formatSingleAttendanceResponse(attendance);
  }
}

function formatSingleAttendanceResponse(attendance) {
  return {
    id: attendance?.id,
    userId: attendance?.userId,
    checkIn: attendance?.checkIn,
    checkOut: attendance?.checkOut,
    date: attendance?.date,
    workingHours: attendance?.workingHours,
    status: attendance?.status,
    user: {
      firstName: attendance?.user?.firstName,
      lastName: attendance?.user?.lastName,
    },
  };
}

module.exports = {
  calculateAttendance,
  formatAttendanceResponse,
};
