import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/auth.context'
import  { FormAuth } from './composants/ui/FormAuth'
import ProtectedRoute from './composants/features/protectedRoute'
import DashboardPage from './pages/dashboard.page'


function App() {
 return (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<FormAuth/>}/>
                <Route path='/dashboard' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
 )
};

export default App
