function calculateAttendance(attendance) {
  const checkIn = attendance?.checkIn
    ? new Date(`1970-01-01T${attendance?.checkIn}`)
    : null;
  const checkOut = attendance?.checkOut
    ? new Date(`1970-01-01T${attendance?.checkOut}`)
    : null;

  let hours = 0;
  let minutes = 0;
  const standardWorkingHours = 8;

  if (checkIn && checkOut) {
    const timeDifference = checkOut - checkIn;
    hours = Math.floor(timeDifference / 1000 / 60 / 60);
    minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  }

  attendance.workingHours = `${hours} hours ${minutes} minutes`;

  const totalWorkedTime = hours + minutes / 60;

  if (totalWorkedTime < standardWorkingHours) {
    const undertimeHours = Math.floor(standardWorkingHours - totalWorkedTime);
    const undertimeMinutes =
      Math.round((standardWorkingHours - totalWorkedTime) * 60) % 60;
    attendance.underTime = `${undertimeHours} hours ${undertimeMinutes} minutes`;
    attendance.overTime = "0 hours 0 minutes";
    attendance.status = "undertime";
  } else if (totalWorkedTime > standardWorkingHours) {
    const overtimeHours = Math.floor(totalWorkedTime - standardWorkingHours);
    const overtimeMinutes =
      Math.round((totalWorkedTime - standardWorkingHours) * 60) % 60;
    attendance.overTime = `${overtimeHours} hours ${overtimeMinutes} minutes`;
    attendance.underTime = "0 hours 0 minutes";
    attendance.status = "overtime";
  } else {
    attendance.underTime = "0 hours 0 minutes";
    attendance.overTime = "0 hours 0 minutes";
    attendance.status = "regular";
  }

  return attendance;
}

function formatAttendanceResponse(attendance, workingDays) {
  if (Array.isArray(attendance)) {
    return attendance?.map((att) =>
      formatSingleAttendanceResponse(att, workingDays[att.userId])
    );
  } else {
    return formatSingleAttendanceResponse(
      attendance,
      workingDays[attendance?.userId]
    );
  }
}

function formatSingleAttendanceResponse(attendance, workingDays) {
  return {
    id: attendance?.id,
    userId: attendance?.userId,
    checkIn: attendance?.checkIn,
    checkOut: attendance?.checkOut,
    date: attendance?.date,
    workingHours: attendance?.workingHours,
    underTime: attendance?.underTime,
    overTime: attendance?.overTime,
    workingDays,
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
