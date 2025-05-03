
import { useProducts } from "@/hooks/products/useProducts";
import { useCustomers } from "@/hooks/project/useCustomers";

// Helper function to format currency
export function formatCurrency(value) {
    if (!value) return "-";
    return `$${parseFloat(value).toFixed(2)}`;
}

// Helper function to format dates
export function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

export function useDataSource(dataSource, filters) {

    // Products data source
    const {
        products,
        errorProduct,
        loadingProduct,
        currentPageProduct,
        totalPagesProduct,
        setCurrentPageProduct,
    } = useProducts("", dataSource === "products", filters);


    // Return the appropriate data, loading state, error, and pagination based on the data source
    switch (dataSource) {
        case "products":
            return {
                // Ensure we're returning an array, even if products is undefined or not an array
                data: Array.isArray(products) ? products : (products?.data || []),
                loading: loadingProduct,
                error: errorProduct,
                currentPage: currentPageProduct,
                totalPages: totalPagesProduct,
                setCurrentPage: setCurrentPageProduct,
            };
        default:
            return {
                data: [],
                loading: false,
                error: null,
                currentPage: 1,
                totalPages: 1,
                setCurrentPage: () => { },
            };
    }
}

export function getColumnsForSource(source) {
    const columnsMap = {
        orders: [
            { id: "id", name: "Order ID" },
            { id: "created_at", name: "Date" },
            { id: "customer_name", name: "Customer" },
            { id: "products", name: "Products" },
            { id: "total_amount", name: "Total" },
            { id: "status", name: "Status" },
        ],
        products: [
            { id: "id", name: "Product ID" },
            { id: "title", name: "Name" },
            { id: "content", name: "Description" },
            { id: "tags", name: "Tags" },
            { id: "category", name: "Category" },
            { id: "specification.0.selling_price", name: "Price" },
            { id: "specification.0.profit_percent", name: "Profit %" },
            { id: "specification.0.main_attachment.path", name: "Main Image" },
            { id: "brand", name: "Brand" },
            { id: "schema", name: "Schema" },
            { id: "visibility_status", name: "Visibility" },
            { id: "created_at", name: "Created Date" },

        ],
        customers: [
            { id: "id", name: "Customer ID" },
            { id: "name", name: "Name" },
            { id: "email", name: "Email" },
            { id: "phone", name: "Phone" },
            { id: "total_orders", name: "Total Orders" },
        ],
        sellingPoints: [
            { id: "id", name: "Point ID" },
            { id: "name", name: "Name" },
            { id: "location", name: "Location" },
            { id: "manager", name: "Manager" },
            { id: "total_sales", name: "Total Sales" },
        ],
    };

    return columnsMap[source] || [];
}

export function mapFilterToApiParam(fieldId, operator, dataSource) {
    // Orders filters
    if (dataSource === "orders") {
        const mapping = {
            status: "status",
            payment_status: "payment_status",
            customer: "customer",
            created_at:
                operator === "greaterThan" ? "created_at_after" : "created_at_before",
            updated_at:
                operator === "greaterThan" ? "updated_at_after" : "updated_at_before",
            total_amount:
                operator === "greaterThan" ? "total_amount_min" : "total_amount_max",
            tags: "tags",
        };
        return mapping[fieldId];
    }

    // Products filters
    if (dataSource === "products") {
        const mapping = {
            "specification.0.selling_price":
                operator === "greaterThan"
                    ? "min_price"
                    : operator === "lessThan"
                        ? "max_price"
                        : "min_price", // default to min_price if not greaterThan/lessThan
            brand: "brand",
            brands: "brands",
            category: "category",
            categories: "categories",
            best_selling: "best_selling",
            sku: "sku",
            title: "title",
            in_stock: "inventory_state",
            created_at:
                operator === "greaterThan" ? "created_at_after" : "created_at_before",
        };
        return mapping[fieldId];
    }

    // Add mappings for other data sources as needed

    return null;
}

// Helper function to get status color
export function getStatusColor(status) {
    const statusColors = {
        pending: "warning",
        processing: "primary",
        completed: "success",
        cancelled: "danger",
        refunded: "secondary",
    };

    return statusColors[status] || "default";
}

