"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
  Input,
  Textarea,
  Card,
  CardBody,
  Button,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Switch,
} from "@nextui-org/react";
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Type,
  Layout,
  Sliders,
  MessageSquare,
  User,
} from "lucide-react";
import ColorPicker from "@/components/ColorPicker";
import ImageUploader from "@/components/ImageUploader";

const TestimonialsSettings = ({ settings, updateSettings }) => {
  const t = useTranslations("HomePage.testimonials");

  const handleChange = (key, value) => {
    updateSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleTestimonialChange = (index, key, value) => {
    const updatedTestimonials = [...settings.items];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [key]: value,
    };

    handleChange("items", updatedTestimonials);
  };

  const addTestimonial = () => {
    const newTestimonial = {
      quote: t("newTestimonialQuote"),
      author: t("newTestimonialAuthor"),
      role: t("newTestimonialRole"),
      company: t("newTestimonialCompany"),
      avatar: "",
      rating: 5,
    };

    handleChange("items", [...settings.items, newTestimonial]);
  };

  const removeTestimonial = (index) => {
    const updatedTestimonials = settings.items.filter((_, i) => i !== index);
    handleChange("items", updatedTestimonials);
  };

  const moveTestimonial = (index, direction) => {
    const updatedTestimonials = [...settings.items];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= updatedTestimonials.length) return;

    const temp = updatedTestimonials[index];
    updatedTestimonials[index] = updatedTestimonials[newIndex];
    updatedTestimonials[newIndex] = temp;

    handleChange("items", updatedTestimonials);
  };

  return (
    <div className="space-y-6">
      <Tabs aria-label="Testimonials Settings">
        <Tab
          key="content"
          title={
            <div className="flex items-center gap-2">
              <MessageSquare size={18} />
              <span>{t("content")}</span>
            </div>
          }
        >
          <Card className="mt-4">
            <CardBody className="space-y-4">
              <Input
                label={t("sectionTitle")}
                value={settings.title}
                onChange={(e) => handleChange("title", e.target.value)}
                fullWidth
              />

              <Textarea
                label={t("sectionDescription")}
                value={settings.description}
                onChange={(e) => handleChange("description", e.target.value)}
                fullWidth
                minRows={2}
              />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{t("testimonials")}</p>
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Plus size={16} />}
                    onPress={addTestimonial}
                    size="sm"
                  >
                    {t("addTestimonial")}
                  </Button>
                </div>

                {settings.items.map((testimonial, index) => (
                  <Card key={index} className="p-3">
                    <CardBody className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-medium">
                          {t("testimonial")} {index + 1}
                        </h5>
                        <div className="flex gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => moveTestimonial(index, -1)}
                            isDisabled={index === 0}
                          >
                            <MoveUp size={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => moveTestimonial(index, 1)}
                            isDisabled={index === settings.items.length - 1}
                          >
                            <MoveDown size={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="light"
                            onPress={() => removeTestimonial(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>

                      <Textarea
                        label={t("testimonialQuote")}
                        value={testimonial.quote}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "quote",
                            e.target.value
                          )
                        }
                        size="sm"
                        minRows={3}
                      />

                      <Input
                        label={t("testimonialAuthor")}
                        value={testimonial.author}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "author",
                            e.target.value
                          )
                        }
                        size="sm"
                      />

                      <Input
                        label={t("testimonialRole")}
                        value={testimonial.role}
                        onChange={(e) =>
                          handleTestimonialChange(index, "role", e.target.value)
                        }
                        size="sm"
                      />

                      <Input
                        label={t("testimonialCompany")}
                        value={testimonial.company}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        size="sm"
                      />

                      <div className="space-y-2">
                        <p className="text-sm">{t("testimonialAvatar")}</p>
                        <ImageUploader
                          value={testimonial.avatar}
                          onChange={(url) =>
                            handleTestimonialChange(index, "avatar", url)
                          }
                          label={t("uploadAvatar")}
                        />
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm">
                          {t("testimonialRating")}: {testimonial.rating}
                        </p>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.5"
                          value={testimonial.rating}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              "rating",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="layout"
          title={
            <div className="flex items-center gap-2">
              <Layout size={18} />
              <span>{t("layout")}</span>
            </div>
          }
        >
          <Card className="mt-4">
            <CardBody className="space-y-4">
              <Select
                label={t("layout")}
                value={settings.layout}
                onChange={(e) => handleChange("layout", e.target.value)}
              >
                <SelectItem key="grid" value="grid">
                  {t("grid")}
                </SelectItem>
                <SelectItem key="carousel" value="carousel">
                  {t("carousel")}
                </SelectItem>
                <SelectItem key="slider" value="slider">
                  {t("slider")}
                </SelectItem>
                <SelectItem key="masonry" value="masonry">
                  {t("masonry")}
                </SelectItem>
              </Select>

              <Select
                label={t("columns")}
                value={settings.columns.toString()}
                onChange={(e) =>
                  handleChange("columns", parseInt(e.target.value))
                }
              >
                <SelectItem key="1" value="1">
                  1
                </SelectItem>
                <SelectItem key="2" value="2">
                  2
                </SelectItem>
                <SelectItem key="3" value="3">
                  3
                </SelectItem>
                <SelectItem key="4" value="4">
                  4
                </SelectItem>
              </Select>

              <div className="space-y-1">
                <p className="text-sm">
                  {t("gap")}: {settings.gap}px
                </p>
                <input
                  type="range"
                  min="0"
                  max="64"
                  step="4"
                  value={settings.gap}
                  onChange={(e) =>
                    handleChange("gap", parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm">
                  {t("paddingTop")}: {settings.padding.top}px
                </p>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="4"
                  value={settings.padding.top}
                  onChange={(e) =>
                    handleChange("padding", {
                      ...settings.padding,
                      top: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm">
                  {t("paddingBottom")}: {settings.padding.bottom}px
                </p>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="4"
                  value={settings.padding.bottom}
                  onChange={(e) =>
                    handleChange("padding", {
                      ...settings.padding,
                      bottom: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              {(settings.layout === "carousel" ||
                settings.layout === "slider") && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t("autoplay")}</span>
                    <Switch
                      checked={settings.autoplay}
                      onChange={(e) =>
                        handleChange("autoplay", e.target.checked)
                      }
                      size="sm"
                    />
                  </div>

                  {settings.autoplay && (
                    <div className="space-y-1">
                      <p className="text-sm">
                        {t("autoplaySpeed")}: {settings.autoplaySpeed}ms
                      </p>
                      <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="500"
                        value={settings.autoplaySpeed}
                        onChange={(e) =>
                          handleChange(
                            "autoplaySpeed",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t("showNavigation")}</span>
                    <Switch
                      checked={settings.showNavigation}
                      onChange={(e) =>
                        handleChange("showNavigation", e.target.checked)
                      }
                      size="sm"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t("showDots")}</span>
                    <Switch
                      checked={settings.showDots}
                      onChange={(e) =>
                        handleChange("showDots", e.target.checked)
                      }
                      size="sm"
                    />
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="style"
          title={
            <div className="flex items-center gap-2">
              <Sliders size={18} />
              <span>{t("style")}</span>
            </div>
          }
        >
          <Card className="mt-4">
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("backgroundColor")}</p>
                <ColorPicker
                  value={settings.backgroundColor}
                  onChange={(color) => handleChange("backgroundColor", color)}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">{t("textColor")}</p>
                <ColorPicker
                  value={settings.textColor}
                  onChange={(color) => handleChange("textColor", color)}
                />
              </div>

              <Select
                label={t("testimonialStyle")}
                value={settings.testimonialStyle}
                onChange={(e) =>
                  handleChange("testimonialStyle", e.target.value)
                }
              >
                <SelectItem key="simple" value="simple">
                  {t("simple")}
                </SelectItem>
                <SelectItem key="card" value="card">
                  {t("card")}
                </SelectItem>
                <SelectItem key="bordered" value="bordered">
                  {t("bordered")}
                </SelectItem>
                <SelectItem key="shadowed" value="shadowed">
                  {t("shadowed")}
                </SelectItem>
                <SelectItem key="quote" value="quote">
                  {t("quote")}
                </SelectItem>
              </Select>

              <div className="space-y-2">
                <p className="text-sm font-medium">{t("quoteColor")}</p>
                <ColorPicker
                  value={settings.quoteColor}
                  onChange={(color) => handleChange("quoteColor", color)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">{t("showRating")}</span>
                <Switch
                  checked={settings.showRating}
                  onChange={(e) => handleChange("showRating", e.target.checked)}
                  size="sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">{t("showQuotationMarks")}</span>
                <Switch
                  checked={settings.showQuotationMarks}
                  onChange={(e) =>
                    handleChange("showQuotationMarks", e.target.checked)
                  }
                  size="sm"
                />
              </div>

              <Select
                label={t("titleAlignment")}
                value={settings.titleAlignment}
                onChange={(e) => handleChange("titleAlignment", e.target.value)}
              >
                <SelectItem key="left" value="left">
                  {t("left")}
                </SelectItem>
                <SelectItem key="center" value="center">
                  {t("center")}
                </SelectItem>
                <SelectItem key="right" value="right">
                  {t("right")}
                </SelectItem>
              </Select>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TestimonialsSettings;
