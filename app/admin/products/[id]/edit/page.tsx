import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import { redirect } from "next/navigation";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import CheckboxGroupInput from "@/components/form/CheckboxGroupInput";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ Fix: make params awaitable
}) {
  const { id } = await params; // ✅ Fix: await destructure

  let product;

  try {
    product = await fetchAdminProductDetails(id);
    if (!product) throw new Error("Product not found");
  } catch (error) {
    console.error("Failed to load product:", error);
    redirect("/admin/products");
  }

  const {
    name,
    price,
    image,
    featured,
    color = [],
    length = [],
    texture = [],
    categories = [],
    rating,
  } = product;

  const colors = [
    "613 Blonde",
    "Colour #27",
    "Grey Color",
    "Jet Black",
    "Light Brown",
    "Medium Brown",
    "Natural Black",
    "Natural Brown",
  ];

  const lengths = [
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
    "32",
    "10-14 Inches",
    "15-18 Inches",
    "19-22 Inches",
    "23-26 Inches",
    "27-30 Inches",
  ];

  const textures = [
    "Curly",
    "Natural Curly",
    "Natural Straight",
    "Natural Wavy",
  ];

  const categoryOptions = [
    "613 Blonde",
    "Best Sellers",
    "Blonde Shades",
    "Bulk Hair - Blonde S/D",
    "Closures",
    "DIY Hair",
    "Double Drawn",
    "Frontals",
    "Grey Hair",
    "Jet Black",
    "M/W Bundles",
    "Now Trending",
    "OMBRE COLORS",
    "Ponytail Extensions",
    "S/D Bulk Hair",
    "Wigs",
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-pink-800 mb-8 text-center capitalize">
        Update Product
      </h1>

      <div className="bg-pink-50 border border-pink-200 rounded-2xl shadow-md p-8">
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={image}
          text="Update Image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image} />
        </ImageInputContainer>

        <FormContainer action={updateProductAction}>
          <input type="hidden" name="id" value={id} />

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <FormInput
              type="text"
              name="name"
              label="Product Name"
              defaultValue={name}
            />
            <PriceInput defaultValue={price} />
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <CheckboxGroupInput
              name="color[]"
              label="Hair Color"
              options={colors}
              defaultValues={color}
            />
            <CheckboxGroupInput
              name="length[]"
              label="Hair Length"
              options={lengths}
              defaultValues={length}
            />
            <CheckboxGroupInput
              name="texture[]"
              label="Hair Texture"
              options={textures}
              defaultValues={texture}
            />
            <CheckboxGroupInput
              name="categories[]"
              label="Category"
              options={categoryOptions}
              defaultValues={categories}
            />
          </div>

          <FormInput
            type="number"
            name="rating"
            label="Rating (1 to 5)"
            min={1}
            max={5}
            step={0.1}
            defaultValue={String(rating)}
          />

          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="Mark as Featured"
              defaultChecked={featured}
            />
          </div>

          <SubmitButton
            text="Update Product"
            className="mt-10 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-300"
          />
        </FormContainer>
      </div>
    </section>
  );
}
