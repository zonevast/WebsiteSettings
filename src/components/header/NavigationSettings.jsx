"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  Switch,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit2,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const NavigationSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HeaderSettingsPage.navigationSettings");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    label: "",
    url: "",
    isExternal: false,
  });
  const [editingItemId, setEditingItemId] = useState(null);

  const handleAddItem = () => {
    if (!newItem.label || !newItem.url) return;
    const next = [
      ...settings.navigationItems,
      { id: Date.now().toString(), ...newItem, isVisible: true },
    ];
    updateSettings({ navigationItems: next });
    setNewItem({ label: "", url: "", isExternal: false });
    setIsAddingItem(false);
  };

  const handleRemoveItem = (id) =>
    updateSettings({
      navigationItems: settings.navigationItems.filter((i) => i.id !== id),
    });

  const handleToggleItemVisibility = (id) =>
    updateSettings({
      navigationItems: settings.navigationItems.map((i) =>
        i.id === id ? { ...i, isVisible: !i.isVisible } : i
      ),
    });

  const handleMoveItem = (id, dir) => {
    const idx = settings.navigationItems.findIndex((i) => i.id === id);
    if (
      (dir === "up" && idx === 0) ||
      (dir === "down" && idx === settings.navigationItems.length - 1)
    )
      return;
    const arr = Array.from(settings.navigationItems);
    const [moved] = arr.splice(idx, 1);
    arr.splice(dir === "up" ? idx - 1 : idx + 1, 0, moved);
    updateSettings({ navigationItems: arr });
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem({
      label: item.label,
      url: item.url,
      isExternal: item.isExternal,
    });
    setIsAddingItem(true);
  };

  const handleUpdateItem = () => {
    if (!newItem.label || !newItem.url) return;
    updateSettings({
      navigationItems: settings.navigationItems.map((i) =>
        i.id === editingItemId ? { ...i, ...newItem } : i
      ),
    });
    setEditingItemId(null);
    setNewItem({ label: "", url: "", isExternal: false });
    setIsAddingItem(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const arr = Array.from(settings.navigationItems);
    const [moved] = arr.splice(result.source.index, 1);
    arr.splice(result.destination.index, 0, moved);
    updateSettings({ navigationItems: arr });
  };

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t("menuItems")}</h3>
        <div className="flex gap-2">
          <Select
            size="sm"
            className="w-40"
            label={t("menuStyle")}
            value={settings.menuStyle}
            onChange={(e) => updateSettings({ menuStyle: e.target.value })}
          >
            <SelectItem value="horizontal">{t("horizontal")}</SelectItem>
            <SelectItem value="vertical">{t("vertical")}</SelectItem>
            <SelectItem value="dropdown">{t("dropdown")}</SelectItem>
          </Select>
          <Button
            color="primary"
            size="sm"
            startContent={<Plus size={16} />}
            onPress={() => {
              setIsAddingItem(true);
              setEditingItemId(null);
            }}
          >
            {t("addItem")}
          </Button>
        </div>
      </div>

      {/* Drag-and-Drop Table */}
      <Card>
        <CardBody className="overflow-x-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="nav-items">
              {(prov) => (
                <table
                  className="min-w-full divide-y divide-gray-200"
                  ref={prov.innerRef}
                  {...prov.droppableProps}
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">{t("label")}</th>
                      <th className="px-4 py-2 text-left">{t("url")}</th>
                      <th className="px-4 py-2 text-left w-36">
                        {t("actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {settings.navigationItems.map((item, idx) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={idx}
                      >
                        {(p, snap) => (
                          <tr
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            className={snap.isDragging ? "bg-gray-100" : ""}
                          >
                            <td className="px-4 py-2">
                              <div className="flex items-center gap-2">
                                {item.label}
                                {item.isExternal && (
                                  <ExternalLink
                                    size={14}
                                    className="text-gray-400"
                                  />
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              {item.url}
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex items-center gap-1">
                                <Tooltip content={t("moveUp")}>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={() =>
                                      handleMoveItem(item.id, "up")
                                    }
                                    isDisabled={idx === 0}
                                  >
                                    <ChevronUp size={16} />
                                  </Button>
                                </Tooltip>
                                <Tooltip content={t("moveDown")}>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={() =>
                                      handleMoveItem(item.id, "down")
                                    }
                                    isDisabled={
                                      idx ===
                                      settings.navigationItems.length - 1
                                    }
                                  >
                                    <ChevronDown size={16} />
                                  </Button>
                                </Tooltip>
                                <Tooltip content={t("edit")}>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={() => handleEditItem(item)}
                                  >
                                    <Edit2 size={16} />
                                  </Button>
                                </Tooltip>
                                <Tooltip
                                  content={
                                    item.isVisible ? t("hide") : t("show")
                                  }
                                >
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={() =>
                                      handleToggleItemVisibility(item.id)
                                    }
                                  >
                                    {item.isVisible ? (
                                      <Eye size={16} />
                                    ) : (
                                      <EyeOff size={16} />
                                    )}
                                  </Button>
                                </Tooltip>
                                <Tooltip content={t("delete")}>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    color="danger"
                                    onPress={() => handleRemoveItem(item.id)}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </Tooltip>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {prov.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>

          {/* Add / Edit Form */}
          {isAddingItem && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <h4 className="text-md font-medium mb-3">
                {editingItemId ? t("editMenuItem") : t("addMenuItem")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label={t("menuLabel")}
                  placeholder={t("enterLabel")}
                  value={newItem.label}
                  onChange={(e) =>
                    setNewItem({ ...newItem, label: e.target.value })
                  }
                />
                <Input
                  label={t("menuUrl")}
                  placeholder={t("enterUrl")}
                  value={newItem.url}
                  onChange={(e) =>
                    setNewItem({ ...newItem, url: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    isSelected={newItem.isExternal}
                    onValueChange={(v) =>
                      setNewItem({ ...newItem, isExternal: v })
                    }
                  />
                  <span className="text-sm">{t("openInNewTab")}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="flat"
                    onPress={() => {
                      setIsAddingItem(false);
                      setEditingItemId(null);
                      setNewItem({ label: "", url: "", isExternal: false });
                    }}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    color="primary"
                    onPress={editingItemId ? handleUpdateItem : handleAddItem}
                  >
                    {editingItemId ? t("update") : t("add")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Menu Behavior Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("menuBehavior")}</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("stickyHeader")}</p>
                <p className="text-sm text-gray-500">{t("stickyHeaderDesc")}</p>
              </div>
              <Switch
                isSelected={settings.stickyHeader}
                onValueChange={(v) => updateSettings({ stickyHeader: v })}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("transparentHeader")}</p>
                <p className="text-sm text-gray-500">
                  {t("transparentHeaderDesc")}
                </p>
              </div>
              <Switch
                isSelected={settings.transparentHeader}
                onValueChange={(v) => updateSettings({ transparentHeader: v })}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("showSearchIcon")}</p>
                <p className="text-sm text-gray-500">
                  {t("showSearchIconDesc")}
                </p>
              </div>
              <Switch
                isSelected={settings.showSearchIcon}
                onValueChange={(v) => updateSettings({ showSearchIcon: v })}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("mobileMenu")}</h3>
          <div className="space-y-4">
            <Select
              label={t("mobileMenuType")}
              value={settings.mobileMenuType}
              onChange={(e) =>
                updateSettings({ mobileMenuType: e.target.value })
              }
            >
              <SelectItem value="drawer">{t("drawer")}</SelectItem>
              <SelectItem value="dropdown">{t("dropdown")}</SelectItem>
              <SelectItem value="fullscreen">{t("fullscreen")}</SelectItem>
            </Select>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("collapseOnScroll")}</p>
                <p className="text-sm text-gray-500">
                  {t("collapseOnScrollDesc")}
                </p>
              </div>
              <Switch
                isSelected={settings.collapseOnScroll}
                onValueChange={(v) => updateSettings({ collapseOnScroll: v })}
              />
            </div>
            <Input
              type="number"
              label={t("hamburgerIconSize")}
              value={settings.hamburgerIconSize}
              onChange={(e) =>
                updateSettings({ hamburgerIconSize: e.target.value })
              }
              min={16}
              max={32}
              className="max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSettings;
