import TeacherProfile from "./_components/teacher-profile";

export default function TeacherPage({ params }: { params: { id: string } }) {
  return <TeacherProfile teacherId={params.id} />
}

