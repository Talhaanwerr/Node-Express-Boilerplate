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

  attendance.workingHours = `${hours} h ${minutes} m`;

  const totalWorkedTime = hours + minutes / 60;

  if (totalWorkedTime < standardWorkingHours) {
    const undertimeHours = Math.floor(standardWorkingHours - totalWorkedTime);
    const undertimeMinutes =
      Math.round((standardWorkingHours - totalWorkedTime) * 60) % 60;
    attendance.underTime = `${undertimeHours} h ${undertimeMinutes} m`;
    attendance.overTime = "0 hours 0 minutes";
    attendance.status = "undertime";
  } else if (totalWorkedTime > standardWorkingHours) {
    const overtimeHours = Math.floor(totalWorkedTime - standardWorkingHours);
    const overtimeMinutes =
      Math.round((totalWorkedTime - standardWorkingHours) * 60) % 60;
    attendance.overTime = `${overtimeHours} h ${overtimeMinutes} m`;
    attendance.underTime = "0 hours 0 minutes";
    attendance.status = "overtime";
  } else {
    attendance.underTime = "0 hours 0 minutes";
    attendance.overTime = "0 hours 0 minutes";
    attendance.status = "regular";
  }

  return attendance;
}

function formatAttendanceResponse(attendance, workingDays = {}, bool) {
  if (bool === true && Array.isArray(attendance)) {
    return attendance?.map((att) =>
      formatAttendanceResponseDashboard(att, workingDays[att.userId] || 0)
    );
  } else if (bool === true && !Array.isArray(attendance)) {
    return formatSingleAttendanceResponseDashboard(
      attendance,
      workingDays[attendance?.userId] || 0
    );
  } else if (Array.isArray(attendance)) {
    return attendance?.map((att) =>
      formatSingleAttendanceResponse(att, workingDays[att.userId] || 0)
    );
  } else {
    return formatSingleAttendanceResponse(
      attendance,
      workingDays[attendance?.userId] || 0
    );
  }
}

function formatAttendanceResponseDashboard(attendance, workingDays = 0) {
  return {
    id: attendance?.id,
    checkIn: attendance?.checkIn,
    checkOut: attendance?.checkOut,
    firstName: attendance?.user?.firstName,
    lastName: attendance?.user?.lastName,
  };
}

function formatSingleAttendanceResponseDashboard(attendance, workingDays = 0) {
  return {
    id: attendance?.id,
    checkIn: attendance?.checkIn,
    checkOut: attendance?.checkOut,
    firstName: attendance?.user?.firstName,
    lastName: attendance?.user?.lastName,
  };
}


function formatSingleAttendanceResponse(attendance, workingDays = 0) {
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
      designation: attendance?.user?.designation?.designation_name,
    },
  };
}

module.exports = {
  calculateAttendance,
  formatAttendanceResponse,
};
