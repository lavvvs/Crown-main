"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";
import { type actionFunction } from "@/utils/types";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  return (
    <div className="mb-8 bg-pink-50 p-4 rounded-lg border border-pink-200 shadow-sm">
      <Image
        src={image}
        width={200}
        height={200}
        className="rounded object-cover mb-4 w-[200px] h-[200px] border border-pink-300"
        alt={name}
        priority
      />

      <Button
        variant="outline"
        size="sm"
        className="text-pink-50 bg-pink-600 border-pink-400 hover:bg-pink-700 hover:text-pink-50 transition"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        {text}
      </Button>

      {isUpdateFormVisible && (
        <div className="max-w-md mt-4 bg-white p-4 rounded-lg border border-pink-200 shadow-sm">
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton
              size="sm"
              className="mt-4 bg-pink-600 hover:bg-pink-700 text-white"
            />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default ImageInputContainer;
