"use server";
import { profileSchema, validateWithZodSchema } from "./schemas";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "./db";

const getAuth = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You have to log in to access this route");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "There was an error",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Log in to create profile");
    const rawData = Object.fromEntries(formData);
    const validatedField = validateWithZodSchema(profileSchema, rawData);
    await db.profile.create({
      data: {
        clerkId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        profileImage: user?.imageUrl ?? "",
        ...validatedField,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuth();
  const profile = db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = getAuth();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedField = validateWithZodSchema(profileSchema, rawData);
    await db.profile.update({
      where: {
        clerkId: (await user).id,
      },
      data: validatedField,
    });
    revalidatePath("/profile");
    return { message: "profile updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};
