import { Card } from "@nextui-org/card";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

export const SummaryCard = ({
  title,
  value,
  trend,
  change,
  description,
  icon: Icon,
  iconColor,
  bgGradient,
}) => {
  return (
    <Card className={`p-6 hover:shadow-lg transition-shadow ${bgGradient}`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-default-500">{title}</span>
          <span className="text-2xl font-bold">{value}</span>
          {trend && (
            <div
              className="flex items-center gap-1 text-xs"
              style={{ color: iconColor }}
            >
              {trend === "up" ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              <span>{change}</span>
            </div>
          )}
          {description && (
            <span className="text-xs text-default-400">{description}</span>
          )}
        </div>
        {Icon && <Icon className={`h-8 w-8 ${iconColor}/50`} />}
      </div>
    </Card>
  );
};
