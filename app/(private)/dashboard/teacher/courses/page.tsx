
import { fetchCourses } from "../_actions/CoursesAction";
import { CourseManagement } from "../_components/course-management";

export default async function CoursesPage() {
  const courses = await fetchCourses();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Course Management</h2>
      <CourseManagement initialCourses={courses}/>
    </div>
  );
  // return (
  //   <div className="container mx-auto py-10">
  //     <h1 className="text-2xl font-bold mb-5">Course Management</h1>
  //     <Table>
  //       <TableHeader>
  //         <TableRow>
  //           <TableHead>Title</TableHead>
  //           <TableHead>Description</TableHead>
  //           <TableHead>Price</TableHead>
  //           <TableHead>Duration</TableHead>
  //           <TableHead>Actions</TableHead>
  //         </TableRow>
  //       </TableHeader>
  //       <TableBody>
  //         {courses?.map((course: Course) => (
  //           <RowCourse key={course.id} course={course} />
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </div>
  // );
}
