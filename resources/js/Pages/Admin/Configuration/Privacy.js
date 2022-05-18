import FlashAlert from "@/Components/FlashAlert";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import numeral from "numeral";
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Inertia } from "@inertiajs/inertia";

export default function Privacy(props) {
  const privacyEditorRef = useRef(null);
  const termsEditorRef = useRef(null);

  const [privacyContent, setPrivacyContent] = useState(props.privacy_content);
  const [termsContent, setTermsContent] = useState(props.terms_content);

  const _handleSubmit = () => {
    Inertia.post(route("admin.configuration.privacy.update"), { privacyContent: privacyEditorRef.current.getContent(), termsContent: termsEditorRef.current.getContent() });
  };

  return (
    <AdminLayout
      auth={props.auth}
      errors={props.errors}
      breadcrumbs={props.breadcrumbs}
      header={{ title: "Privacidad", subtitle: "Contenido de Privacidad y Términos", icon: "th-list" }}
    >
      {props.flash.error && <FlashAlert message={props.flash.error} type="error" />}
      {props.flash.success && <FlashAlert message={props.flash.success} type="success" />}
      {props.flash.info && <FlashAlert message={props.flash.info} type="info" />}

      <div className="mb-3">
        <h3>Política de Privacidad</h3>
        <Editor
          onInit={(evt, editor) => (privacyEditorRef.current = editor)}
          initialValue={privacyContent}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>

      <div className="mb-3">
        <h3>Términos y Condiciones</h3>
        <Editor
          onInit={(evt, editor) => (termsEditorRef.current = editor)}
          initialValue={termsContent}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          _handleSubmit();
        }}
        className="btn btn-outline-primary btn-sm"
      >
        Guardar
      </button>
    </AdminLayout>
  );
}
