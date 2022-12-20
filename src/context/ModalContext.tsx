import { FC, createContext, useContext, useState } from 'react';

import { IChildren } from 'src/types';
import { ModalsContent } from 'src/utils/getModalsContent';

interface IModalContext {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalContent: ModalsContent;
  passModalContent: (content: ModalsContent) => void;
}

const ModalContext = createContext<IModalContext>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalContent: ModalsContent.Default,
  passModalContent: () => {}
});

export const ModalContextProvider: FC<IChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalsContent>(
    ModalsContent.Default
  );

  const passModalContent = (content: ModalsContent) => {
    setModalContent(content);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(ModalsContent.Default);
    setIsModalOpen(false);
  };
  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        modalContent,
        passModalContent
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);

export default useModalContext;
