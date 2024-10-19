
import NavBar from './components/navBar/navBar';
import Footer from './components/Footer/Footer';
import ProductList from './components/productList/productList';
function App() {
  const products = [
    {
        id: 1,
        name: "Product 1",
        description: "This is the first product.",
        price: 29.99,
        image: "https://via.placeholder.com/250"
    },
    {
        id: 2,
        name: "Product 2",
        description: "This is the second product.",
        price: 39.99,
        image: "https://via.placeholder.com/250"
    },
    {
        id: 3,
        name: "Product 3",
        description: "This is the third product.",
        price: 49.99,
        image: "https://via.placeholder.com/250"
    }//testing the page
];
  return (
    <>
    <NavBar/>
    <ProductList  products={products}/>
    <Footer/>

    </>
  )
}

export default App;