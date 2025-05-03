import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useCoupons } from "./useCoupons";

function useCouponsLogic() {
  const {
    coupons,
    loadingCoupons,
    errorCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    fetchCoupons,
    currentPageCoupons,
    totalPagesCoupons,
    setCurrentPageCoupons,
  } = useCoupons();

  const {
    isOpen: isModalOpen,
    onOpen,
    onOpenChange: setIsModalOpen,
  } = useDisclosure();

  const [isEditing, setIsEditing] = useState(false);

  const initialCouponForm = {
    key: "",
    discount_type: null,
    discount_value: null,
    start_date: null,
    end_date: null,
    usage_count: null,
    usage_limit: null,
    usage_limit_per_customer: null,
    is_active: false,
    description: "",
    minimum_purchase_amount: null,
    maximum_discount_amount: null,
    specific_products: [],
    specific_customers: [],
  };

  const [couponForm, setCouponForm] = useState(initialCouponForm);

  const resetCouponForm = () => setCouponForm(initialCouponForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCoupon = () => {
    resetCouponForm();
    setIsEditing(false);
    onOpen(); // Open the modal for creating
  };

  const handleEditCoupon = (coupon) => {
    setCouponForm(coupon);
    setIsEditing(true);
    onOpen(); // Open the modal for editing
  };

  const handleSaveCoupon = async () => {
    try {
      if (isEditing) {
        await updateCoupon(couponForm.id, couponForm);
      } else {
        await createCoupon.mutateAsync(couponForm);
      }
      resetCouponForm();
      setIsModalOpen(false);
      fetchCoupons(); // Refresh the data
    } catch (error) {
      console.error("Error saving coupon:", error);
      // Handle error (e.g., show notification)
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await deleteCoupon(id);
      fetchCoupons(); // Refresh the data
    } catch (error) {
      console.error("Error deleting coupon:", error);
      // Handle error
    }
  };


  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 6;
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    
    return result;
  };
  
  const handleGenerateCode = () => {
    const randomCode = generateRandomCode();
    setCouponForm(prev => ({
      ...prev,
      key: randomCode
    }));
  };

  return {
    isModalOpen,
    setIsModalOpen,
    couponForm,
    handleInputChange,
    handleSaveCoupon,
    handleEditCoupon,
    handleCreateCoupon,
    handleDeleteCoupon,
    resetCouponForm,
    isEditing,
    coupons,
    loading: loadingCoupons,
    error: errorCoupons,
    currentPage: currentPageCoupons,
    totalPages: totalPagesCoupons,
    setCurrentPage: setCurrentPageCoupons,
    handleGenerateCode
  };
}

export default useCouponsLogic;
