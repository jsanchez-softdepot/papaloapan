import React, { useState } from "react";
import StoreNavigation from "@/Components/StoreNavigation";
import Footer from "@/Components/StoreFooter";
import { Toaster } from "react-hot-toast";
import StoreAside from "@/Components/StoreAside";
import StoreLoginModal from "@/Components/StoreLoginModal";
import StoreRegisterModal from "@/Components/StoreRegisterModal";

export default function StoreLayout({ children, categories, auth, cart, cartTotal = 0, cartSubtotal = 0, showHeader = true, errors = null, configs = null }) {
  const [showAside, setShowAside] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const _toggleLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(!showLoginModal);
  };

  const _toggleRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(!showRegisterModal);
  };

  return (
    <React.Fragment>
      {showHeader && (
        <StoreNavigation
          categories={categories}
          auth={auth}
          cart={cart}
          showAside={() => {
            setShowAside(true);
          }}
          hideAside={() => {
            setShowAside(false);
          }}
          toggleLoginModal={_toggleLoginModal}
          toggleRegisterModal={_toggleRegisterModal}
        />
      )}
      <div className="min-h-screen">
        <main id="store-content">{children}</main>
      </div>
      <Footer />
      {showAside && (
        <StoreAside
          close={() => {
            setShowAside(false);
          }}
          products={cart}
          cartTotal={cartTotal}
          cartSubtotal={cartSubtotal}
        />
      )}

      <StoreLoginModal toggleModal={_toggleLoginModal} isVisible={showLoginModal} toggleRegisterModal={_toggleRegisterModal} errors={errors} />
      <StoreRegisterModal toggleModal={_toggleRegisterModal} isVisible={showRegisterModal} toggleLoginModal={_toggleLoginModal} errors={errors} />
      <Toaster />
      {configs !== null && configs.whatsapp && configs.whatsapp.value && (
        <a href={configs.whatsapp.value}>
          <img src="/static/img/WhatsApp_Logo_2.png" className="fixed bottom-12 right-12 w-20 h-20 z-50" />
        </a>
      )}
    </React.Fragment>
  );
}
