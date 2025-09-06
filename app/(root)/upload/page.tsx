"use client";

import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload Video</h1>
      {error && <div className="error-field">{error}</div>}

      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
        <FormField
          id="title"
          label="Title"
          placeholder="Masukkan judul video yang jelas dan ringkas"
          value={formData.title}
          onChange={handleInputChange}
        />
        <FormField
          id="description"
          label="Description"
          placeholder="Deskripsikan tentang apa video ini"
          value={formData.description}
          as="textarea"
          onChange={handleInputChange}
        />

        <FileInput />

        <FileInput />

        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          as="select"
          options={[
            { value: "public", label: "public" },
            { value: "private", label: "private" },
          ]}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default Page;
