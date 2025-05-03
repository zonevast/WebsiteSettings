"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Button, 
  Input, 
  Textarea,
  Card, 
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Tooltip,
  Accordion,
  AccordionItem
} from "@nextui-org/react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff,
  ChevronUp,
  ChevronDown,
  Image,
  Type,
  Copyright
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ContentSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("FooterSettings.contentSettings");
  const [editingColumn, setEditingColumn] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const [newColumn, setNewColumn] = useState({ title: "", links: [] });
  const [newLink, setNewLink] = useState({ label: "", url: "", isExternal: false });
  
  const handleAddColumn = () => {
    if (newColumn.title) {
      const updatedColumns = [
        ...settings.columns,
        { 
          id: Date.now().toString(), 
          title: newColumn.title,
          links: [],
          isVisible: true
        }
      ];
      updateSettings({ columns: updatedColumns });
      setNewColumn({ title: "", links: [] });
    }
  };
  
  const handleRemoveColumn = (columnId) => {
    const updatedColumns = settings.columns.filter(column => column.id !== columnId);
    updateSettings({ columns: updatedColumns });
  };
  
  const handleToggleColumnVisibility = (columnId) => {
    const updatedColumns = settings.columns.map(column => {
      if (column.id === columnId) {
        return { ...column, isVisible: !column.isVisible };
      }
      return column;
    });
    updateSettings({ columns: updatedColumns });
  };
  
  const handleEditColumn = (column) => {
    setEditingColumn(column);
  };
  
  const handleUpdateColumn = () => {
    if (editingColumn && editingColumn.title) {
      const updatedColumns = settings.columns.map(column => {
        if (column.id === editingColumn.id) {
          return { 
            ...column, 
            title: editingColumn.title
          };
        }
        return column;
      });
      
      updateSettings({ columns: updatedColumns });
      setEditingColumn(null);
    }
  };
  
  const handleAddLink = (columnId) => {
    if (newLink.label && newLink.url) {
      const updatedColumns = settings.columns.map(column => {
        if (column.id === columnId) {
          return { 
            ...column, 
            links: [
              ...column.links,
              {
                id: Date.now().toString(),
                ...newLink,
                isVisible: true
              }
            ]
          };
        }
        return column;
      });
      
      updateSettings({ columns: updatedColumns });
      setNewLink({ label: "", url: "", isExternal: false });
    }
  };
  
  const handleRemoveLink = (columnId, linkId) => {
    const updatedColumns = settings.columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          links: column.links.filter(link => link.id !== linkId)
        };
      }
      return column;
    });
    
    updateSettings({ columns: updatedColumns });
  };
  
  const handleToggleLinkVisibility = (columnId, linkId) => {
    const updatedColumns = settings.columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          links: column.links.map(link => {
            if (link.id === linkId) {
              return { ...link, isVisible: !link.isVisible };
            }
            return link;
          })
        };
      }
      return column;
    });
    
    updateSettings({ columns: updatedColumns });
  };
  
  const handleEditLink = (columnId, link) => {
    setEditingLink({ columnId, ...link });
  };
  
  const handleUpdateLink = () => {
    if (editingLink && editingLink.label && editingLink.url) {
      const updatedColumns = settings.columns.map(column => {
        if (column.id === editingLink.columnId) {
          return {
            ...column,
            links: column.links.map(link => {
              if (link.id === editingLink.id) {
                return {
                  ...link,
                  label: editingLink.label,
                  url: editingLink.url,
                  isExternal: editingLink.isExternal
                };
              }
              return link;
            })
          };
        }
        return column;
      });
      
      updateSettings({ columns: updatedColumns });
      setEditingLink(null);
    }
  };
  
  const handleMoveLink = (columnId, linkId, direction) => {
    const column = settings.columns.find(col => col.id === columnId);
    const linkIndex = column.links.findIndex(link => link.id === linkId);
    
    if (
      (direction === "up" && linkIndex === 0) || 
      (direction === "down" && linkIndex === column.links.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === "up" ? linkIndex - 1 : linkIndex + 1;
    const updatedLinks = [...column.links];
    const [movedLink] = updatedLinks.splice(linkIndex, 1);
    updatedLinks.splice(newIndex, 0, movedLink);
    
    const updatedColumns = settings.columns.map(col => {
      if (col.id === columnId) {
        return { ...col, links: updatedLinks };
      }
      return col;
    });
    
    updateSettings({ columns: updatedColumns });
  };
  
  const handleCopyrightChange = (e) => {
    updateSettings({ copyrightText: e.target.value });
  };
  
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real implementation, you would upload the file to your server
      // and then update the settings with the new logo URL
      const logoUrl = URL.createObjectURL(file);
      updateSettings({ footerLogoUrl: logoUrl });
    }
  };
  
  const handleToggleShowLogo = (isSelected) => {
    updateSettings({ showFooterLogo: isSelected });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("footerColumns")}</h3>
          <Card className="mb-6">
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-medium">{t("manageColumns")}</h4>
                  <Button 
                    size="sm" 
                    color="primary" 
                    startContent={<Plus size={16} />}
                    onPress={() => setNewColumn({ title: "", links: [] })}
                  >
                    {t("addColumn")}
                  </Button>
                </div>
                
                {newColumn && newColumn.title !== undefined && (
                  <div className="p-4 border border-default-200 rounded-lg mb-4">
                    <h4 className="text-md font-medium mb-3">{t("newColumn")}</h4>
                    <Input
                      label={t("columnTitle")}
                      placeholder={t("enterColumnTitle")}
                      value={newColumn.title}
                      onChange={(e) => setNewColumn({...newColumn, title: e.target.value})}
                      className="mb-4"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="flat" 
                        onPress={() => setNewColumn({ title: undefined, links: [] })}
                      >
                        {t("cancel")}
                      </Button>
                      <Button 
                        color="primary"
                        onPress={handleAddColumn}
                      >
                        {t("add")}
                      </Button>
                    </div>
                  </div>
                )}
                
                {editingColumn && (
                  <div className="p-4 border border-default-200 rounded-lg mb-4">
                    <h4 className="text-md font-medium mb-3">{t("editColumn")}</h4>
                    <Input
                      label={t("columnTitle")}
                      placeholder={t("enterColumnTitle")}
                      value={editingColumn.title}
                      onChange={(e) => setEditingColumn({...editingColumn, title: e.target.value})}
                      className="mb-4"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="flat" 
                        onPress={() => setEditingColumn(null)}
                      >
                        {t("cancel")}
                      </Button>
                      <Button 
                        color="primary"
                        onPress={handleUpdateColumn}
                      >
                        {t("update")}
                      </Button>
                    </div>
                  </div>
                )}
                
                <Accordion>
                  {settings.columns.map((column) => (
                    <AccordionItem 
                      key={column.id} 
                      title={
                        <div className="flex items-center justify-between w-full">
                          <span className={column.isVisible ? "" : "text-default-400 line-through"}>
                            {column.title}
                          </span>
                          <div className="flex items-center gap-1">
                            <Tooltip content={t("edit")}>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => handleEditColumn(column)}
                              >
                                <Edit2 size={16} />
                              </Button>
                            </Tooltip>
                            <Tooltip content={column.isVisible ? t("hide") : t("show")}>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => handleToggleColumnVisibility(column.id)}
                              >
                                {column.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                              </Button>
                            </Tooltip>
                            <Tooltip content={t("delete")}>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light" 
                                color="danger"
                                onPress={() => handleRemoveColumn(column.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      }
                    >
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-medium">{t("links")}</h5>
                          <Button 
                            size="sm" 
                            variant="flat" 
                            color="primary" 
                            startContent={<Plus size={14} />}
                            onPress={() => setNewLink({ label: "", url: "", isExternal: false })}
                          >
                            {t("addLink")}
                          </Button>
                        </div>
                        
                        {newLink && newLink.label !== undefined && (
                          <div className="p-3 border border-default-200 rounded-lg mb-3">
                            <h6 className="text-sm font-medium mb-2">{t("newLink")}</h6>
                            <div className="space-y-3 mb-3">
                              <Input
                                size="sm"
                                label={t("linkLabel")}
                                placeholder={t("enterLinkLabel")}
                                value={newLink.label}
                                onChange={(e) => setNewLink({...newLink, label: e.target.value})}
                              />
                              <Input
                                size="sm"
                                label={t("linkUrl")}
                                placeholder={t("enterLinkUrl")}
                                value={newLink.url}
                                onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                              />
                              <div className="flex items-center gap-2">
                                <Switch
                                  size="sm"
                                  isSelected={newLink.isExternal}
                                  onValueChange={(value) => setNewLink({...newLink, isExternal: value})}
                                />
                                <span className="text-sm">{t("openInNewTab")}</span>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm"
                                variant="flat" 
                                onPress={() => setNewLink({ label: undefined, url: "", isExternal: false })}
                              >
                                {t("cancel")}
                              </Button>
                              <Button 
                                size="sm"
                                color="primary"
                                onPress={() => handleAddLink(column.id)}
                              >
                                {t("add")}
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {editingLink && editingLink.columnId === column.id && (
                          <div className="p-3 border border-default-200 rounded-lg mb-3">
                            <h6 className="text-sm font-medium mb-2">{t("editLink")}</h6>
                            <div className="space-y-3 mb-3">
                              <Input
                                size="sm"
                                label={t("linkLabel")}
                                placeholder={t("enterLinkLabel")}
                                value={editingLink.label}
                                onChange={(e) => setEditingLink({...editingLink, label: e.target.value})}
                              />
                              <Input
                                size="sm"
                                label={t("linkUrl")}
                                placeholder={t("enterLinkUrl")}
                                value={editingLink.url}
                                onChange={(e) => setEditingLink({...editingLink, url: e.target.value})}
                              />
                              <div className="flex items-center gap-2">
                                <Switch
                                  size="sm"
                                  isSelected={editingLink.isExternal}
                                  onValueChange={(value) => setEditingLink({...editingLink, isExternal: value})}
                                />
                                <span className="text-sm">{t("openInNewTab")}</span>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button 
                                size="sm"
                                variant="flat" 
                                onPress={() => setEditingLink(null)}
                              >
                                {t("cancel")}
                              </Button>
                              <Button 
                                size="sm"
                                color="primary"
                                onPress={handleUpdateLink}
                              >
                                {t("update")}
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {column.links.length > 0 ? (
                          <Table aria-label="Links table" className="min-w-full">
                            <TableHeader>
                              <TableColumn>{t("label")}</TableColumn>
                              <TableColumn>{t("actions")}</TableColumn>
                            </TableHeader>
                            <TableBody>
                              {column.links.map((link) => (
                                <TableRow key={link.id}>
                                  <TableCell>
                                    <div className={link.isVisible ? "" : "text-default-400 line-through"}>
                                      {link.label}
                                    </div>
                                    <div className="text-xs text-default-500">{link.url}</div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <Tooltip content={t("moveUp")}>
                                        <Button 
                                          isIconOnly 
                                          size="sm" 
                                          variant="light"
                                          onPress={() => handleMoveLink(column.id, link.id, "up")}
                                        >
                                          <ChevronUp size={14} />
                                        </Button>
                                      </Tooltip>
                                      <Tooltip content={t("moveDown")}>
                                        <Button 
                                          isIconOnly 
                                          size="sm" 
                                          variant="light"
                                          onPress={() => handleMoveLink(column.id, link.id, "down")}
                                        >
                                          <ChevronDown size={14} />
                                        </Button>
                                      </Tooltip>
                                      <Tooltip content={t("edit")}>
                                        <Button 
                                          isIconOnly 
                                          size="sm" 
                                          variant="light"
                                          onPress={() => handleEditLink(column.id, link)}
                                        >
                                          <Edit2 size={14} />
                                        </Button>
                                      </Tooltip>
                                      <Tooltip content={link.isVisible ? t("hide") : t("show")}>
                                        <Button 
                                          isIconOnly 
                                          size="sm" 
                                          variant="light"
                                          onPress={() => handleToggleLinkVisibility(column.id, link.id)}
                                        >
                                          {link.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                                        </Button>
                                      </Tooltip>
                                      <Tooltip content={t("delete")}>
                                        <Button 
                                          isIconOnly 
                                          size="sm" 
                                          variant="light" 
                                          color="danger"
                                          onPress={() => handleRemoveLink(column.id, link.id)}
                                        >
                                          <Trash2 size={14} />
                                        </Button>
                                      </Tooltip>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <div className="text-center py-4 text-default-400">
                            {t("noLinks")}
                          </div>
                        )}
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("footerLogo")}</h3>
          <Card className="mb-6">
            <CardBody className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{t("showLogo")}</span>
                <Switch 
                  isSelected={settings.showFooterLogo} 
                  onValueChange={handleToggleShowLogo}
                />
              </div>
              
              {settings.showFooterLogo && (
                <div className="flex flex-col items-center justify-center p-4 border border-dashed border-default-300 rounded-lg">
                  {settings.footerLogoUrl ? (
                    <div className="relative group">
                      <img 
                        src={settings.footerLogoUrl} 
                        alt="Footer Logo" 
                        className="max-h-24 object-contain mb-3"
                      />
                      <div className="flex justify-center">
                        <Button 
                          size="sm" 
                          color="primary" 
                          variant="flat" 
                          startContent={<Image size={14} />}
                          as="label"
                        >
                          {t("changeLogo")}
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleLogoUpload}
                          />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image size={32} className="mx-auto mb-3 text-default-400" />
                      <p className="text-default-500 mb-3">{t("noLogoUploaded")}</p>
                      <Button 
                        size="sm" 
                        color="primary" 
                        variant="flat" 
                        startContent={<Image size={14} />}
                        as="label"
                      >
                        {t("uploadLogo")}
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleLogoUpload}
                        />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
          
          <h3 className="text-lg font-semibold mb-4">{t("copyrightSection")}</h3>
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-start gap-3">
                <Copyright size={20} className="text-default-500 mt-1 flex-shrink-0" />
                <div className="flex-grow">
                  <h4 className="text-md font-medium mb-2">{t("copyrightText")}</h4>
                  <Textarea
                    placeholder={t("enterCopyrightText")}
                    value={settings.copyrightText}
                    onChange={handleCopyrightChange}
                    minRows={2}
                    maxRows={4}
                  />
                  <p className="text-xs text-default-500 mt-2">
                    {t("copyrightTip")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Type size={20} className="text-default-500 mt-1 flex-shrink-0" />
                <div className="flex-grow">
                  <h4 className="text-md font-medium mb-2">{t("additionalText")}</h4>
                  <Textarea
                    placeholder={t("enterAdditionalText")}
                    value={settings.additionalText}
                    onChange={(e) => updateSettings({ additionalText: e.target.value })}
                    minRows={2}
                    maxRows={4}
                  />
                  <p className="text-xs text-default-500 mt-2">
                    {t("additionalTextTip")}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentSettings;