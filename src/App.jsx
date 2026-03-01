import { BrowserRouter } from "react-router"
import POSRoutes from "./features/routes/POSRoutes"

function App() {
  return (
    <BrowserRouter>
      <POSRoutes />
    </BrowserRouter>
  )
}

export default App
