"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState = { message: "" };

type ServerAction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

type Props = {
  action: ServerAction;
  children: React.ReactNode;
  redirectTo?: string; // optional route to push after success
};

export default function FormContainer({ action, children, redirectTo }: Props) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });

      if (redirectTo) {
        window.location.href = redirectTo;
      }
    }
  }, [state, redirectTo]);

  return (
    <form action={formAction} className="space-y-4">
      {children}
    </form>
  );
}
