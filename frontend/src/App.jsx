
import {Routes,Route} from "react-router"
import Home from "./components/Home"
import QuesPage from "./components/QuesPage"

function App() {

  return (
    <>
    <Routes>
      <Route path="/"
      element={<Home/>}
      >
        <Route path="questions/page/:pageId" element={<QuesPage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
