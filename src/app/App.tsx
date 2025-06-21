import {StoreProvider} from "@/app/providers/StoreProvider";
import {HomeScreen} from "@/screens/home";

export default function App() {
  return (
    <StoreProvider>
      <HomeScreen />
    </StoreProvider>
  );
}
