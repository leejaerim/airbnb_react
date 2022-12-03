import HostOnlyPage from "../components/HostOnlyPage";
import ProtectPage from "../components/ProtectPage";

export default function UploadRoom() {
  return (
    <ProtectPage>
      <HostOnlyPage>
        <h1>Upload Menu</h1>;
      </HostOnlyPage>
    </ProtectPage>
  );
}
