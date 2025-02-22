import TeacherManagment from "../_components/teacher-managment";
import { initialUsers } from "../_lib/shemaTecher";


export default function UsersPage() {
  return <TeacherManagment initialUsers={initialUsers}/>
}
