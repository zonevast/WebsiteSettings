"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  Image,
  Chip,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import {
  Package,
  MapPin,
  User,
  Clock,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/helper";

function OrderDetailsModal({ isOpen, onOpenChange, order }) {
  if (!order) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Use order_products if available, otherwise use selling_products
  const products = order.order_products || order.selling_products || [];

  const calculateTotal = () => {
    if (!products?.length) return 0;
    return products.reduce(
      (sum, item) =>
        sum +
        (item.quantity || 0) *
          (parseFloat(item.specification?.selling_price) ||
            parseFloat(item.selling_price) ||
            0), // Handle selling_price at the item level
      0
    );
  };

  const getStatusColor = (status) => {
    const statusMap = {
      pending: { color: "warning", icon: <AlertCircle className="w-4 h-4" /> },
      processing: { color: "primary", icon: <Clock className="w-4 h-4" /> },
      completed: {
        color: "success",
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
      cancelled: { color: "danger", icon: <XCircle className="w-4 h-4" /> },
    };
    return (
      statusMap[status?.toLowerCase()] || {
        color: "default",
        icon: null,
      }
    );
  };

  const renderFallbackImage = (
    <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
      <Package className="w-8 h-8 text-gray-400" />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.created_at)}
                  </p>
                </div>
                <Chip
                  startContent={getStatusColor(order.status).icon}
                  color={getStatusColor(order.status).color}
                  variant="flat"
                  className="capitalize"
                >
                  {order.status || "Unknown"}
                </Chip>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="text-sm text-gray-500">Items</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {products?.length || 0}
                    </p>
                  </Card>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="text-sm text-gray-500">Total</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {formatCurrency(calculateTotal())}
                    </p>
                  </Card>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-sm text-gray-500">Payment</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {order.invoices?.[0]?.payment || "Not Available"}
                    </p>
                  </Card>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      <span className="text-sm text-gray-500">
                        Customer Orders
                      </span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {order.customer_detail?.ordersCount ||
                        order.customer_detail?.sellingCount ||
                        0}
                    </p>
                  </Card>
                </div>

                {/* Customer Information */}
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Customer Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">
                        {order.customer_detail?.first_name
                          ? `${order.customer_detail.first_name} ${
                              order.customer_detail.last_name || ""
                            }`.trim()
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">
                        {order.customer_detail?.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">
                        {order.customer_detail?.phone_number || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Customer Since</p>
                      <p className="font-medium">
                        {formatDate(order.customer_detail?.created_at)}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Order Items */}
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Order Items</h3>
                  </div>
                  <div className="space-y-4">
                    {products?.length ? (
                      products.map((item, index) => (
                        <React.Fragment key={item.product?.id || index}>
                          <div className="flex gap-4">
                            {item.specification?.main_attachment?.path ||
                            item.main_attachment?.path ? (
                              <Image
                                src={
                                  item.specification?.main_attachment?.path ||
                                  item.main_attachment?.path
                                }
                                alt={item.product?.title || "Product image"}
                                className="w-24 h-24 object-cover rounded"
                                fallback={renderFallbackImage}
                              />
                            ) : (
                              renderFallbackImage
                            )}
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">
                                  {item.product?.title || "Unnamed Product"}
                                </h4>
                                <p className="font-semibold">
                                  {formatCurrency(
                                    (item.quantity || 0) *
                                      (parseFloat(
                                        item.specification?.selling_price
                                      ) ||
                                        parseFloat(item.selling_price) ||
                                        0)
                                  )}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                SKU:{" "}
                                {item.specification?.sku || item.sku || "N/A"}
                              </p>
                              <div className="flex justify-between mt-2">
                                <p className="text-sm">
                                  Quantity: {item.quantity || 0}
                                </p>
                                <p className="text-sm">
                                  {formatCurrency(
                                    item.specification?.selling_price ||
                                      item.selling_price
                                  )}{" "}
                                  each
                                </p>
                              </div>
                            </div>
                          </div>
                          {index < products.length - 1 && <Divider />}
                        </React.Fragment>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        No items in this order
                      </div>
                    )}
                  </div>
                </Card>

                {/* Shipping Address */}
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Shipping Address</h3>
                  </div>
                  <div className="space-y-1">
                    {order.address_view ? (
                      <>
                        <p className="font-medium">
                          {order.address_view.region || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          {order.address_view.nearest_landmark || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          {order.address_view.city_mayor || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          {order.address_view.postal_code || "N/A"}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500">
                        No shipping address provided
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default OrderDetailsModal;
