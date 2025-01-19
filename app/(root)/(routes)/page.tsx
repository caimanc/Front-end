"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

//import { ClerkProvider, UserButton } from "@clerk/nextjs";

const SetupPage =() =>{
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  
  return null;
}
export default SetupPage; 

/*  El boton de inicio de sesion de Clerk
  <ClerkProvider>
        <UserButton/>
  </ClerkProvider>

  return (
    <div className="p-8">
       root page
    </div> 
  );
  
  /* <Modal title ="Bogota Artesanias" description="Bienvenido a Bogota Artesanias" isOpen onClose={() => {}}> Futuro formulario </Modal>
*/