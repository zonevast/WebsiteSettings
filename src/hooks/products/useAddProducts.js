"use client";

import { useProjectSettings } from "../settings/useProjectSettings";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "@/config/request";
import { useNotification } from "@/components/CustomNotification/NotificationProvider";
import { messages } from "../useApi/message";

export const useAddProducts = (schema) => {
  const {
    settings: { locale, project },
  } = useProjectSettings();

  const queryClient = useQueryClient();
  const { sendNotification } = useNotification();
  const notify = true;

  const successMessage = messages[locale].dataCreatedSuccess;

  const prefix = `/${locale}/${project}/ecommerce/products`;
  const endpoint = `/${schema}/m/products`;

  const {
    mutateAsync: createProduct,
    isLoading: loadingProducts,
    isError: errorProducts,
    error,
  } = useMutation(
    (newData) => apiClient.post(`${prefix}${endpoint}/`, newData),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries([prefix, endpoint]);
        if (notify) sendNotification(successMessage, "success");
      },
      onError: (err) => {
        const errMsg = err.response?.data || err.message;
        if (notify) sendNotification(errMsg, "error");
      },
    }
  );

  return {
    createProduct,
    loadingProducts,
    errorProducts, 
    error, 
  };
};