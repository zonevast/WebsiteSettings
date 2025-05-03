"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Chip,
  Avatar,
  Badge,
  Divider,
} from "@nextui-org/react";
import {
  Star,
  Eye,
  Package,
  Users,
  Clock,
  Zap,
  Layers,
  ShoppingBag,
  Crown,
} from "lucide-react";

export const TemplateCard = ({ template, onPreview }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex gap-3 p-0">
        <div className="relative w-full">
          <img
            alt={template.title}
            className="w-full h-48 object-cover"
            src={template.thumbnail}
          />
        </div>
      </CardHeader>
      <CardBody className="py-2">
        <div className="flex items-center gap-2 mb-1">
          <Chip
            size="sm"
            color={
              template.category === "product"
                ? "primary"
                : template.category === "inventory"
                ? "success"
                : template.category === "customers"
                ? "secondary"
                : "warning"
            }
            variant="flat"
          >
            {template.category === "product" && (
              <Package size={14} className="mr-1" />
            )}
            {template.category === "inventory" && (
              <Layers size={14} className="mr-1" />
            )}
            {template.category === "customers" && (
              <Users size={14} className="mr-1" />
            )}
            {template.category === "order" && (
              <ShoppingBag size={14} className="mr-1" />
            )}
            {template.category.charAt(0).toUpperCase() +
              template.category.slice(1)}
          </Chip>
          <div className="flex items-center ml-auto">
            <Star className="text-warning fill-warning" size={14} />
            <span className="text-sm ml-1">{template.rating}</span>
            <span className="text-xs text-gray-500 ml-1">
              ({template.reviews})
            </span>
          </div>
        </div>
        <h3 className="font-bold text-lg">{template.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {template.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {template.tags.slice(0, 3).map((tag, index) => (
            <Chip key={index} size="sm" variant="flat" className="text-xs">
              {tag}
            </Chip>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          <Avatar src={template.authorAvatar} size="sm" className="mr-2" />
          <div>
            <p className="text-xs">By {template.author}</p>
            <p className="text-xs text-gray-500">
              <Clock size={12} className="inline mr-1" />
              Updated {new Date(template.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {template.price > 0 ? (
            <Chip color="primary" variant="flat">
              ${template.price}
            </Chip>
          ) : (
            <Chip color="success" variant="flat">
              Free
            </Chip>
          )}
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={() => onPreview(template)}
          >
            <Eye size={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
