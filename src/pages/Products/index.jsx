import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Empty, ShoppingCart } from "@phosphor-icons/react"
import Modal from "react-modal"
import './Products.css'

export default function Products () {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')) || 0)
    const [modalIsOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    //Puxando os objetos da api
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
    },[])
    
    //Ver detalhes do produto, puxando o objeto específico
    const handleClick = (id) => {
        navigate(`/products/${id}`, {state: {products:products}})
    }

    //função atualizadora do carrinho e do total
    const addToCart = (product) => {
        let arrayComparacao = cart.filter((item) => (item.id == product.id))
        if (arrayComparacao.length == 0) {
            product.quantidade = 1
            setCart([...cart, product])
        } else {
            cart.map((item) => {
                if (item.id == product.id) {
                    item.quantidade = item.quantidade + 1
                    return item
                }
            })
        }
        setTotal(total + product.price)
    }

    //envio do carrinho e total para o local storage, transformando a informação em string:
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('total', JSON.stringify(total))

    //funções para aumentar e diminuir quantidade, e excluir produto
    const aumentar = (product) => {
        cart.map((item) => {
            if (item.id == product.id) {
                item.quantidade = item.quantidade + 1
                setTotal(total + product.price)
                return item
            }
        })
    }

    const diminuir = (product) => {
        cart.map((item) => {
            if (item.id == product.id && item.quantidade >= 2) {
                item.quantidade = item.quantidade - 1
                setTotal(total - product.price)
                return item
            }
        })
    }

    const excluirItem = (product, i) => {
        cart.splice(i, 1)
        setTotal(total - (product.price*product.quantidade))
    }

    //criacao do modal para o carrinho
    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }
    
    return (
        <>
            <header>
                <div><img width='100px' src="/public/logo.png" alt="" /></div>
                <div><h1>ShopCart</h1></div>
                <button onClick={ openModal }>Ver Carrinho</button>
            </header>            
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Exemple Modal"
                overlayClassName="modal-overlay"
                className="modal-content">
                
                <div class='carrinho'>
                    <table>
                        <thead style={ cart.length == 0 ? {display: 'none'} : {display: '-ms-flexbox'} } >
                            <tr>
                            <th>Item</th>
                            <th>Imagem</th>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Excluir</th>
                            </tr>
                        </thead>

                        <tbody> 
                            { cart.map((product, i) => {
                                return(
                                    <> 
                                        <tr>
                                        <td> { i + 1 } </td>
                                        <td><img width='40px' src={ product.image } alt="" /></td>
                                        <td><strong>{ product.title }</strong></td>
                                        <td>R$ { product.price.toFixed(2) }</td>
                                        <td>
                                            <button class='quantidade' onClick={ () => diminuir(product) }>-</button>
                                            <span>{ product.quantidade }</span>
                                            <button class='quantidade' onClick={ () => aumentar(product) }>+</button></td>
                                        <td><button class='quantidade' onClick={ () => excluirItem(product, i) }>Excluir</button></td>
                                        </tr>
                                    </>
                                )
                                })
                            }
                        </tbody>
                    </table>

                    <h3 style={ cart.length == 0 ? {display: 'none'} : {display: '-ms-flexbox'} }>Total: R$ { total.toFixed(2) }</h3>
                    
                    { cart.length == 0 ?
                    <abbr title="Seu carrinho está vazio"><Empty size={32} /></abbr> :
                    <abbr title="Clique para finalizar sua compra"><ShoppingCart size={32} onClick={ () => { navigate(`/checkout`) } } /></abbr> }
                
                </div>

                <button onClick={ closeModal }>Fechar Carrinho</button>
                
            </Modal>   
            
            <h1 class="titleProducts">Produtos</h1>

            <button onClick={ () => {navigate('/')} } >Voltar</button>

            {
                products.map((product) => {
                    return (
                        <>                        
                            <div class="produtos">
                                <strong><h3>{ product.title}</h3></strong>
                                <img width='100px' src={ product.image } alt="" />
                                <p>R$ { product.price.toFixed(2) }</p>
                                <button onClick={ () => handleClick (product.id) }>Ver detalhes</button>                                
                                <button onClick={ () => addToCart(product) } >Adicionar ao Carrinho</button>
                            </div>                   
                        </>
                    )
                })
            }
        </>
    )
}