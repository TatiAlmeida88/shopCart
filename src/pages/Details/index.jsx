import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useState } from "react"
import { Empty, ShoppingCart } from "@phosphor-icons/react"
import Modal from "react-modal"
import './Details.css'

export default function Details () {

    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')) || 0)
    const [modalIsOpen, setIsOpen] = useState(false)
    
    const productInDetail = location.state.products[params.id - 1]

    const addToCart = (productInDetail) => {
        let arrayComparacao = cart.filter((item) => (item.id == productInDetail.id))
        if (arrayComparacao.length == 0) {
            productInDetail.quantidade = 1
            setCart([...cart, productInDetail])
        } else {
            cart.map((item) => {
                if (item.id == productInDetail.id) {
                    item.quantidade = item.quantidade + 1
                    return item
                }
            })
        }
        setTotal(total + productInDetail.price)
    }

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

    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('total', JSON.stringify(total))

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
                
                <div class="carrinho">
                    <table>
                        <thead style={ cart.length == 0 ? {display: 'none'} : {display: '-ms-flexbox'} }>
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

            <h2 class="titleProducts">Detalhes do Produto</h2>

            <button onClick={ () => {navigate('/products')} }>Voltar</button>

            <div class="produtos">
                <strong><h3>{ productInDetail.title }</h3></strong>
                <img width='250px' src={ productInDetail.image } alt="" />
                <p>Categoria: { productInDetail.category }</p>
                <p>Descrição: { productInDetail.description }</p>
                <p>Preço: R$ {productInDetail.price.toFixed(2)}</p>
            </div>
            
            <button onClick={ () => addToCart(productInDetail) } >Adicionar ao Carrinho</button>
            
        </>
    )
}