"use server";
import {
  imageSchema,
  profileSchema,
  propertySchema,
  validateWithZodSchema,
} from "./schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "./db";
import { uploadImage } from "./supabase";
// import { useAuth } from "@clerk/nextjs";

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
  // prevState: any,
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
  try {
    const profile = await db.profile.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        profileImage: true,
      },
    });
    return profile?.profileImage;
  } catch (error) {
    console.log("failed to fetch", error);
    return null;
  }
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
  // prevState: any,
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

export const updateProfileImageAction = async (
  // prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await currentUser();

  try {
    const image = formData.get("image") as File;
    const validatedField = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedField.image);
    await db.profile.update({
      where: {
        clerkId: user?.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath("/profile");
    return { message: "profile image updated" };
  } catch (error) {
    renderError(error);
  }

  return { message: "Profile Image created succesfully" };
};

export const createPropertyAction = async (
  // prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await currentUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user?.id,
      },
    });
  } catch (error) {
    console.error("validation error", error);
    return renderError(error);
  }
  redirect("/");
};

export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      image: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return properties;
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuth();

  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const { propertyId, favoriteId, pathname } = prevState;
  const user = await getAuth();
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
  } catch (error) {
    renderError(error);
  }

  return { message: "toggle favorite" };
};

export const fetchFavorites = async () => {
  const user = getAuth();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: (await user).id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          image: true,
          price: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.property);
};
export const fetchPropertiesDetails = async (id: string) => {
  const propertyDetails = await db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return propertyDetails;
};
