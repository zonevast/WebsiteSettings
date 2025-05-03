import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { itemVariants } from "@/components/animations";

function FastestGrowingCitiesTable({ topCitiesData }) {
  const t = useTranslations("GeographicAnalysisPage.GeographyTabContent");

  return (
    <motion.div variants={itemVariants}>
      <Table aria-label={t("fastestGrowingCities")}>
        <TableHeader>
          <TableColumn>{t("city")}</TableColumn>
          <TableColumn align="end">{t("orders")}</TableColumn>
          <TableColumn align="end">{t("growth")}</TableColumn>
        </TableHeader>
        <TableBody>
          {topCitiesData.map((city, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {city.city}
                </div>
              </TableCell>
              <TableCell align="end">{city.orders}</TableCell>
              <TableCell align="end">
                <Chip
                  size="sm"
                  color={city.growth > 0 ? "success" : "danger"}
                  variant="flat"
                  startContent={
                    city.growth > 0 ? (
                      <TrendingUp size={12} />
                    ) : (
                      <TrendingDown size={12} />
                    )
                  }
                >
                  {city.growth > 0 ? "+" : ""}
                  {city.growth}%
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}

export default FastestGrowingCitiesTable;
