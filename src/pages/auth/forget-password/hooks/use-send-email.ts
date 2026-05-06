import { useMutation } from "@tanstack/react-query";
import { sendEmailApi } from "../apis/send-email.api";

export function useSendEmail() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: sendEmailApi,
  });
  return { onSubmitEmail: mutate, isPending, error };
}
