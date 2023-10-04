import { useContext } from "react";
import { AuthContext } from "../../../../../pages/_auth";

import Btn from "../Form/Btn";

import Logo from '../Logo/logo.svg'

import Ava from "../Ava";
//import Notification from "../Notification";
import Wallet from "../Wallet";

export default function Header({ title }: any) {
  const { auth, currentUser }: any = useContext(AuthContext);

  return (
    <header className="pg__header">
      <h1 className="pg__header-title">{title}</h1>
        {currentUser && (
            <>
            <div className="pg__header-cta">
                {/* <Wallet /> */}
                {/* <Notification /> */}
                {/* <Ava img={currentUser?.photoURL} name={currentUser?.displayName} />
                */}

                <div className="pg__sidebar-toggle">

                </div>

                <div className="pg__header-logo">
                    <Logo />
                </div>

                <span className="pg__header-info">{currentUser?.email}</span>
                <Btn label="Log Out" onClick={() => auth.signOut()} />
            </div>
            </>
        )}
    </header>
  );
}
