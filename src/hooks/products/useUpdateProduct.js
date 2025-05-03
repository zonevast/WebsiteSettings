import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "@/config/request";
import { useNotification } from "@/components/CustomNotification/NotificationProvider";
import { useProjectSettings } from "../settings/useProjectSettings";

export const useUpdateProduct = (schema) => {
    const { settings: {
        locale,
        project,
    } } = useProjectSettings();

    const notify = true;
    const queryClient = useQueryClient();
    const { sendNotification } = useNotification();



    const prefix = `/${locale}/${project}/ecommerce/products`;
    const endpoint = `/${schema}/m`;

    const updateMutation = useMutation(
        ({ id, ...updatedData }) =>
            apiClient.patch(`${prefix}${endpoint}/${id}/`, updatedData),
        {
            onSuccess: (response) => {
                // Invalidate the query cache to refetch updated data
                queryClient.invalidateQueries([prefix, endpoint]);

                // Show a success notification if `notify` is enabled
                if (notify) {
                    sendNotification("Data updated successfully", "success");
                }
            },
            onError: (err) => {
                // Handle errors and show notifications
                const errMsg = err.response?.data || err.message;
                
                sendNotification(`Update failed: ${errMsg}`, "error");
            },
        }
    );


    return {
        updateProduct: updateMutation,
    }
}

