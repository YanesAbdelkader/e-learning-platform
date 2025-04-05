import TeacherSignupForm from "../_components/teacher-signup-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col container max-w-4xl py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Teacher Registration</h1>
          <p className="text-foreground mt-2">
            Join our platform as a teacher and start sharing your knowledge
          </p>
        </div>
        <TeacherSignupForm />
      </div>
    </div>
  );
}
