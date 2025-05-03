import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCollections } from "./useCollections";

export default function useCollectionLogic() {
  const t = useTranslations("CollectionsPage");


  const [currentStep, setCurrentStep] = useState(1);
  const [productQuantities, setProductQuantities] = useState({});

  const [newCollection, setNewCollection] = useState({
    title: "",
    description: "",
    cover_image: [], // Changed to array to store uploaded file data
    products: [],
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const {
    collections,
    errorCollections,
    loadingCollections,
    searchCollections,
    fetchCollections,
    createCollections,
    updateCollections,
    deleteCollections,
    totalPagesCollections,
    setCurrentPageCollections,
    currentPageCollections,
    collectionOptions,
  } = useCollections();

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  // Updated to handle uploaded files
  const handleFileChange = (files) => {
    setUploadedFiles(files);
    setNewCollection(prev => ({
      ...prev,
      cover_image: files.map(file => ({
        file: file.id, // Store the file ID returned from the server
        hash: file.hash || ""
      }))
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2) {
      // Initialize quantities for selected products
      const initialQuantities = {};
      selectedProducts.forEach(product => {
        initialQuantities[product.id] = 1; // Default quantity
      });
      setProductQuantities(initialQuantities);
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
  };

  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, Math.min(quantity, 9999)) // Limit between 1 and 9999
    }));
  };


  const handleProductSelection = (products) => {
    setSelectedProducts(products);
  };

  const handleCreateCollection = async (onClose) => {
    if (newCollection.title.trim() && newCollection.description.trim()) {
      try {
        const collectionData = {
          title: newCollection.title,
          description: newCollection.description,
          cover_image: newCollection.cover_image.file,
          products: selectedProducts.map((p) => ({
            product: p.id,
            quantity: productQuantities[p.id] || 1
          })),
        };

        await createCollections.mutateAsync(collectionData);
        resetForm();
        onClose();
      } catch (error) {
        console.error(t("errorCreatingCollection"), error);
      }
    }
  };
  const resetForm = () => {
    setNewCollection({
      title: "",
      description: "",
      cover_image: [],
      products: [],
    });
    setSelectedProducts([]);
    setUploadedFiles([]);
    setCurrentStep(1);
  };

  return {
    currentStep,
    newCollection,
    selectedProducts,
    uploadedFiles,
    collections,
    errorCollections,
    loadingCollections,
    searchCollections,
    fetchCollections,
    createCollections,
    updateCollections,
    deleteCollections,
    totalPagesCollections,
    setCurrentPageCollections,
    currentPageCollections,
    collectionOptions,
    handleFileChange,
    handleNext,
    handleBack,
    handleProductSelection,
    handleCreateCollection,
    setNewCollection,


    productQuantities,
    handleQuantityChange,
  };
}