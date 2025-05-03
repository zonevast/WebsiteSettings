import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useOffers } from "./useOffers";

function useOfferLogic() {
  const {
    offers,
    errorOffers,
    loadingOffers,
    fetchOffers,
    createOffer,
    updateOffer,
    deleteOffer,
    currentPageOffers,
    totalPagesOffers,
    setCurrentPageOffers,
  } = useOffers();

  const {
    isOpen: isModalOpen,
    onOpen,
    onOpenChange: setIsModalOpen,
  } = useDisclosure();

  const [isEditing, setIsEditing] = useState(false);

  const initialOfferForm = {
    discount:{
      title: "",
      description: "",
      discount_type: null,
      discount_value: null,
      start_date: null,
      end_date: null,
      minimum_purchase_amount: null,
      maximum_discount_amount: null,
      is_active: false,
    },

    product: [], // Add this line
  };

  const [offerForm, setOfferForm] = useState(initialOfferForm);

  const resetOfferForm = () => setOfferForm(initialOfferForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferForm((prev) => ({
      ...prev,
      discount: {
        ...prev.discount,
        [name]: value,
      },
    }));
  };
  const handleCreateOffer = () => {
    resetOfferForm();
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditOffer = (offer) => {
    setOfferForm({
      discount: {
        ...offer.discount,
      },
      product: offer.product || [],
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };
  const handleSaveOffer = async (formData) => { // Update to accept formData parameter
    try {
      if (isEditing) {
        await updateOffer(formData.id, formData);
      } else {
        await createOffer.mutateAsync(formData);
      }
      resetOfferForm();
      setIsModalOpen(false);
      fetchOffers();
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };


  const handleDeleteOffer = async (id) => {
    try {
      await deleteOffer(id);
      fetchOffers(); // Refresh the data
    } catch (error) {
      console.error("Error deleting offer:", error);
      // Handle error
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    offerForm,
    handleInputChange,
    handleSaveOffer,
    handleEditOffer,
    handleCreateOffer,
    handleDeleteOffer,
    isEditing,
    offers,
    loading: loadingOffers,
    error: errorOffers,
    currentPage: currentPageOffers,
    totalPages: totalPagesOffers,
    setCurrentPage: setCurrentPageOffers,
  };
}

export default useOfferLogic;