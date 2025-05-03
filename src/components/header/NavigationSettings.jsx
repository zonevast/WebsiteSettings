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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip
} from "@nextui-org/react";
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Edit2, 
  Eye, 
  EyeOff,
  ExternalLink
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const NavigationSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HeaderSettings.navigationSettings");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({ label: "", url: "", isExternal: false });
  const [editingItemId, setEditingItemId] = useState(null);
  
  const handleAddItem = () => {
    if (newItem.label && newItem.url) {
      const updatedNavItems = [
        ...settings.navigationItems,
        { 
          id: Date.now().toString(), 
          ...newItem,
          isVisible: true
        }
      ];
      updateSettings({ navigationItems: updatedNavItems });
      setNewItem({ label: "", url: "", isExternal: false });
      setIsAddingItem(false);
    }
  };
  
  const handleRemoveItem = (itemId) => {
    const updatedNavItems = settings.navigationItems.filter(item => item.id !== itemId);
    updateSettings({ navigationItems: updatedNavItems });
  };
  
  const handleToggleItemVisibility = (itemId) => {
    const updatedNavItems = settings.navigationItems.map(item => {
      if (item.id === itemId) {
        return { ...item, isVisible: !item.isVisible };
      }
      return item;
    });
    updateSettings({ navigationItems: updatedNavItems });
  };
  
  const handleMoveItem = (itemId, direction) => {
    const currentIndex = settings.navigationItems.findIndex(item => item.id === itemId);
    if (
      (direction === "up" && currentIndex === 0) || 
      (direction === "down" && currentIndex === settings.navigationItems.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const updatedNavItems = [...settings.navigationItems];
    const [movedItem] = updatedNavItems.splice(currentIndex, 1);
    updatedNavItems.splice(newIndex, 0, movedItem);
    
    updateSettings({ navigationItems: updatedNavItems });
  };
  
  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem({
      label: item.label,
      url: item.url,
      isExternal: item.isExternal
    });
  };
  
  const handleUpdateItem = () => {
    if (newItem.label && newItem.url) {
      const updatedNavItems = settings.navigationItems.map(item => {
        if (item.id === editingItemId) {
          return { 
            ...item, 
            label: newItem.label, 
            url: newItem.url,
            isExternal: newItem.isExternal
          };
        }
        return item;
      });
      
      updateSettings({ navigationItems: updatedNavItems });
      setNewItem({ label: "", url: "", isExternal: false });
      setEditingItemId(null);
    }
  };
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(settings.navigationItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    updateSettings({ navigationItems: items });
  };

  return (
    <div className="space-y-6">
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
            <SelectItem key="horizontal" value="horizontal">{t("horizontal")}</SelectItem>
            <SelectItem key="vertical" value="vertical">{t("vertical")}</SelectItem>
            <SelectItem key="dropdown" value="dropdown">{t("dropdown")}</SelectItem>
          </Select>
          <Button 
            color="primary" 
            size="sm"
            startContent={<Plus size={16} />}
            onPress={() => setIsAddingItem(true)}
          >
            {t("addItem")}
          </Button>
        </div>
      </div>
      
      <Card>
        <CardBody>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="navigation-items">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Table aria-label="Navigation items table">
                    <TableHeader>
                      <TableColumn>{t("label")}</TableColumn>
                      <TableColumn>{t("url")}</TableColumn>
                      <TableColumn width={140}>{t("actions")}</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {settings.navigationItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <TableRow 
                              key={item.id} 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {item.label}
                                  {item.isExternal && (
                                    <ExternalLink size={14} className="text-default-400" />
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-default-500 text-sm">{item.url}</span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Tooltip content={t("moveUp")}>
                                    <Button 
                                      isIconOnly 
                                      size="sm" 
                                      variant="light"
                                      onPress={() => handleMoveItem(item.id, "up")}
                                      isDisabled={index === 0}
                                    >
                                      <ChevronUp size={16} />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip content={t("moveDown")}>
                                    <Button 
                                      isIconOnly 
                                      size="sm" 
                                      variant="light"
                                      onPress={() => handleMoveItem(item.id, "down")}
                                      isDisabled={index === settings.navigationItems.length - 1}
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
                                  <Tooltip content={item.isVisible ? t("hide") : t("show")}>
                                    <Button 
                                      isIconOnly 
                                      size="sm" 
                                      variant="light"
                                      onPress={() => handleToggleItemVisibility(item.id)}
                                    >
                                      {item.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
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
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          
          {(isAddingItem || editingItemId) && (
            <div className="mt-4 p-4 border border-default-200 rounded-lg">
              <h4 className="text-md font-medium mb-3">
                {editingItemId ? t("editMenuItem") : t("addMenuItem")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label={t("menuLabel")}
                  placeholder={t("enterLabel")}
                  value={newItem.label}
                  onChange={(e) => setNewItem({...newItem, label: e.target.value})}
                />
                <Input
                  label={t("menuUrl")}
                  placeholder={t("enterUrl")}
                  value={newItem.url}
                  onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    isSelected={newItem.isExternal}
                    onValueChange={(value) => setNewItem({...newItem, isExternal: value})}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("menuBehavior")}</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("stickyHeader")}</p>
                <p className="text-sm text-default-500">{t("stickyHeaderDesc")}</p>
              </div>
              <Switch 
                isSelected={settings.stickyHeader} 
                onValueChange={(value) => updateSettings({ stickyHeader: value })}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("transparentHeader")}</p>
                <p className="text-sm text-default-500">{t("transparentHeaderDesc")}</p>
              </div>
              <Switch 
                isSelected={settings.transparentHeader} 
                onValueChange={(value) => updateSettings({ transparentHeader: value })}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("showSearchIcon")}</p>
                <p className="text-sm text-default-500">{t("showSearchIconDesc")}</p>
              </div>
              <Switch 
                isSelected={settings.showSearchIcon} 
                onValueChange={(value) => updateSettings({ showSearchIcon: value })}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("mobileMenu")}</h3>
          <div className="space-y-4">
            <Select 
              label={t("mobileMenuType")} 
              value={settings.mobileMenuType}
              onChange={(e) => updateSettings({ mobileMenuType: e.target.value })}
            >
              <SelectItem key="drawer" value="drawer">{t("drawer")}</SelectItem>
              <SelectItem key="dropdown" value="dropdown">{t("dropdown")}</SelectItem>
              <SelectItem key="fullscreen" value="fullscreen">{t("fullscreen")}</SelectItem>
            </Select>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t("collapseOnScroll")}</p>
                <p className="text-sm text-default-500">{t("collapseOnScrollDesc")}</p>
              </div>
              <Switch 
                isSelected={settings.collapseOnScroll} 
                onValueChange={(value) => updateSettings({ collapseOnScroll: value })}
              />
            </div>
            
            <Input
              type="number"
              label={t("hamburgerIconSize")}
              value={settings.hamburgerIconSize}
              onChange={(e) => updateSettings({ hamburgerIconSize: e.target.value })}
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