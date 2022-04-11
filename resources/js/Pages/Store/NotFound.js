import React from "react";
import { Head } from "@inertiajs/inertia-react";
import StoreLayout from "@/Layouts/StoreLayout";

export default function Home(props) {
  return (
    <StoreLayout auth={props.auth} errors={props.errors} categories={props.categories}>
      <h1>NO ENCONTRADO</h1>
      <p>Lo sentimos, la sección que está buscando no se encuentra.</p>
    </StoreLayout>
  );
}
