import { useState, useContext } from "react";
import { ProductContext } from "../../../pages/_products";

import ModalAddWallet from "../../../components/Modal/ModalWallet";
import TableWallets from "../TableWallets";
import HeroGroup from "../../../components/HeroCta";


export default function Hero() {
  const { newWallet }: any = useContext(ProductContext);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const hero = {
    heading: "Connect Backup Wallet",
    title: "Connect your Backup wallet if you need it",
    text: `Press “Add Wallet” to connect a Backup Wallet and start
    working with it`,
    info: "1 steps to complete left",
    btn: {
      label: "Add Wallet",
      on_click: handleOpenModal,
    },
  };

  return (
    <>
      <ModalAddWallet
        openModal={openModal}
        setModalOpen={setOpenModal}
        newWallet={newWallet}
      />

      {newWallet.length < 1 && <HeroGroup hero={hero} />}

      {newWallet.length !== 0 && <TableWallets props={newWallet} toggleModal={handleOpenModal} />}
    </>
  );
}
