import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { itemVariants } from "../animations";
import { motion } from "framer-motion";
export const ChartCard = ({
  title,
  subtitle,
  children,
  isLoading= false,
  actionButton = null,
}) => (
  <motion.div
    variants={itemVariants}
    className={`w-full ${isLoading ? "overflow-hidden" : ""}`}
    whileHover={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
    transition={{ duration: 0.2 }}
  >
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && (
            <p className="text-small text-default-500">{subtitle}</p>
          )}
        </div>
        {actionButton}
      </CardHeader>
      <Divider />
      <CardBody className={isLoading ? "relative min-h-[300px]" : ""}>
        {isLoading ? (
          <div className="absolute inset-0 p-4 space-y-3">
            <Skeleton className="w-full h-8 rounded-lg" />
            <Skeleton className="w-full h-[250px] rounded-lg" />
          </div>
        ) : (
          children
        )}
      </CardBody>
    </Card>
  </motion.div>
);
