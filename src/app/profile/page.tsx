import FormContainer from "@/components/form/FormContainer";
import {
  fetchProfile,
  updateProfileAction,
  updateProfileImageAction,
} from "@/utils/actions";
import FormInput from "@/components/form/FormInput";
import React from "react";
import SubmitButton from "@/components/form/Buttons";
import ImageInputContainer from "@/components/form/ImageInputContainer";

const Profile = async () => {
  const profile = await fetchProfile();
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Update User</h1>
      <div className="border p-8 rounded-md max-w-lg">
        <ImageInputContainer
          image={profile?.profileImage ?? ""}
          name={profile?.userName ?? "unknown"}
          action={updateProfileImageAction}
          text="update profile image"
        />
        <FormContainer action={updateProfileAction}>
          <div className="grid gap-4 mt-4">
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              placeHolder="Enter your name"
              defaultValue={profile?.firstName}
            />
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              placeHolder="Enter your name"
              defaultValue={profile?.lastName}
            />
            <FormInput
              type="text"
              name="userName"
              label="User Name"
              placeHolder="Enter your name"
              defaultValue={profile?.userName}
            />
          </div>
          <SubmitButton text={"Update Profile"} className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
};

export default Profile;
