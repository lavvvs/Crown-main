import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createProductAction } from "@/utils/actions";
import { faker } from "@faker-js/faker";

function CreateProductPage() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section className="bg-pink-50 p-6 rounded-xl shadow-sm border border-pink-100 max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-pink-700 text-center capitalize">
        create product
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
            <FormInput
              type="text"
              name="company"
              label="Company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
          </div>

          <TextAreaInput
            name="description"
            labelText="Product Description"
            defaultValue={description}
          />

          <div className="mt-6">
            <CheckboxInput name="featured" label="Featured Product" />
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
