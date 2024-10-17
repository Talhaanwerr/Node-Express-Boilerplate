//

<!-- 1) User(id {pk}, first_name, last_name, email, password, isNewUser(bool), shift_time, updatedAt, createdAt, status, role_id {fk}, designation_id {fk}, reporting_to {fk})

11) User_Profile (user_id, contactNo, emergency_contact, cnic_no, date_of_birth, city, gender, Address, joined_date, branch (country))

2) Role(id {pk}, role_name, createdAt, updatedAt)

3) Designation(id {pk}, designation_name, createdAt, updatedAt)

4) Permission(id {pk}, permission_name, createdAt, updatedAt)

5) Role_permission(role_id {fk}, permission_id {fk})
12) announcemnet -> heading, description, type
6) User_permission(user_id {fk}, permission_id {fk})
*8) User_details (id {pk}, user_id {fk}, working_day, time_worked, balanced_time, activity_level, total_working_hours)
-->

7. Leave_Request(id {pk}, user_id {fk}, leave_type, leave_year, description, type (fullDay & halfDay), start_date, end_date, status, approved_by {fk of user table (possibly higher level authority)}, submittedAt, approvedAt)

8. Team(id {pk}, no_of_members, user_id {fk}(as head of department))

9. Team_category(id {pk}, user_id, designation_id {fk})

10. Leave(id {pk}, type_of_leave, available, used, booked, user_id {fk}

13) Attendance -> user_id, checkin, checkout, worked_hours, created_at, updated_at

14) Shift -> user_id, checkin, checkintime
