import { HashRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { ScrollToTop } from './components/ScrollToTop'
import { ContextProvider } from './helpers/globalContext'
import { AboutUsPage } from './pages/AboutUsPage'
import ProfilePage from './pages/AuthorizePage/ProfilePage'
import { LogInPage } from './pages/AuthorizePage/LogInPage'
import { SingInPage } from './pages/AuthorizePage/SingInPage'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import CheckOutPage from './pages/CheckOutPage/CheckOutPage'
import { ErrorPage } from './pages/ErrorPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import HomePage from './pages/HomePage/HomePage'
import { ProductPage } from './pages/ProductPage'
import { FaqPage } from './pages/FaqPage/FaqPage'

export default function () {
  return (
    <HashRouter>
      <ScrollToTop />
      <ContextProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='home' element={<HomePage />} />
            <Route path='catalog'>
              <Route index element={<CatalogPage />} />
              <Route path=':product_name_Id' element={<ProductPage />} />
            </Route>
            <Route path="about-us" element={<AboutUsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart">
              <Route index element={<CartPage />} />
              <Route path="check-out" element={<CheckOutPage />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} >
              <Route index element={<SingInPage />} />
              <Route path="sign-in" element={<SingInPage />} />
              <Route path="log-in" element={<LogInPage />} />
            </Route>
            <Route path="faq" element={<FaqPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </ContextProvider>
    </HashRouter>
  )
}
