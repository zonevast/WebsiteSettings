import { motion } from "framer-motion";
import { itemVariants } from "../animations";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Package } from "lucide-react";
export const ComingSoonCard = ({ selectedTab }) => (
  <motion.div
    variants={itemVariants}
    className="flex justify-center items-center p-10"
  >
    <Card className="max-w-md mx-auto">
      <CardBody className="flex flex-col items-center gap-4 p-6">
        <div className="p-3 rounded-full bg-primary-100">
          <Package size={30} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold text-center">Coming Soon</h3>
        <p className="text-center text-default-500">
          The {selectedTab} view is currently under development. Check back soon
          for detailed analytics on this section.
        </p>
      </CardBody>
    </Card>
  </motion.div>
);
