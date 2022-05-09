import React from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <Guest>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-500 leading-normal">
        Si olvidaste tu contraseña, ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </div>

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <Input type="text" name="email" value={data.email} className="mt-1 block w-full" isFocused={true} handleChange={onHandleChange} />

        <div className="flex items-center justify-end mt-4">
          <Button className="ml-4" processing={processing}>
            Enviar correo de restablecimiento
          </Button>
        </div>
      </form>
    </Guest>
  );
}
