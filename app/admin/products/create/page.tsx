"use client";

import CheckboxGroupInput from "@/components/form/CheckboxGroupInput"; // ✅ new import

import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import SelectInput from "@/components/form/SelectInput";
import { createProductAction } from "@/utils/actions";
import { faker } from "@faker-js/faker";

function CreateProductPage() {
  const name = faker.commerce.productName();

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

  return (
    <section className="bg-pink-50 p-6 rounded-xl shadow-sm border border-pink-100 max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-pink-700 text-center capitalize">
        Create Product
      </h1>

      <div className="border border-pink-200 bg-white p-8 rounded-lg shadow-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <FormInput
              type="text"
              name="name"
              label="Product Name"
              defaultValue={name}
            />

            <PriceInput />
            <ImageInput />

            <CheckboxGroupInput
              name="color"
              label="Hair Color"
              options={colors}
            />
            <CheckboxGroupInput
              name="length"
              label="Hair Length"
              options={lengths}
            />
            <CheckboxGroupInput
              name="texture"
              label="Hair Texture"
              options={textures}
            />

            <FormInput
              type="number"
              name="rating"
              label="Rating (1 to 5)"
              min={1}
              max={5}
              step={0.1}
              defaultValue="5"
            />
          </div>

          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="Featured Product"
              defaultChecked={false}
            />
          </div>

          <SubmitButton
            text="Create Product"
            className="mt-8 bg-pink-600 text-white hover:bg-pink-700 transition-all"
          />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProductPage;
