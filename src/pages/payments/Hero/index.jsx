import { useState, useContext } from "react";
import { ProductContext } from "../../../pages/_products";

import Btn from "../../../components/Form/Btn";

import RocketIcon from "../../../assets/icons/rocket.svg";
import PlusIcon from "../../../assets/icons/plus-md.svg";

import ModalAddWallet from "../../../components/Modal/ModalWallet";
import TableWallets from "../TableWallets";

import styles from "./hero.module.sass";

export default function Hero() {
  const { newWallet } = useContext(ProductContext);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <ModalAddWallet openModal={openModal} setModalOpen={setOpenModal} newWallet={newWallet} />

      {newWallet.length < 2 && <div className={styles.hero}>
        <div className={styles.hero_header}>
          <div className={styles.hero_title}> Connect Backup Wallet </div>
          <span>4 steps to complete left</span>
        </div>

        <div className={styles.hero_container}>
          <div className={styles.hero_container_inner}>
            <div className={styles.hero_container_content}>
              <RocketIcon
                className={styles.hero_container_icon}
                width="28"
                height="28"
              />
              <div className={styles.hero_container_text}>
                <div className={styles.hero_container_title}>
                  Connect your Backup wallet if you need it
                </div>
                <span>
                  Press “Add Wallet” to connect a Backup Wallet and start
                  working with it
                </span>
              </div>
            </div>
            <Btn
              label="Add Wallet"
              icon={<PlusIcon />}
              theme="grad"
              onClick={handleOpenModal}
            />
          </div>
        </div>
      </div>}

      {newWallet.length !== 0 && <TableWallets props={newWallet}/>}

    </>
  );
}
