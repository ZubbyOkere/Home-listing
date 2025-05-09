import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/Buttons";
import { createProfileAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CreateProfile() {
  const user = await currentUser();
  if (user) {
    redirect("/");
  }
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md max-w-lg">
        <FormContainer action={createProfileAction}>
          <div className="grid gap-4 mt-4">
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              placeHolder="Enter your name"
            />
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              placeHolder="Enter your name"
            />
            <FormInput
              type="text"
              name="userName"
              label="User Name"
              placeHolder="Enter your name"
            />
          </div>
          <SubmitButton text={"Create Profile"} className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfile;
