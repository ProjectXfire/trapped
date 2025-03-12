import { ContentLimit } from "@/shared/components/containers";
import BoardSection from "../components/board-section/BoardSection";
import ModalInstruction from "../components/modal-instruction/ModalInstruction";
import Navbar from "../components/navbar/Navbar";
import Sidemenu from "../components/sidemenu/Sidemenu";
import TableBoard from "../components/tableboard/TableBoard";
import ModalSelecting from "../components/modal-selecting/ModalSelecting";
import ModalResultGame from "../components/modal-result-game/ResultGame";
import ModalOptions from "../components/modal-options/ModalOptions";

function Gameboard(): React.ReactElement {
  return (
    <ContentLimit>
      <BoardSection sidemenu={<Sidemenu />} navbar={<Navbar />} content={<TableBoard />} />
      <ModalInstruction />
      <ModalSelecting />
      <ModalResultGame />
      <ModalOptions />
    </ContentLimit>
  );
}

export default Gameboard;
