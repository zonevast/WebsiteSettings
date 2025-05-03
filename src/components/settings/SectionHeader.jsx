
import React from "react";

export const SectionHeader = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5" />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};