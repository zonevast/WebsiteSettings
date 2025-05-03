import { useState, useEffect, useCallback } from "react";
import { useAddProductStore } from "@/stores/useAddProductStore";
import { useAddProducts } from "./useAddProducts";

export const useAddProductLogic = () => {
    const {
        formData,
        resetForm,
        validateForm,
        setValidationErrors,
        updateFormData,

        setIsSubmitting, // <-- Get it from the store
        isSubmitting,    // <-- Also get the state
    } = useAddProductStore();

    const [isDirty, setIsDirty] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [lastSaved, setLastSaved] = useState(null);
    const [importMode, setImportMode] = useState(false);

    const schema = formData.schema_name;
    const { createProduct, errorProducts, loadingProducts } = useAddProducts(schema);

    const transformProductData = useCallback((data) => {
        const baseData = {
            title: data.localizedContent?.en?.title || data.title,
            content: data.localizedContent?.en?.content || data.content,
            tags: data.tags?.length > 0 ? data.tags : null,
            category: data.category || null,
            brand: data.brand || null,
            specification: [{
                sku: data.details?.sku || data.sku,
                selling_price: data.details?.selling_price || data.selling_price,
                main_attachment: data.main_attachment?.id || null,
                attachments: (data.attachments || []).map(attachment => attachment.id),
            }],
        };

        if (data.schema_details) {
            if (data.schema_details.details) {
                const schemaFields = {};
                const metadataKeys = ['id', 'name', 'created_at', 'updated_at', 'product_count', 'schema', 'details', 'project', 'group'];
                Object.keys(data.schema_details).forEach(key => {
                    if (!metadataKeys.includes(key)) {
                        schemaFields[key] = data.schema_details[key];
                    }
                });

                baseData.additional_data = schemaFields;
            }
            else {
                baseData.additional_data = data.schema_details;
            }
        }
        else if (data.additional_data) {
            if (data.additional_data.details) {
                const schemaFields = {};
                const metadataKeys = ['id', 'name', 'created_at', 'updated_at', 'product_count', 'schema', 'details', 'project', 'group'];

                Object.keys(data.additional_data).forEach(key => {
                    if (!metadataKeys.includes(key)) {
                        schemaFields[key] = data.additional_data[key];
                    }
                });

                baseData.additional_data = schemaFields;
            } else {
                baseData.additional_data = data.additional_data;
            }
        }
        return baseData;
    }, []);

    const handleSubmit = async () => {
        const transformedData = transformProductData(formData);
        console.log("Submitting data:", transformedData);
        try {
            // if (!validateForm()) {
            //     console.log("Form validation failed");
            //     setValidationErrors({ form: "Please fill out required fields correctly." });
            //     return false;
            // }

            setIsSubmitting(true); // Prevent multiple submissions

            const transformedData = transformProductData(formData);
            console.log("Submitting data:", transformedData);

            const response = await createProduct(transformedData);
            console.log("Product created successfully:", response);


            if (response) {
                console.log("Product created successfully:", response);
                setLastSaved(new Date());
                resetForm();
                setIsDirty(false);
                return true;
            } else {
                console.error("API returned no response");
                setValidationErrors({ submit: "Submission failed, please try again." });
                return false;
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            //setValidationErrors({ submit: error.message || "Unexpected error occurred." });
            return false;
        } finally {
            // setIsSubmitting(false); // Ensure this runs even if an error occurs
        }
    };


    const handleBulkProductCreate = async (products) => {
        try {
            const results = await Promise.all(
                products.map(async (product) => {
                    const transformedProduct = transformProductData(product);
                    return await createProduct(transformedProduct);
                })
            );

            console.log("Bulk products created successfully:", results);
            return results;
        } catch (error) {
            console.log("Error creating bulk products:", error);
        }
    };

    const handleCSVImportComplete = async (products) => {
        try {
            await handleBulkProductCreate(products);
        } catch (error) {
            console.log("Error completing CSV import:", error);
            setValidationErrors({ import: error.message });
        }
    };

    useEffect(() => {
        if (autoSave && isDirty) {
            const timer = setTimeout(() => {
                console.log("Auto-saving...");
                setLastSaved(new Date());
                setIsDirty(false);
            }, 30000);

            return () => clearTimeout(timer);
        }
    }, [autoSave, isDirty]);

    return {
        formData,
        isDirty,
        autoSave,
        isSubmitting, // <-- Return it
        setAutoSave,
        lastSaved,
        importMode,
        setImportMode,
        handleSubmit,
        handleBulkProductCreate,

        handleCSVImportComplete,
        resetForm,
        updateFormData,
        loadingProducts,
        errorProducts,
    };
};