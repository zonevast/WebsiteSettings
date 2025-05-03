"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Divider,
} from "@nextui-org/react";
import { Star, ArrowRight } from "lucide-react";

export const CollectionCard = ({ collection, templates }) => {
  const collectionTemplates = templates
    .filter((t) => collection.templates.includes(t.id))
    .slice(0, 4);

  return (
    <Card className="w-full">
      <CardHeader className="p-0">
        <img
          alt={collection.title}
          className="w-full h-40 object-cover"
          src={collection.thumbnail}
        />
      </CardHeader>
      <CardBody>
        <h3 className="font-bold text-xl">{collection.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{collection.description}</p>

        <div className="grid grid-cols-2 gap-2">
          {collectionTemplates.map((template, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-default-50 rounded-lg"
            >
              <div
                className="w-8 h-8 rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url(${template.thumbnail})` }}
              />
              <div className="overflow-hidden">
                <p className="text-xs font-medium truncate">{template.title}</p>
                <div className="flex items-center">
                  <Star className="text-warning fill-warning" size={10} />
                  <span className="text-xs ml-1">{template.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          color="primary"
          variant="flat"
          endContent={<ArrowRight size={16} />}
          className="w-full"
        >
          View Collection
        </Button>
      </CardFooter>
    </Card>
  );
};
