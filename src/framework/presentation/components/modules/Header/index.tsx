import { useContext } from "react";
import { AuthContext } from "../../../../../pages/_auth";

import Ava from "../Ava";
//import Notification from "../Notification";
import Wallet from "../Wallet";

export default function Header({ title }: any) {
  const { currentUser }: any = useContext(AuthContext);

  return (
    <header className="pg__header">
      <h1 className="pg__header-title">{title}</h1>

      {currentUser && (
        <div className="pg__header-cta">
          <Wallet />
          {/* <Notification /> */}
          <Ava img={currentUser?.photoURL} name={currentUser?.displayName} />
        </div>
      )}
    </header>
  );
}
