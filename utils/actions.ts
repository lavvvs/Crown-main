"use server";

import { deleteImage, uploadImage } from "@/utils/cloudinary";

import db from "@/utils/db";
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";

//import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

// utils/actions.ts
export const fetchAllProducts = async () => {
  return await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  //if (!product) {
  // redirect('/products');
  // }
  return product;
};

export const createProductAction = async (
  _prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser();

    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const featured = formData.get("featured") === "on";
    const rating = parseFloat(formData.get("rating") as string);
    const image = formData.get("image") as File;

    const uploadedUrl = await uploadImage(image);

    const color = formData.getAll("color[]") as string[];
    const length = formData.getAll("length[]") as string[];
    const texture = formData.getAll("texture[]") as string[];
    const categories = formData.getAll("categories[]") as string[]; // ✅ NEW

    await db.product.create({
      data: {
        name,
        price,
        featured,
        image: uploadedUrl,
        rating,
        clerkId: user.id,
        color,
        length,
        texture,
        categories, // ✅ NEW
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/category/all-products");
    if (featured) revalidatePath("/");

    return { message: "Product created ✅" };
  } catch (error) {
    console.error("Create product error:", error);
    return { message: "Failed to create product." };
  }
};
export const fetchAdminProducts = async () => {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return []; // Return empty array to avoid crashing page
  }
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);
    revalidatePath("/admin/products");
    redirect("/admin/products?status=deleted");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};
export const updateProductAction = async (
  _prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  if (user.id !== process.env.ADMIN_USER_ID) {
    return { message: "Unauthorized" };
  }

  try {
    const productId = formData.get("id") as string;

    const color = formData.getAll("color[]") as string[];
    const length = formData.getAll("length[]") as string[];
    const texture = formData.getAll("texture[]") as string[];
    const categories = formData.getAll("categories[]") as string[];

    const rating = parseFloat(formData.get("rating") as string);
    const featured = formData.get("featured") === "on";

    const rawData = {
      ...Object.fromEntries(formData),
      color,
      length,
      texture,
      categories,
      rating,
      featured,
    };

    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: { id: productId },
      data: {
        name: validatedFields.name,
        price: validatedFields.price,
        featured: validatedFields.featured,
        color: validatedFields.color,
        length: validatedFields.length,
        texture: validatedFields.texture,
        rating: validatedFields.rating,
        categories: validatedFields.categories,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);

    return { message: "Product updated successfully" }; // ✅ just return message
  } catch (error) {
    return { message: "Something went wrong. Please try again." };
  }
};
export const updateProductImageAction = async (
  _prevState: any,
  formData: FormData
) => {
  await getAuthUser();

  try {
    const image = formData.get("image");
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    if (!(image instanceof Blob)) {
      throw new Error("Invalid image file");
    }

    const validatedFile = validateWithZodSchema(imageSchema, { image });

    const fullPath = await uploadImage(validatedFile.image); // ✅ Accepts Blob now
    await deleteImage(oldImageUrl);

    await db.product.update({
      where: { id: productId },
      data: { image: fullPath },
    });

    revalidatePath(`/admin/products/${productId}/edit`);
    redirect(`/admin/products/${productId}/edit?status=image`);

    return { message: "Product image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

/*export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;

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
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? "removed from faves" : "added to faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};*/

/*export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);
    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};
export const fetchProductRating = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: { productId },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};
export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};
*/
export const fetchCartItems = async () => {
  const { userId } = await auth();
  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }
  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }
  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  });
  return { cartItems, currentCart };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  console.log("🎯 addToCartAction triggered");
  const user = await getAuthUser();
  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));
    console.log("🧾 productId:", productId, "🛒 amount:", amount);
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
    await updateCart(cart);
  } catch (error) {
    console.error("❌ Error in addToCartAction:", error);
    return renderError(error);
  }
  redirect("/cart");
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Item removed from cart" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "cart updated" };
  } catch (error) {
    return renderError(error);
  }
};

/*export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    cartId = cart.id;

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
  await getAdminUser();

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};
*/
